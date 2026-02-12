// Email Templates for CampusNest - Redesigned with Theme Consistency
// Using Montserrat for headers, Poppins for body text, gray-900 theme

export const getOTPEmailTemplate = (otp, userName = "there") => {
    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>Verify Your Email - CampusNest</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 24px 20px !important; }
            .header { padding: 32px 20px !important; }
            .otp-box { padding: 20px !important; }
            .otp-code { font-size: 36px !important; letter-spacing: 6px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Montserrat', sans-serif;">
                                🏠 CampusNest
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1d5db; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                Find Your Perfect Student Home
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 26px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                Verify Your Email Address ✉️
                            </h2>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Hi <strong style="color: #111827;">${userName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Thank you for signing up! To complete your registration and start exploring amazing student housing options, please verify your email address using the code below:
                            </p>
                            
                            <!-- OTP Box -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <div class="otp-box" style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 3px solid #111827; border-radius: 16px; padding: 28px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                                            <p style="margin: 0 0 12px 0; color: #374151; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Poppins', sans-serif;">
                                                Your Verification Code
                                            </p>
                                            <div class="otp-code" style="font-size: 44px; font-weight: 800; color: #111827; letter-spacing: 10px; font-family: 'Montserrat', monospace; text-align: center;">
                                                ${otp}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Info Box -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    ⏱️ <strong>This code will expire in 10 minutes.</strong> If you didn't request this code, you can safely ignore this email.
                                </p>
                            </div>
                            
                            <!-- Security Note -->
                            <div style="background-color: #f3f4f6; border-left: 4px solid #111827; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    🔒 <strong>Security Tip:</strong> Never share your verification code with anyone. CampusNest staff will never ask for this code.
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                If you have any questions or need assistance, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Best regards,<br>
                                <strong style="color: #111827; font-family: 'Montserrat', sans-serif;">The CampusNest Team</strong>
                            </p>
                            
                            <div style="text-align: center; margin: 20px 0;">
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Privacy Policy</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Terms of Service</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Contact Us</a>
                                </div>
                            </div>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                                © 2026 CampusNest. All rights reserved.<br>
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
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>Welcome Back - CampusNest</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 24px 20px !important; }
            .header { padding: 32px 20px !important; }
            .otp-box { padding: 20px !important; }
            .otp-code { font-size: 36px !important; letter-spacing: 6px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Montserrat', sans-serif;">
                                🏠 CampusNest
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1d5db; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                Find Your Perfect Student Home
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 26px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                Welcome Back! 👋
                            </h2>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Hi <strong style="color: #111827;">${userName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                We noticed you started signing up but didn't complete the verification process. No worries! Here's a fresh verification code to get you started:
                            </p>
                            
                            <!-- OTP Box -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <div class="otp-box" style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 3px solid #111827; border-radius: 16px; padding: 28px; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                                            <p style="margin: 0 0 12px 0; color: #374151; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; font-family: 'Poppins', sans-serif;">
                                                Your New Verification Code
                                            </p>
                                            <div class="otp-code" style="font-size: 44px; font-weight: 800; color: #111827; letter-spacing: 10px; font-family: 'Montserrat', monospace; text-align: center;">
                                                ${otp}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Expiry Warning -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    ⏱️ <strong>This code will expire in 10 minutes.</strong> If you didn't request this code, you can safely ignore this email.
                                </p>
                            </div>
                            
                            <!-- Security Note -->
                            <div style="background-color: #f3f4f6; border-left: 4px solid #111827; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    🔒 <strong>Security Tip:</strong> Never share your verification code with anyone. CampusNest staff will never ask for this code.
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                If you have any questions or need assistance, feel free to reach out to our support team.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Best regards,<br>
                                <strong style="color: #111827; font-family: 'Montserrat', sans-serif;">The CampusNest Team</strong>
                            </p>
                            
                            <div style="text-align: center; margin: 20px 0;">
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Privacy Policy</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Terms of Service</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Contact Us</a>
                                </div>
                            </div>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                                © 2026 CampusNest. All rights reserved.<br>
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

    const adminPanelUrl = `${siteUrl}/admin/properties`;
    const propertyPreviewUrl = `${siteUrl}/explore/${propertyId}`;
    const firstImage = images.length > 0 ? images[0] : null;
    const formattedPrice = typeof price === 'number' ? price.toLocaleString('en-IN') : price;

    return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>New Property Listed - Admin Notification</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:AllowPNG/>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        * { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 24px 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; }
            .header { padding: 32px 20px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Montserrat', sans-serif;">
                                🏠 CampusNest
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1d5db; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
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
                                        <h2 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            New Property Awaiting Approval
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
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
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Hello Admin,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                A new property has been listed by a landlord and is waiting for your review and approval.
                            </p>
                            
                            <!-- Property Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                                ${firstImage ? `
                                <tr>
                                    <td style="padding: 0;">
                                        <img src="${firstImage}" alt="${title}" style="width: 100%; max-height: 250px; object-fit: cover; display: block;">
                                    </td>
                                </tr>
                                ` : ''}
                                
                                <tr>
                                    <td style="padding: 24px; background-color: #f9fafb;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 22px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            ${title}
                                        </h3>
                                        
                                        <div style="display: inline-block; background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: 'Montserrat', sans-serif;">
                                            ₹${formattedPrice}/month
                                        </div>
                                        
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 16px;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; width: 100px; font-family: 'Poppins', sans-serif;">
                                                    📍 Address:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                                    ${address}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; font-family: 'Poppins', sans-serif;">
                                                    🎓 College:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                                    ${college}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; font-family: 'Poppins', sans-serif;">
                                                    👥 Gender:
                                                </td>
                                                <td style="padding: 8px 0; color: #111827; font-size: 14px; text-transform: capitalize; font-family: 'Poppins', sans-serif;">
                                                    ${gender ? gender.toLowerCase() : 'Any'}
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        ${description ? `
                                        <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                                            <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                                ${description.substring(0, 200)}${description.length > 200 ? '...' : ''}
                                            </p>
                                        </div>
                                        ` : ''}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Landlord Info -->
                            <div style="background-color: #f3f4f6; border-left: 4px solid #111827; padding: 20px; border-radius: 10px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #111827; font-size: 16px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                    👤 Landlord Information
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 4px 0; color: #374151; font-size: 14px; font-weight: 600; width: 80px; font-family: 'Poppins', sans-serif;">
                                            Name:
                                        </td>
                                        <td style="padding: 4px 0; color: #111827; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                            ${landlordName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 4px 0; color: #374151; font-size: 14px; font-weight: 600; font-family: 'Poppins', sans-serif;">
                                            Email:
                                        </td>
                                        <td style="padding: 4px 0; color: #111827; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                            <a href="mailto:${landlordEmail}" style="color: #111827; text-decoration: underline;">
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
                                        <a href="${adminPanelUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: 'Montserrat', sans-serif;">
                                            🔐 Open Admin Panel
                                        </a>
                                        
                                        <a href="${propertyPreviewUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #111827; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #111827; font-family: 'Montserrat', sans-serif;">
                                            👁️ Preview Property
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    ⚡ <strong>Quick Action Required:</strong> Please review and approve/reject this property listing at your earliest convenience. The landlord is waiting for your decision.
                                </p>
                            </div>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                This is an automated notification sent to all administrators. Please log in to the admin panel to take action on this property listing.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Best regards,<br>
                                <strong style="color: #111827; font-family: 'Montserrat', sans-serif;">CampusNest Notification System</strong>
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${siteUrl}/admin" style="color: #111827; text-decoration: none; font-size: 13px; margin: 0 10px; font-family: 'Poppins', sans-serif;">Admin Dashboard</a>
                                        <span style="color: #d1d5db; margin: 0 5px;">•</span>
                                        <a href="${siteUrl}" style="color: #111827; text-decoration: none; font-size: 13px; margin: 0 10px; font-family: 'Poppins', sans-serif;">Visit Website</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                                © 2026 CampusNest. All rights reserved.<br>
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

    const adminPanelUrl = `${siteUrl}/admin/properties`;
    const propertyPreviewUrl = `${siteUrl}/explore/${propertyId}`;
    const firstImage = images.length > 0 ? images[0] : null;

    // Build changes rows
    const changeRows = Object.entries(changes).map(([field, { old: oldVal, new: newVal }]) => {
        const fieldLabels = {
            price: '💰 Price',
            address: '📍 Address',
            college: '🎓 College',
            location: '📌 Location',
            images: '🖼️ Images'
        };
        const label = fieldLabels[field] || field;
        return `
            <tr>
                <td style="padding: 12px 16px; color: #111827; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb; font-family: 'Poppins', sans-serif; white-space: nowrap;">
                    ${label}
                </td>
                <td style="padding: 12px 16px; color: #ef4444; font-size: 14px; border-bottom: 1px solid #e5e7eb; font-family: 'Poppins', sans-serif; text-decoration: line-through;">
                    ${oldVal}
                </td>
                <td style="padding: 12px 16px; color: #10b981; font-size: 14px; font-weight: 600; border-bottom: 1px solid #e5e7eb; font-family: 'Poppins', sans-serif;">
                    ${newVal}
                </td>
            </tr>`;
    }).join('');

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Updated - Admin Notification</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 24px 20px !important; }
            .header { padding: 32px 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; text-align: center !important; }
            .changes-table { font-size: 13px !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Montserrat', sans-serif;">
                                🏠 CampusNest
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1d5db; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                Admin Notification System
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Alert Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px 30px; border-bottom: 3px solid #f59e0b;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px; width: 40px;">
                                        <div style="background-color: #f59e0b; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            🔄
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            Property Updated — Re-Approval Required
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                            A landlord has modified critical property details
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Hello Admin,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                The property <strong style="color: #111827;">"${title}"</strong> has been updated with changes to critical fields. The listing has been <strong style="color: #ef4444;">automatically unverified</strong> and requires your re-approval.
                            </p>
                            
                            ${firstImage ? `
                            <!-- Property Image -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0;">
                                <tr>
                                    <td style="padding: 0;">
                                        <img src="${firstImage}" alt="${title}" style="width: 100%; max-height: 200px; object-fit: cover; display: block; border-radius: 12px;">
                                    </td>
                                </tr>
                            </table>
                            ` : ''}
                            
                            <!-- Changes Table -->
                            <div style="margin: 32px 0;">
                                <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 18px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                    📋 Changes Made
                                </h3>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="changes-table" style="border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                                    <tr>
                                        <td style="padding: 12px 16px; background-color: #111827; color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-family: 'Montserrat', sans-serif;">
                                            Field
                                        </td>
                                        <td style="padding: 12px 16px; background-color: #111827; color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-family: 'Montserrat', sans-serif;">
                                            Previous
                                        </td>
                                        <td style="padding: 12px 16px; background-color: #111827; color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; font-family: 'Montserrat', sans-serif;">
                                            Updated
                                        </td>
                                    </tr>
                                    ${changeRows}
                                </table>
                            </div>
                            
                            <!-- Landlord Info -->
                            <div style="background-color: #f3f4f6; border-left: 4px solid #111827; padding: 20px; border-radius: 10px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #111827; font-size: 16px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                    👤 Landlord Information
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 4px 0; color: #374151; font-size: 14px; font-weight: 600; width: 80px; font-family: 'Poppins', sans-serif;">
                                            Name:
                                        </td>
                                        <td style="padding: 4px 0; color: #111827; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                            ${landlordName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 4px 0; color: #374151; font-size: 14px; font-weight: 600; font-family: 'Poppins', sans-serif;">
                                            Email:
                                        </td>
                                        <td style="padding: 4px 0; color: #111827; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                            <a href="mailto:${landlordEmail}" style="color: #111827; text-decoration: underline;">
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
                                        <a href="${adminPanelUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: 'Montserrat', sans-serif;">
                                            🔐 Review in Admin Panel
                                        </a>
                                        
                                        <a href="${propertyPreviewUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #111827; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #111827; font-family: 'Montserrat', sans-serif;">
                                            👁️ Preview Property
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Warning Note -->
                            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #991b1b; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    ⚠️ <strong>Important:</strong> This property has been automatically unverified and will not appear in search results until re-approved by an admin.
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Best regards,<br>
                                <strong style="color: #111827; font-family: 'Montserrat', sans-serif;">CampusNest Notification System</strong>
                            </p>
                            
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding: 20px 0;">
                                        <a href="${siteUrl}/admin" style="color: #111827; text-decoration: none; font-size: 13px; margin: 0 10px; font-family: 'Poppins', sans-serif;">Admin Dashboard</a>
                                        <span style="color: #d1d5db; margin: 0 5px;">•</span>
                                        <a href="${siteUrl}" style="color: #111827; text-decoration: none; font-size: 13px; margin: 0 10px; font-family: 'Poppins', sans-serif;">Visit Website</a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                                © 2026 CampusNest. All rights reserved.<br>
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

export const getLandlordPropertyApprovalTemplate = (propertyData, landlordName, siteUrl = "https://student-housing-app-gray.vercel.app") => {
    const {
        propertyId,
        title,
        address,
        price,
        images = []
    } = propertyData;

    const propertyUrl = `${siteUrl}/explore/${propertyId}`;
    const dashboardUrl = `${siteUrl}/dashboard`;
    const firstImage = images.length > 0 ? images[0] : null;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Approved - CampusNest</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 24px 20px !important; }
            .header { padding: 32px 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; text-align: center !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Montserrat', sans-serif;">
                                🏠 CampusNest
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1d5db; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                Find Your Perfect Student Home
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Success Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%); padding: 20px 30px; border-bottom: 3px solid #10b981;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px; width: 40px;">
                                        <div style="background-color: #10b981; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            ✅
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #065f46; font-size: 20px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            Property Approved!
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #047857; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                            Your listing is now live and visible to students
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Hi <strong style="color: #111827;">${landlordName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Great news! 🎉 Your property listing has been reviewed and <strong style="color: #10b981;">approved</strong> by our admin team. It is now live on CampusNest and visible to students looking for accommodation.
                            </p>
                            
                            <!-- Property Card -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                                ${firstImage ? `
                                <tr>
                                    <td style="padding: 0;">
                                        <img src="${firstImage}" alt="${title}" style="width: 100%; max-height: 250px; object-fit: cover; display: block;">
                                    </td>
                                </tr>
                                ` : ''}
                                
                                <tr>
                                    <td style="padding: 24px; background-color: #f9fafb;">
                                        <h3 style="margin: 0 0 16px 0; color: #111827; font-size: 22px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            ${title}
                                        </h3>
                                        
                                        ${price ? `
                                        <div style="display: inline-block; background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; padding: 8px 16px; border-radius: 8px; font-size: 20px; font-weight: 700; margin-bottom: 16px; font-family: 'Montserrat', sans-serif;">
                                            ₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price}/month
                                        </div>
                                        ` : ''}
                                        
                                        ${address ? `
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 16px;">
                                            <tr>
                                                <td style="padding: 8px 0; color: #6b7280; font-size: 14px; font-weight: 600; font-family: 'Poppins', sans-serif;">
                                                    📍 ${address}
                                                </td>
                                            </tr>
                                        </table>
                                        ` : ''}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Next Steps -->
                            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; border-radius: 10px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #065f46; font-size: 16px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                    🚀 What Happens Next?
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 6px 0; color: #047857; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            ✓ Your listing is now visible in search results
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #047857; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            ✓ Students can view details and contact you
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #047857; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            ✓ You can manage your listing from your dashboard
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Action Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${propertyUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3); font-family: 'Montserrat', sans-serif;">
                                            🔗 View My Listing
                                        </a>
                                        
                                        <a href="${dashboardUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #111827; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #111827; font-family: 'Montserrat', sans-serif;">
                                            📊 Go to Dashboard
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <p style="margin: 24px 0 0 0; color: #6b7280; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                If you need to make any changes, you can edit your property from your dashboard. Note that changes to critical fields (price, address, location) will require re-approval.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Best regards,<br>
                                <strong style="color: #111827; font-family: 'Montserrat', sans-serif;">The CampusNest Team</strong>
                            </p>
                            
                            <div style="text-align: center; margin: 20px 0;">
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Privacy Policy</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Terms of Service</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Contact Us</a>
                                </div>
                            </div>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                                © 2026 CampusNest. All rights reserved.<br>
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

export const getLandlordPropertyRejectionTemplate = (propertyData, landlordName, rejectionReason, siteUrl = "https://student-housing-app-gray.vercel.app") => {
    const {
        propertyId,
        title,
        address
    } = propertyData;

    const editPropertyUrl = `${siteUrl}/dashboard`;
    const supportUrl = `${siteUrl}/support`;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Property Listing Update Required - CampusNest</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <style>
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content { padding: 24px 20px !important; }
            .header { padding: 32px 20px !important; }
            .button { display: block !important; width: 100% !important; margin: 8px 0 !important; text-align: center !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8fafc;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="container" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05), 0 10px 15px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td class="header" style="background: linear-gradient(135deg, #111827 0%, #1f2937 100%); padding: 40px 30px; text-align: center; border-radius: 16px 16px 0 0;">
                            <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; font-family: 'Montserrat', sans-serif;">
                                🏠 CampusNest
                            </h1>
                            <p style="margin: 10px 0 0 0; color: #d1d5db; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                Find Your Perfect Student Home
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Warning Banner -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 20px 30px; border-bottom: 3px solid #f59e0b;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="vertical-align: middle; padding-right: 15px; width: 40px;">
                                        <div style="background-color: #f59e0b; width: 40px; height: 40px; border-radius: 50%; text-align: center; line-height: 40px; font-size: 20px;">
                                            📋
                                        </div>
                                    </td>
                                    <td style="vertical-align: middle;">
                                        <h2 style="margin: 0; color: #92400e; font-size: 20px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            Listing Update Required
                                        </h2>
                                        <p style="margin: 4px 0 0 0; color: #b45309; font-size: 14px; font-weight: 500; font-family: 'Poppins', sans-serif;">
                                            Your property needs some changes before approval
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td class="content" style="padding: 40px 30px;">
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Hi <strong style="color: #111827;">${landlordName}</strong>,
                            </p>
                            
                            <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Thank you for listing your property on CampusNest. After careful review, our admin team has determined that your listing requires some updates before it can be approved.
                            </p>
                            
                            <!-- Property Info -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 24px 0; border: 2px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td style="padding: 20px; background-color: #f9fafb;">
                                        <h3 style="margin: 0 0 8px 0; color: #111827; font-size: 20px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                            ${title}
                                        </h3>
                                        ${address ? `
                                        <p style="margin: 0; color: #6b7280; font-size: 14px; font-family: 'Poppins', sans-serif;">
                                            📍 ${address}
                                        </p>
                                        ` : ''}
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Rejection Reason -->
                            <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; border-radius: 10px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #991b1b; font-size: 16px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                    ❌ Reason for Rejection
                                </h4>
                                <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    ${rejectionReason || 'No specific reason provided. Please contact support for more details.'}
                                </p>
                            </div>
                            
                            <!-- Tips Section -->
                            <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 10px; margin: 24px 0;">
                                <h4 style="margin: 0 0 12px 0; color: #1e40af; font-size: 16px; font-weight: 700; font-family: 'Montserrat', sans-serif;">
                                    💡 Tips for a Successful Listing
                                </h4>
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                    <tr>
                                        <td style="padding: 6px 0; color: #1e3a5f; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            📸 Add clear, high-quality photos of all rooms and facilities
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #1e3a5f; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            📝 Provide an accurate and detailed description
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #1e3a5f; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            💰 Set a fair and competitive price
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #1e3a5f; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            📍 Ensure the address and location pin are accurate
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 0; color: #1e3a5f; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                            ✅ List all available amenities correctly
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Action Buttons -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 32px 0;">
                                <tr>
                                    <td align="center">
                                        <a href="${editPropertyUrl}" class="button" style="display: inline-block; background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: 'Montserrat', sans-serif;">
                                            ✏️ Edit My Property
                                        </a>
                                        
                                        <a href="${supportUrl}" class="button" style="display: inline-block; background-color: #ffffff; color: #111827; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 16px; margin: 8px; border: 2px solid #111827; font-family: 'Montserrat', sans-serif;">
                                            💬 Contact Support
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Encouragement -->
                            <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 18px; border-radius: 10px; margin: 24px 0;">
                                <p style="margin: 0; color: #065f46; font-size: 14px; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                    🌟 <strong>Don't worry!</strong> You can update your listing and resubmit it for approval. Most properties are approved after a quick revision. We're here to help you get your property listed successfully!
                                </p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px; border-top: 1px solid #e5e7eb; border-radius: 0 0 16px 16px;">
                            <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px; text-align: center; line-height: 1.6; font-family: 'Poppins', sans-serif;">
                                Best regards,<br>
                                <strong style="color: #111827; font-family: 'Montserrat', sans-serif;">The CampusNest Team</strong>
                            </p>
                            
                            <div style="text-align: center; margin: 20px 0;">
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Privacy Policy</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Terms of Service</a>
                                </div>
                                <span style="color: #d1d5db;">•</span>
                                <div style="display: inline-block; margin: 0 10px;">
                                    <a href="#" style="color: #111827; text-decoration: none; font-size: 13px; font-family: 'Poppins', sans-serif;">Contact Us</a>
                                </div>
                            </div>
                            
                            <p style="margin: 16px 0 0 0; color: #9ca3af; font-size: 12px; text-align: center; line-height: 1.5; font-family: 'Poppins', sans-serif;">
                                © 2026 CampusNest. All rights reserved.<br>
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
