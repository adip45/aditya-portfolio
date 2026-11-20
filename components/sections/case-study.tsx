import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  ExternalLink,
  Github,
  Info,
  PencilRuler,
  Target,
  Users,
} from "lucide-react";
import type { Project } from "@/content/projects";
import { projects } from "@/content/projects";
import { externalLinkProps } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * The one case-study template.
 *
 * Every project page is this component fed a different Project object, so
 * structure, typography, spacing and chapter numbering are identical
 * across the portfolio by construction rather than by discipline.
 */

function Chapter({
  n,
  label,
  title,
  lead,
  children,
  id,
}: {
  n: string;
  label: string;
  title: string;
  lead?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-hairline py-14 md:py-20">
      <div className="grid grid-cols-1 gap-9 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
        <div className="min-w-0 lg:col-span-4">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[0.65rem] tracking-[0.2em] text-signal/80">
                {n}
              </span>
              <span className="h-px w-6 bg-signal/40" aria-hidden="true" />
              <span className="type-meta">{label}</span>
            </div>
            <h2 className="mt-5 text-balance text-[clamp(1.55rem,2.8vw,2.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-bone">
              {title}
            </h2>
            {lead && (
              <p className="type-body mt-4 max-w-sm text-pretty">{lead}</p>
            )}
          </Reveal>
        </div>
        <div className="min-w-0 lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

export function CaseStudy({ project }: { project: Project }) {
  const others = projects.filter((p) => p.slug !== project.slug);
  const chapterIndex = [
    "Overview",
    "Problem",
    "Objectives",
    "Features",
    "Workflow",
    "Architecture",
    "Interface",
  ];

  return (
    <article className="relative pb-20 pt-24 md:pt-28">
      {/* Ambient field */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-light opacity-60" />
        <div className="grid-field absolute inset-0 z-[1] opacity-50" />
      </div>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <header className="shell">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-[0.78rem] text-bone-mute transition-colors hover:text-bone"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={1.9}
              aria-hidden="true"
            />
            Back to selected work
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-12 [&>*]:min-w-0">
          <div className="min-w-0 lg:col-span-7">
            <Reveal delay={0.04}>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/[0.08] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-signal-soft">
                  Case study — {project.index}
                </span>
                <span className="type-meta">
                  {project.year} · {project.type}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-[clamp(2.2rem,5.4vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em] text-bone">
                {project.name}
              </h1>
              <p className="mt-3 text-[clamp(0.95rem,1.6vw,1.15rem)] font-medium text-bone-dim">
                {project.tagline}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="type-body mt-6 max-w-[58ch] text-pretty">{project.lead}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                {project.demo && (
                  <a
                    href={project.demo}
                    {...externalLinkProps}
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-[0.8rem] font-medium text-ink transition-colors hover:bg-white"
                  >
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
                    Open live site
                  </a>
                )}
                <a
                  href={project.repo}
                  {...externalLinkProps}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-5 text-[0.8rem] text-bone transition-colors hover:border-signal/55 hover:bg-signal/[0.06]"
                >
                  <Github className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                  View repository
                </a>
                <Link
                  href="/#contact"
                  className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.8rem] text-bone-mute transition-colors hover:text-bone"
                >
                  <span className="link-underline">Talk about this build</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Fact panel */}
          <Reveal delay={0.1} className="min-w-0 lg:col-span-5">
            <dl className="surface overflow-hidden rounded-2xl">
              {[
                ["Status", project.status],
                ["Contribution", project.contribution],
                ["Repository", project.repo.replace("https://github.com/", "")],
                ...(project.upstream
                  ? ([["Forked from", project.upstream.replace("https://github.com/", "")]] as const)
                  : []),
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-start justify-between gap-6 border-b border-hairline px-5 py-3.5 last:border-0"
                >
                  <dt className="type-meta shrink-0 pt-0.5">{k}</dt>
                  <dd className="text-right text-[0.78rem] leading-relaxed text-bone-dim">
                    {v}
                  </dd>
                </div>
              ))}
              <div className="border-t border-hairline px-5 py-4">
                <dt className="type-meta">Stack</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-hairline bg-white/[0.02] px-2 py-0.5 font-mono text-[0.58rem] text-bone-mute"
                    >
                      {t}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Scope note */}
        <Reveal delay={0.2}>
          <div className="mt-10 flex items-start gap-3 rounded-xl border border-hairline bg-ink-850/50 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-bone-mute" strokeWidth={1.6} aria-hidden="true" />
            <p className="text-[0.76rem] leading-relaxed text-bone-faint">
              {project.scopeNote}
            </p>
          </div>
        </Reveal>
      </header>

      {/* ── Chapters ──────────────────────────────────────────── */}
      <div className="shell mt-4">
        <Chapter n="01" label={chapterIndex[0]} title="Overview" id="overview">
          <p className="type-body max-w-[62ch] text-pretty">{project.summary}</p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {project.highlights.map((h) => (
              <li
                key={h}
                className="surface flex items-start gap-2.5 p-3.5 text-[0.78rem] leading-snug text-bone-dim"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter
          n="02"
          label={chapterIndex[1]}
          title="The problem"
          lead={project.problem.lead}
          id="problem"
        >
          <RevealGroup className="flex flex-col gap-3" stagger={0.06}>
            {project.problem.points.map((p) => (
              <RevealItem key={p.title}>
                <div className="surface p-5">
                  <h3 className="type-card text-bone">{p.title}</h3>
                  <p className="type-body mt-2 text-[0.84rem]">{p.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Chapter>

        <Chapter n="03" label={chapterIndex[2]} title="Objectives" id="objectives">
          <ul className="flex flex-col">
            {project.objective.map((o, i) => (
              <li
                key={o}
                className="flex items-start gap-4 border-b border-hairline py-4 last:border-0"
              >
                <Target
                  className="mt-0.5 h-4 w-4 shrink-0 text-signal/70"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <span className="text-[0.86rem] leading-relaxed text-bone-dim">
                  <span className="type-meta mr-2 text-signal/60">0{i + 1}</span>
                  {o}
                </span>
              </li>
            ))}
          </ul>
        </Chapter>

        <Chapter n="04" label={chapterIndex[3]} title="Features" id="features">
          <RevealGroup className="grid gap-3 sm:grid-cols-2" stagger={0.05}>
            {project.features.map((f) => (
              <RevealItem key={f.title}>
                <div className="surface h-full p-5">
                  <h3 className="type-card text-bone">{f.title}</h3>
                  <p className="type-body mt-2 text-[0.82rem]">{f.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Chapter>

        <Chapter n="05" label={chapterIndex[4]} title="How it works" id="workflow">
          <ol className="relative flex flex-col gap-0 pl-8">
            <span
              aria-hidden="true"
              className="absolute left-0 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-signal/50 via-hairline-strong to-transparent"
            />
            {project.workflow.map((w) => (
              <li key={w.step} className="relative pb-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-1.5 block h-2 w-2 rounded-full bg-signal shadow-[0_0_0_3px_var(--ink)]"
                />
                <p className="type-meta">{w.step}</p>
                <h3 className="mt-1.5 text-[0.95rem] font-medium text-bone">{w.title}</h3>
                <p className="type-body mt-1.5 text-[0.84rem]">{w.body}</p>
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter n="06" label={chapterIndex[5]} title="Architecture" id="architecture">
          <div className="flex flex-col gap-3">
            {project.architecture.map((a) => (
              <div key={a.title} className="surface p-5">
                <h3 className="type-card text-bone">{a.title}</h3>
                <p className="type-body mt-2 text-[0.84rem]">{a.body}</p>
              </div>
            ))}
          </div>
        </Chapter>

        <Chapter n="07" label={chapterIndex[6]} title="Interface" id="interface">
          <div className="flex flex-col gap-5">
            {project.screenshots.map((shot) => (
              <figure key={shot.src} className="surface overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-2.5">
                  <span className="type-meta flex items-center gap-1.5">
                    {shot.kind === "capture" ? (
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
                  <span className="type-meta truncate">{project.slug}</span>
                </div>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={1200}
                  height={750}
                  className="w-full"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <figcaption className="border-t border-hairline px-4 py-3 text-[0.72rem] leading-relaxed text-bone-faint">
                  {shot.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Chapter>

        {/* Attribution / repo CTA */}
        <section className="border-t border-hairline py-14 md:py-20">
          <div className="surface surface-raised flex flex-col gap-6 rounded-2xl p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="min-w-0">
              <p className="type-meta flex items-center gap-2">
                <Users className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                Contribution
              </p>
              <p className="mt-2 max-w-[56ch] text-[0.86rem] leading-relaxed text-bone-dim">
                {project.contribution}
              </p>
            </div>
            <a
              href={project.repo}
              {...externalLinkProps}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-bone px-5 text-[0.8rem] font-medium text-ink transition-colors hover:bg-white"
            >
              <Github className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              Read the source
            </a>
          </div>
        </section>

        {/* Next projects */}
        <section className="border-t border-hairline py-14">
          <p className="type-meta">More work</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/projects/${o.slug}`}
                className="surface group flex items-center justify-between gap-4 p-5 transition-colors duration-300 hover:border-signal/40"
              >
                <span className="min-w-0">
                  <span className="type-meta">{o.index}</span>
                  <span className="mt-1 block truncate text-[0.95rem] font-medium text-bone">
                    {o.name}
                  </span>
                  <span className="mt-0.5 block truncate text-[0.75rem] text-bone-faint">
                    {o.tagline}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-bone-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-signal-soft"
                  strokeWidth={1.9}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
