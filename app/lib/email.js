import nodemailer from "nodemailer";

console.log("SMTP Config:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER ? "Set" : "Not Set",
    pass: process.env.SMTP_PASS ? "Set" : "Not Set"
});

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    // Add timeouts to prevent hangs
    connectionTimeout: 10000,
    socketTimeout: 10000,
    tls: {
        rejectUnauthorized: false
    }
});

export const sendData = async (data, req) => {
    const mailOptions = {
        from: process.env.SMTP_FROM_EMAIL || "no-reply@studenthousing.com",
        to: data.to,
        subject: data.subject,
        html: data.html,
    };

    try {
        console.log(`Attempting to send email via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} with user ${process.env.SMTP_USER}...`);
        const info = await transporter.sendMail(mailOptions);
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Critical Email Error Details:", {
            code: error.code,
            response: error.response,
            command: error.command,
            message: error.message
        });

        // Explicitly check for Brevo specific errors
        if (error.response && error.response.includes("535")) {
            throw new Error(`Authentication Failed: Check API Key or Verified Sender status on Brevo.`);
        }

        throw new Error(`Email failed: ${error.message}`);
    }
};
