/*
  gallery/page.tsx  (Gallery page — route: "/gallery")
  ─────────────────────────────────────────────────────────────────────────────
  Server Component. Renders the gallery hero, 2-column featured cards,
  and 3-column mosaic grid.
*/

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Gallery | Down To The Detail",
  description:
    "See recent detailing work and the type of finish Down To The Detail aims for across exterior, interior, and protection services.",
};

export default function GalleryPage() {
  return (
    <main id="main-content">

      {/* ── Page Hero (text left, stat cards right) ───────────────────── */}
      <section className="gallery-hero" data-reveal="">
        <div className="page-hero__content">
          <p className="eyebrow">Recent Results</p>
          <h1 className="page-hero__title">
            The finish should look clean in photos, but even better in person.
          </h1>
          <p className="page-hero__lede">
            Browse a few examples of the finish, clarity, and presentation the
            service is built to deliver across exterior, interior, and
            protection work.
          </p>
          <Link className="btn btn--lg" href="/booking">
            Book Your Detail
          </Link>
        </div>

        {/* Right column: category stat cards */}
        <div className="gallery-hero__stats">
          <article>
            <h3>Exterior</h3>
            <p>Safe wash, gloss recovery, and protected finish</p>
          </article>
          <article>
            <h3>Interior</h3>
            <p>Cabin surfaces reset so the car feels cared for again</p>
          </article>
          <article>
            <h3>Protection</h3>
            <p>Sealants and coatings that make upkeep easier afterward</p>
          </article>
        </div>
      </section>

      {/* ── Featured Gallery Grid (2-column) ─────────────────────────── */}
      <section className="gallery-grid" aria-label="Featured work">
        <article className="gallery-card" data-reveal="">
          <img
            src="/img/welcome_img.JPG"
            alt="Finished vehicle after full detail"
          />
          <div className="gallery-card__body">
            <p className="eyebrow">Full Detail</p>
            <h3>Gloss, clarity, and a proper final presentation</h3>
            <p>
              The goal is a finish that looks deeper, more even, and properly
              refined from every angle.
            </p>
          </div>
        </article>

        <article className="gallery-card" data-reveal="">
          <img
            src="/img/protection_img.jpg"
            alt="Protective coating being applied to vehicle paint"
          />
          <div className="gallery-card__body">
            <p className="eyebrow">Protection</p>
            <h3>
              Protection work that supports the finish after the appointment
            </h3>
            <p>
              Sealants and coating packages help preserve gloss, improve water
              behavior, and simplify maintenance after delivery.
            </p>
          </div>
        </article>
      </section>

      {/* ── Mosaic Grid (3-column) ─────────────────────────────────────── */}
      <section className="gallery-mosaic" aria-label="Detailing stages">
        <article className="gallery-mosaic__card" data-reveal="">
          <img
            src="/img/exteriorw_img.jpg"
            alt="Exterior wash stage of a detail"
          />
          <p className="eyebrow">Exterior Reset</p>
          <h3>Starts with a safe wash and proper wheel cleanup.</h3>
          <p>
            The wash stage matters because it sets up everything after it.
            Safe contact, patient drying, and attention to the dirty areas
            make the rest of the detail more effective.
          </p>
        </article>

        <article className="gallery-mosaic__card" data-reveal="">
          <img
            src="/img/interiorw_img.jpg"
            alt="Interior cleaning stage of a detail"
          />
          <p className="eyebrow">Interior Work</p>
          <h3>Cabin cleanup that improves how the vehicle feels to use.</h3>
          <p>
            Daily driving shows up quickly inside the cabin, so this stage
            focuses on the areas customers notice most every time they get in.
          </p>
        </article>

        <article className="gallery-mosaic__card" data-reveal="">
          <img
            src="/img/protection_img.jpg"
            alt="Paint protection treatment being applied"
          />
          <p className="eyebrow">Finish Protection</p>
          <h3>
            Protection chosen to make maintenance easier after delivery.
          </h3>
          <p>
            A quality finish should stay easier to clean and hold its gloss
            longer between appointments.
          </p>
        </article>
      </section>

    </main>
  );
}
