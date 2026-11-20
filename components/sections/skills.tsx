import { Plus } from "lucide-react";
import { skills } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SkillAccordion } from "@/components/ui/skill-accordion";
import { Section } from "@/components/ui/surface";

/**
 * Skills — a specification sheet, not a card grid.
 *
 * Deliberately a different layout pattern from Focus (which uses cards):
 * full-width rows on a hanging baseline, each row a category with its
 * items aligned right. This keeps the page from reading as three
 * consecutive grids while sharing the same type roles.
 */
export function Skills() {
  return (
    <Section className="lit-quiet" id="skills" density="lg" labelledBy="skills-title">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16">
          <div className="min-w-0 lg:col-span-4">
            <Reveal>
              <SectionHeading
                label={skills.label}
                title={skills.title}
                intro={skills.intro}
                id="skills-title"
              />
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <p className="type-meta">How I work</p>
              <ul className="mt-4 flex flex-col">
                {skills.principles.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-baseline gap-3 border-b border-hairline py-3 last:border-0"
                  >
                    <span className="type-meta text-signal/70">0{i + 1}</span>
                    <span className="text-[0.8125rem] leading-relaxed text-bone-mute">{p}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Collapsible capability groups */}
          <div className="min-w-0 lg:col-span-8">
            <Reveal>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <p className="type-meta">Capabilities</p>
                <p className="type-meta tabular-nums">{skills.groups.length} groups</p>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <SkillAccordion groups={skills.groups} defaultOpen="programming" />
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 flex items-start gap-2 text-[0.72rem] leading-relaxed text-bone-faint">
                <Plus className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.7} aria-hidden="true" />
                This list grows only when I&rsquo;ve actually shipped something with the tool —
                no scores, no padding.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
