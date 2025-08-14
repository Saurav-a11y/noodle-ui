// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED = ['/settings'];

export function middleware(req: NextRequest) {
    const isProtected = PROTECTED.some(p => req.nextUrl.pathname.startsWith(p));
    if (!isProtected) return NextResponse.next();

    const hasToken = req.cookies.get('auth_token');
    if (!hasToken) {
        const url = new URL('/', req.url); // mặc định về homepage
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/settings/:path*'],
};