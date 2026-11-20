"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { hero, links, mailto } from "@/content/site";
import { externalLinkProps } from "@/lib/utils";
import { EASE } from "@/components/ui/reveal";
import { HeroStack } from "@/components/ui/hero-stack";

/**
 * Hero — the first screen, and the only place that has to earn attention
 * in under two seconds.
 *
 * Two columns on desktop: a strict typographic ladder on the left
 * (label → name → headline → support → tags → actions → socials), and an
 * isometric architecture study on the right. The ladder matters more than
 * the visual: each rung is a different size, weight and colour so the eye
 * never has to work out what to read next.
 */
export function Hero() {
  const reduced = useReducedMotion();

  const socials = [
    {
      label: "GitHub",
      icon: Github,
      href: links.github,
      external: true,
      aria: "GitHub profile (opens in a new tab)",
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: links.linkedin,
      external: true,
      aria: "LinkedIn profile (opens in a new tab)",
    },
    {
      label: "Email",
      icon: Mail,
      href: mailto,
      external: false,
      aria: `Email Aditya at ${links.email}`,
    },
  ];

  /* Parent/child variant pair. Every animated property is given an
     explicit value in both the reduced and standard branches — leaving a
     branch undefined makes Framer write literal "undefined" into the DOM
     and breaks hydration. */
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.075, delayChildren: 0.05 },
    },
  };

  const item: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.25 : 0.85, ease: EASE },
    },
  };

  /* The name is split into letters so the entrance reads as one settle
     rather than a slide. Letters are individual spans with explicit
     initial/animate values. */
  const letters = hero.name.last.split("");

  return (
    <section
      id="home"
      aria-labelledby="hero-name"
      className="relative isolate overflow-hidden pb-12 pt-[6.5rem] md:pb-16 md:pt-[9rem]"
    >
      {/* Ambient field: dense grid, one light source, bottom fade */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-light" />
        <div className="grid-field absolute inset-0 z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell">
        <motion.div variants={container} initial="hidden" animate="show">
          {/* ── Eyebrow ──────────────────────────────────────────── */}
          <motion.p variants={item} className="kicker">
            {hero.eyebrow}
          </motion.p>

          <div className="mt-6 grid gap-9 md:gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-10 xl:gap-14">
            {/* ── Left: the typographic ladder ───────────────────── */}
            <div className="min-w-0">
              <motion.h1
                id="hero-name"
                variants={item}
                className="type-display text-bone"
              >
                <span className="block">{hero.name.first}</span>
                <span className="mt-1 block">
                  {letters.map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block"
                      initial={
                        reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.12em" }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { duration: 0.85, delay: 0.35 + i * 0.04, ease: EASE }
                      }
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <span
                    className="accent-serif align-baseline text-[0.62em] text-signal"
                    aria-hidden="true"
                  >
                    .
                  </span>
                </span>
              </motion.h1>

              {/* Headline — the visual centrepiece of the first screen */}
              <motion.p
                variants={item}
                className="mt-8 max-w-[24ch] text-balance text-[clamp(1.45rem,2.9vw,2.35rem)] font-medium leading-[1.14] tracking-[-0.028em] text-bone/95"
              >
                {hero.headline.lead}
                <span className="accent-serif text-signal-soft">
                  {hero.headline.em}
                </span>
                {hero.headline.join}
                <span className="accent-serif text-signal-soft">
                  {hero.headline.em2}
                </span>
                {hero.headline.tail}
              </motion.p>

              {/* Supporting copy */}
              <motion.p
                variants={item}
                className="type-body mt-7 max-w-[50ch] text-pretty"
              >
                {hero.support}
              </motion.p>

              {/* Technical tags */}
              <motion.ul
                variants={item}
                className="mt-7 flex flex-wrap gap-1.5"
                aria-label="Core technical areas"
              >
                {hero.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-hairline bg-white/[0.025] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-bone-mute transition-colors duration-300 hover:border-signal/35 hover:text-bone-dim"
                  >
                    {tag}
                  </li>
                ))}
              </motion.ul>

              {/* Actions */}
              <motion.div
                variants={item}
                className="mt-9 flex flex-wrap items-center gap-2.5"
              >
                <Link
                  href={hero.primaryCta.href}
                  className="group relative inline-flex h-12 items-center gap-2.5 overflow-hidden rounded-full bg-signal-deep pl-6 pr-5 text-[0.8125rem] font-medium text-white transition-all duration-300 hover:bg-signal hover:shadow-[0_0_28px_-6px_rgba(79,157,255,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  <span className="relative z-10">{hero.primaryCta.label}</span>
                  <ArrowUpRight
                    className="relative z-10 h-4 w-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-premium group-hover:translate-x-full"
                  />
                </Link>

                <Link
                  href={hero.secondaryCta.href}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-hairline-strong px-5 text-[0.8125rem] text-bone transition-all duration-300 hover:border-signal/55 hover:bg-signal/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  {hero.secondaryCta.label}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-bone-faint transition-all duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-soft"
                    strokeWidth={1.9}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>

              {/* Socials */}
              <motion.div
                variants={item}
                className="mt-7 flex items-center gap-1"
                role="group"
                aria-label="Social profiles"
              >
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    {...(s.external ? externalLinkProps : {})}
                    aria-label={s.aria}
                    className="group relative inline-flex h-10 items-center gap-2 rounded-full px-2.5 text-bone-faint transition-colors duration-300 hover:text-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                  >
                    <s.icon
                      className="h-[1.05rem] w-[1.05rem] transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                    <span className="pointer-events-none absolute inset-x-1.5 -bottom-0.5 h-px origin-left scale-x-0 bg-signal/60 transition-transform duration-500 ease-premium group-hover:scale-x-100" />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* ── Right: architecture study ──────────────────────── */}
            <motion.div
              variants={item}
              className="relative"
            >
              <HeroStack />
            </motion.div>
          </div>
        </motion.div>

        {/* ── Marquee ──────────────────────────────────────────── */}
        <div className="relative mt-12 overflow-hidden border-y border-hairline py-3.5 md:mt-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent"
          />
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap will-change-transform motion-reduce:animate-none">
            {[...hero.marquee, ...hero.marquee].map((tool, i) => (
              <span key={`${tool}-${i}`} className="flex items-center gap-8 type-meta">
                {tool}
                <span className="h-[3px] w-[3px] rotate-45 bg-bone-faint/60" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>

        {/* ── Scroll cue ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-8 flex items-center justify-between"
        >
          <span className="type-meta flex items-center gap-2.5">
            <ArrowDown className="h-3 w-3 text-signal" strokeWidth={1.9} aria-hidden="true" />
            Scroll to explore
          </span>
          <div className="relative h-9 w-px overflow-hidden bg-hairline-strong" aria-hidden="true">
            <span className="absolute inset-x-0 h-full animate-scroll-hint bg-signal" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
