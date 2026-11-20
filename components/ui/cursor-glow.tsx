"use client";

import { useEffect, useRef } from "react";

/**
 * Interactive ambient cursor spotlight.
 *
 * A fixed, decorative lighting layer that sits above the page background and
 * below all content. The pointer position is written straight to CSS custom
 * properties (`--glow-x` / `--glow-y`) inside a requestAnimationFrame loop, so
 * moving the mouse causes **zero React re-renders** — it is pure style
 * mutation on one node.
 *
 * Behaviour:
 *  • Fine pointer (mouse)      → glow follows with exponential interpolation.
 *  • Touch / coarse pointer    → one quiet static ambient glow, no tracking.
 *  • prefers-reduced-motion    → same static glow, no movement at all.
 *
 * The rAF loop parks itself as soon as the glow has settled, so an idle page
 * costs nothing. Interpolation is frame-rate independent (delta-time eased),
 * which keeps the motion fluid without lag or jitter.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Mutable animation state — deliberately outside React. */
    const s = {
      x: 0, // rendered position
      y: 0,
      tx: 0, // target position
      ty: 0,
      o: 0, // rendered opacity
      to: 0, // target opacity
      raf: 0,
      last: 0,
      seeded: false, // has the first pointer position been applied?
    };

    const EASE = 0.16; // per 60fps frame, converted to real dt in tick()
    const SETTLE_POSITION = 0.1; // px
    const SETTLE_OPACITY = 0.004;

    const paint = () => {
      el.style.setProperty("--glow-x", `${s.x.toFixed(2)}px`);
      el.style.setProperty("--glow-y", `${s.y.toFixed(2)}px`);
      el.style.opacity = s.o.toFixed(3);
    };

    const tick = (now: number) => {
      // Clamp dt so a backgrounded tab can't cause a jump on return.
      const dt = s.last ? Math.min(64, now - s.last) : 16.667;
      s.last = now;

      // Frame-rate independent easing: same feel at 60/90/120Hz.
      const k = 1 - Math.pow(1 - EASE, dt / 16.667);

      s.x += (s.tx - s.x) * k;
      s.y += (s.ty - s.y) * k;
      s.o += (s.to - s.o) * k;
      paint();

      const moving =
        Math.abs(s.tx - s.x) + Math.abs(s.ty - s.y) > SETTLE_POSITION;
      const fading = Math.abs(s.to - s.o) > SETTLE_OPACITY;

      if (moving || fading) {
        s.raf = window.requestAnimationFrame(tick);
      } else {
        // Snap to the exact target, paint once, then park the loop.
        s.x = s.tx;
        s.y = s.ty;
        s.o = s.to;
        paint();
        s.raf = 0;
      }
    };

    const start = () => {
      if (s.raf) return;
      s.last = 0;
      s.raf = window.requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      s.tx = event.clientX;
      s.ty = event.clientY;

      // First movement: appear under the cursor instead of flying in from 0,0.
      if (!s.seeded) {
        s.seeded = true;
        s.x = s.tx;
        s.y = s.ty;
      }

      s.to = 1;
      start();
    };

    const onPointerLeave = () => {
      if (!s.seeded) return;
      s.to = 0;
      start();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        // Drop the loop entirely while hidden; nothing to animate.
        if (s.raf) window.cancelAnimationFrame(s.raf);
        s.raf = 0;
        s.last = 0;
      } else if (s.o !== s.to) {
        start();
      }
    };

    let tracking = false;

    const stopTracking = () => {
      if (!tracking) return;
      tracking = false;
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (s.raf) window.cancelAnimationFrame(s.raf);
      s.raf = 0;
      s.seeded = false;
      s.o = 0;
      s.to = 0;
      el.style.opacity = "0";
      el.style.removeProperty("--glow-x");
      el.style.removeProperty("--glow-y");
    };

    const startTracking = () => {
      if (tracking) return;
      tracking = true;
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      window.addEventListener("blur", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibilityChange);
    };

    const apply = () => {
      stopTracking();

      if (finePointer.matches && !reducedMotion.matches) {
        el.dataset.mode = "pointer";
        startTracking();
      } else {
        // Touch devices and reduced-motion visitors get one calm, static pool
        // of light — set entirely from the CSS fallbacks, no JS motion.
        el.dataset.mode = "static";
        el.style.opacity = "1";
      }
    };

    apply();

    finePointer.addEventListener("change", apply);
    reducedMotion.addEventListener("change", apply);

    return () => {
      finePointer.removeEventListener("change", apply);
      reducedMotion.removeEventListener("change", apply);
      stopTracking();
    };
  }, []);

  return (
    <div ref={ref} className="ambient-light" aria-hidden="true" data-mode="idle">
      {/* Continuous page lattice — the surface the light reveals */}
      <div className="ambient-light__lattice" />
      {/* Wide ambient bloom */}
      <div className="ambient-light__field" />
      {/* Brighter pool at the centre */}
      <div className="ambient-light__core" />
      {/* Grid lattice, revealed only where the light falls */}
      <div className="ambient-light__grid" />
    </div>
  );
}
