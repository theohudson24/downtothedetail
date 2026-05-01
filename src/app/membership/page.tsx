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

      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section className="membership-hero" data-reveal="">
        <div className="membership-hero__content">
          <p className="eyebrow">Monthly Care Club</p>
          <h1 className="membership-hero__title">
            Keep the clean-car feeling around longer.
          </h1>
          <p className="membership-hero__lede">
            A simple maintenance rhythm for drivers who want their vehicle to
            stay easier to wash, easier to enjoy, and easier to protect.
          </p>

          <div className="membership-hero__footer">
            <div className="membership-price">
              <span className="membership-price__value">$129</span>
              <span className="membership-price__note">per month</span>
            </div>

            <Link className="btn btn--lg" href="/booking">
              Join the Membership
            </Link>
          </div>

          <p className="membership-hero__fine-print">
            Pause when needed. Best for regularly driven vehicles.
          </p>
        </div>

        {/* Right card: compact teaser for what comes next */}
        <aside className="membership-hero__card">
          <span className="membership-hero__badge">Built for upkeep</span>
          <h2>A quieter way to stay ahead of buildup.</h2>
          <p>
            Members get recurring care, easier scheduling, and small protection
            refreshes before the vehicle starts feeling neglected.
          </p>
          <div className="membership-hero__stats" aria-label="Membership highlights">
            <div>
              <strong>2x</strong>
              <span>regular visits</span>
            </div>
            <div>
              <strong>1x</strong>
              <span>protection refresh</span>
            </div>
          </div>
          <Link className="membership-hero__scroll-link" href="#membership-perks">
            See how it works
          </Link>
        </aside>
      </section>

      {/* ── Perks (3-column grid) ─────────────────────────────────────── */}
      <section
        id="membership-perks"
        className="membership-perks"
        aria-label="Membership perks"
      >
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
