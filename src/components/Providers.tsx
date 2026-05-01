"use client"

/*
  components/Providers.tsx  —  Client-side context providers
  ─────────────────────────────────────────────────────────────────────────────
  Next.js layout.tsx is a Server Component. Context providers (which need
  "use client") can't be used directly inside Server Components.

  This thin wrapper solves that: layout.tsx imports Providers as a client
  component, passes `children` through it, and the children (which include
  other Server Components) work normally.

  SessionProvider makes the Auth.js `useSession()` hook available to any
  client component anywhere in the app — including the Header, which uses
  it to show "My Account" vs "Sign In".
*/

import { SessionProvider } from "next-auth/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // SessionProvider fetches the session from /api/auth/session on mount
    // and keeps it in React context for all child components.
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
