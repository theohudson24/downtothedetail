/*
  membership/page.tsx  (Membership page — route: "/membership")
  ─────────────────────────────────────────────────────────────────────────────
  Server Component. Renders the Monthly Care Club hero, perks grid,
  inclusions list, and membership vs. one-time comparison section.
*/

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership | Down To The Detail",
  description:
    "See the monthly membership plan for recurring vehicle care, priority scheduling, and a cleaner maintenance routine.",
};

export default function MembershipPage() {
  return (
    <main id="main-content">

      {/* ── Page Hero (price + features left, card right) ─────────────── */}
      <section className="membership-hero" data-reveal="">
        <div className="page-hero__content">
          <p className="eyebrow">Monthly Care Club</p>
          <h1 className="page-hero__title">
            For owners who want their vehicle consistently clean and protected.
          </h1>
          <p className="page-hero__lede">
            Designed for clients who want consistent upkeep, easier
            scheduling, and fewer large reset appointments over time.
          </p>

          {/* Large price display */}
          <div className="membership-price">
            <span className="membership-price__value">$129/mo</span>
            <span className="membership-price__note">
              Pause or cancel when needed
            </span>
          </div>

          {/* Quick summary checklist */}
          <ul className="membership-checklist">
            <li>Bi-weekly maintenance washes with an interior refresh</li>
            <li>Priority access to high-demand booking windows</li>
            <li>
              Protection top-ups to keep finishes easier to maintain
            </li>
            <li>Member pricing on larger enhancement services</li>
          </ul>

          <Link className="btn btn--lg" href="/booking">
            Join the Membership
          </Link>
        </div>

        {/* Right card: breakdown of what the monthly cadence includes */}
        <aside className="membership-hero__card">
          <h2>What the monthly cadence includes</h2>
          <ul>
            <li>
              <strong>2 regular visits</strong>
              <span>
                Exterior wash, wheel reset, interior touch-up, glass clean
              </span>
            </li>
            <li>
              <strong>1 protection refresh</strong>
              <span>
                Sealant maintenance to preserve gloss and easier rinsing
              </span>
            </li>
            <li>
              <strong>Priority scheduling</strong>
              <span>
                Faster rebooking when weather or life shifts your plans
              </span>
            </li>
            <li>
              <strong>Direct communication</strong>
              <span>
                Simple reminders and quick changes without extra friction
              </span>
            </li>
          </ul>
        </aside>
      </section>

      {/* ── Perks (3-column grid) ─────────────────────────────────────── */}
      <section className="membership-perks" aria-label="Membership perks">
        <article data-reveal="">
          <p className="eyebrow">Consistency</p>
          <h3>Less buildup, less catch-up work</h3>
          <p>
            Vehicles kept on a steady schedule stay glossier, cleaner, and
            easier to protect than cars that wait until they are already
            overdue.
          </p>
        </article>

        <article data-reveal="">
          <p className="eyebrow">Value</p>
          <h3>A more predictable monthly spend</h3>
          <p>
            Instead of paying for large resets over and over, membership
            spreads the maintenance cost into a routine that is easier to
            manage.
          </p>
        </article>

        <article data-reveal="">
          <p className="eyebrow">Convenience</p>
          <h3>You stay ahead of the mess</h3>
          <p>
            Priority access and recurring care remove the usual scramble to
            find a slot only after the vehicle already feels neglected.
          </p>
        </article>
      </section>

      {/* ── Included Work (3-column) ──────────────────────────────────── */}
      <section
        className="membership-inclusions"
        aria-labelledby="inclusions-title"
      >
        <div className="section-intro" data-reveal="">
          <p className="eyebrow">Included Work</p>
          <h2 id="inclusions-title" className="section-title">
            What members get beyond a basic wash.
          </h2>
        </div>

        <div className="membership-inclusions__list">
          <article data-reveal="">
            <h3>Exterior Essentials</h3>
            <ul>
              <li>
                Safe wash method with wheels and tires addressed properly
              </li>
              <li>
                Spot tar and bug cleanup before buildup becomes permanent
              </li>
              <li>
                Drying and finish aid chosen to support existing protection
              </li>
            </ul>
          </article>

          <article data-reveal="">
            <h3>Interior Upkeep</h3>
            <ul>
              <li>
                Vacuuming, wipe-downs, and touch-point cleanup every visit
              </li>
              <li>
                Glass and trim refreshed so the cabin feels truly reset
              </li>
              <li>
                Focused attention on the areas daily driving wears down
                fastest
              </li>
            </ul>
          </article>

          <article data-reveal="">
            <h3>Member Extras</h3>
            <ul>
              <li>
                Discounted upgrades when the vehicle needs more than
                maintenance
              </li>
              <li>Seasonal reminders and easier rebooking windows</li>
              <li>
                A better protection rhythm for clients who drive often
              </li>
            </ul>
          </article>
        </div>
      </section>

      {/* ── Membership vs. One-Time Comparison ────────────────────────── */}
      {/*
        .membership-compare is a 2-column grid: dark explanatory column left,
        side-by-side panel cards right. Collapses to 1 column on tablet.
      */}
      <section
        className="membership-compare"
        aria-labelledby="compare-title"
      >
        {/* Dark left column */}
        <div className="membership-compare__column" data-reveal="">
          <p className="eyebrow">Why It Works</p>
          <h2 id="compare-title" className="section-title">
            The difference is the cadence.
          </h2>
          <p>
            One-time appointments help, but they do not solve the problem of
            neglect between visits. Membership keeps the vehicle on a schedule
            that prevents that drop-off.
          </p>
          <ul className="check-list">
            <li>Better finish retention over time</li>
            <li>Fewer large correction resets</li>
            <li>Faster access when you need to reschedule</li>
          </ul>
        </div>

        {/* Right: two comparison cards side by side */}
        <div className="membership-compare__panel">
          <div data-reveal="">
            <h3>Membership</h3>
            <p className="price">$129/mo</p>
            <ul>
              <li>Recurring visits built in</li>
              <li>Priority access to future openings</li>
              <li>More predictable long-term upkeep</li>
            </ul>
          </div>

          <div data-reveal="">
            <h3>One-Time Detail</h3>
            <p className="price">$250+</p>
            <ul>
              <li>Best for occasional reset needs</li>
              <li>Must book from scratch each time</li>
              <li>More likely to fall behind between visits</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  );
}
