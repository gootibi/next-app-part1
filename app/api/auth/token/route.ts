// http://localhost:3000/api/auth/token
// Never have to do this in real live project...
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request })
    return NextResponse.json(token)
}