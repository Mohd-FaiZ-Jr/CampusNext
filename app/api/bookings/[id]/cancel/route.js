import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import Booking from "@/app/backend/models/Booking.model";
import Property from "@/app/backend/models/Property.model";
import "@/app/backend/models/User.model";
import { isAuthenticated } from "@/app/lib/auth";

/**
 * PATCH /api/bookings/:id/cancel
 * Cancel a booking
 * - Students can cancel their own bookings
 * - Landlords can cancel bookings for their properties
 */
export async function PATCH(req, { params }) {
  try {
    // 1. Authentication Check
    const user = await isAuthenticated(req);

    // 2. Connect to Database
    await connectDB();

    // 3. Get Booking ID from params
    const { id } = params;

    // 4. Find Booking
    const booking = await Booking.findById(id).populate(
      "property",
      "title owner"
    );

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    // 5. Check if booking is already cancelled
    if (booking.status === "CANCELLED") {
      return NextResponse.json(
        { message: "Booking is already cancelled" },
        { status: 400 }
      );
    }

    // 6. Authorization Check
    let cancelledBy;

    if (user.role === "STUDENT") {
      // Students can only cancel their own bookings
      if (booking.student.toString() !== user.id) {
        return NextResponse.json(
          { message: "You can only cancel your own bookings" },
          { status: 403 }
        );
      }
      cancelledBy = "STUDENT";
    } else if (user.role === "LANDLORD") {
      // Landlords can cancel bookings for their properties
      if (booking.property.owner.toString() !== user.id) {
        return NextResponse.json(
          { message: "You can only cancel bookings for your own properties" },
          { status: 403 }
        );
      }
      cancelledBy = "LANDLORD";
    } else if (user.role === "ADMIN") {
      // Admins can cancel any booking
      cancelledBy = "ADMIN";
    } else {
      return NextResponse.json(
        { message: "Invalid user role" },
        { status: 403 }
      );
    }

    // 7. Update Booking Status
    booking.status = "CANCELLED";
    booking.cancelledBy = cancelledBy;
    booking.cancelledAt = new Date();
    await booking.save();

    // 8. Populate full details for response
    await booking.populate("student", "name email");
    await booking.populate("landlord", "name email");

    // 9. Return Success Response
    return NextResponse.json(
      {
        message: "Booking cancelled successfully",
        booking: {
          id: booking._id,
          status: booking.status,
          cancelledBy: booking.cancelledBy,
          cancelledAt: booking.cancelledAt,
          property: booking.property,
          student: booking.student,
          landlord: booking.landlord,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/bookings/[id]/cancel error:", error);

    if (error.kind === "ObjectId") {
      return NextResponse.json(
        { message: "Invalid booking ID format" },
        { status: 400 }
      );
    }

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
