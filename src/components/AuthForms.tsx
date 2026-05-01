"use client"

/*
  components/AuthForms.tsx  —  Login and Signup form components
  ─────────────────────────────────────────────────────────────────────────────
  Why "use client"?
  Forms that show loading states and error messages need browser-side React
  state. `useActionState` from React 19 connects a Server Action to the form
  and gives us:
    - `state`     — the last value returned by the action (null or { error })
    - `formAction`— the enhanced form action to pass to <form action={...}>
    - `isPending` — true while the server is processing the submission

  The actual logic (validation, DB writes) lives in lib/actions/auth.ts.
  These components are purely for rendering the UI and wiring up the actions.

  PASSWORD REQUIREMENTS displayed to the user match server-side rules in:
  lib/actions/auth.ts → validatePassword()
*/

import { useActionState } from "react"
import { loginAction, signUpAction } from "@/lib/actions/auth"

// Shared error message component
function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="form-error" role="alert">{message}</p>
}

// ── Login Form ─────────────────────────────────────────────────────────────

export function LoginForm() {
  // useActionState wires the Server Action to form state.
  // null = initial state (no error yet)
  const [state, formAction, isPending] = useActionState(loginAction, null)

  return (
    <form action={formAction} className="auth-form" noValidate>
      {/* Form-level error from the server (e.g., wrong credentials) */}
      <FieldError message={state?.error} />

      <div className="form-group">
        <span>Email address</span>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
          // Disable autocomplete-off to allow password managers
        />
      </div>

      <div className="form-group">
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Your password"
          autoComplete="current-password"
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn--lg btn--block"
        disabled={isPending}
      >
        {/* Show loading state while the server processes the login */}
        {isPending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  )
}

// ── Signup Form ────────────────────────────────────────────────────────────

export function SignupForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null)

  return (
    <form action={formAction} className="auth-form" noValidate>
      <FieldError message={state?.error} />

      <div className="form-group">
        <span>Full name</span>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          autoComplete="name"
          required
        />
      </div>

      <div className="form-group">
        <span>Email address</span>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div className="form-group">
        <span>Phone number <span className="field-optional">(optional)</span></span>
        <input
          type="tel"
          name="phone"
          placeholder="(555) 123-4567"
          autoComplete="tel"
        />
      </div>

      <div className="form-group">
        <span>Password</span>
        <input
          type="password"
          name="password"
          placeholder="Create a password"
          autoComplete="new-password"
          required
        />
        {/* Requirements hint — mirrors server validation in lib/actions/auth.ts */}
        <small className="field-hint">
          Min. 8 characters · uppercase · lowercase · number · special character
        </small>
      </div>

      <button
        type="submit"
        className="btn btn--lg btn--block"
        disabled={isPending}
      >
        {isPending ? "Creating account…" : "Create Account"}
      </button>
    </form>
  )
}
