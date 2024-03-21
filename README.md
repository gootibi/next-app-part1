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

    Uploading files: https://next.cloudinary.dev/clduploadwidget/configuration#instance-methods
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

    Upload image whith "CldUploadWidget" and set the public_id (onSuccess).
    Image is visible, when upload success.

    Customize the UploadWidget: https://demo.cloudinary.com/uw/#/ 
                Example: options={{
                            sources: ['local'],
                            multiple: true,
                            maxFiles: 5,
                        }}    


- Authentication with Next Auth
    Setting up next auth: https://next-auth.js.org/
    Installation: https://next-auth.js.org/getting-started/example
                  npm install next-auth
    Add API route: https://next-auth.js.org/configuration/initialization#route-handlers-app
                   Create: /app/api/auth/[...nextauth]/route.ts
                   Write in route.ts file:
                                    import NextAuth from "next-auth"
                                    const handler = NextAuth({ ... })

                                    export { handler as GET, handler as POST }
                    Write .env file:
                                    NEXTAUTH_URL=http://localhost:3000
                                    // Secret key: GIT BASH -> Command: openssl rand -base64 32
                                    NEXTAUTH_SECRET=5a5dGh1rVmPeTPwRXHIeOuVY1zUsaMxdJr5N9XGCsh4=
    Configuration Google Provider:
                    https://next-auth.js.org/providers/google
                    Click: https://console.developers.google.com/apis/credentials
                    This page is https://console.cloud.google.com/
                            + Create new Project
                            + Configure Consenst Page - select:
                                            - Select: External (public page)
                                            - App Name write
                                            - User support select (email address)
                                            - Later give it App domain, now "test mode run"
                                            - Developer contact information -> Email addresses: write your email address
                                            - Scope: Add or Remove Scope click - Add: '.../auth/userinfo.email' and '.../auth/userinfo.profile'
                                            - Test users: Add User -> add email "gootibi@gmail.com" - test mode 100 user verification
                                            - Summary: OAuth consent screen -> Click "BACK THE DASHBOARD"
                            + Credentials page click -> Click "Create Credentials" -> Click "OAuth client ID":
                            + Create OAuth client ID: 
                                            - "Application type" selected: Web application
                                            - "Application type" write: My Next App or any name
                                            - "Authorized JavaScript origins" add: http://localhost:3000
                                            - "Authorized redirect URIs" add: http://localhost:3000/api/auth/callback/google
                                            - Click "Create" button
                                            - PopUp window: client ID and client secret -> pastes in .env:
                                                                                         GOOGLE_CLIENT_ID=client_id_string paste
                                                                                         GOOGLE_CLIENT_SECRET=client_secret_string paste
                     Write in route.ts file: add providers ->
                            import GoogleProvider from "next-auth/providers/google";
                            ...
                            providers: [
                            GoogleProvider({
                                clientId: process.env.GOOGLE_CLIENT_ID,
                                clientSecret: process.env.GOOGLE_CLIENT_SECRET
                            })
                            ]
                            ...
                    Add the SignIn link our NavBar: 
                            NavBar.tsx file ->
                            <Link href='/api/auth/signin'>Login</Link>
    
    Understanding Authentication Session: /auth/token/route.ts create file -> 
                                        // http://localhost:3000/api/auth/token -> see the json file
                                        // Never have to do this in real live project...
                                        import { getToken } from "next-auth/jwt";
                                        import { NextRequest, NextResponse } from "next/server";

                                        export async function GET(request: NextRequest) {
                                            const token = await getToken({ req: request })
                                            return NextResponse.json(token)
                                        }

    Accessing Session on the Client:
                    Create /app/auth/Provider.ts:
                                            'use client'
                                            import React, { ReactNode } from 'react'
                                            import { SessionProvider } from 'next-auth/react'
                                            const AuthProvider = ({ children }: { children: ReactNode }) => {
                                                return (
                                                    <SessionProvider>
                                                        {children}
                                                    </SessionProvider>
                                                )
                                            }
                                            export default AuthProvider
                    Root layout.tsx give it <AuthProvider>NavBar, children ... </AuthProvider>
                    NavBar.tsx add useSession() -> status and data: session:
                                                    const { status, data: session } = useSession()
                                                    Exp.: {status === 'authenticated' && <div>{session.user!.name}</div>}

    Accessing Session on the Server: 
                    /app/api/auth/[...nextauth]/route.ts write new export -> name authOptions
                                                    export const authOptions = {
                                                    providers: [
                                                        GoogleProvider({
                                                            clientId: process.env.GOOGLE_CLIENT_ID!,
                                                            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
                                                        })
                                                        ]
                                                    }
                    /app/page.tsx add useServerSession(): 
                                                    const session = await getServerSession(authOptions)
                                                    Exp.: h1>Hello {session && <span>{session.user?.name}</span>}</h1>
                    
    Signing Out Users: add NavBar.tsx api endpoint /app/auth/signout
                        Exp.: <Link href='/api/auth/signout'>Sign Out</Link>










    