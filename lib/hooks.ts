"use client";

import { useEffect, useState } from "react";

/** True once the window has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 16): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

/**
 * Tracks which section owns the viewport. Uses a horizontal test line
 * just below the sticky header, so a section becomes "active" as its
 * heading crosses that line — which matches how people read the page.
 */
export function useActiveSection(ids: string[], offset = 140): string {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const line = offset;
      let current = ids[0] ?? "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= line) current = id;
        // Bottom of page: last section stays active.
        if (bottom < line) current = id;
      }

      // If the page is scrolled to the very end, force the last section.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = ids[ids.length - 1] ?? current;
      }

      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [ids, offset]);

  return active;
}

/** Locks page scroll (used by the mobile menu). */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [locked]);
}

/**
 * Pointer-driven spotlight coordinates for cards. Disabled on touch and
 * for visitors who prefer reduced motion.
 */
export function useSpotlight<T extends HTMLElement>() {
  const [style, setStyle] = useState<Record<string, string>>({});

  const onPointerMove = (event: React.PointerEvent<T>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setStyle({
      "--mx": `${event.clientX - rect.left}px`,
      "--my": `${event.clientY - rect.top}px`,
    });
  };

  const onPointerLeave = () => setStyle({});

  return { style, onPointerMove, onPointerLeave };
}
