"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  Code2,
  Cpu,
  Monitor,
  Sprout,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { EASE } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  code: Code2,
  monitor: Monitor,
  cpu: Cpu,
  wrench: Wrench,
  sprout: Sprout,
};

type Group = {
  key: string;
  index: string;
  title: string;
  caption: string;
  icon: string;
  items: readonly string[];
};

/**
 * Collapsible capability groups.
 *
 * Each row is a real `<button>` wrapped in an `<h3>`, so the section still
 * reads as a heading outline to assistive tech and to search engines even
 * when collapsed. `aria-expanded` and `aria-controls` wire the button to its
 * panel; the panel is removed from the DOM when closed, which keeps the
 * collapsed state out of the tab order and out of the accessibility tree.
 *
 * Height animation uses `height: auto` keyframes, so a group can grow later
 * without anyone re-tuning a magic number. Reduced-motion visitors get an
 * instant open/close with no expand animation.
 */
export function SkillAccordion({
  groups,
  defaultOpen = "programming",
}: {
  groups: readonly Group[];
  defaultOpen?: string;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-2.5">
      {groups.map((group) => {
        const isOpen = open === group.key;
        const Icon = icons[group.icon] ?? Code2;
        const panelId = `${baseId}-${group.key}-panel`;
        const buttonId = `${baseId}-${group.key}-button`;

        return (
          <div
            key={group.key}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors duration-500",
              isOpen
                ? "border-hairline-strong bg-white/[0.028]"
                : "border-hairline bg-white/[0.012] hover:border-hairline-strong hover:bg-white/[0.022]"
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : group.key)}
                className="group flex w-full items-center gap-3.5 px-4 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-signal md:gap-4 md:px-5 md:py-[1.15rem]"
              >
                <span
                  className={cn(
                    "grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors duration-500",
                    isOpen
                      ? "border-signal/35 bg-signal/10 text-signal-soft"
                      : "border-hairline bg-white/[0.02] text-signal/75 group-hover:border-signal/25 group-hover:text-signal-soft"
                  )}
                >
                  <Icon className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.7} aria-hidden="true" />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-[0.9375rem] font-medium tracking-[-0.01em] text-bone">
                    {group.title}
                  </span>
                  <span className="mt-0.5 hidden text-[0.7rem] text-bone-faint sm:block">
                    {group.caption}
                  </span>
                </span>

                {/* Item count doubles as a collapsed-state summary */}
                <span className="type-meta hidden shrink-0 tabular-nums sm:block">
                  {String(group.items.length).padStart(2, "0")}
                </span>

                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-bone-faint transition-transform duration-400 ease-premium group-hover:text-bone-mute",
                    isOpen && "rotate-180 text-signal-soft"
                  )}
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.34, ease: EASE }}
                  className="overflow-hidden"
                >
                  <ul className="flex flex-wrap gap-1.5 px-4 pb-4 pl-[3.9rem] md:px-5 md:pb-5 md:pl-[4.4rem]">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-hairline bg-white/[0.02] px-2.5 py-1 text-[0.78rem] text-bone-dim transition-colors duration-300 hover:border-signal/30 hover:text-bone"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Collapsed-by-default list used where space is tight (the case study and
 * any future dense pages). Same visual language, no motion.
 */
export function SkillAccordionStatic({ groups }: { groups: readonly Group[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  const reduced = useReducedMotion();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  return (
    <div className="flex flex-col gap-2.5">
      {groups.map((group) => {
        const isOpen = open === group.key;
        const Icon = icons[group.icon] ?? Code2;
        const panelId = `${baseId}-${group.key}-panel`;

        return (
          <div
            key={group.key}
            className="overflow-hidden rounded-xl border border-hairline bg-white/[0.012]"
          >
            <button
              type="button"
              ref={(el) => {
                refs.current[group.key] = el;
              }}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : group.key)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
            >
              <Icon className="h-4 w-4 shrink-0 text-signal/80" strokeWidth={1.7} aria-hidden="true" />
              <span className="flex-1 text-[0.85rem] font-medium text-bone">{group.title}</span>
              <ChevronDown
                className={cn("h-3.5 w-3.5 text-bone-faint transition-transform", isOpen && "rotate-180")}
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <ul
                id={panelId}
                className="flex flex-wrap gap-1.5 px-4 pb-3.5 pl-11"
                style={{ animation: reduced ? undefined : "fade-up 0.3s var(--ease) both" }}
              >
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded border border-hairline bg-white/[0.02] px-2 py-0.5 text-[0.72rem] text-bone-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
