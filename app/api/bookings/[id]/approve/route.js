import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import Booking from "@/app/backend/models/Booking.model";
import Property from "@/app/backend/models/Property.model";
import "@/app/backend/models/User.model";
import { isAuthenticated } from "@/app/lib/auth";

/**
 * PATCH /api/bookings/:id/approve
 * Landlord approves a booking request
 */
export async function PATCH(req, { params }) {
  try {
    // 1. Authentication Check
    const user = await isAuthenticated(req);

    // 2. Only landlords can approve bookings
    if (user.role !== "LANDLORD") {
      return NextResponse.json(
        { message: "Only landlords can approve bookings" },
        { status: 403 }
      );
    }

    // 3. Connect to Database
    await connectDB();

    // 4. Get Booking ID from params
    const { id } = params;

    // 5. Find Booking
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

    // 6. Verify landlord owns the property
    if (booking.property.owner.toString() !== user.id) {
      return NextResponse.json(
        { message: "You can only approve bookings for your own properties" },
        { status: 403 }
      );
    }

    // 7. Check if booking is in PENDING status
    if (booking.status !== "PENDING") {
      return NextResponse.json(
        { message: `Cannot approve booking with status: ${booking.status}` },
        { status: 400 }
      );
    }

    // 8. Update Booking Status
    booking.status = "APPROVED";
    await booking.save();

    // 9. Populate full details for response
    await booking.populate("student", "name email");

    // 10. Return Success Response
    return NextResponse.json(
      {
        message: "Booking approved successfully",
        booking: {
          id: booking._id,
          status: booking.status,
          property: booking.property,
          student: booking.student,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/bookings/[id]/approve error:", error);

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
