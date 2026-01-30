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
