"use client";

/*
  Header.tsx
  ─────────────────────────────────────────────────────────────────────────────
  The site-wide sticky navigation header.

  Why "use client"?
  This component needs two browser-only features:
    - useState  to toggle the mobile nav open/closed
    - usePathname  to know which route is active (for aria-current="page")

  How the mobile nav works:
    - On screens ≤ 860px (see globals.css) the .nav-wrap is hidden with
      `display: none` and a hamburger button appears.
    - Clicking the button toggles `isOpen` state, which adds/removes the
      CSS class "is-open" on the <header> element.
    - The CSS rule `.site-header.is-open .nav-wrap { display: flex }` then
      shows the dropdown panel.
    - When the user navigates to a new page, the useEffect closes the nav
      automatically so it isn't left open on the next page.

  Active nav link:
    - usePathname() returns the current URL path (e.g. "/services").
    - We compare it against each link's href and set aria-current="page"
      when they match.
    - The CSS rule `.nav-links a[aria-current="page"]` applies the filled
      orange gradient pill style to the active link.
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { signOutAction } from "@/lib/actions/auth";

// Central list of nav links — add or rename routes here
const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Close the mobile nav whenever the user navigates to a new page
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`site-header${isOpen ? " is-open" : ""}`}>
      <div className="site-header__inner">
        {/* Brand / logo — always links back to the homepage */}
        <Link className="brand" href="/" aria-label="Down To The Detail home">
          <span className="brand__name">Down To The Detail</span>
          <span className="brand__tag">Premium Auto Detailing</span>
        </Link>

        {/* Hamburger toggle — only visible on mobile (CSS hides it on desktop) */}
        <button
          className="nav-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* Three bars — CSS transforms these into an X when is-open is set */}
          <span className="nav-toggle__bar"></span>
          <span className="sr-only">Toggle navigation</span>
        </button>

        {/* Nav container — hidden on mobile until is-open class is applied */}
        <div className="nav-wrap" id="site-nav">
          <nav className="nav-links" aria-label="Primary">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                // aria-current="page" triggers the active pill style in CSS
                aria-current={pathname === href ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="nav-actions">
            <Link className="btn" href="/booking">
              Book a Detail
            </Link>

            {status !== "loading" && (session?.user ? (
              <>
                <Link className="btn btn--secondary" href="/account">
                  My Account
                </Link>
                <form action={signOutAction}>
                  <button className="btn btn--secondary" type="submit">
                    Sign Out
                  </button>
                </form>
              </>
            ) : (
              <Link className="btn btn--secondary" href="/login">
                Sign In
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
