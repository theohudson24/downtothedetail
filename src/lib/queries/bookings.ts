/*
  lib/queries/bookings.ts  —  Read-only database queries for bookings
  ─────────────────────────────────────────────────────────────────────────────
  These are plain async functions (not Server Actions). They can be called
  from Server Components and Server Actions alike.

  WHY SEPARATE FROM ACTIONS?
  Actions = write operations (create, update, cancel).
  Queries = read operations (select, fetch). Keeping them separate makes it
  easier to find where data is read vs. where it changes.
*/

import { db } from "@/lib/db"

// All valid time slots — used to build availability grids
export const TIME_SLOTS = [
  { value: "08:00", label: "8:00 AM – 11:00 AM" },
  { value: "11:30", label: "11:30 AM – 2:30 PM" },
  { value: "15:00", label: "3:00 PM – 6:00 PM" },
  { value: "after-hours", label: "After-hours drop-off" },
]

// The type returned for each booking in the user's account
export type BookingRecord = {
  id: string
  date: string
  timeSlot: string
  package: string
  make: string
  model: string
  year: number
  color: string | null
  notes: string | null
  status: string
  createdAt: Date
}

// ── Get all booked slots for a date range ────────────────────────────────────

/*
  Returns a flat list of { date, timeSlot } pairs that are already taken
  (status is not "cancelled"). Used by the booking form and calendar to
  visually disable unavailable slots.
*/
export async function getBookedSlots(
  fromDate: string, // "YYYY-MM-DD"
  toDate: string    // "YYYY-MM-DD"
): Promise<{ date: string; timeSlot: string }[]> {
  const bookings = await db.booking.findMany({
    where: {
      date: { gte: fromDate, lte: toDate },
      status: { not: "cancelled" },
    },
    select: { date: true, timeSlot: true },
  })
  return bookings
}

// ── Get all bookings for a specific user ─────────────────────────────────────

/*
  Returns all bookings for the given userId, sorted newest first.
  Used on the account dashboard to show booking history.
*/
export async function getUserBookings(userId: string): Promise<BookingRecord[]> {
  const bookings = await db.booking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      date: true,
      timeSlot: true,
      package: true,
      make: true,
      model: true,
      year: true,
      color: true,
      notes: true,
      status: true,
      createdAt: true,
    },
  })
  return bookings
}

// ── Build the calendar availability grid ─────────────────────────────────────

/*
  Returns the next N upcoming weekdays (Mon–Sat) as "YYYY-MM-DD" strings,
  paired with availability information for each slot.

  Example return value:
  [
    {
      date: "2026-05-01",
      displayDate: "Fri May 1",
      slots: [
        { value: "08:00", label: "8:00 AM – 11:00 AM", isAvailable: true },
        { value: "11:30", label: "11:30 AM – 2:30 PM", isAvailable: false },
        ...
      ]
    },
    ...
  ]
*/
export async function getCalendarData(daysAhead = 14) {
  // Generate upcoming weekdays (skip Sundays)
  const days: string[] = []
  const cursor = new Date()
  cursor.setHours(12, 0, 0, 0)

  while (days.length < daysAhead) {
    cursor.setDate(cursor.getDate() + 1)
    if (cursor.getDay() !== 0) { // 0 = Sunday
      days.push(cursor.toISOString().split("T")[0])
    }
  }

  const fromDate = days[0]
  const toDate = days[days.length - 1]

  // Single query for all booked slots in the range
  const bookedSlots = await getBookedSlots(fromDate, toDate)

  // Build the grid
  const bookedSet = new Set(bookedSlots.map((s) => `${s.date}|${s.timeSlot}`))

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })

  return days.map((date) => {
    // Parse date as local noon to avoid DST shifts
    const d = new Date(`${date}T12:00:00`)
    return {
      date,
      displayDate: formatter.format(d),
      slots: TIME_SLOTS.map((slot) => ({
        ...slot,
        isAvailable: !bookedSet.has(`${date}|${slot.value}`),
      })),
    }
  })
}

// ── Format helpers ────────────────────────────────────────────────────────────

// Human-readable package names (values stored in DB → display labels)
export function formatPackage(pkg: string): string {
  const labels: Record<string, string> = {
    signature: "Signature Wash",
    correction: "Complete Correction",
    ceramic: "Ceramic Package",
  }
  return labels[pkg] ?? pkg
}

// Human-readable time slot labels
export function formatTimeSlot(slot: string): string {
  return TIME_SLOTS.find((s) => s.value === slot)?.label ?? slot
}

// Friendly date display from "YYYY-MM-DD"
export function formatDate(dateStr: string): string {
  const d = new Date(`${dateStr}T12:00:00`)
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d)
}
