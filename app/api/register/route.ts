import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5)
})

export async function POST(request: NextRequest) {
    const body = await request.json()

    // Email and password validations with schema (zod)
    const validation = schema.safeParse(body)

    // Email or password not valid, return error
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, { status: 400 })
    }

    // Search user in database
    const user = await prisma.user.findUnique({
        where: { email: body.email }
    })

    // Exists user in database return 'User alreay exists'
    if (user) {
        return NextResponse.json({ error: 'User alreay exists' }, { status: 400 })
    }

    // Hash their password. High number slower encryption, but the more secure
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // Create new user in database
    const newUser = await prisma.user.create({
        data: {
            email: body.email,
            hashedPassword
        }
    })

    // End return new user email in response. PostMan: http://localhost:3000/api/register -> POST json
    return NextResponse.json({email: newUser.email}, {status: 201})
}