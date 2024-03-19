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