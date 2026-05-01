"use client";

import { useActionState } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import { createBookingAction } from "@/lib/actions/booking";

const TIME_SLOTS = [
  { value: "08:00", label: "8:00 AM to 11:00 AM" },
  { value: "11:30", label: "11:30 AM to 2:30 PM" },
  { value: "15:00", label: "3:00 PM to 6:00 PM" },
  { value: "after-hours", label: "After-hours drop-off" },
];

export default function BookingForm({
  initialDate,
  initialSlot,
}: {
  initialDate?: string;
  initialSlot?: string;
}) {
  const [state, formAction, isPending] = useActionState(createBookingAction, null);
  const selectedSlot = TIME_SLOTS.some((slot) => slot.value === initialSlot)
    ? initialSlot
    : TIME_SLOTS[0].value;

  return (
    <form className="booking-form" action={formAction} data-reveal="">
      {state?.error && (
        <div className="form-error" role="alert">
          {state.error}
        </div>
      )}

      <div className="form-section">
        <h2>1. Date and time</h2>
        <p>
          Choose the day that works best. Available dates are generated from
          the next upcoming weekdays for a cleaner scheduling flow.
        </p>

        <BookingCalendar initialDate={initialDate} />

        <noscript>
          <p className="fine-print">
            If dates do not appear here, call or text to confirm the next
            opening.
          </p>
        </noscript>

        <div className="booking-slots">
          {TIME_SLOTS.map((slot) => (
            <label key={slot.value}>
              <input
                type="radio"
                name="booking-time"
                value={slot.value}
                defaultChecked={slot.value === selectedSlot}
              />
              <span>{slot.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h2>2. Package and vehicle</h2>
        <p>
          Pick the closest fit. If the vehicle needs a different level of
          service, that can be adjusted before the appointment starts.
        </p>

        <div className="package-options">
          <label className="package-card">
            <input type="radio" name="package" value="signature" defaultChecked />
            <span>
              <strong>Signature Wash</strong>
              <small>Maintenance-focused interior and exterior reset</small>
            </span>
          </label>

          <label className="package-card">
            <input type="radio" name="package" value="correction" />
            <span>
              <strong>Complete Correction</strong>
              <small>Paint improvement plus deeper interior attention</small>
            </span>
          </label>

          <label className="package-card">
            <input type="radio" name="package" value="ceramic" />
            <span>
              <strong>Ceramic Package</strong>
              <small>Correction and longer-lasting protection</small>
            </span>
          </label>
        </div>

        <div className="form-grid">
          <label className="form-group">
            <span>Vehicle make</span>
            <input type="text" name="make" placeholder="BMW" required />
          </label>
          <label className="form-group">
            <span>Vehicle model</span>
            <input type="text" name="model" placeholder="M340i" required />
          </label>
          <label className="form-group">
            <span>Year</span>
            <input
              type="number"
              name="year"
              min={1990}
              max={2035}
              placeholder="2022"
              required
            />
          </label>
          <label className="form-group">
            <span>Color</span>
            <input type="text" name="color" placeholder="Alpine White" />
          </label>
        </div>
      </div>

      <div className="form-section">
        <h2>3. Vehicle condition</h2>
        <p>
          Photos and notes help set expectations before arrival and reduce
          back-and-forth after the form is submitted.
        </p>

        <label className="form-group">
          <span>Upload photos</span>
          <input type="file" name="photos" accept="image/*" multiple />
        </label>

        <label className="form-group">
          <span>Notes or problem areas</span>
          <textarea
            name="notes"
            placeholder="Mention scratches, stains, odors, pet hair, or any area you want prioritized."
          />
        </label>
      </div>

      <div className="form-section">
        <button type="submit" className="btn btn--lg" disabled={isPending}>
          {isPending ? "Requesting..." : "Request Booking"}
        </button>
        <p className="fine-print">
          This form requests an appointment. The slot is confirmed once you
          receive a direct follow-up.
        </p>
      </div>
    </form>
  );
}
