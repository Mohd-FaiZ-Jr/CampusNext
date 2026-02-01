import { NextResponse } from "next/server";
import { connectDB } from "@/app/backend/db/connect";
import User from "@/app/backend/models/User.model";
import { sendData } from "@/app/lib/email";
import { getAdminPropertyNotificationTemplate } from "@/app/lib/emailTemplates";

export async function GET(req) {
    try {
        console.log('🧪 TEST EMAIL ENDPOINT CALLED');

        await connectDB();

        // Fetch all admin users
        const admins = await User.find({ role: "ADMIN" }).select('email name');
        console.log('👥 Admin users found:', admins.length, admins.map(a => a.email));

        if (admins && admins.length > 0) {
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

            // Test property data
            const propertyData = {
                propertyId: "TEST123",
                title: "Test Property - Email Verification",
                description: "This is a test property to verify email notifications are working correctly.",
                address: "123 Test Street, Test City",
                price: 15000,
                gender: "UNISEX",
                college: "Test University",
                images: []
            };

            const landlordData = {
                landlordName: "Test Landlord",
                landlordEmail: "test.landlord@example.com"
            };

            console.log(`📧 Sending test emails to ${admins.length} admin(s)...`);

            // Send email to each admin
            for (const admin of admins) {
                console.log(`📨 Sending test email to: ${admin.email}`);
                try {
                    await sendData({
                        to: admin.email,
                        subject: `🧪 TEST - New Property Listed - ${propertyData.title}`,
                        html: getAdminPropertyNotificationTemplate(propertyData, landlordData, siteUrl)
                    });
                    console.log(`✅ Test email sent successfully to: ${admin.email}`);
                } catch (error) {
                    console.error(`❌ Failed to send test email to ${admin.email}:`, error.message);
                }
            }

            return NextResponse.json({
                success: true,
                message: `Test emails sent to ${admins.length} admin(s)`,
                admins: admins.map(a => a.email)
            });
        } else {
            console.log('⚠️ No admin users found');
            return NextResponse.json({
                success: false,
                message: "No admin users found in database"
            }, { status: 404 });
        }
    } catch (error) {
        console.error("❌ Test email error:", error);
        return NextResponse.json({
            success: false,
            message: error.message
        }, { status: 500 });
    }
}
