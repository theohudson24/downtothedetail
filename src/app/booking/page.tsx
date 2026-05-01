/*
  booking/page.tsx  (Booking page — route: "/booking")
  ─────────────────────────────────────────────────────────────────────────────
  This page is a Server Component, but it imports BookingCalendar which is a
  Client Component ("use client"). Next.js handles this automatically — the
  server renders everything it can as HTML, and the browser hydrates just the
  BookingCalendar island.

  BookingForm is a Client Component that submits to createBookingAction.
  The Server Action validates the form, checks the authenticated user, prevents
  obvious slot conflicts, creates the booking, and redirects to /account.
*/

import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a Detail | Down To The Detail",
  description:
    "Request a detailing appointment with a cleaner, more usable booking flow.",
};

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string; slot?: string }>;
}) {
  const params = await searchParams;

  return (
    <main id="main-content">

      {/* ── Page Hero (steps overview) ────────────────────────────────── */}
      <section className="booking-hero" data-reveal="">
        <div className="page-hero__content">
          <p className="eyebrow">Schedule a Detail</p>
          <h1 className="page-hero__title">
            A booking flow designed to be clear, quick, and easy to complete.
          </h1>
          <p className="page-hero__lede">
            Select a preferred date, choose the service, and share a few
            vehicle details so the appointment can be reviewed quickly and
            accurately.
          </p>
        </div>

        {/* Numbered steps list — CSS counter renders the number circles */}
        <ol className="booking-steps">
          <li>
            <span>Pick an upcoming preferred day and time window</span>
            <p>
              Choose from available dates and the arrival window that fits your
              schedule best.
            </p>
            <small>Calendar-ready</small>
          </li>
          <li>
            <span>Select the package and basic vehicle information</span>
            <p>
              Share the service level, year, make, model, and color so the work
              can be scoped correctly.
            </p>
            <small>Service matched</small>
          </li>
          <li>
            <span>Add photos or notes for a better review</span>
            <p>
              Point out stains, scratches, pet hair, odors, or anything you
              want prioritized.
            </p>
            <small>Fewer surprises</small>
          </li>
        </ol>
      </section>

      {/* ── Form + Sticky Sidebar Layout ─────────────────────────────── */}
      {/*
        .booking-layout is a 2-column grid: wide form on left, sticky
        summary panel on right. Collapses to 1 column on tablet/mobile.
      */}
      <section className="booking-layout">

        {/* ── Booking Form ──────────────────────────────────────────────── */}
        <BookingForm initialDate={params.date} initialSlot={params.slot} />

        {/* ── Sticky Summary Sidebar ──────────────────────────────────── */}
        <aside className="booking-summary" data-reveal="">
          <h2>What to expect next</h2>
          <ul>
            <li>
              Your request is reviewed directly and confirmed with a
              follow-up message.
            </li>
            <li>
              If the selected package needs adjustment, you will know before
              work begins.
            </li>
            <li>
              Payment is handled after service once the appointment is
              complete.
            </li>
          </ul>

          <div className="booking-summary__cta">
            <p>Need to ask something before booking?</p>
            {/* tel: link opens the phone dialer on mobile */}
            <a className="btn btn--block" href="tel:15551234567">
              Call or Text (555) 123-4567
            </a>
          </div>
        </aside>

      </section>

    </main>
  );
}
