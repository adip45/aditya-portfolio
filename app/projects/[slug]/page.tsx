import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { CaseStudy } from "@/components/sections/case-study";

/**
 * One route, all case studies.
 *
 * Adding a project means adding an object to `content/projects.ts` — this
 * route, its metadata, its static params and its entry in the projects
 * section all follow automatically.
 */
type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} — Case Study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `${site.url}/projects/${project.slug}`,
      images: project.screenshots[0]
        ? [{ url: project.screenshots[0].src, alt: project.screenshots[0].alt }]
        : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudy project={project} />;
}
