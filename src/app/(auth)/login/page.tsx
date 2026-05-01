/*
  (auth)/login/page.tsx  —  route: /login
  ─────────────────────────────────────────────────────────────────────────────
  The (auth) folder is a Next.js "route group" — the parentheses mean the
  folder name does NOT appear in the URL. So this page lives at /login, not
  /auth/login. Route groups are just for organization.

  This page is a Server Component. The interactive login form is a separate
  Client Component (LoginForm) that uses React's `useActionState` hook to
  track submission state and display errors without a full page reload.
*/

import type { Metadata } from "next"
import Link from "next/link"
import { LoginForm } from "@/components/AuthForms"

export const metadata: Metadata = {
  title: "Sign In | Down To The Detail",
  description: "Sign in to your Down To The Detail account.",
}

export default function LoginPage() {
  return (
    <main id="main-content" className="auth-page">
      <div className="auth-card" data-reveal="">
        <div className="auth-card__header">
          <p className="eyebrow">Welcome Back</p>
          <h1 className="auth-title">Sign in to your account</h1>
          <p className="auth-subtitle">
            View your bookings and manage your appointments.
          </p>
        </div>

        {/* LoginForm handles the form state, errors, and submission */}
        <LoginForm />

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </main>
  )
}
