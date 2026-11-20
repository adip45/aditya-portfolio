import { ArrowUpRight } from "lucide-react";
import { about, site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section } from "@/components/ui/surface";

/**
 * About — an editorial spread rather than a text block.
 *
 * Layout: a narrow statement column carrying the heading, then the body in
 * a measured column with a *hanging numeral* pattern, closing on the career
 * objective set inside a raised surface so it reads as a pull-quote.
 */
export function About() {
  return (
    <Section className="lit-quiet" id="about" density="md" labelledBy="about-title">
      <div className="shell">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-16">
          {/* Heading column */}
          <div className="min-w-0 lg:col-span-4">
            <Reveal>
              <SectionHeading
                label={about.label}
                title={about.title}
                id="about-title"
              />
            </Reveal>

            {/* Facts: label / value pairs on a hanging baseline */}
            <Reveal delay={0.05} className="mt-6">
              <span className="type-meta">
                {site.degree} · {site.year}
              </span>
            </Reveal>

            <RevealGroup className="mt-8 flex flex-col" delayChildren={0.15}>
              {about.facts.map((fact) => (
                <RevealItem key={fact.label}>
                  <div className="group flex items-baseline justify-between gap-6 border-b border-hairline py-3.5">
                    <span className="type-meta shrink-0">{fact.label}</span>
                    <span className="text-right text-[0.8125rem] font-medium text-bone-dim transition-colors duration-300 group-hover:text-bone">
                      {fact.value}
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          {/* Body column */}
          <div className="min-w-0 lg:col-span-8">
            <Reveal delay={0.06}>
              <p className="type-statement max-w-[26ch] text-balance text-bone">
                {about.pull.replace(/^I like/, "I like")}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-2">
              {about.paragraphs.map((paragraph, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p className="type-body text-pretty">
                    <span className="type-meta mr-2 align-super text-signal/70">
                      0{i + 1}
                    </span>
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Objective as a pull-quote */}
            <Reveal delay={0.2} className="mt-12">
              <figure className="surface surface-raised rounded-2xl p-6 md:p-9">
                <figcaption className="type-meta flex items-center gap-2">
                  <ArrowUpRight className="h-3 w-3 text-signal" strokeWidth={2} aria-hidden="true" />
                  Career objective
                </figcaption>
                <blockquote className="mt-4 max-w-[54ch] text-pretty text-[1.0625rem] leading-[1.62] tracking-[-0.01em] text-bone/90 md:text-[1.15rem]">
                  {about.objective}
                </blockquote>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
