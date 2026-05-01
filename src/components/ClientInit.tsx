"use client";

/*
  ClientInit.tsx
  ─────────────────────────────────────────────────────────────────────────────
  This component renders nothing to the DOM (returns null), but it runs two
  critical side-effects on the client:

  1. Adds the "js" class to <html> so that CSS-based scroll-reveal animations
     can safely hide elements before they're observed. The CSS rule is:
       .js [data-reveal] { opacity: 0; transform: translateY(24px); }
     Without the "js" class, all elements are always visible — a safe fallback
     for users with JavaScript disabled.

  2. Sets up an IntersectionObserver that watches every [data-reveal] element
     and adds "is-visible" when it scrolls into the viewport (at the 18%
     threshold), triggering the CSS transition.

  Why usePathname as a dependency?
  In Next.js App Router the layout stays mounted between page navigations —
  only the page content (children) swaps out. Each new page may have new
  [data-reveal] elements that haven't been observed yet, so we re-run the
  observer setup on every pathname change to catch them.
*/

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientInit() {
  const pathname = usePathname();

  useEffect(() => {
    // Step 1: enable the CSS reveal rules by marking the document as JS-capable
    document.documentElement.classList.add("js");

    // Step 2: find all reveal targets on the current page
    const revealItems = document.querySelectorAll<Element>("[data-reveal]");
    if (revealItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the CSS transition by adding the visible class
            entry.target.classList.add("is-visible");
            // Stop watching once it's revealed — it only needs to animate once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 } // reveal when 18% of the element is in view
    );

    revealItems.forEach((item) => observer.observe(item));

    // Cleanup: disconnect the old observer before the next effect run
    return () => observer.disconnect();
  }, [pathname]); // re-run whenever the page route changes

  // This component has no visible output
  return null;
}
