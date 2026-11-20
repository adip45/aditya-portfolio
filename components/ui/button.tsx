"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn, externalLinkProps } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[0.8125rem] font-medium tracking-wide transition-colors duration-300 ease-premium focus-visible:outline-offset-4";

const sizes = "h-12 px-6";

const styles: Record<Variant, string> = {
  primary:
    "bg-bone text-ink hover:bg-white shadow-[0_1px_0_rgba(255,255,255,0.25)_inset]",
  secondary:
    "border border-hairline-strong text-bone hover:border-signal/60 hover:text-white bg-white/[0.015]",
  quiet:
    "text-bone-dim hover:text-bone px-0 h-auto",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: "arrow" | "github" | "none";
  /** Renders a plain external <a> with safe rel attributes. */
  external?: boolean;
  href: string;
  ariaLabel?: string;
};

function IconSlot({ icon }: { icon: CommonProps["icon"] }) {
  const reduced = useReducedMotion();
  if (icon === "github") {
    return <Github className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.75} aria-hidden="true" />;
  }
  if (icon === "none") return null;
  return (
    <motion.span
      aria-hidden="true"
      className="inline-flex"
      initial={false}
      whileHover={reduced ? undefined : { x: 2, y: -2 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.9} />
    </motion.span>
  );
}

export function ButtonLink({
  children,
  href,
  variant = "primary",
  className,
  icon = "arrow",
  external = false,
  ariaLabel,
}: CommonProps) {
  const classes = cn(base, variant !== "quiet" && sizes, styles[variant], className);

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      <span className="relative z-10">
        <IconSlot icon={icon} />
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} {...externalLinkProps} className={classes} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {inner}
    </Link>
  );
}
