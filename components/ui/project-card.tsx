"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Camera,
  ExternalLink,
  GitFork,
  Github,
  Layers,
  PencilRuler,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { externalLinkProps } from "@/lib/utils";
import { EASE } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const statusStyles: Record<Project["status"], string> = {
  Live: "border-emerald-500/30 bg-emerald-500/[0.08] text-emerald-300",
  Complete: "border-signal/30 bg-signal/[0.08] text-signal-soft",
  "In progress": "border-amber-500/25 bg-amber-500/[0.08] text-amber-300",
};

/**
 * One project, presented as a case study.
 *
 * Every project uses this exact component, so they all get the same
 * dimensions, typography, numbering and hover behaviour. Nothing is
 * demoted to a "small card" — the only variation is that the lead project
 * spans the full width while the others alternate side.
 *
 * The screenshot badge is derived from `project.screenshots[0].kind`, not
 * hand-written, so a real capture can never be labelled as reconstructed
 * or vice versa.
 */
export function ProjectCard({
  project,
  mirror = false,
  lead = false,
}: {
  project: Project;
  /** Flip the media to the other column on wide screens. */
  mirror?: boolean;
  /** Full-width treatment for the primary project. */
  lead?: boolean;
}) {
  const reduced = useReducedMotion();
  const shot = project.screenshots[0];
  const isCapture = shot?.kind === "capture";

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="surface surface-raised group relative overflow-hidden rounded-3xl"
    >
      <div
        className={cn(
          "grid",
          lead ? "lg:grid-cols-[1.06fr_0.94fr]" : "lg:grid-cols-2",
          mirror && "lg:[&>*:first-child]:order-2"
        )}
      >
        {/* ── Copy column ─────────────────────────────────────────── */}
        <div className="flex flex-col p-7 md:p-9 lg:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="type-meta text-signal/70">{project.index}</span>
            <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em]",
                statusStyles[project.status]
              )}
            >
              <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
              {project.status}
            </span>
            <span className="type-meta">{project.year}</span>
            {project.upstream && (
              <span className="type-meta flex items-center gap-1 text-bone-faint">
                <GitFork className="h-3 w-3" strokeWidth={1.8} aria-hidden="true" />
                Team fork
              </span>
            )}
          </div>

          <h3
            className={cn(
              "mt-5 text-bone",
              lead
                ? "text-[clamp(2rem,4.2vw,3.2rem)] font-medium leading-[0.98] tracking-[-0.038em]"
                : "type-statement"
            )}
          >
            {project.name}
          </h3>

          <p className="mt-2 text-[0.9rem] font-medium leading-snug text-bone-dim">
            {project.tagline}
          </p>

          <p className="type-body mt-5 max-w-[54ch] text-pretty">{project.summary}</p>

          {/* Highlights */}
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {project.highlights.slice(0, 4).map((h) => (
              <li
                key={h}
                className="flex items-start gap-2 text-[0.78rem] leading-snug text-bone-mute"
              >
                <span
                  className="mt-1 h-1 w-1 shrink-0 rounded-full bg-signal/70"
                  aria-hidden="true"
                />
                {h}
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded border border-hairline bg-white/[0.02] px-2 py-0.5 font-mono text-[0.58rem] tracking-wide text-bone-mute"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto flex flex-wrap items-center gap-2 pt-8">
            <Link
              href={`/projects/${project.slug}`}
              className="group/cta inline-flex h-11 items-center gap-2 rounded-full bg-bone pl-5 pr-4 text-[0.8rem] font-medium text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
            >
              Explore project
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-500 ease-premium group-hover/cta:translate-x-1"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </Link>

            {project.demo && (
              <a
                href={project.demo}
                {...externalLinkProps}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-signal/45 bg-signal/[0.07] px-4 text-[0.8rem] font-medium text-signal-soft transition-colors duration-300 hover:border-signal/70 hover:bg-signal/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
                aria-label={`Open the live ${project.name} demo (opens in a new tab)`}
              >
                <ExternalLink className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                Live demo
              </a>
            )}

            <a
              href={project.repo}
              {...externalLinkProps}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-4 text-[0.8rem] text-bone-dim transition-colors duration-300 hover:border-signal/50 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-850"
              aria-label={`View the ${project.name} source on GitHub (opens in a new tab)`}
            >
              <Github className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>

        {/* ── Media column ────────────────────────────────────────── */}
        <div
          className={cn(
            "relative border-t border-hairline bg-ink-950/60 p-4 md:p-6 lg:border-t-0",
            // The divider must always sit between the media and the copy,
            // whichever column the media lands in on wide screens.
            mirror ? "lg:border-r" : "lg:border-l"
          )}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(242,239,233,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,233,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse at 50% 30%, #000, transparent 74%)",
              WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, #000, transparent 74%)",
            }}
          />

          <div className="relative flex h-full flex-col">
            {/* Badge derives from the asset's own metadata */}
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="type-meta flex shrink-0 items-center gap-1.5">
                {isCapture ? (
                  <>
                    <Camera className="h-3 w-3 text-emerald-400/80" strokeWidth={2} aria-hidden="true" />
                    Screenshot
                  </>
                ) : (
                  <>
                    <PencilRuler className="h-3 w-3 text-bone-faint" strokeWidth={2} aria-hidden="true" />
                    Reconstructed UI
                  </>
                )}
              </span>
              <span className="type-meta flex min-w-0 items-center gap-1.5">
                <Layers className="h-3 w-3 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                <span className="truncate">{project.type}</span>
              </span>
            </div>

            {shot && (
              <div className="relative flex-1 overflow-hidden rounded-xl border border-hairline-strong bg-ink-900">
                <div className="aspect-[16/10] w-full">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1200}
                    height={750}
                    className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-premium group-hover:scale-[1.015]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority={lead}
                  />
                </div>
                {/* Top chrome, so it reads as a screen rather than a slab */}
                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center gap-1.5 border-b border-hairline bg-ink-950/80 px-3 py-2 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-bone-faint/50" aria-hidden="true" />
                  <span className="h-1.5 w-1.5 rounded-full bg-bone-faint/35" aria-hidden="true" />
                  <span className="h-1.5 w-1.5 rounded-full bg-bone-faint/25" aria-hidden="true" />
                  <span className="ml-2 truncate font-mono text-[0.55rem] tracking-wide text-bone-faint">
                    /{project.slug}
                  </span>
                </div>
              </div>
            )}

            <p className="mt-3 text-[0.7rem] leading-relaxed text-bone-faint">
              {shot?.caption}
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
