import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import Booking from "@/app/backend/models/Booking.model";
import "@/app/backend/models/Property.model";
import "@/app/backend/models/User.model";
import { isAuthenticated } from "@/app/lib/auth";

/**
 * GET /api/bookings/me
 * Get current user's bookings
 * - Students see their booking requests
 * - Landlords see bookings for their properties
 */
export async function GET(req) {
  try {
    // 1. Authentication Check
    const user = await isAuthenticated(req);

    // 2. Connect to Database
    await connectDB();

    let bookings;

    // 3. Fetch bookings based on user role
    if (user.role === "STUDENT") {
      // Students see their own booking requests
      bookings = await Booking.find({ student: user.id })
        .populate("property", "title price location college verified")
        .populate("landlord", "name email")
        .sort({ createdAt: -1 });
    } else if (user.role === "LANDLORD") {
      // Landlords see bookings for their properties
      bookings = await Booking.find({ landlord: user.id })
        .populate("property", "title price location college verified")
        .populate("student", "name email")
        .sort({ createdAt: -1 });
    } else if (user.role === "ADMIN") {
      // Admins see all bookings
      bookings = await Booking.find({})
        .populate("property", "title price location college verified")
        .populate("student", "name email")
        .populate("landlord", "name email")
        .sort({ createdAt: -1 });
    } else {
      return NextResponse.json(
        { message: "Invalid user role" },
        { status: 403 }
      );
    }

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("GET /api/bookings/me error:", error);

    if (error.message.includes("Unauthorized")) {
      return NextResponse.json({ message: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
