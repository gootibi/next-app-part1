// Visit result http://localhost:3000/api/users/[id] => [id] = number 1 or 13 ect.
import { NextRequest, NextResponse } from "next/server";

interface Props {
    params: { id: number }
}

// export function GET(request: NextRequest, { params }: { params: { id: number } }) {
//     if (params.id > 10) { // id greater than 10
export function GET(request: NextRequest, { params: { id } }: Props) {
    if (id > 10) { // id greater than 10
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ id: 1, name: 'Tibi' })
}

// Visit result http://localhost:3000/api/users/[id] => [id] = number 1 or 13 ect. POSTMAN - PUT - body json
// PATCH => update the single data element --- PUT => update the all data element
export async function PUT(request: NextRequest, { params }: { params: { id: number } }) {
    // Validate the request body
    // If invalid return 400
    const body = await request.json()
    if (!body.name) { // body.name is required
        return NextResponse.json({ error: 'Name is required' }, { status: 400 })
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

// Visit result http://localhost:3000/api/users/[id] => [id] = number 1 or 13 ect. POSTMAN - DELETE - body json empty
export async function DELETE(request: NextRequest, { params: { id } }: Props) {
    // Fetch the user database
    // If doesn't exist, if not found, return 404
    if (id > 10) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    // Delete the user from database
    // Return 200 response, success
    return  NextResponse.json({});
}