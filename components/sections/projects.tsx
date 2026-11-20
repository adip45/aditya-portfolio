"use client";

import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/content/projects";
import { links } from "@/content/site";
import { externalLinkProps } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/surface";
import { ProjectCard } from "@/components/ui/project-card";

/**
 * Projects — a curated set of case studies.
 *
 * Every project is rendered by the same <ProjectCard> at the same scale.
 * The lead project spans full width; the rest alternate their media column
 * so the rhythm stays interesting without any project being demoted.
 */
export function Projects() {
  const [lead, ...rest] = projects;

  return (
    <Section
      className="edge-line lit-quiet"
      id="projects"
      density="lg"
      labelledBy="projects-title"
    >
      <div className="shell">
        <Reveal>
          <SectionHeading
            label="03 — Selected work"
            title="Built, broken, *rebuilt.*"
            intro="Real projects, documented honestly — what problem each one addresses, what it actually does, and what it doesn't."
            id="projects-title"
            aside={
              <a
                href={links.github}
                {...externalLinkProps}
                className="group inline-flex items-center gap-2 text-[0.8125rem] text-bone-mute transition-colors hover:text-bone"
              >
                <Github className="h-3.5 w-3.5" strokeWidth={1.7} aria-hidden="true" />
                <span className="link-underline">More on GitHub</span>
                <ArrowUpRight
                  className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </a>
            }
          />
        </Reveal>

        {/* Lead project — full width */}
        <Reveal delay={0.08} className="mt-12">
          <ProjectCard project={lead} lead />
        </Reveal>

        {/* Remaining projects — same component, alternating media */}
        <div className="mt-4 flex flex-col gap-4">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={0.06 + i * 0.05}>
              <ProjectCard project={project} mirror={i % 2 === 1} />
            </Reveal>
          ))}
        </div>

        {/* Closing note on how the set was chosen */}
        <Reveal delay={0.15}>
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-dashed border-hairline-strong p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[62ch] text-[0.75rem] leading-relaxed text-bone-faint">
              Only projects with real, working code are listed. Repositories that
              are empty or are starter templates stay off this page until there is
              something genuine to show.
            </p>
            <Link
              href="/#contact"
              className="group inline-flex shrink-0 items-center gap-2 text-[0.78rem] text-bone-mute transition-colors hover:text-bone"
            >
              <span className="link-underline">Work with me</span>
              <ArrowUpRight
                className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
