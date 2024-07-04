import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const userAgent = request.headers.get('user-agent') || '';
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

        if (isMobile) {
            return NextResponse.redirect(new URL(`com.firmcollective.onevoiceecho://login?verified=true`));
        } else {
            return NextResponse.redirect(new URL('/verification-success', request.url));
        }

    } catch (error) {
        console.error("Verification error")
    }
}
