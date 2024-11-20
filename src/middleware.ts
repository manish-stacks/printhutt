import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/verfymail'
    const token = request.cookies.get("token")?.value || ''

    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/admin/dashbpard', request.url))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
    // matcher:[
    //     '/',
    //     '/signup',
    //     '/profile',
    //     '/verifyemail'
    // ]
}