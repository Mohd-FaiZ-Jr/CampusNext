import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import Booking from "@/app/backend/models/Booking.model";
import Property from "@/app/backend/models/Property.model";
import "@/app/backend/models/User.model";
import { isAuthenticated, isAdmin } from "@/app/lib/auth";

/**
 * POST /api/bookings
 * Create a new booking request (Student only)
 */
export async function POST(req) {
  try {
    // 1. Authentication Check
    const user = await isAuthenticated(req);

    // 2. Only students can create bookings
    if (user.role !== "STUDENT") {
      return NextResponse.json(
        { message: "Only students can create booking requests" },
        { status: 403 }
      );
    }

    // 3. Parse Request Body
    const { propertyId } = await req.json();

    // 4. Validate Input
    if (!propertyId) {
      return NextResponse.json(
        { message: "Property ID is required" },
        { status: 400 }
      );
    }

    // 5. Connect to Database
    await connectDB();

    // 6. Check if property exists and is verified
    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { message: "Property not found" },
        { status: 404 }
      );
    }

    if (!property.verified) {
      return NextResponse.json(
        {
          message:
            "Property is not verified. Only verified properties can be booked.",
        },
        { status: 400 }
      );
    }

    // 7. Check for existing pending booking
    const existingBooking = await Booking.findOne({
      student: user.id,
      property: propertyId,
      status: "PENDING",
    });

    if (existingBooking) {
      return NextResponse.json(
        { message: "You already have a pending booking for this property" },
        { status: 409 }
      );
    }

    // 8. Create Booking
    const newBooking = await Booking.create({
      property: propertyId,
      student: user.id,
      landlord: property.owner,
      status: "PENDING",
    });

    // 9. Return Response
    return NextResponse.json(
      {
        bookingId: newBooking._id,
        status: newBooking.status,
        message: "Booking request created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/bookings error:", error);

    // Handle duplicate key error (shouldn't happen due to check, but just in case)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "You already have a pending booking for this property" },
        { status: 409 }
      );
    }

    if (error.kind === "ObjectId") {
      return NextResponse.json(
        { message: "Invalid property ID format" },
        { status: 400 }
      );
    }

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    if (error.name === "ValidationError") {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/bookings
 * Get all bookings (Admin only)
 */
export async function GET(req) {
  try {
    // 1. Admin Authorization Check
    await isAdmin(req);

    // 2. Connect to Database
    await connectDB();

    // 3. Get Query Parameters for Filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const studentId = searchParams.get("studentId");
    const landlordId = searchParams.get("landlordId");
    const propertyId = searchParams.get("propertyId");

    // 4. Build Query
    const query = {};
    if (status) query.status = status;
    if (studentId) query.student = studentId;
    if (landlordId) query.landlord = landlordId;
    if (propertyId) query.property = propertyId;

    // 5. Fetch Bookings
    const bookings = await Booking.find(query)
      .populate("property", "title price location college")
      .populate("student", "name email")
      .populate("landlord", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("GET /api/bookings error:", error);

    if (
      error.message.includes("Forbidden") ||
      error.message.includes("Unauthorized")
    ) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
