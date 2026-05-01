/*
  page.tsx  (Homepage — route: "/")
  ─────────────────────────────────────────────────────────────────────────────
  This is a Server Component (no "use client"). It renders pure HTML with no
  browser-side JavaScript. Interactivity on this page (scroll reveal) is
  handled by ClientInit.tsx which runs globally in the layout.

  Key JSX differences from the original HTML:
    - `class` → `className`
    - `href="services.html"` → `href="/services"` (Next.js routes, no extensions)
    - `src="img/..."` → `src="/img/..."` (files in /public are served from "/")
    - `data-reveal` attributes trigger the CSS scroll animations via ClientInit
*/

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Down To The Detail | Premium Auto Detailing",
  description:
    "Premium interior, exterior, and protection detailing with a cleaner booking flow and a more polished customer experience.",
};

export default function HomePage() {
  return (
    <main id="main-content">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__content" data-reveal="">
          <p className="eyebrow">Sharp finish. Zero shortcuts.</p>
          <h1 className="hero__title">
            Detailing that makes your car feel new again.
          </h1>
          <p className="hero__lede">
            Down To The Detail delivers hands-on exterior, interior, and
            protection services built for owners who value the difference.
            Every appointment is owner-performed, carefully paced, and focused
            on long-term results instead of a quick shine.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--lg" href="/booking">
              Start Your Booking
            </Link>
            <Link className="btn btn--secondary btn--lg" href="/services">
              View Packages
            </Link>
          </div>
        </div>

        <div className="hero__media" data-reveal="">
          {/* Image lives in /public/img/ — referenced as /img/ at runtime */}
          <img
            src="/img/welcome_img.JPG"
            alt="Freshly detailed vehicle in natural light"
          />
        </div>
      </section>

      {/* ── Business Highlights (3 cards) ────────────────────────────────── */}
      <section className="home-highlights" aria-label="Business highlights">
        <article className="home-highlight" data-reveal="">
          <h3>Owner-operated service</h3>
          <p>
            Every appointment is handled directly from first contact through
            final delivery.
          </p>
        </article>

        <article className="home-highlight" data-reveal="">
          <h3>Complete detailing care</h3>
          <p>
            Interior, exterior, correction, and protection services are built
            into a clear menu.
          </p>
        </article>

        <article className="home-highlight" data-reveal="">
          <h3>Clear communication</h3>
          <p>
            Expect straightforward recommendations, organized scheduling, and
            fast follow-up.
          </p>
        </article>
      </section>

      {/* ── 3-Step Process ───────────────────────────────────────────────── */}
      <section className="process" aria-labelledby="process-title">
        <div className="section-intro" data-reveal="">
          <p className="eyebrow">The Process</p>
          <h2 id="process-title" className="section-title">
            A cleaner experience from first rinse to final wipe-down.
          </h2>
          <p className="muted-copy">
            Every appointment follows a straightforward process designed to
            protect the vehicle, improve the finish, and make ongoing
            maintenance easier.
          </p>
        </div>

        <div className="process__steps">
          <article className="step" data-reveal="">
            <span className="badge">Step 1</span>
            <img
              src="/img/exteriorw_img.jpg"
              alt="Exterior wash in progress"
            />
            <h3>Reset the exterior</h3>
            <p>
              Safe wash methods, wheel cleaning, and decontamination prep
              remove the grime that dulls paint fast.
            </p>
          </article>

          <article className="step" data-reveal="">
            <span className="badge">Step 2</span>
            <img
              src="/img/interiorw_img.jpg"
              alt="Interior cleaning in progress"
            />
            <h3>Refresh the cabin</h3>
            <p>
              High-touch areas, glass, carpets, and trim get a focused interior
              reset that improves how the whole car feels.
            </p>
          </article>

          <article className="step" data-reveal="">
            <span className="badge">Step 3</span>
            <img
              src="/img/protection_img.jpg"
              alt="Paint protection treatment being applied"
            />
            <h3>Lock in the finish</h3>
            <p>
              Sealants and protection options keep gloss up, cleanup easier,
              and maintenance more predictable between visits.
            </p>
          </article>
        </div>
      </section>

      {/* ── CTA + "Good Fit If" Sidebar ──────────────────────────────────── */}
      <section className="cta" aria-labelledby="cta-title">
        <div className="cta__card" data-reveal="">
          <p className="eyebrow">Ready When You Are</p>
          <h2 id="cta-title" className="section-title">
            Book once, or build a routine that keeps the car looking right
            year-round.
          </h2>
          <p>
            Start with a single appointment, or move into a maintenance plan if
            you want the vehicle kept at a consistently high standard.
          </p>
          <div className="cta__actions">
            <Link className="btn btn--lg" href="/booking">
              Request Booking
            </Link>
            <Link className="btn btn--secondary btn--lg" href="/membership">
              See Membership
            </Link>
          </div>
        </div>

        <aside className="quick-note" data-reveal="">
          <p className="eyebrow">Good Fit If</p>
          <h3>
            You want a more thoughtful detail than a volume wash can deliver.
          </h3>
          <p>
            This setup is built for customers who care about paint condition,
            cabin cleanliness, and a process that feels organized from the first
            click.
          </p>
          <ul className="quick-note__list">
            <li>You want more than a basic wash-and-go result</li>
            <li>You care about how the vehicle feels inside and out</li>
            <li>
              You want clearer communication before booking and delivery
            </li>
          </ul>
          <Link className="btn btn--secondary btn--lg" href="/services">
            Compare Services
          </Link>
        </aside>
      </section>

    </main>
  );
}
