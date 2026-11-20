"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A surface that tilts very slightly toward the pointer and lifts its
 * highlight to match. The rotation is clamped to ±1.2° — enough to read as
 * physical depth, far below the "wobbly card" threshold.
 *
 * All work happens through CSS custom properties on one node, so moving the
 * pointer never triggers a React render. Disabled for touch and for
 * visitors who prefer reduced motion.
 */
export function TiltSurface({
  children,
  className,
  max = 1.2,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const frame = useRef(0);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || reduced) return;
    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    if (frame.current) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const r = el.getBoundingClientRect();
      const px = (clientX - r.left) / r.width;
      const py = (clientY - r.top) / r.height;

      el.style.setProperty("--tilt-x", `${(0.5 - py) * max * 2}deg`);
      el.style.setProperty("--tilt-y", `${(px - 0.5) * max * 2}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn("tilt-surface", className)}
      style={
        {
          "--tilt-max": `${max}deg`,
        } as React.CSSProperties
      }
    >
      <div className="tilt-surface__inner">{children}</div>
      {glare && <span aria-hidden="true" className="tilt-surface__glare" />}
    </motion.div>
  );
}

/**
 * Section wrapper that owns the vertical rhythm and an optional hairline
 * divider. Using one component keeps spacing consistent end to end.
 */
export function Section({
  id,
  children,
  className,
  density = "lg",
  divider = true,
  labelledBy,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  density?: "lg" | "md";
  divider?: boolean;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative",
        density === "lg" ? "section-lg" : "section-md",
        divider && "section-divider",
        className
      )}
    >
      {children}
    </section>
  );
}
