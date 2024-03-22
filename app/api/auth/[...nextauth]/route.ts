import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({ // Email and password credentials
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' }, // email input settings
        password: { label: 'Password', type: 'password', placeholder: 'Password' } // password input settings
      },
      async authorize(credentials, req) {
        // Check incoming email and password values, when falsy, return null.
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Search for email in database.
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        // Not password match return null
        if (!user) {
          return null;
        }

        // Check password is match (credential and user passwords)
        const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword!)

        // Password in database matches then return user, or not matches then return null
        return passwordsMatch ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt"
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }