import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail' || path === '/forget-password'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/profile',request.nextUrl))
  }
  // is url is not public
  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login',request.nextUrl))
  }


}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/profile','/login','/signup','/profile/:path*','/verifyemail','/forget-password'],
}