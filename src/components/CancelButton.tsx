"use client"

/*
  components/CancelButton.tsx
  ─────────────────────────────────────────────────────────────────────────────
  A small Client Component that renders the cancel booking form on the
  account page. It's a separate client component so that each booking card
  can have its own error state without making the entire account page a
  client component.

  The form uses a hidden input to pass the bookingId to the Server Action.
  The Server Action verifies ownership before cancelling — a user cannot
  cancel another user's booking by manipulating the form value.
*/

import { useActionState } from "react"
import { cancelBookingAction } from "@/lib/actions/booking"

export function CancelButton({ bookingId }: { bookingId: string }) {
  const [state, formAction, isPending] = useActionState(cancelBookingAction, null)

  return (
    <form action={formAction} className="cancel-form">
      {/* Hidden field carries the booking ID to the server action */}
      <input type="hidden" name="bookingId" value={bookingId} />

      {state?.error && (
        <p className="form-error" role="alert">{state.error}</p>
      )}

      <button
        type="submit"
        className="btn btn--secondary cancel-btn"
        disabled={isPending}
        // Confirm dialog prevents accidental cancellations
        onClick={(e) => {
          if (!window.confirm("Cancel this appointment?")) e.preventDefault()
        }}
      >
        {isPending ? "Cancelling…" : "Cancel Appointment"}
      </button>
    </form>
  )
}
