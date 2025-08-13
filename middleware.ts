// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    const userId = req.cookies.get('userId')?.value

    // Bỏ qua các route auth & static để tránh loop
    const isAuthRoute = pathname.startsWith('/auth')
    const isStatic =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.startsWith('/assets')

    if (isAuthRoute || isStatic) {
        return NextResponse.next()
    }

    // Nếu route yêu cầu login mà chưa có userId -> redirect
    if (!userId) {
        const url = req.nextUrl.clone()
        url.pathname = '/homepage' // hoặc '/auth/login'
        // optional: đính kèm ?next= để quay lại sau khi login
        url.searchParams.set('next', pathname)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

// Chỉ áp dụng cho các đường dẫn cần bảo vệ
export const config = {
    matcher: [
        '/settings/:path*',
    ],
}