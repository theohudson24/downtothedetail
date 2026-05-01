/*
  account/page.tsx  —  route: /account
  ─────────────────────────────────────────────────────────────────────────────
  The user's personal dashboard. Protected by middleware.ts — unauthenticated
  users are automatically redirected to /login before this page renders.

  This is a Server Component so it can call the database directly and render
  the account data as HTML — no loading spinners needed for the initial view.

  The cancel-booking form uses a Client Component (CancelButton) because the
  `useActionState` hook for per-booking error display needs browser state.
*/

import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getCurrentUser } from "@/lib/queries/users"
import { getUserBookings } from "@/lib/queries/bookings"
import { formatDate, formatPackage, formatTimeSlot } from "@/lib/queries/bookings"
import { CancelButton } from "@/components/CancelButton"

export const metadata: Metadata = {
  title: "My Account | Down To The Detail",
  description: "View and manage your Down To The Detail bookings.",
}

// Status → CSS class + human label mapping
const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  pending:   { label: "Pending Confirmation", cls: "status-pending" },
  confirmed: { label: "Confirmed",            cls: "status-confirmed" },
  completed: { label: "Completed",            cls: "status-completed" },
  cancelled: { label: "Cancelled",            cls: "status-cancelled" },
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ booked?: string; updated?: string }>
}) {
  const params = await searchParams

  // auth() reads the session cookie and returns the session or null.
  // Middleware already redirects if unauthenticated, but we double-check here.
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  // Fetch user profile and all bookings in parallel for performance
  const [user, bookings] = await Promise.all([
    getCurrentUser(session.user.id),
    getUserBookings(session.user.id),
  ])

  if (!user) redirect("/login")

  // Split bookings into upcoming (active) and past (completed/cancelled)
  const today = new Date().toISOString().split("T")[0]
  const upcoming = bookings.filter(
    (b) => b.date >= today && b.status !== "cancelled" && b.status !== "completed"
  )
  const past = bookings.filter(
    (b) => b.date < today || b.status === "completed" || b.status === "cancelled"
  )

  return (
    <main id="main-content">

      {/* ── Success banners ────────────────────────────────────────────── */}
      {params.booked === "true" && (
        <div className="banner banner--success" role="status">
          Booking submitted! You&apos;ll receive a confirmation once it&apos;s reviewed.
        </div>
      )}
      {params.updated === "true" && (
        <div className="banner banner--success" role="status">
          Profile updated successfully.
        </div>
      )}

      {/* ── Account Header ─────────────────────────────────────────────── */}
      <section className="account-hero" data-reveal="">
        <div className="account-hero__text">
          <p className="eyebrow">Your Account</p>
          <h1 className="page-hero__title">Welcome back, {user.name}.</h1>
          <p className="account-hero__meta">
            <span>{user.email}</span>
            {user.phone && <span>{user.phone}</span>}
            <span>Member since {user.createdAt.toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
          </p>
        </div>

        <div className="account-hero__actions">
          <Link className="btn btn--lg" href="/booking">
            New Booking
          </Link>
          <Link className="btn btn--secondary btn--lg" href="/calendar">
            View Calendar
          </Link>
        </div>
      </section>

      {/* ── Upcoming Bookings ───────────────────────────────────────────── */}
      <section className="account-section" aria-labelledby="upcoming-title">
        <div className="account-section__header" data-reveal="">
          <p className="eyebrow">Upcoming</p>
          <h2 id="upcoming-title" className="section-title">
            {upcoming.length > 0 ? "Your scheduled appointments" : "No upcoming appointments"}
          </h2>
          {upcoming.length === 0 && (
            <p className="muted-copy">
              Ready for a detail?{" "}
              <Link href="/booking" className="auth-link">Book your first appointment.</Link>
            </p>
          )}
        </div>

        {upcoming.length > 0 && (
          <div className="booking-list">
            {upcoming.map((booking) => {
              const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending
              const canCancel = booking.status === "pending" || booking.status === "confirmed"

              return (
                <article key={booking.id} className="booking-card" data-reveal="">
                  <div className="booking-card__top">
                    <div>
                      <h3 className="booking-card__date">{formatDate(booking.date)}</h3>
                      <p className="booking-card__time">{formatTimeSlot(booking.timeSlot)}</p>
                    </div>
                    <span className={`status-badge ${status.cls}`}>{status.label}</span>
                  </div>

                  <div className="booking-card__details">
                    <div className="booking-detail">
                      <span className="booking-detail__label">Service</span>
                      <span>{formatPackage(booking.package)}</span>
                    </div>
                    <div className="booking-detail">
                      <span className="booking-detail__label">Vehicle</span>
                      <span>
                        {booking.year} {booking.make} {booking.model}
                        {booking.color ? ` · ${booking.color}` : ""}
                      </span>
                    </div>
                    {booking.notes && (
                      <div className="booking-detail">
                        <span className="booking-detail__label">Notes</span>
                        <span>{booking.notes}</span>
                      </div>
                    )}
                  </div>

                  {/* Cancel button — Client Component so it can show its own error */}
                  {canCancel && <CancelButton bookingId={booking.id} />}
                </article>
              )
            })}
          </div>
        )}
      </section>

      {/* ── Past Bookings ───────────────────────────────────────────────── */}
      {past.length > 0 && (
        <section className="account-section" aria-labelledby="history-title">
          <div className="account-section__header" data-reveal="">
            <p className="eyebrow">History</p>
            <h2 id="history-title" className="section-title">Past appointments</h2>
          </div>

          <div className="booking-list booking-list--past">
            {past.map((booking) => {
              const status = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.completed

              return (
                <article key={booking.id} className="booking-card booking-card--past" data-reveal="">
                  <div className="booking-card__top">
                    <div>
                      <h3 className="booking-card__date">{formatDate(booking.date)}</h3>
                      <p className="booking-card__time">{formatTimeSlot(booking.timeSlot)}</p>
                    </div>
                    <span className={`status-badge ${status.cls}`}>{status.label}</span>
                  </div>

                  <div className="booking-card__details">
                    <div className="booking-detail">
                      <span className="booking-detail__label">Service</span>
                      <span>{formatPackage(booking.package)}</span>
                    </div>
                    <div className="booking-detail">
                      <span className="booking-detail__label">Vehicle</span>
                      <span>
                        {booking.year} {booking.make} {booking.model}
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Account Info / Profile ──────────────────────────────────────── */}
      <section className="account-section" aria-labelledby="profile-title">
        <div className="account-section__header" data-reveal="">
          <p className="eyebrow">Account Details</p>
          <h2 id="profile-title" className="section-title">Your information</h2>
        </div>

        <div className="account-profile-grid" data-reveal="">
          <div className="account-profile-card">
            <dl className="account-details">
              <div>
                <dt>Name</dt>
                <dd>{user.name}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{user.email}</dd>
              </div>
              {user.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd>{user.phone}</dd>
                </div>
              )}
              <div>
                <dt>Member since</dt>
                <dd>{user.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

    </main>
  )
}
