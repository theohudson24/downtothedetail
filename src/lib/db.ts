/*
  lib/db.ts  —  Prisma client singleton
  ─────────────────────────────────────────────────────────────────────────────
  Why a singleton?
  Next.js in development mode uses "hot reload" — the server restarts on every
  file save. Without this pattern, each reload would create a new database
  connection, quickly exhausting the PostgreSQL connection pool.

  The trick: in development, the client is stored on the global object (which
  persists across hot reloads). In production, each server process gets one
  client (module caching handles this naturally).

  USAGE — import `db` anywhere in server-only code:
    import { db } from "@/lib/db"
    const user = await db.user.findUnique({ where: { email: "..." } })
*/

import { PrismaClient } from "@prisma/client"

// Extend the Node.js global type so TypeScript knows about `globalThis.prisma`
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const db =
  globalThis.prisma ??
  new PrismaClient({
    // Log slow queries and errors in development for easier debugging
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  })

// In development, save the client to global so hot reloads reuse it
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db
}
