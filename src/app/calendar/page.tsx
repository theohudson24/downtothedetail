/*
  calendar/page.tsx  —  route: /calendar
  ─────────────────────────────────────────────────────────────────────────────
  Global availability calendar — publicly visible (no login required).

  This is a Server Component that fetches the next 14 weekdays' booking data
  directly from the database and renders the full availability grid as HTML.
  No client-side loading needed — the data is baked into the page.

  Each slot links to /booking?date=YYYY-MM-DD&slot=HH:MM so the booking
  form pre-selects that date and time when the user arrives.
*/

import type { Metadata } from "next"
import Link from "next/link"
import { getCalendarData } from "@/lib/queries/bookings"

export const metadata: Metadata = {
  title: "Availability Calendar | Down To The Detail",
  description: "Check available booking slots and schedule your appointment.",
}

// Revalidate this page every 60 seconds so new bookings are reflected quickly
export const dynamic = "force-dynamic"

export default async function CalendarPage() {
  // Server-side data fetch — runs at request time (or on ISR revalidation)
  const calendarDays = await getCalendarData(14)

  return (
    <main id="main-content">

      {/* ── Page Hero ──────────────────────────────────────────────────── */}
      <section className="calendar-hero" data-reveal="">
        <div className="page-hero__content">
          <p className="eyebrow">Availability</p>
          <h1 className="page-hero__title">
            Find an open slot and book your appointment.
          </h1>
          <p className="page-hero__lede">
            Green slots are available — click one to go straight to the booking
            form with that date and time pre-selected. Grey slots are already
            reserved.
          </p>
        </div>

        <div className="calendar-hero__legend">
          <div className="legend-item">
            <span className="legend-dot legend-dot--available"></span>
            Available
          </div>
          <div className="legend-item">
            <span className="legend-dot legend-dot--booked"></span>
            Booked
          </div>
          <p className="calendar-hero__note">
            Calendar shows the next 14 upcoming weekdays.
            Slots refresh automatically as bookings are made.
          </p>
        </div>
      </section>

      {/* ── Availability Grid ──────────────────────────────────────────── */}
      <section className="calendar-section" aria-labelledby="calendar-title">
        <h2 id="calendar-title" className="sr-only">Availability by day</h2>

        <div className="availability-grid">
          {calendarDays.map((day) => (
            <div key={day.date} className="day-column" data-reveal="">
              {/* Day header */}
              <div className="day-column__header">
                <span className="day-column__date">{day.displayDate}</span>
              </div>

              {/* Time slots for this day */}
              <div className="day-column__slots">
                {day.slots.map((slot) =>
                  slot.isAvailable ? (
                    // Available slot — links to booking form with pre-filled params
                    <Link
                      key={slot.value}
                      href={`/booking?date=${day.date}&slot=${slot.value}`}
                      className="slot-card slot-card--available"
                    >
                      <span className="slot-card__time">{slot.label}</span>
                      <span className="slot-card__status">Available →</span>
                    </Link>
                  ) : (
                    // Booked slot — not clickable
                    <div
                      key={slot.value}
                      className="slot-card slot-card--booked"
                      aria-label={`${slot.label} — booked`}
                    >
                      <span className="slot-card__time">{slot.label}</span>
                      <span className="slot-card__status">Reserved</span>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section className="cta" aria-labelledby="calendar-cta-title">
        <div className="cta__card" data-reveal="">
          <p className="eyebrow">Ready to Book</p>
          <h2 id="calendar-cta-title" className="section-title">
            Don&apos;t see a time that works?
          </h2>
          <p>
            Call or text to discuss a custom time window. Most scheduling
            questions can be sorted out the same day.
          </p>
          <div className="cta__actions">
            <a className="btn btn--lg" href="tel:15551234567">
              Call or Text (555) 123-4567
            </a>
            <Link className="btn btn--secondary btn--lg" href="/booking">
              Open Booking Form
            </Link>
          </div>
        </div>

        <aside className="quick-note" data-reveal="">
          <p className="eyebrow">How Booking Works</p>
          <h3>Submit once. Confirm fast.</h3>
          <p>
            Booking requests are reviewed and confirmed with a direct message,
            usually within a few hours of submission.
          </p>
          <ul className="quick-note__list">
            <li>Pick a slot on this calendar or from the form</li>
            <li>Submit your vehicle details and notes</li>
            <li>Get a direct confirmation before the appointment</li>
          </ul>
          <Link className="btn btn--secondary btn--lg" href="/services">
            View Services
          </Link>
        </aside>
      </section>

    </main>
  )
}
