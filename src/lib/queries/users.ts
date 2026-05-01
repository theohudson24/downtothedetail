/*
  lib/queries/users.ts  —  Read-only database queries for user accounts
  ─────────────────────────────────────────────────────────────────────────────
*/

import { db } from "@/lib/db"

// Shape of the user data safe to pass to UI components
// (never includes hashedPassword or other sensitive fields)
export type SafeUser = {
  id: string
  name: string
  email: string
  phone: string | null
  createdAt: Date
}

/*
  getCurrentUser fetches the full user record by ID, returning only fields
  safe to expose to the UI. Call this in Server Components after getting
  the session with `auth()`.
*/
export async function getCurrentUser(userId: string): Promise<SafeUser | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      createdAt: true,
      // hashedPassword is intentionally excluded here
    },
  })
  return user
}
