/*
  (auth)/signup/page.tsx  —  route: /signup
  ─────────────────────────────────────────────────────────────────────────────
  Account creation page. The SignupForm Client Component handles the form
  interaction and calls `signUpAction` from lib/actions/auth.ts.

  On success the user is immediately signed in and redirected to /account.
*/

import type { Metadata } from "next"
import Link from "next/link"
import { SignupForm } from "@/components/AuthForms"

export const metadata: Metadata = {
  title: "Create Account | Down To The Detail",
  description: "Create a Down To The Detail account to book and manage appointments.",
}

export default function SignupPage() {
  return (
    <main id="main-content" className="auth-page">
      <div className="auth-card" data-reveal="">
        <div className="auth-card__header">
          <p className="eyebrow">Get Started</p>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Book appointments and track your vehicle&apos;s service history.
          </p>
        </div>

        <SignupForm />

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link href="/login" className="auth-link">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
