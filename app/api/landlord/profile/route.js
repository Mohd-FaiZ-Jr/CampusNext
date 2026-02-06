import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import User from "@/app/backend/models/User.model";
import { isLandlord } from "@/app/lib/auth";

// GET /api/landlord/profile - Get authenticated landlord's profile
export async function GET(req) {
  try {
    // Authentication Check (Landlord only)
    const user = await isLandlord(req);

    // Connect to database
    await connectDB();

    // Find user with full profile data
    const landlord = await User.findById(user.id).select(
      "-password -otp -otpExpiry",
    );

    if (!landlord) {
      return NextResponse.json(
        { message: "Landlord not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: "Profile retrieved successfully",
        profile: landlord,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("GET /api/landlord/profile error:", error);
    if (
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
    ) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

// PATCH /api/landlord/profile - Update landlord profile
export async function PATCH(req) {
  try {
    // Authentication Check (Landlord only)
    const user = await isLandlord(req);

    // Connect to database
    await connectDB();

    const body = await req.json();
    const {
      companyName,
      phoneNumber,
      bio,
      yearsOfExperience,
      businessAddress,
      profileImage,
    } = body;

    // Find landlord
    const landlord = await User.findById(user.id);

    if (!landlord) {
      return NextResponse.json(
        { message: "Landlord not found" },
        { status: 404 },
      );
    }

    // Initialize landlordProfile if it doesn't exist
    if (!landlord.landlordProfile) {
      landlord.landlordProfile = {};
    }

    // Update only allowed fields
    if (companyName !== undefined) {
      landlord.landlordProfile.companyName = companyName;
    }
    if (phoneNumber !== undefined) {
      landlord.landlordProfile.phoneNumber = phoneNumber;
    }
    if (bio !== undefined) {
      landlord.landlordProfile.bio = bio;
    }
    if (yearsOfExperience !== undefined) {
      landlord.landlordProfile.yearsOfExperience = yearsOfExperience;
    }
    if (businessAddress !== undefined) {
      landlord.landlordProfile.businessAddress = businessAddress;
    }
    if (profileImage !== undefined) {
      landlord.landlordProfile.profileImage = profileImage;
    }

    // Save with validation
    await landlord.save();

    // Return updated profile (exclude sensitive data)
    const updatedLandlord = await User.findById(user.id).select(
      "-password -otp -otpExpiry",
    );

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        profile: updatedLandlord,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("PATCH /api/landlord/profile error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return NextResponse.json(
        { message: "Validation failed", errors },
        { status: 400 },
      );
    }

    if (
      error.message.includes("Unauthorized") ||
      error.message.includes("Forbidden")
    ) {
      return NextResponse.json({ message: error.message }, { status: 403 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
