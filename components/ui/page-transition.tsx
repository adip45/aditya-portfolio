"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/ui/reveal";

/**
 * Route-level fade/lift. Keying on the pathname means each navigation
 * re-mounts the wrapper and plays the entrance once — no exit animation,
 * so content is never held back from the user.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0.25 : 0.55, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
