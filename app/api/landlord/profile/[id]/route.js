import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import User from "@/app/backend/models/User.model";

// GET /api/landlord/profile/[id] - Get public landlord profile
export async function GET(req, { params }) {
  try {
    // Connect to database
    await connectDB();

    const { id } = params;

    // Find landlord by ID
    const landlord = await User.findById(id).select(
      "name email role landlordProfile createdAt",
    );

    if (!landlord) {
      return NextResponse.json(
        { message: "Landlord not found" },
        { status: 404 },
      );
    }

    // Check if user is actually a landlord
    if (landlord.role !== "LANDLORD") {
      return NextResponse.json(
        { message: "User is not a landlord" },
        { status: 400 },
      );
    }

    // Return public profile data
    const publicProfile = {
      id: landlord._id,
      name: landlord.name,
      email: landlord.email,
      companyName: landlord.landlordProfile?.companyName || null,
      bio: landlord.landlordProfile?.bio || null,
      yearsOfExperience: landlord.landlordProfile?.yearsOfExperience || null,
      profileImage: landlord.landlordProfile?.profileImage || null,
      isVerified: landlord.landlordProfile?.isVerified || false,
      memberSince: landlord.createdAt,
    };

    return NextResponse.json(
      {
        message: "Public profile retrieved successfully",
        profile: publicProfile,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/landlord/profile/[id] error:", error);

    // Handle invalid ObjectId
    if (error.name === "CastError") {
      return NextResponse.json(
        { message: "Invalid landlord ID" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
