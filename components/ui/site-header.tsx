"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems, site, links } from "@/content/site";
import { cn, externalLinkProps } from "@/lib/utils";
import { useActiveSection, useLockBodyScroll, useScrolled } from "@/lib/hooks";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { EASE } from "@/components/ui/reveal";

const sectionIds = navItems.map((item) => item.id);

export function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const scrolled = useScrolled(12);
  const active = useActiveSection(sectionIds);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useLockBodyScroll(open);

  // Close the menu on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // On the case-study page, nav links point back to the home page sections.
  const hrefFor = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-[background-color,border-color,backdrop-filter] duration-500 ease-premium",
          scrolled || open
            ? "border-b border-hairline bg-ink/72 backdrop-blur-2xl supports-[backdrop-filter]:bg-ink/58"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <ScrollProgress />
        <div className="shell flex h-[4.75rem] items-center justify-between gap-6">
          {/* Identity */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${site.name} — home`}
          >
            <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[0.6rem] border border-hairline-strong bg-ink-800 font-mono text-[0.7rem] tracking-tight text-bone transition-colors duration-500 group-hover:border-signal/60">
              <span className="relative z-10">{site.initials}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-full h-full bg-signal/15 transition-transform duration-500 ease-premium group-hover:-translate-y-full"
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[0.9rem] font-medium tracking-tight text-bone">
                {site.name}
              </span>
              <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-bone-faint">
                {site.role}
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = onHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={hrefFor(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative flex h-9 items-center rounded-full px-3.5 text-[0.8125rem] transition-colors duration-300",
                        isActive ? "text-bone" : "text-bone-mute hover:text-bone"
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-hairline-strong bg-white/[0.055]"
                          transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.7 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3.5 bottom-1.5 h-px origin-left bg-signal/70 transition-transform duration-500 ease-premium",
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href={links.github}
              {...externalLinkProps}
              aria-label="GitHub profile (opens in a new tab)"
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-bone-dim transition-colors duration-300 hover:border-hairline-strong hover:text-bone"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </a>

            <Link
              href={onHome ? "#contact" : "/#contact"}
              className="group hidden h-9 items-center gap-1.5 rounded-full bg-bone px-4 text-[0.78rem] font-medium text-ink transition-colors duration-300 hover:bg-white sm:inline-flex"
            >
              Let&rsquo;s talk
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-9 w-9 place-items-center rounded-full border border-hairline text-bone-dim transition-colors duration-300 hover:text-bone lg:hidden"
            >
              {open ? (
                <X className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[55] flex flex-col bg-ink-950 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.5]" style={{ backgroundImage: "linear-gradient(to right, rgba(242,239,233,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(242,239,233,0.035) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
            <nav
              aria-label="Mobile"
              className="relative mt-[4.5rem] flex flex-1 flex-col justify-between px-6 pb-10 pt-10"
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.055, duration: 0.5, ease: EASE }}
                    className="border-b border-hairline"
                  >
                    <Link
                      href={hrefFor(item.id)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.65rem] tracking-[0.2em] text-bone-faint">
                          0{i + 1}
                        </span>
                        <span className="text-[1.75rem] font-medium tracking-tight text-bone">
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-5 w-5 text-bone-faint"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42, duration: 0.5 }}
                className="flex flex-col gap-4 pt-10"
              >
                <p className="label">Elsewhere</p>
                <div className="flex flex-col gap-3">
                  <a
                    href={links.github}
                    {...externalLinkProps}
                    className="inline-flex items-center gap-2 text-sm text-bone-dim hover:text-bone"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    github.com/{links.githubHandle}
                  </a>
                  <Link
                    href={hrefFor("contact")}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 text-sm text-bone-dim hover:text-bone"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    Start a conversation
                  </Link>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
