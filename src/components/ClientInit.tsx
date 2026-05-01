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
     and adds "is-visible" when it scrolls into the viewport, triggering the
     CSS transition.

  3. Sets up a MutationObserver so Fast Refresh and client-side route updates
     can safely add new [data-reveal] elements without leaving them hidden.

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

    const observedItems = new WeakSet<Element>();
    const visibleClass = "is-visible";

    const revealImmediatelyIfVisible = (item: Element) => {
      const rect = item.getBoundingClientRect();
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
        item.classList.add(visibleClass);
        return true;
      }

      return false;
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger the CSS transition by adding the visible class
            entry.target.classList.add(visibleClass);
            // Stop watching once it's revealed — it only needs to animate once
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 } // reveal when 18% of the element is in view
    );

    const observeRevealItems = () => {
      const revealItems = document.querySelectorAll<Element>("[data-reveal]");

      revealItems.forEach((item) => {
        if (item.classList.contains(visibleClass) || observedItems.has(item)) {
          return;
        }

        observedItems.add(item);

        if (!revealImmediatelyIfVisible(item)) {
          intersectionObserver.observe(item);
        }
      });
    };

    observeRevealItems();

    const mutationObserver = new MutationObserver(() => {
      observeRevealItems();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup: disconnect the old observer before the next effect run
    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]); // re-run whenever the page route changes

  // This component has no visible output
  return null;
}
