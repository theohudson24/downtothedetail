/*
  api/auth/[...nextauth]/route.ts
  ─────────────────────────────────────────────────────────────────────────────
  This file mounts the Auth.js route handler at /api/auth/*.

  Auth.js uses this endpoint for:
    GET  /api/auth/session       — fetch the current session (used by useSession)
    GET  /api/auth/csrf          — get a CSRF token for forms
    POST /api/auth/callback/credentials — process the login form submission
    POST /api/auth/signout       — sign the user out

  We don't write any logic here — we just re-export the `handlers` object
  that Auth.js generates from our config in lib/auth.ts.
*/

import { handlers } from "@/lib/auth"

export const { GET, POST } = handlers
