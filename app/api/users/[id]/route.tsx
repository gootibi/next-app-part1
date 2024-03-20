// Visit result http://localhost:3000/api/users/[id] => [id] = number 1 or 13 ect.
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import { error } from "console";

interface Props {
    params: { id: number }
}

// export function GET(request: NextRequest, { params }: { params: { id: number } }) {
//     if (params.id > 10) { // id greater than 10
/*
export function GET(request: NextRequest, { params: { id } }: Props) {
    if (id > 10) { // id greater than 10
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ id: 1, name: 'Tibi' })
}
*/

/* GET user informations from the database by giving ID. */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
}

// Visit result http://localhost:3000/api/users/[id] => [id] = number 1 or 13 ect. POSTMAN - PUT - body json
// PATCH => update the single data element --- PUT => update the all data element
/*
export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    // Validate the request body
    // If invalid return 400
    const body = await request.json()

    // Using schema with validation (ZOD), many variables then one if statement.
    const validation = schema.safeParse(body)
    if (!validation.success) { // body.name is required
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    // Fetch the user with the given id
    // If doesn't exist, return 404
    if (params.id > 10) { // id greater than 10
        return NextResponse.json({ error: `User not found, invalid id: ${params.id}` }, { status: 404 })
    }

    // Update the user
    // Return the updated user
    return NextResponse.json({ id: params.id, name: body.name }, { status: 200 })
}
*/

// Update the user
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json()

    // Validity check
    const validation = schema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    // Searching user with id
    const user = await prisma.user.findUnique({
        where: { id: parseInt(params.id) }
    })

    // Not found users with id return error
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Update user with prisma in database
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
            name: body.name,
            email: body.email
        }
    })

    // Return updated user in response
    return NextResponse.json(updatedUser)
}

// Visit result http://localhost:3000/api/users/[id] => [id] = number 1 or 13 ect. POSTMAN - DELETE - body json empty
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    // Fetch the user database
    // If doesn't exist, if not found, return 404
    if (id > 10) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    // Delete the user from database
    // Return 200 response, success
    return NextResponse.json({});
}


