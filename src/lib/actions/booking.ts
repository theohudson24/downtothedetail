/*
  lib/actions/booking.ts  —  Server Actions for creating and cancelling bookings
  ─────────────────────────────────────────────────────────────────────────────
  "use server" marks every export as a Server Action — runs on server only.

  SECURITY MODEL:
  - We always fetch the user ID from the auth session, never from form data.
    This prevents a user from creating bookings on behalf of someone else.
  - Slot availability is checked server-side right before creating the booking.
  - Cancelled bookings free up the slot for others.

  DOUBLE-BOOKING PREVENTION:
  We check for existing non-cancelled bookings on the same date+slot before
  inserting. This is a "check then act" pattern. In high-traffic scenarios
  you'd use a database-level unique constraint or a transaction lock, but for
  a single-operator detailing business this is sufficient.
*/

"use server"

import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { db } from "@/lib/db"

type ActionResult = { error: string } | null

// The four available time slots — used for validation
const VALID_SLOTS = ["08:00", "11:30", "15:00", "after-hours"]
const VALID_PACKAGES = ["signature", "correction", "ceramic"]

// ── Create Booking ─────────────────────────────────────────────────────────

/*
  createBookingAction receives the booking form's FormData, validates it,
  checks slot availability, and creates the booking record.

  On success: redirects to /account so the user sees their new booking.
  On error:   returns { error: "..." } for the form to display.
*/
export async function createBookingAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  // Always authenticate server-side — never trust user-submitted userId
  const session = await auth()
  if (!session?.user?.id) {
    return { error: "You must be signed in to make a booking." }
  }

  // ── Extract and sanitize fields ──────────────────────────────────────────
  const date = (formData.get("booking-date") as string | null)?.trim() ?? ""
  const timeSlot = (formData.get("booking-time") as string | null)?.trim() ?? ""
  const pkg = (formData.get("package") as string | null)?.trim() ?? ""
  const make = (formData.get("make") as string | null)?.trim() ?? ""
  const model = (formData.get("model") as string | null)?.trim() ?? ""
  const yearStr = (formData.get("year") as string | null)?.trim() ?? ""
  const color = (formData.get("color") as string | null)?.trim() || null
  const notes = (formData.get("notes") as string | null)?.trim() || null

  // ── Validation ─────────────────────────────────────────────────────────
  // Date format: YYYY-MM-DD
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return { error: "Please select a date." }
  }

  // Prevent booking in the past
  const bookingDate = new Date(date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (bookingDate < today) {
    return { error: "You cannot book a date in the past." }
  }

  if (!VALID_SLOTS.includes(timeSlot)) {
    return { error: "Please select a valid time slot." }
  }

  if (!VALID_PACKAGES.includes(pkg)) {
    return { error: "Please select a valid service package." }
  }

  if (!make) return { error: "Vehicle make is required." }
  if (!model) return { error: "Vehicle model is required." }

  const year = parseInt(yearStr, 10)
  if (isNaN(year) || year < 1990 || year > new Date().getFullYear() + 2) {
    return { error: "Please enter a valid vehicle year." }
  }

  // ── Availability check ──────────────────────────────────────────────────
  // Count active bookings (anything except 'cancelled') for this date + slot
  const conflict = await db.booking.findFirst({
    where: {
      date,
      timeSlot,
      // Cancelled bookings don't block the slot
      status: { not: "cancelled" },
    },
  })

  if (conflict) {
    return {
      error:
        "That time slot was just taken. Please choose a different date or time.",
    }
  }

  // ── Create the booking ──────────────────────────────────────────────────
  await db.booking.create({
    data: {
      userId: session.user.id, // from the verified session, not form input
      date,
      timeSlot,
      package: pkg,
      make,
      model,
      year,
      color,
      notes,
      status: "pending", // owner must confirm
    },
  })

  // Redirect to account page — user will see their new pending booking
  redirect("/account?booked=true")
}

// ── Cancel Booking ─────────────────────────────────────────────────────────

/*
  cancelBookingAction sets a booking's status to "cancelled".
  It verifies the booking belongs to the requesting user before updating —
  preventing one user from cancelling another user's booking.
  Only pending and confirmed bookings can be cancelled.
*/
export async function cancelBookingAction(
  _prevState: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) return { error: "You must be signed in." }

  const bookingId = (formData.get("bookingId") as string | null)?.trim() ?? ""
  if (!bookingId) return { error: "Invalid booking." }

  // Fetch the booking and verify ownership in one query
  const booking = await db.booking.findFirst({
    where: {
      id: bookingId,
      userId: session.user.id, // ensures the user owns this booking
    },
  })

  if (!booking) return { error: "Booking not found." }

  // Completed bookings can't be cancelled after the fact
  if (booking.status === "completed") {
    return { error: "Completed appointments cannot be cancelled." }
  }

  if (booking.status === "cancelled") {
    return { error: "This booking is already cancelled." }
  }

  await db.booking.update({
    where: { id: bookingId },
    data: { status: "cancelled" },
  })

  redirect("/account")
}
