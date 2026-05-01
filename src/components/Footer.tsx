/*
  Footer.tsx
  ─────────────────────────────────────────────────────────────────────────────
  Site-wide footer. This is a Server Component (no "use client" directive)
  because it has no interactivity — it just renders static markup.

  The current year is computed at render time using new Date().getFullYear().
  In Next.js, Server Components run on the server, so this value is baked
  into the HTML on each build/request rather than being patched in by JS
  after the page loads (which is how the original site worked).
*/

import Link from "next/link";

export default function Footer() {
  // Computed server-side — no JS needed in the browser for this
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          &copy; {year} Down To The Detail. Clean work, clear standards.
        </p>

        <div className="site-footer__links">
          <Link href="/services">Services</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/booking">Booking</Link>
        </div>
      </div>
    </footer>
  );
}
