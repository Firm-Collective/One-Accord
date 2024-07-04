import { NextResponse } from 'next/server';
import { UAParser } from 'ua-parser-js';

export async function GET(request: Request) {
    try {
        const userAgent = request.headers.get('user-agent') || '';
        const parser = new UAParser(userAgent);
        const deviceType = parser.getDevice().type;

        if (deviceType === 'mobile') {
            // Redirect to mobile app
            return NextResponse.redirect('com.firmcollective.onevoiceecho://');
        } else {
            // Redirect to web page
            return NextResponse.redirect('https://one-accord.vercel.app/');
        }
    } catch (error) {
        console.error('Error in device detection:', error);
        // Fallback to web redirect in case of any errors
        return NextResponse.redirect('https://one-accord.vercel.app/');
    }
}
