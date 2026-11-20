import Link from "next/link";
import { ArrowUp, ArrowUpRight, Github, Mail, Linkedin } from "lucide-react";
import { contact, links, mailto, navItems, site } from "@/content/site";
import { externalLinkProps } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-[42rem] -translate-x-1/2 rounded-full bg-signal/[0.06] blur-3xl"
      />

      <div className="shell relative">
        {/* Big sign-off */}
        <div className="flex flex-col gap-10 py-16 md:py-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="kicker mb-5">End of page · start of something</p>
            <p className="text-[clamp(1.85rem,4.2vw,2.9rem)] font-medium leading-[1.08] tracking-[-0.033em] text-bone">
              Let&rsquo;s build something{" "}
              <span className="accent-serif text-signal-soft">
                worth using.
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={links.github}
              {...externalLinkProps}
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-[0.8rem] text-bone-dim transition-colors duration-300 hover:border-signal/50 hover:text-bone"
            >
              <Github
                className="h-4 w-4"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              GitHub
              <ArrowUpRight
                className="h-3.5 w-3.5 opacity-50 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </a>

            <a
              href={links.linkedin}
              {...externalLinkProps}
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-[0.8rem] text-bone-dim transition-colors duration-300 hover:border-signal/50 hover:text-bone"
            >
              <Linkedin
                className="h-4 w-4"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              LinkedIn
            </a>

            <a
              href={mailto}
              className="group inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-[0.8rem] text-bone-dim transition-colors duration-300 hover:border-signal/50 hover:text-bone"
            >
              <Mail className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              Email
            </a>
          </div>
        </div>

        <div className="hairline" />

        {/* Utility row */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-bone">{site.name}</span>
            <span className="max-w-xs text-[0.8rem] leading-relaxed text-bone-faint">
              {site.role} | {site.roleSecondary}
            </span>

            <div className="mt-1 flex items-center gap-1">
              {[
                {
                  label: "GitHub",
                  href: links.github,
                  icon: Github,
                  ext: true,
                },
                {
                  label: "LinkedIn",
                  href: links.linkedin,
                  icon: Linkedin,
                  ext: true,
                },
                { label: "Email", href: mailto, icon: Mail, ext: false },
              ].map((s2) => (
                <a
                  key={s2.label}
                  href={s2.href}
                  {...(s2.ext ? externalLinkProps : {})}
                  aria-label={
                    s2.ext
                      ? `${s2.label} (opens in a new tab)`
                      : `Email ${site.name} at ${links.email}`
                  }
                  className="group grid h-9 w-9 place-items-center rounded-full border border-hairline text-bone-faint transition-colors duration-300 hover:border-signal/45 hover:text-signal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950"
                >
                  <s2.icon
                    className="h-3.5 w-3.5"
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className="link-underline text-[0.8rem] text-bone-mute transition-colors hover:text-bone"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="#home"
            className="group inline-flex items-center gap-2 self-start text-[0.8rem] text-bone-mute transition-colors hover:text-bone"
            aria-label="Back to top"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-hairline transition-colors duration-300 group-hover:border-signal/50">
              <ArrowUp
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        {/* Oversized wordmark — the page's last gesture */}
        <div
          aria-hidden="true"
          className="relative select-none overflow-hidden pt-14"
        >
          <span
            className="block whitespace-nowrap text-center text-[clamp(2.75rem,11vw,9rem)] font-medium uppercase leading-none tracking-[-0.045em] text-transparent"
            style={{ WebkitTextStroke: "1px rgba(242,239,233,0.075)" }}
          >
            {site.name}
          </span>
          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>

        <div className="flex flex-col gap-2 border-t border-hairline py-7 text-[0.72rem] text-bone-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <p className="font-mono tracking-wide">{contact.footerNote}</p>
        </div>
      </div>
    </footer>
  );
}
