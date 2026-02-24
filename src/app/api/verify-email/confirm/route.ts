import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const userId = searchParams.get('userId');

        if (!token || !userId) {
            return NextResponse.json({ error: 'Invalid verification link' }, { status: 400 });
        }

        // Find user and check token
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user || user.verify_token !== token) {
            return NextResponse.json({ error: 'Invalid or expired verification token' }, { status: 400 });
        }

        // Update user to verified and clear token
        await prisma.user.update({
            where: { id: userId },
            data: {
                email_verified: true,
                verify_token: null,
            }
        });

        // Redirect to profile page with success parameter
        const redirectUrl = new URL('/profile?verified=success', req.url);
        return NextResponse.redirect(redirectUrl);

    } catch (error) {
        console.error('Error confirming email:', error);
        return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 });
    }
}
