"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, type LucideIcon } from "lucide-react";
import { contact, links, mailto, site, githubUrl, linkedinUrl } from "@/content/site";
import { externalLinkProps } from "@/lib/utils";
import { EASE, Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { CopyEmailButton } from "@/components/ui/copy-email-button";

const icons: Record<string, LucideIcon> = {
  mail: Mail,
  linkedin: Linkedin,
  github: Github,
};

/**
 * Contact — the page's closing statement.
 *
 * Three channels rather than a form (there is no backend to post to, and a
 * fake form would be worse than none). Each card is one large link target
 * with its own affordance; the email card additionally exposes a copy
 * button, because copying an address is often what people actually want.
 */
export function Contact() {
  const reduced = useReducedMotion();

  /* Resolve each card's target from the single source of truth. */
  const resolved = contact.cards.map((card) => {
    if (card.icon === "mail") {
      return { ...card, href: mailto, external: false };
    }
    if (card.icon === "linkedin") {
      return { ...card, href: linkedinUrl, external: true };
    }
    return { ...card, href: githubUrl, external: true };
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden section-lg"
    >
      {/* Closing light */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/40 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[26rem] w-[46rem] -translate-x-1/2 rounded-full bg-signal/[0.07] blur-[110px]" />
      </div>

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Statement */}
          <div className="min-w-0 lg:col-span-5">
            <Reveal>
              <p className="kicker">{contact.label}</p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2
                id="contact-title"
                className="mt-7 max-w-[14ch] text-balance text-[clamp(2.05rem,4.6vw,3.5rem)] font-medium leading-[1.0] tracking-[-0.036em] text-bone"
              >
                Let&rsquo;s{" "}
                <span className="accent-serif text-signal-soft">connect.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="type-body mt-6 max-w-[42ch] text-pretty">{contact.body}</p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[0.78rem] text-bone-mute">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-bone-faint" strokeWidth={1.6} aria-hidden="true" />
                  {site.location}
                </span>
                <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden="true" />
                  {site.availability}
                </span>
              </div>
            </Reveal>
          </div>

          {/* Channels */}
          <div className="min-w-0 lg:col-span-7">
            <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1" stagger={0.08}>
              {resolved.map((card, i) => {
                const Icon = icons[card.icon] ?? Mail;

                return (
                  <RevealItem
                    key={card.label}
                    className={i === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
                  >
                    <motion.div
                      whileHover={reduced ? undefined : { y: -2 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="surface group relative flex h-full flex-col gap-4 p-5 md:flex-row md:items-center md:gap-5 md:p-6"
                    >
                      {/* Sheen */}
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(26rem 14rem at 20% 0%, rgba(79,157,255,0.07), transparent 66%)",
                        }}
                      />

                      <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline bg-white/[0.03] text-bone-dim transition-colors duration-500 group-hover:border-signal/30 group-hover:text-signal-soft">
                        <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.7} aria-hidden="true" />
                      </span>

                      <div className="relative min-w-0 flex-1">
                        <p className="type-meta">{card.label}</p>

                        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <span className="truncate text-[0.9375rem] font-medium text-bone">
                            {card.value}
                          </span>
                          {card.icon === "mail" && <CopyEmailButton email={links.email} />}
                        </div>

                        <p className="mt-1 text-[0.75rem] leading-relaxed text-bone-faint">
                          {card.note}
                        </p>
                      </div>

                      {/* Action — the whole card is not a link (the copy
                          button must stay independently focusable), so the
                          primary action is an explicit anchor. */}
                      <a
                        href={card.href}
                        {...(card.external ? externalLinkProps : {})}
                        className="relative inline-flex h-10 shrink-0 items-center gap-2 self-start rounded-full border border-hairline-strong px-4 text-[0.75rem] text-bone transition-colors duration-300 hover:border-signal/55 hover:bg-signal/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink md:self-auto"
                        aria-label={
                          card.external
                            ? `${card.action} (opens in a new tab)`
                            : card.action
                        }
                      >
                        {card.action}
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-bone-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-soft"
                          strokeWidth={1.9}
                          aria-hidden="true"
                        />
                      </a>
                    </motion.div>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal delay={0.2}>
              <p className="mt-5 text-[0.72rem] leading-relaxed text-bone-faint">
                Based in {site.location} · Open to remote and on-site internships.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
