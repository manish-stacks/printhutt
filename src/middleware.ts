import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';



export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;
    const isPublicPath = ['/login', '/admin/login'].includes(path);

    if (isPublicPath && token) {
        try {
            const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
            const redirectPath = payload.role === 'admin' ? '/admin/dashboard' : '/user/dashboard';
            if (payload.role) return NextResponse.redirect(new URL(redirectPath, request.url));
        } catch (error: unknown) {
            console.error('Error decoding token:', (error as Error).message || error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (isPublicPath) return NextResponse.next();

    if (!token) return NextResponse.redirect(new URL('/login', request.url));

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
        const rolePath = (path.startsWith('/admin') && payload.role !== 'admin') || (path.startsWith('/user') && payload.role !== 'user');
        if (rolePath) return NextResponse.redirect(new URL('/login', request.url));
        return NextResponse.next();
    } catch (error: unknown) {
        console.error('Error decoding token:', (error as Error).message || error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/login', '/admin/login'],
};





/*

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value;

    const isPublicPath = path === '/login' || path === '/admin/login';

    if (isPublicPath) {
        return NextResponse.next();
    }

    if (!token) {
        console.log('No token found, redirecting to login');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET!));
 
        if (path.startsWith('/admin')) {
            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }

        if (path.startsWith('/user')) {
            if (payload.role !== 'user') {
                return NextResponse.redirect(new URL('/login', request.url));
            }
        }
        return NextResponse.next();

    } catch (error: unknown) {
        console.error('Error decoding token:', (error as Error).message || error);
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/admin/:path*', '/user/:path*', '/login','/admin/login'], 
};

*/