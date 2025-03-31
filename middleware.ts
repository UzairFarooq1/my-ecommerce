import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next()

    // Create a Supabase client configured to use cookies
    const supabase = createMiddlewareClient({ req, res })

    // Refresh session if expired - required for Server Components
    await supabase.auth.getSession()

    return res
  } catch (error) {
    console.error('Middleware error:', error)
    // Return the original response even if there's an error
    // This prevents the middleware from failing completely
    return NextResponse.next()
  }
}

// Simplify the matcher pattern
export const config = {
  matcher: [
    // Apply middleware to these paths
    '/',
    '/dashboard/:path*',
    '/api/:path*',
    // Add other specific paths you need middleware for
  ],
}