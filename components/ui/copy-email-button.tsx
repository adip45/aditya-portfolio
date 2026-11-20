"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "copied" | "error";

/**
 * Copy the address to the clipboard.
 *
 * `navigator.clipboard` needs a secure context and can reject when the
 * document isn't focused, so we fall back to a hidden textarea + execCommand
 * for older mobile browsers and non-HTTPS previews. Both paths are awaited
 * inside the click handler so the user gesture is still active.
 */
async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "0";
    ta.style.left = "0";
    ta.style.opacity = "0";
    ta.style.pointerEvents = "none";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length); // iOS needs an explicit range
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * Copy-email button with an inline success state.
 *
 * The status is announced through a polite live region so screen-reader
 * users get the same confirmation as everyone else, and the icon swaps to a
 * tick with a small scale pop. Everything collapses to an instant swap when
 * the visitor prefers reduced motion.
 */
export function CopyEmailButton({
  email,
  className,
  label = "Copy email",
}: {
  email: string;
  className?: string;
  label?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onClick = useCallback(async () => {
    const ok = await copyText(email);
    setStatus(ok ? "copied" : "error");

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 2400);
  }, [email]);

  const copied = status === "copied";
  const failed = status === "error";

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={onClick}
        aria-label={copied ? "Email address copied" : label}
        className={cn(
          "group relative inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5",
          "font-mono text-[0.6rem] uppercase tracking-[0.14em] transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
          copied
            ? "border-signal/45 bg-signal/10 text-signal-soft"
            : failed
              ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
              : "border-hairline-strong text-bone-mute hover:border-signal/45 hover:bg-signal/[0.06] hover:text-bone"
        )}
      >
        <span className="relative grid h-3 w-3 place-items-center">
          <AnimatePresence initial={false} mode="wait">
            {copied ? (
              <motion.span
                key="check"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 grid place-items-center"
              >
                <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.22 }}
                className="absolute inset-0 grid place-items-center"
              >
                <Copy className="h-3 w-3" strokeWidth={2.2} aria-hidden="true" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <span aria-hidden="true">
          {copied ? "Copied" : failed ? "Copy failed" : "Copy"}
        </span>

        {/* One-shot ring pulse on success — subtle, no bounce. */}
        {copied && !reduced && (
          <motion.span
            aria-hidden="true"
            initial={{ opacity: 0.5, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.35 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-signal/60"
          />
        )}
      </button>

      {/* Live region — polite, so it never interrupts the screen reader. */}
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied!" : failed ? "Could not copy the email address. Please select it manually." : ""}
      </span>
    </span>
  );
}
