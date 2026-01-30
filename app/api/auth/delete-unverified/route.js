import { connectDB } from "@/app/backend/db/connect";
import User from "@/app/backend/models/User.model";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find and delete only unverified users
        const result = await User.deleteOne({
            email,
            isVerified: false
        });

        if (result.deletedCount === 0) {
            return NextResponse.json(
                { message: "No unverified user found with this email" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Unverified account deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete unverified user error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
