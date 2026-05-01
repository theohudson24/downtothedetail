"use client";

/*
  BookingCalendar.tsx
  ─────────────────────────────────────────────────────────────────────────────
  Renders the date-picker row inside the booking form.

  Why "use client"?
  - Date generation uses new Date(), which must run in the browser so the
    dates are relative to the user's local time, not the server's build time.
  - useState tracks which date card is currently selected.

  How it works:
  - Generates the next 6 upcoming weekdays (skips Sundays; the original also
    skips Sundays only — Saturdays are included as valid days).
  - Each day renders as a <label> containing a hidden radio input. Clicking
    the label selects that date. The CSS rule
      `.calendar-day:has(input:checked)` highlights the selected card.
  - The first date is pre-selected and labelled "Earliest opening"; the rest
    say "Preferred day" — matching the original site's behavior.

  When the booking backend is wired up, you'll read the selected date from
  the form's FormData on submit (the input name is "booking-date").
*/

import { useState } from "react";

// Build a formatted date label: "Mon Jan 1" split into weekday + month/day
const formatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});

function getUpcomingWeekdays(count = 6): Date[] {
  const days: Date[] = [];
  // Set to noon to avoid DST edge cases causing the date to shift
  const cursor = new Date();
  cursor.setHours(12, 0, 0, 0);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    // 0 = Sunday — skip it; Saturday (6) is allowed
    if (cursor.getDay() !== 0) {
      days.push(new Date(cursor));
    }
  }
  return days;
}

export default function BookingCalendar({
  initialDate,
}: {
  initialDate?: string;
}) {
  const days = getUpcomingWeekdays();
  const values = days.map((day) => day.toISOString().split("T")[0]);

  // ISO date string of the currently selected day (e.g. "2026-05-01")
  const [selected, setSelected] = useState(
    initialDate && values.includes(initialDate) ? initialDate : values[0]
  );

  return (
    <div className="booking-calendar" aria-label="Choose a day">
      {days.map((day, index) => {
        const value = values[index];

        // "Mon, Jan 1" → split on ", " to get weekday and monthDay separately
        const formatted = formatter.format(day); // e.g. "Mon, Jan 1"
        const commaIndex = formatted.indexOf(", ");
        const weekday = commaIndex >= 0 ? formatted.slice(0, commaIndex) : formatted;
        const monthDay = commaIndex >= 0 ? formatted.slice(commaIndex + 2) : "";

        return (
          <label key={value} className="calendar-day">
            <input
              type="radio"
              name="booking-date"
              value={value}
              checked={selected === value}
              onChange={() => setSelected(value)}
            />
            <span>
              {weekday} {monthDay}
              {/* Helper text below the date */}
              <small>{index === 0 ? "Earliest opening" : "Preferred day"}</small>
            </span>
          </label>
        );
      })}
    </div>
  );
}
