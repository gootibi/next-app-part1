// GET - getting data
// POST - creating data
// PUT - updating data

import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";
import { error } from "console";


// GET:
// POSTMAN: http://localhost:3000/api/users - GET
// export function GET(request: NextRequest) {
//     // Fetch users from a database.
//     // Now not fetching, this is hardcoded example.
//     return NextResponse.json([
//         { id: 1, name: 'Tibi' },
//         { id: 2, name: 'John' },
//     ])
// }

/* GET users informations from the database */
export async function GET(request: NextRequest) {
    const user = await prisma.user.findMany()

    return NextResponse.json(user)
}

// POSTMAN: http://localhost:3000/api/users - POST - body - json - create data
/*
export async function POST(request: NextRequest) {
    const body = await request.json();

    // Using schema with validation (ZOD), many variables then one if statement.
    const validation = schema.safeParse(body)
    if (!validation.success) { // Bad request, name is required (empty)
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    return NextResponse.json({ id: 1, name: body.name }, { status: 201 }) // Success, status code is 201 => created
}
*/

export async function POST(request: NextRequest) {
    const body = await request.json()

    const validation = schema.safeParse(body)

    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    // Search not unique email (body.email - database)
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    })

    // If find "body.email" in database create error message in response
    if (user) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Create new user in database. Post name and email. The other elements are created automatically
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            name: body.name,
        }
    })

    return NextResponse.json(newUser, { status: 201 })
}