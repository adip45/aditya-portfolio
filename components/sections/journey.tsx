import {
  Award,
  Briefcase,
  Flame,
  GraduationCap,
  MapPin,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { journey } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/surface";

const upcomingIcons: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  flame: Flame,
  wrench: Wrench,
  award: Award,
};

/**
 * Journey — a single vertical spine with one verified entry and an
 * explicitly open horizon. The spine is a real element with a fading
 * gradient so it reads as a timeline rather than a list border.
 */
export function Journey() {
  return (
    <Section className="lit-warm" id="journey" density="md" labelledBy="journey-title">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="min-w-0 lg:col-span-4">
            <Reveal>
              <SectionHeading
                label={journey.label}
                title={journey.title}
                intro={journey.intro}
                id="journey-title"
              />
            </Reveal>
          </div>

          <div className="min-w-0 lg:col-span-8">
            <div className="relative pl-8 md:pl-12">
              {/* Spine */}
              <span
                aria-hidden="true"
                className="absolute left-0 top-1.5 h-full w-px bg-gradient-to-b from-signal/50 via-hairline-strong to-transparent"
              />

              {journey.education.map((entry) => (
                <Reveal key={entry.institute}>
                  <span
                    aria-hidden="true"
                    /* The Reveal wrapper becomes the containing block once
                       Framer applies a transform, so offset from the content
                       box back to the spine instead of using left-0. */
                    className="absolute -left-8 top-[0.6rem] -translate-x-1/2 md:-left-12"
                  >
                    <span className="block h-2 w-2 rounded-full bg-signal shadow-[0_0_0_4px_var(--ink),0_0_0_5px_rgba(79,157,255,0.28)]" />
                  </span>

                  <div className="pb-14">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="type-meta">{entry.kind}</span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal/[0.07] px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-signal-soft">
                        <span className="h-1 w-1 rounded-full bg-signal" aria-hidden="true" />
                        {entry.status}
                      </span>
                    </div>

                    <h3 className="type-statement mt-4 max-w-[26ch] text-bone">
                      {entry.institute}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] text-bone-mute">
                      <span className="inline-flex items-center gap-1.5">
                        <GraduationCap className="h-3.5 w-3.5 text-bone-faint" strokeWidth={1.6} aria-hidden="true" />
                        {entry.degree}
                      </span>
                      <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
                      <span>{entry.field}</span>
                      <span className="h-3 w-px bg-hairline-strong" aria-hidden="true" />
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-bone-faint" strokeWidth={1.6} aria-hidden="true" />
                        {entry.place}
                      </span>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <span className="rounded-md border border-hairline bg-ink-800 px-3 py-1.5 type-meta text-bone-dim">
                        {entry.year}
                      </span>
                      <span className="type-meta">In progress</span>
                    </div>

                    <p className="type-body mt-5 max-w-[52ch] text-pretty">{entry.notes}</p>
                  </div>
                </Reveal>
              ))}

              {/* Open horizon */}
              <Reveal delay={0.05}>
                <span
                  aria-hidden="true"
                  className="absolute -left-8 top-0 -translate-x-1/2 md:-left-12"
                >
                  <span className="block h-2 w-2 rounded-full border border-dashed border-bone-faint bg-ink" />
                </span>

                <div>
                  <p className="type-meta">What comes next</p>
                  <p className="type-body mt-3 max-w-[52ch] text-pretty">
                    This timeline intentionally has room in it. Internships, workshops,
                    hackathons and results will appear here as they happen — nothing is
                    listed before it exists.
                  </p>

                  <RevealGroup className="mt-8 grid gap-2.5 sm:grid-cols-2" delayChildren={0.1}>
                    {journey.upcoming.map((slot) => {
                      const Icon = upcomingIcons[slot.icon] ?? Briefcase;
                      return (
                        <RevealItem key={slot.title}>
                          <div className="group flex items-start gap-3.5 rounded-xl border border-dashed border-hairline-strong p-4 transition-colors duration-500 hover:border-signal/35 hover:bg-signal/[0.03]">
                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-hairline bg-ink-850 text-bone-faint transition-colors duration-500 group-hover:border-signal/30 group-hover:text-signal-soft">
                              <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[0.8125rem] font-medium text-bone-dim">
                                {slot.title}
                              </span>
                              <span className="mt-1 block text-[0.75rem] leading-relaxed text-bone-faint">
                                {slot.note}
                              </span>
                            </span>
                          </div>
                        </RevealItem>
                      );
                    })}
                  </RevealGroup>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
