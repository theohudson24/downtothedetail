/*
  lib/auth.ts  —  Auth.js v5 (NextAuth) configuration
  ─────────────────────────────────────────────────────────────────────────────
  This file is the single source of truth for authentication. It exports:

    auth      — call this in any Server Component to get the current session
                e.g.  const session = await auth()

    signIn    — call this in a Server Action to sign a user in
    signOut   — call this in a Server Action to sign a user out
    handlers  — the GET/POST handlers mounted at /api/auth/[...nextauth]

  HOW SESSIONS WORK:
  We use the "jwt" strategy — no database sessions table. When a user logs in,
  Auth.js creates a signed JWT and stores it in a secure httpOnly cookie. On
  each request, the JWT is verified and the session is reconstructed from it.
  The JWT is signed with AUTH_SECRET from .env, so it cannot be tampered with.

  CREDENTIALS PROVIDER:
  We accept email + password. The `authorize` callback looks up the user in the
  database and verifies the password with bcryptjs. If valid, it returns the
  user object, which Auth.js encodes into the JWT.
*/

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  // JWT-based sessions — no database sessions table needed
  session: { strategy: "jwt" },

  // Override the default sign-in page with our custom one
  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      // These field names must match the <input name="..."> in the login form
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // `credentials` can be null/undefined if the form was tampered with
        if (!credentials?.email || !credentials?.password) return null

        // Look up the user by email
        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
        })

        // No account with that email
        if (!user) return null

        // Compare the submitted password against the stored bcrypt hash.
        // bcrypt.compare is timing-safe — it prevents timing attacks where
        // an attacker can guess whether the email exists by measuring response time.
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        )

        if (!passwordMatch) return null

        // Return a plain object with the data we want in the JWT/session.
        // NEVER include sensitive fields like hashedPassword here.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],

  callbacks: {
    /*
      jwt callback runs every time a JWT is created or refreshed.
      On sign-in, `user` is the object returned by `authorize()`.
      We store the user's DB id in the token so we can access it later.
    */
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id
      }
      return token
    },

    /*
      session callback runs when a session is accessed via auth().
      We pull the user ID from the JWT and add it to the session object
      so that Server Components can identify who is making a request.
    */
    session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
