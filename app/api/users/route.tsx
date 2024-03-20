// GET - getting data
// POST - creating data
// PUT - updating data

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

// POSTMAN: http://localhost:3000/api/users - GET
export function GET(request: NextRequest) {
    // Fetch users from a database.
    // Now not fetching, this is hardcoded example.
    return NextResponse.json([
        { id: 1, name: 'Tibi' },
        { id: 2, name: 'John' },
    ])
}

// POSTMAN: http://localhost:3000/api/users - POST - body - json - create data
export async function POST(request: NextRequest) {
    const body = await request.json();

    // Using schema with validation (ZOD), many variables then one if statement.
    const validation = schema.safeParse(body)
    if (!validation.success) { // Bad request, name is required (empty)
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    return NextResponse.json({ id: 1, name: body.name }, { status: 201 }) // Success, status code is 201 => created
}