/*
  types/next-auth.d.ts  —  TypeScript type augmentation for Auth.js sessions
  ─────────────────────────────────────────────────────────────────────────────
  By default, the Auth.js `Session` type only includes { name, email, image }.
  We add `id` (the user's database primary key) so that Server Components can
  identify the user without a second database lookup.

  This file uses TypeScript "declaration merging" — it merges our extra fields
  into the existing Auth.js types without modifying any library code.
*/

import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      // User's database ID — set in the `session` callback in lib/auth.ts
      id: string
    } & DefaultSession["user"]
  }
}
