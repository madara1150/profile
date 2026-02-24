import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { userId, email } = await req.json();

        if (!userId || !email) {
            return NextResponse.json({ error: 'Missing userId or email' }, { status: 400 });
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString('hex');

        // Update the user with the token
        await prisma.user.update({
            where: { id: userId },
            data: { verify_token: token },
        });

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        const testAccount = await nodemailer.createTestAccount();

        // Create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        const confirmUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/verify-email/confirm?token=${token}&userId=${userId}`;

        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: '"Admin Ghost" <admin@akatsuki.co>', // sender address
            to: email, // list of receivers
            subject: "Verify your email - Akatsuki Cloud", // Subject line
            text: `Please verify your email by clicking the following link: ${confirmUrl}`, // plain text body
            html: `
                <div style="font-family: sans-serif; background-color: #f3f4f6; padding: 20px;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h1 style="color: #991b1b; text-align: center;">Verify Your Email</h1>
                        <p style="color: #4b5563; font-size: 16px;">Hello,</p>
                        <p style="color: #4b5563; font-size: 16px;">Thanks for joining us! Please confirm your email address by clicking the button below.</p>
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${confirmUrl}" style="background-color: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px;">Verify Email Address</a>
                        </div>
                        <p style="color: #6b7280; font-size: 14px; text-align: center;">If you didn't request this email, you can safely ignore it.</p>
                    </div>
                </div>
            `, // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        return NextResponse.json({
            success: true,
            message: 'Verification email sent successfully.',
            previewUrl: nodemailer.getTestMessageUrl(info) // Send preview URL to frontend for demo purposes
        });

    } catch (error) {
        console.error('Error sending verification email:', error);
        return NextResponse.json({ error: 'Failed to send verification email.' }, { status: 500 });
    }
}
