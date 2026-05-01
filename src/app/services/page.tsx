/*
  services/page.tsx  (Services page — route: "/services")
  ─────────────────────────────────────────────────────────────────────────────
  Server Component. Renders the service package cards and FAQ section.

  The .service-card--featured class applies a warm tinted background and
  an accent border to the "Complete Correction" card — defined in globals.css.
*/

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services | Down To The Detail",
  description:
    "Explore the detailing packages available at Down To The Detail, from routine maintenance washes to correction and ceramic protection.",
};

export default function ServicesPage() {
  return (
    <main id="main-content">

      {/* ── Page Hero (two-column: intro text + guidance note) ─────────── */}
      <section className="services-hero" data-reveal="">
        <div className="page-hero__content">
          <p className="eyebrow">Detailing Menu</p>
          <h1 className="page-hero__title">
            Packages built around how you use your vehicle.
          </h1>
          <p className="page-hero__lede">
            Choose maintenance if your vehicle is already in solid condition,
            correction if the finish needs visible improvement, or ceramic
            protection if you want the longest-lasting result.
          </p>
        </div>

        {/* Right sidebar: quick guidance for choosing the right package */}
        <aside className="services-hero__note">
          <h2>Not sure which package fits?</h2>
          <p>
            Book the closest match. If the paint or interior condition suggests
            a better option, you&apos;ll get that recommendation before work starts.
          </p>
          <ul className="services-hero__list">
            <li>Choose maintenance for regularly kept vehicles</li>
            <li>Choose correction when the paint needs real improvement</li>
            <li>Choose ceramic if long-term protection is the priority</li>
          </ul>

          <div className="services-hero__meta">
            <strong>Quick guidance</strong>
            <span>
              Most consultation requests can be confirmed with a direct
              follow-up the same day.
            </span>
          </div>

          <div className="services-hero__meta">
            <strong>What happens next</strong>
            <span>
              After you submit, you will get a recommendation on the right
              package, expected timing, and anything to prepare before arrival.
            </span>
          </div>

          <Link className="btn btn--lg" href="/booking">
            Book a Consultation
          </Link>
        </aside>
      </section>

      {/* ── Service Cards (3-column grid) ─────────────────────────────── */}
      <section className="services-grid" aria-label="Service packages">

        {/* Signature Wash */}
        <article className="service-card" data-reveal="">
          <div className="service-card__header">
            <p className="eyebrow">Maintenance</p>
            <h2>Signature Wash</h2>
            <p className="price">Starting at $150</p>
          </div>
          <p className="service-card__summary">
            Best for regularly maintained vehicles that need a thorough reset
            without a major correction session.
          </p>
          <ul>
            <li>Foam pre-soak, hand wash, wheel faces, and tire dressing</li>
            <li>Interior vacuum, dash wipe-down, and streak-free glass</li>
            <li>Short-term paint protection for gloss and easier upkeep</li>
            <li>
              Ideal for routine maintenance between larger detail sessions
            </li>
          </ul>
          <Link className="btn btn--block" href="/booking">
            Book Signature Wash
          </Link>
        </article>

        {/* Complete Correction — featured card (accent border + warm bg) */}
        <article className="service-card service-card--featured" data-reveal="">
          <div className="service-card__header">
            <p className="eyebrow">Most Requested</p>
            <h2>Complete Correction</h2>
            <p className="price">Starting at $495</p>
          </div>
          <p className="service-card__summary">
            Built for neglected or swirl-heavy vehicles that need visible paint
            improvement plus a full interior reset.
          </p>
          <ul>
            <li>Wash, clay, iron removal, and prep for polishing</li>
            <li>Paint correction to reduce swirls, haze, and oxidation</li>
            <li>
              Interior deep clean with trim, glass, and fabric attention
            </li>
            <li>
              Longer-lasting sealant to keep the finish looking sharper
            </li>
          </ul>
          <Link className="btn btn--block" href="/booking">
            Reserve Correction
          </Link>
        </article>

        {/* Ceramic Package */}
        <article className="service-card" data-reveal="">
          <div className="service-card__header">
            <p className="eyebrow">Protection</p>
            <h2>Ceramic Package</h2>
            <p className="price">Starting at $995</p>
          </div>
          <p className="service-card__summary">
            The right choice if you want correction plus serious long-term
            protection and easier maintenance afterward.
          </p>
          <ul>
            <li>Full prep and correction before coating application</li>
            <li>
              Ceramic protection for paint, wheels, and trim as needed
            </li>
            <li>Hydrophobic finish with stronger gloss retention</li>
            <li>
              Aftercare guidance to keep the coating performing properly
            </li>
          </ul>
          <Link className="btn btn--block" href="/booking">
            Schedule Ceramic Service
          </Link>
        </article>

      </section>

      {/* ── FAQ Section ────────────────────────────────────────────────── */}
      {/*
        .services-faq uses a 2-column grid: section-intro on the left,
        FAQ list on the right — see globals.css for the layout rule.
      */}
      <section className="services-faq" aria-labelledby="services-faq-title">
        <div className="section-intro" data-reveal="">
          <p className="eyebrow">Booking Questions</p>
          <h2 id="services-faq-title" className="section-title">
            The practical details people usually want before committing.
          </h2>
          <p className="muted-copy">
            Clear answers upfront make it easier to choose the right service
            and arrive prepared.
          </p>
        </div>

        <div className="services-faq__list">
          <article data-reveal="">
            <h3>How long does each service take?</h3>
            <p>
              Most maintenance appointments land around 2 to 3 hours. Larger
              correction or ceramic work can stretch to a full day or longer,
              depending on paint condition.
            </p>
          </article>

          <article data-reveal="">
            <h3>Do I need to prep the car before I arrive?</h3>
            <p>
              Just remove personal items and anything fragile. That keeps the
              detail focused on the surfaces that need work.
            </p>
          </article>

          <article data-reveal="">
            <h3>What if I book the wrong package?</h3>
            <p>
              That&apos;s fine. The vehicle can be reassessed on arrival and the
              service can be adjusted before work begins.
            </p>
          </article>
        </div>
      </section>

    </main>
  );
}
