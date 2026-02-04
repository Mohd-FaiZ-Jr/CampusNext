// Email Templates for Student Housing App

export const getOTPEmailTemplate = (otp, userName = "there") => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    <!-- Header with Brand Color -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                🏠 Student Housing
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px; font-weight: 500;">
                                Find Your Perfect Home
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 700;">
                                Verify Your Email Address
                            </h2>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Hi ${userName},
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Thank you for signing up! To complete your registration and start exploring amazing student housing options, please verify your email address using the code below:
                            </p>
                            
                            <!-- OTP Box -->
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #2563eb; border-radius: 12px; padding: 24px; display: inline-block;">
                                            <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                                Your Verification Code
                                            </p>
                                            <div style="font-size: 42px; font-weight: 800; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace; text-align: center;">
                                                ${otp}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    ⏱️ <strong>This code will expire in 10 minutes.</strong> If you didn't request this code, you can safely ignore this email.
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                If you have any questions or need assistance, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2563eb;">The Student Housing Team</strong>
                            </p>
                            
                            <div style="text-align: center; margin: 20px 0;">
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #2563eb; text-decoration: none; font-size: 13px;">Privacy Policy</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #2563eb; text-decoration: none; font-size: 13px;">Terms of Service</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #2563eb; text-decoration: none; font-size: 13px;">Contact Us</a>
                                </div>
                            </div>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                                © 2026 Student Housing App. All rights reserved.<br>
                                This is an automated message, please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

export const getWelcomeBackEmailTemplate = (otp, userName = "there") => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Complete Your Registration</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                🏠 Student Housing
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px; font-weight: 500;">
                                Find Your Perfect Home
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 700;">
                                Welcome Back! 👋
                            </h2>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Hi ${userName},
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                We noticed you started signing up but didn't complete the verification process. No worries! Here's a fresh verification code to get you started:
                            </p>
                            
                            <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <div style="background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #2563eb; border-radius: 12px; padding: 24px; display: inline-block;">
                                            <p style="margin: 0 0 8px 0; color: #1e40af; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                                                Your New Verification Code
                                            </p>
                                            <div style="font-size: 42px; font-weight: 800; color: #2563eb; letter-spacing: 8px; font-family: 'Courier New', monospace; text-align: center;">
                                                ${otp}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    ⏱️ <strong>This code will expire in 10 minutes.</strong>
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2563eb;">The Student Housing Team</strong>
                            </p>
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                                © 2026 Student Housing App. All rights reserved.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

export const getAdminPropertyNotificationTemplate = (propertyData, landlordData, siteUrl = "https://student-housing-app-gray.vercel.app") => {
    const {
        propertyId,
        title,
        description,
        address,
        price,
        gender,
        college,
        images = []
    } = propertyData;

    const {
        landlordName,
        landlordEmail
    } = landlordData;

    const adminPanelUrl = `https://student-housing-app-gray.vercel.app/admin/properties`;
    const propertyPreviewUrl = `https://student-housing-app-gray.vercel.app/explore/${propertyId}`;
    const firstImage = images.length > 0 ? images[0] : null;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Property Listed - Admin Notification</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <!-- Main Container -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with Brand Color -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #6366f1 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                🏠 Student Housing
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px; font-weight: 500;">
                                Admin Notification System
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Alert Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px 30px; border-bottom: 3px solid #f59e0b;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px;">
                                        <div style="background-color: #f59e0b; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            🔔
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 700;">
                                            New Property Awaiting Approval
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px; font-weight: 500;">
                                            Action required from admin team
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Hello Admin,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                A new property has been listed by a landlord and is waiting for your review and approval.
                            </p>
                            
                            <!-- Property Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0; border: 2px solid #e5e7eb; border-radius: 12px;">
                                ${firstImage ? `
                                <!-- Property Image -->
                                <tr>
                                    <td style="padding: 0;">
                                        <img src="${firstImage}" alt="${title}" style="width: 100%; max-height: 250px; object-fit: cover; display: block; border-radius: 10px 10px 0 0;">
                                    </td>
                                </tr>
                                ` : ''}
                                
                                <!-- Property Details -->
                                <tr>
                                    <td style="padding: 24px; background-color: #f9fafb;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 22px; font-weight: 700;">
                                            ${title}
                                        </h3>
                                        
                                        <!-- Price Badge -->
                                        <div style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 20px; font-weight: 700; margin-bottom: 16px;">
                                            ₹${price.toLocaleString('en-IN')}/month
                                        </div>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 16px;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; width: 100px;">
                                                    📍 Address:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                                                    ${address}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                                                    🎓 College:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                                                    ${college}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600;">
                                                    👥 Gender:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px; text-transform: capitalize;">
                                                    ${gender.toLowerCase()}
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        ${description ? `
                                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                                ${description.substring(0, 200)}${description.length > 200 ? '...' : ''}
                                            </p>
                                        </div>
                                        ` : ''}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Landlord Info -->
                            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 700;">
                                    👤 Landlord Information
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 4px 0; color: #1e40af; font-size: 14px; font-weight: 600; width: 80px;">
                                            Name:
                                        </td>
                                        <td style="padding: 4px 0; color: #1e3a8a; font-size: 14px;">
                                            ${landlordName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 4px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                                            Email:
                                        </td>
                                        <td style="padding: 4px 0; color: #1e3a8a; font-size: 14px;">
                                            <a href="mailto:${landlordEmail}" style="color: #2563eb; text-decoration: none;">
                                                ${landlordEmail}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Action Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <!-- Primary CTA: Admin Panel -->
                                        <a href="${adminPanelUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                                            🔐 Open Admin Panel
                                        </a>
                                        
                                        <!-- Secondary CTA: Preview Property -->
                                        <a href="${propertyPreviewUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #2563eb; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #2563eb;">
                                            👁️ Preview Property
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    ⚡ <strong>Quick Action Required:</strong> Please review and approve/reject this property listing at your earliest convenience. The landlord is waiting for your decision.
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                This is an automated notification sent to all administrators. Please log in to the admin panel to take action on this property listing.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2563eb;">Student Housing Notification System</strong>
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${siteUrl}/admin" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Admin Dashboard</a>
                                        <span style="color: #d1d5db; margin: 0 5px;">•</span>
                                        <a href="${siteUrl}" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Visit Website</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                                © 2026 Student Housing App. All rights reserved.<br>
                                This is an automated admin notification. Please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
export const getAdminPropertyUpdateNotificationTemplate = (propertyData, landlordData, changes, siteUrl = "https://student-housing-app-gray.vercel.app") => {
    const {
        propertyId,
        title,
        address,
        images = []
    } = propertyData;

    const {
        landlordName,
        landlordEmail
    } = landlordData;

    const adminPanelUrl = `https://student-housing-app-gray.vercel.app/admin/properties`;
    const propertyPreviewUrl = `https://student-housing-app-gray.vercel.app/explore/${propertyId}`;
    const firstImage = images.length > 0 ? images[0] : null;

    // Format changes for display
    const formatChange = (field, oldValue, newValue) => {
        if (field === 'price') {
            return `₹${oldValue.toLocaleString('en-IN')} → ₹${newValue.toLocaleString('en-IN')}`;
        }
        if (field === 'location') {
            return `Coordinates changed`;
        }
        return `${oldValue} → ${newValue}`;
    };

    const changesList = Object.entries(changes).map(([field, { old: oldValue, new: newValue }]) => {
        const fieldLabels = {
            price: '💰 Price',
            address: '📍 Address',
            location: '🗺️ Location',
            college: '🎓 College',
            images: '🖼️ Images'
        };
        return `
            <tr>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">
                    <strong style="color: #1f2937; font-size: 14px;">${fieldLabels[field] || field}</strong>
                </td>
                <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
                    ${formatChange(field, oldValue, newValue)}
                </td>
            </tr>
        `;
    }).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Updated - Admin Notification</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <tr>
                        <td style="background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #6366f1 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                                🏠 Student Housing
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px; font-weight: 500;">
                                Admin Notification System
                            </p>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px 30px; border-bottom: 3px solid #f59e0b;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px;">
                                        <div style="background-color: #f59e0b; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            🔄
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 700;">
                                            Property Updated - Requires Re-approval
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px; font-weight: 500;">
                                            Landlord made changes to critical fields
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Hello Admin,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                A landlord has updated an existing property. The property has been automatically <strong>unverified</strong> and requires your re-approval.
                            </p>
                            
                            <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 24px 0;">
                                ${firstImage ? `
                                <img src="${firstImage}" alt="${title}" style="width: 100%; max-height: 200px; object-fit: cover; display: block; border-radius: 8px; margin-bottom: 16px;">
                                ` : ''}
                                <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">
                                    ${title}
                                </h3>
                                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                                    📍 ${address}
                                </p>
                            </div>
                            
                            <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px; margin: 24px 0;">
                                <h4 style="margin: 0 0 16px 0; color: #991b1b; font-size: 16px; font-weight: 700;">
                                    📝 Changes Made
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                                    ${changesList}
                                </table>
                            </div>
                            
                            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 700;">
                                    👤 Landlord Information
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 4px 0; color: #1e40af; font-size: 14px; font-weight: 600; width: 80px;">
                                            Name:
                                        </td>
                                        <td style="padding: 4px 0; color: #1e3a8a; font-size: 14px;">
                                            ${landlordName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 4px 0; color: #1e40af; font-size: 14px; font-weight: 600;">
                                            Email:
                                        </td>
                                        <td style="padding: 4px 0; color: #1e3a8a; font-size: 14px;">
                                            <a href="mailto:${landlordEmail}" style="color: #2563eb; text-decoration: none;">
                                                ${landlordEmail}
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${adminPanelUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);">
                                            🔐 Review & Approve
                                        </a>
                                        
                                        <a href="${propertyPreviewUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #2563eb; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #2563eb;">
                                            👁️ Preview Changes
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    ⚡ <strong>Action Required:</strong> This property is currently hidden from the explore page until you review and approve the changes.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2563eb;">Student Housing Notification System</strong>
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${siteUrl}/admin" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Admin Dashboard</a>
                                        <span style="color: #d1d5db; margin: 0 5px;">•</span>
                                        <a href="${siteUrl}" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Visit Website</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                                © 2026 Student Housing App. All rights reserved.<br>
                                This is an automated admin notification. Please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
// Landlord Property Approval Email Template
export const getLandlordPropertyApprovalTemplate = (propertyData, landlordName) => {
    const {
        propertyId,
        title,
        address,
        price,
        images = []
    } = propertyData;

    const exploreUrl = `https://student-housing-app-gray.vercel.app/explore/${propertyId}`;
    const dashboardUrl = `https://student-housing-app-gray.vercel.app/landlord/dashboard`;
    const firstImage = images.length > 0 ? images[0] : null;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Approved!</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with Success Color -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <div style="font-size: 48px; margin-bottom: 10px;">🎉</div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                Congratulations!
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1fae5; font-size: 14px; font-weight: 500;">
                                Your Property Has Been Approved
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Success Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px 30px; border-bottom: 3px solid #10b981;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px;">
                                        <div style="background-color: #10b981; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            ✓
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #065f46; font-size: 20px; font-weight: 700;">
                                            Property is Now Live!
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #047857; font-size: 14px; font-weight: 500;">
                                            Students can now view and book your property
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Dear ${landlordName},
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Great news! Your property listing has been reviewed and <strong>approved</strong> by our admin team. It is now live on our platform and visible to students looking for housing.
                            </p>
                            
                            <!-- Property Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0; border: 2px solid #10b981; border-radius: 12px;">
                                ${firstImage ? `
                                <tr>
                                    <td style="padding: 0;">
                                        <img src="${firstImage}" alt="${title}" style="width: 100%; max-height: 250px; object-fit: cover; display: block; border-radius: 10px 10px 0 0;">
                                    </td>
                                </tr>
                                ` : ''}
                                
                                <tr>
                                    <td style="padding: 24px; background-color: #f9fafb;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 22px; font-weight: 700;">
                                            ${title}
                                        </h3>
                                        
                                        <div style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 20px; font-weight: 700; margin-bottom: 16px;">
                                            ₹${price.toLocaleString('en-IN')}/month
                                        </div>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 16px;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; width: 100px;">
                                                    📍 Address:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px;">
                                                    ${address}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Next Steps -->
                            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 700;">
                                    📋 What Happens Next?
                                </h4>
                                <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px; line-height: 1.8;">
                                    <li>Your property is now visible on the explore page</li>
                                    <li>Students can view details and contact you</li>
                                    <li>You'll receive notifications for booking requests</li>
                                    <li>Keep your property details updated for best results</li>
                                </ul>
                            </div>
                            
                            <!-- Action Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${exploreUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);">
                                            👁️ View on Explore Page
                                        </a>
                                        
                                        <a href="${dashboardUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #10b981; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #10b981;">
                                            📊 Go to Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Tips Box -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    💡 <strong>Pro Tip:</strong> Properties with high-quality images and detailed descriptions get 3x more inquiries. Keep your listing updated!
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                Thank you for choosing our platform. We wish you success in finding the perfect tenants!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2563eb;">Student Housing Team</strong>
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${dashboardUrl}" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Landlord Dashboard</a>
                                        <span style="color: #d1d5db; margin: 0 5px;">•</span>
                                        <a href="https://student-housing-app-gray.vercel.app" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Visit Website</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                                © 2026 Student Housing App. All rights reserved.<br>
                                This is an automated notification. Please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};

// Landlord Property Rejection Email Template
export const getLandlordPropertyRejectionTemplate = (propertyData, landlordName, reason = "No reason provided") => {
    const {
        propertyId,
        title,
        address
    } = propertyData;

    const editUrl = `https://student-housing-app-gray.vercel.app/landlord/dashboard`;
    const supportEmail = "support@studenthousing.com";

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Update Required</title>
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header with Warning Color -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <div style="font-size: 48px; margin-bottom: 10px;">📋</div>
                            <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                Property Update Required
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #fef3c7; font-size: 14px; font-weight: 500;">
                                Your listing needs some improvements
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Alert Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px 30px; border-bottom: 3px solid #f59e0b;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px;">
                                        <div style="background-color: #f59e0b; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            ⚠️
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 700;">
                                            Listing Not Approved
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px; font-weight: 500;">
                                            Please review and update your property details
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Dear ${landlordName},
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                                Thank you for submitting your property listing. After careful review, our admin team has identified some areas that need improvement before we can approve your listing.
                            </p>
                            
                            <!-- Property Info -->
                            <div style="background-color: #f9fafb; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 24px 0;">
                                <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700;">
                                    ${title}
                                </h3>
                                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                                    📍 ${address}
                                </p>
                            </div>
                            
                            <!-- Rejection Reason -->
                            <div style="background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); border-left: 4px solid #ef4444; padding: 20px; border-radius: 8px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #991b1b; font-size: 16px; font-weight: 700;">
                                    📝 Feedback from Admin
                                </h4>
                                <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.6;">
                                    ${reason}
                                </p>
                            </div>
                            
                            <!-- Common Issues -->
                            <div style="background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 20px; border-radius: 8px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 700;">
                                    💡 Common Issues to Check
                                </h4>
                                <ul style="margin: 0; padding-left: 20px; color: #1e3a8a; font-size: 14px; line-height: 1.8;">
                                    <li>Upload clear, high-quality images</li>
                                    <li>Provide accurate address and location</li>
                                    <li>Include detailed property description</li>
                                    <li>Set competitive and realistic pricing</li>
                                    <li>List all available amenities</li>
                                </ul>
                            </div>
                            
                            <!-- Action Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${editUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);">
                                            ✏️ Edit Property
                                        </a>
                                        
                                        <a href="mailto:${supportEmail}" class="button" style="display: inline-block; background-color: #ffffff; color: #f59e0b; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #f59e0b;">
                                            📧 Contact Support
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Support Info -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                                    ℹ️ <strong>Need Help?</strong> Our support team is here to assist you. Contact us at <a href="mailto:${supportEmail}" style="color: #b45309; text-decoration: underline;">${supportEmail}</a>
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                                We appreciate your patience and look forward to approving your updated listing soon!
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6;">
                                Best regards,<br>
                                <strong style="color: #2563eb;">Student Housing Team</strong>
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${editUrl}" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Landlord Dashboard</a>
                                        <span style="color: #d1d5db; margin: 0 5px;">•</span>
                                        <a href="https://student-housing-app-gray.vercel.app" style="color: #2563eb; text-decoration: none; font-size: 13px; margin: 0 10px;">Visit Website</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5;">
                                © 2026 Student Housing App. All rights reserved.<br>
                                This is an automated notification. Please do not reply to this email.
                            </p>
                        </td>
                    </tr>
                    
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
  `;
};
