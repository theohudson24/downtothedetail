/*
  about/page.tsx  (About page — route: "/about")
  ─────────────────────────────────────────────────────────────────────────────
  Server Component. Renders the owner intro and story sections.

  The about-intro section uses CSS from the bottom of globals.css (originally
  about.css) — the decorative shape behind the photo and the portrait aspect
  ratio are all handled there.
*/

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Down To The Detail",
  description:
    "Meet the owner behind Down To The Detail and learn how the business approaches premium auto detailing.",
};

export default function AboutPage() {
  return (
    <main id="main-content">

      {/* ── Owner Intro (photo + text side by side) ───────────────────── */}
      <section className="about-intro" data-reveal="">
        <div className="about-intro__text">
          <p className="eyebrow">Meet the Owner</p>
          <h1 className="page-hero__title">
            One person, one standard, no handoff in quality.
          </h1>
          <p>
            Down To The Detail is built around direct, owner-operated work.
            That matters because the customer experience is better when the
            person handling the vehicle is also the person setting the
            standard.
          </p>
          <p>
            Every car is approached with the same mindset: slow down, notice
            the condition honestly, and do the work carefully enough that the
            result lasts.
          </p>
        </div>

        {/*
          The ::before pseudo-element on .about-intro__media creates a tilted
          decorative shape behind the image — defined in globals.css.
        */}
        <div className="about-intro__media">
          <img
            src="/img/welcome_img.JPG"
            alt="Owner of Down To The Detail standing beside detailed vehicle"
          />
        </div>
      </section>

      {/* ── Story + Stat Cards ────────────────────────────────────────── */}
      <section className="about-story" aria-labelledby="story-title">
        <div className="about-story__card" data-reveal="">
          <p className="eyebrow">The Story</p>
          <h2 id="story-title" className="section-title">
            Built from a genuine respect for vehicle care and presentation.
          </h2>
          <p>
            The business started with a genuine interest in keeping vehicles
            clean to a higher standard than the usual quick-service approach.
            That grew into detailing for friends, neighbors, and then into a
            business shaped around pride in the final result.
          </p>
          <p>
            The goal is simple: honest recommendations, better-looking
            finishes, and a process customers can trust from booking through
            delivery.
          </p>
        </div>

        {/* Three small stat/value cards */}
        <aside className="about-story__stats" data-reveal="">
          <article>
            <h3>Owner-led</h3>
            <p>
              Every service is handled directly, so the quality stays
              consistent.
            </p>
          </article>
          <article>
            <h3>Clear scope</h3>
            <p>
              Customers get a better idea of what they are booking and why it
              fits.
            </p>
          </article>
          <article>
            <h3>Long-term care</h3>
            <p>
              The work is designed to support easier upkeep between
              appointments.
            </p>
          </article>
        </aside>
      </section>

    </main>
  );
}
