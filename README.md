This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Course:

- https://jsonplaceholder.typicode.com/

- Tailwind colors palette:
  https://tailwindcss.com/docs/customizing-colors

- Daisy UI - Tailwind components:
  https://daisyui.com/
  Installation:   npm i -D daisyui@latest

- Routing overview:
  page.tsx, layout.tsx, loading.tsx, routes.tsx, not-found.tsx, error.tsx

- Fast sort npm:
  Install: npm i fast-sort

- Validating Requests whith ZOD
  https://zod.dev/?id=installation
  Install: npm i zod

- Prisma:
  https://www.prisma.io/
  Install: npm i prisma
  Prisma is a modern DB toolkit to query, migrate and model your database.
  More info with prisma: npx prisma => get more info and command
  Google search: "prisma connection string" => https://www.prisma.io/docs/orm/reference/connection-urls => .env and schema.prisma file overwrite

  Create model in schema.prisma file:
  More example: https://www.prisma.io/docs/orm/prisma-schema/data-model/models
  Own unique model:
          model User {
                id Int @id @default(autoincrement())
                email String @unique
                name String
                followers Int @default(0)
                isActive Boolean @default(true)
          }
  Create is success, then format: npx prisma format

  Migrations:
  npx prisma migrate dev -> MYSQL database
  /npx prisma db push -> MONGOdb database - nosql database/
  Is successful: 
                migrations/
                └─ 20240320141758_initial/
                  └─ migration.sql
  Add plus one row in model:
              model User {
              id           Int      @id @default(autoincrement())
              email        String   @unique
              name         String
              followers    Int      @default(0)
              isActive     Boolean  @default(true)
              registeredAt DateTime @default(now()) // This row plus
            }
  Then format: npx prisma format
  Then migration: npx prisma migrate dev
          migrations/
              └─ 20240320142716_add_registered_at/
                └─ migration.sql
  Add the row in database! Auto refresh the database -> 
                  -- AlterTable
                  ALTER TABLE `user` ADD COLUMN `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

  Create client.ts:
  Google search: "prisma nextjs prismaclient"
                 https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
                Copy past db.ts client text. 

  Getting data: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dynamic
                client.ts:
                export async function GET(request: NextRequest) {
                    const user = await prisma.user.findMany()

                    return NextResponse.json(user)
                }

  Creating data (POST):
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
                        return NextResponse.json({ error: 'User already exists'}, { status: 400 })
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

  Update the user (PUT):
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

  Deleting user (DELETE):
                export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
                  // Fetch the user database
                  // Searching user with id
                  const user = await prisma.user.findUnique({
                      where: { id: parseInt(params.id) }
                  })

                  // If doesn't exist, if not found, return 404
                  if (!user) {
                      return NextResponse.json({ error: 'User not found' }, { status: 404 })
                  }

                  // Delete the user from database
                  const deleteUser = await prisma.user.delete({
                      where: { id: user.id }
                  })

                  // Return 200 response and deleting user info, success
                  return NextResponse.json(deleteUser)
                }

- Choosing a Cloud Platform - Cloudinary: https://cloudinary.com/
    Setting up a cloudinary: https://next.cloudinary.dev/installation
    Inatall: npm install next-cloudinary
    Configuration: Add the following variable to your .env.local or .env file. 
                   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
    Go: https://console.cloudinary.com/
        Click settings - Upload - Upload presets: Add upload preset -> Copy: Upload preset name and Change Signing Mode: Unsigned

    Uploading files:
        Create app -> upload folder -> page.tsx
        page.tsx: 
                'use client'
                import React from 'react'
                import { CldUploadWidget } from 'next-cloudinary'

                const UploadPage = () => {
                    return (
                        <CldUploadWidget uploadPreset='xbror44s'>
                            {({ open }) =>
                                <button
                                    className='btn btn-primary'
                                    onClick={() => open()}
                                >
                                    Upload
                                </button>}
                        </CldUploadWidget>
                    )
                }

                export default UploadPage   
                

  