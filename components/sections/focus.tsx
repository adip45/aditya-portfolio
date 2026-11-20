"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Binary,
  Compass,
  Hammer,
  Layers,
  Network,
  type LucideIcon,
} from "lucide-react";
import { focus } from "@/content/site";
import { useSpotlight } from "@/lib/hooks";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/surface";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  network: Network,
  binary: Binary,
  layers: Layers,
  hammer: Hammer,
  compass: Compass,
};

/**
 * Current focus — an asymmetric composition.
 *
 * One lead card spans two columns and sets the tone with larger type; the
 * remaining four sit in a tighter grid beneath. Each card carries a
 * pointer-tracked spotlight so the group feels alive without any of them
 * moving independently.
 */
export function Focus() {
  return (
    <Section className="lit-warm" id="focus" density="lg" labelledBy="focus-title">
      <div className="shell">
        <Reveal>
          <SectionHeading
            label={focus.label}
            title={focus.title}
            intro={focus.intro}
            id="focus-title"
            aside={
              <span className="type-meta hidden md:block">
                Five directions · actively practising
              </span>
            }
          />
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-2.5 md:grid-cols-2" stagger={0.07}>
          {focus.cards.map((card, i) => (
            <RevealItem key={card.index} className={cn(i === 0 && "md:col-span-2")}>
              <FocusCard card={card} lead={i === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

function FocusCard({
  card,
  lead,
}: {
  card: { index: string; title: string; subtitle: string; body: string; icon: string };
  lead?: boolean;
}) {
  const Icon = icons[card.icon] ?? Network;
  const reduced = useReducedMotion();
  const { style, onPointerMove, onPointerLeave } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={style}
      whileHover={reduced ? undefined : { y: -2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "surface group relative h-full overflow-hidden p-6 transition-colors duration-500 md:p-7",
        lead && "md:p-9"
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(24rem 16rem at var(--mx, 50%) var(--my, 0%), rgba(79,157,255,0.08), transparent 68%)",
        }}
      />

      <div
        className={cn(
          "relative flex h-full flex-col",
          lead && "md:grid md:grid-cols-[minmax(0,auto)_minmax(0,1fr)] md:items-start md:gap-x-10"
        )}
      >
        <div className={cn("flex items-start justify-between", lead && "md:flex-col md:gap-14")}>
          <span
            className={cn(
              "grid place-items-center rounded-xl border border-hairline bg-white/[0.03] text-bone-dim transition-colors duration-500 group-hover:border-signal/30 group-hover:text-signal-soft",
              lead ? "h-12 w-12" : "h-10 w-10"
            )}
          >
            <Icon className={lead ? "h-[1.15rem] w-[1.15rem]" : "h-[1.05rem] w-[1.05rem]"} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <span className="type-meta transition-colors duration-500 group-hover:text-signal/70">
            {card.index}
          </span>
        </div>

        <div className={lead ? "mt-7 md:col-start-2 md:row-start-1 md:mt-1" : "mt-7"}>
          <p className="type-meta">{card.subtitle}</p>
          <h3
            className={cn(
              "mt-2.5 text-bone",
              lead ? "type-section max-w-[16ch]" : "type-card"
            )}
          >
            {card.title}
          </h3>
          <p className={cn("type-body mt-3 text-pretty", lead ? "max-w-[46ch]" : "text-[0.8125rem]")}>
            {card.body}
          </p>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-signal/60 to-transparent transition-transform duration-700 ease-premium group-hover:scale-x-100"
      />
    </motion.div>
  );
}
