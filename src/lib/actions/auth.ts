/*
  lib/actions/auth.ts  —  Server Actions for sign-up and sign-out
  ─────────────────────────────────────────────────────────────────────────────
  "use server" at the top marks every export in this file as a Server Action.
  Server Actions run on the server only — they can safely access the database
  and secrets. They are called directly from React forms via the `action` prop.

  SIGN-IN is handled directly by Auth.js (see lib/auth.ts). We only need
  custom actions for sign-up (creating the account) and sign-out.

  PASSWORD SECURITY RULES:
  - Minimum 8 characters
  - At least one uppercase letter (A-Z)
  - At least one lowercase letter (a-z)
  - At least one number (0-9)
  - At least one special character (@$!%*?&)
  - Hashed with bcrypt at cost factor 12 (each additional factor doubles work)
*/

"use server"

import bcrypt from "bcryptjs"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { auth, signIn, signOut as authSignOut } from "@/lib/auth"

// ── Types ──────────────────────────────────────────────────────────────────

// The shape returned by both actions — null means success (redirect happens)
type ActionResult = { error: string } | null

// ── Validation helpers ────────────────────────────────────────────────────

function validateEmail(email: string): string | null {
  if (!email) return "Email is required."
  // Basic email format check — the browser `type="email"` also validates,
  // but we double-check server-side since requests can bypass the browser.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Please enter a valid email address."
  return null
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required."
  if (password.length < 8) return "Password must be at least 8 characters."
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter."
  if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter."
  if (!/[0-9]/.test(password)) return "Password must contain at least one number."
  if (!/[@$!%*?&#^()_\-+=]/.test(password))
    return "Password must contain at least one special character (@$!%*?&)."
  return null
}

// ── Sign Up ───────────────────────────────────────────────────────────────

/*
  signUpAction creates a new user account, then immediately signs them in.

  Compatible with React's `useActionState` hook — signature is:
    (prevState, formData) => Promise<ActionResult>

  On success: throws NEXT_REDIRECT (caught by Next.js, user is sent to /account).
  On error:   returns { error: "..." } which React renders in the form.
*/
export async function signUpAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const name = (formData.get("name") as string | null)?.trim() ?? ""
  const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
  const password = (formData.get("password") as string | null) ?? ""
  const phone = (formData.get("phone") as string | null)?.trim() ?? ""

  // ── Server-side validation ──────────────────────────────────────────────
  if (!name || name.length < 2) return { error: "Name must be at least 2 characters." }

  const emailError = validateEmail(email)
  if (emailError) return { error: emailError }

  const passwordError = validatePassword(password)
  if (passwordError) return { error: passwordError }

  // ── Check for duplicate email ───────────────────────────────────────────
  const existing = await db.user.findUnique({ where: { email } })
  if (existing) return { error: "An account with that email already exists." }

  // ── Hash password ───────────────────────────────────────────────────────
  // Cost factor 12 means ~250ms on a modern CPU — slow enough to deter
  // brute-force attacks, fast enough to be imperceptible to users.
  const hashedPassword = await bcrypt.hash(password, 12)

  // ── Create user ─────────────────────────────────────────────────────────
  await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
      phone: phone || null,
    },
  })

  // ── Sign in immediately after account creation ──────────────────────────
  // signIn throws NEXT_REDIRECT on success — re-throw it so Next.js redirects.
  // Only catch AuthError (wrong credentials etc), not the redirect.
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/account",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created but sign-in failed. Please log in manually." }
    }
    throw error // re-throw NEXT_REDIRECT so the browser navigates
  }

  return null
}

// ── Log In ────────────────────────────────────────────────────────────────

/*
  loginAction delegates the actual credential check to Auth.js.
  On success: Auth.js throws NEXT_REDIRECT → user goes to /account.
  On failure: returns { error: "..." } for the form to display.
*/
export async function loginAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? ""
  const password = (formData.get("password") as string | null) ?? ""

  if (!email || !password) return { error: "Email and password are required." }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/account",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      // Don't tell the user which field was wrong — reduces attack surface
      return { error: "Invalid email or password." }
    }
    throw error // re-throw NEXT_REDIRECT
  }

  return null
}

// ── Sign Out ─────────────────────────────────────────────────────────────

/*
  signOutAction is called from a form button in the Header or account page.
  Auth.js clears the session cookie and redirects to the homepage.
*/
export async function signOutAction(): Promise<void> {
  await authSignOut({ redirectTo: "/" })
}

// ── Update Profile ────────────────────────────────────────────────────────

/*
  updateProfileAction allows the user to change their name and phone from
  the account dashboard. Email changes are intentionally not supported here
  (would require re-verification in a production app).
*/
export async function updateProfileAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) return { error: "You must be signed in." }

  const name = (formData.get("name") as string | null)?.trim() ?? ""
  const phone = (formData.get("phone") as string | null)?.trim() ?? ""

  if (!name || name.length < 2) return { error: "Name must be at least 2 characters." }

  await db.user.update({
    where: { id: session.user.id },
    data: { name, phone: phone || null },
  })

  redirect("/account?updated=true")
}
