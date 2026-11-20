"use client";

import { useReducedMotion } from "framer-motion";

/**
 * Hero visual — an exploded isometric view of a software architecture.
 *
 * Three stacked planes read bottom-to-top as data → logic → interface,
 * which is the shape of the work rather than a decorative abstraction.
 * Everything is CSS 3D on plain divs: no images, no canvas, no random
 * values, so server and client render byte-identical markup.
 *
 * The whole composition is decorative and `aria-hidden`; the legend
 * underneath carries the meaning in real text.
 */

const layers = [
  { key: "data", label: "Data", meta: "PostgreSQL · Prisma", z: -210 },
  { key: "logic", label: "Logic", meta: "TypeScript", z: -105 },
  { key: "interface", label: "Interface", meta: "Next.js · React", z: 0 },
];

export function HeroStack() {
  const reduced = useReducedMotion();

  return (
    <div className="hero-stack">
      {/* Ambient pool beneath the stack */}
      <div aria-hidden="true" className="hero-stack__glow" />

      {/* ── Isometric composition (decorative) ───────────────────── */}
      <div aria-hidden="true" className="hero-stack__scene">
        <div
          className="hero-stack__group"
          data-static={reduced ? "true" : undefined}
        >
          {layers.map((layer, i) => (
            <div
              key={layer.key}
              className="hero-stack__layer"
              style={{ transform: `translateZ(${layer.z}px)` }}
            >
              <div
                className={`hero-stack__plane hero-stack__plane--${layer.key}`}
                style={{ animationDelay: `${0.15 + i * 0.12}s` }}
              >
                {/* Inner lattice — reads as a structured surface */}
                <span className="hero-stack__lattice" />

                {/* Nodes on the top plane only, so it draws the eye */}
                {layer.key === "interface" && (
                  <>
                    <span className="hero-stack__node hero-stack__node--a" />
                    <span className="hero-stack__node hero-stack__node--b" />
                    <span className="hero-stack__node hero-stack__node--c" />
                    <span className="hero-stack__edge hero-stack__edge--ab" />
                    <span className="hero-stack__edge hero-stack__edge--bc" />
                  </>
                )}
              </div>
            </div>
          ))}

          {/* Vertical connectors — the "exploded view" dashed rails */}
          <span className="hero-stack__rail hero-stack__rail--1" />
          <span className="hero-stack__rail hero-stack__rail--2" />

          {/* Loose floating plates for depth */}
          <span className="hero-stack__chip hero-stack__chip--1" />
          <span className="hero-stack__chip hero-stack__chip--2" />
        </div>
      </div>

      {/* ── Legend — the meaning, in real text ───────────────────── */}
      <ul className="hero-stack__legend">
        {layers.map((layer, i) => (
          <li
            key={layer.key}
            className="hero-stack__legend-row"
            style={{ animationDelay: `${0.5 + i * 0.1}s` }}
          >
            <span
              className={
                layer.key === "interface"
                  ? "hero-stack__dot hero-stack__dot--on"
                  : "hero-stack__dot"
              }
            />
            <span className="hero-stack__legend-label">{layer.label}</span>
            <span className="hero-stack__legend-meta">{layer.meta}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
