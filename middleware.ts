//import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

/* this two row = this "export { default } from "next-auth/middleware""
import middleware from "next-auth/middleware"

export default middleware
*/



// NextJs automatikal looks for
// Giv config - matcher endpoint exp.: '/users' and middleware function give it http://localhost:3000/new-page
/*
export async function middleware(request: NextRequest) {
    
    // Redirect to new-page page
    return NextResponse.redirect(new URL('/new-page', request.url))
}
*/

// NextJs automatikal looks for
export const config = {
    // *: zero or more parameters
    // +: one or more parameters
    // ?: zero or one parameters
    matcher: ['/users/:id*', '/dashboard/:path*'],
}