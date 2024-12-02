import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface JwtUserPayload {
    id: string;
    username: string;
    email: string;
    role: string;
}

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;
console.log('kjkkl')
    const isPublicPath = path === '/login' || path === '/admin/login';

    if (isPublicPath) {
        // if (token) {
        //     return NextResponse.redirect(new URL('/user/dashboard', request.url));
        // }
        return NextResponse.next();
    }
    console.log(token)
    if (!token) {
        console.log('No token found, redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }


    try {
        const user = jwt.verify(token!, process.env.TOKEN_SECRET!) as JwtUserPayload;
        console.log(user);


        if (path.startsWith('/admin')) {
            if (user.role !== 'admin') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

        if (path.startsWith('/user')) {
            if (user.role !== 'user') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

    } catch (error) {
        console.error('Error decoding token:', error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/login'],
};
