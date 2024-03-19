// GET - getting data
// POST - creating data
// PUT - updating data

import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    // Fetch users from a database.
    // Now not fetching, this is hardcoded example.
    return NextResponse.json([
        { id: 1, name: 'Tibi' },
        { id: 2, name: 'John' },
    ])
}