import type { Metadata } from "next";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { CaseStudy } from "@/components/sections/case-study";

/**
 * `/projects/hostelconnect` is kept as its own static route so the existing
 * URL keeps working exactly as before. It renders the same shared
 * <CaseStudy> template as `/projects/[slug]`, from the same data.
 */
const project = getProject("hostelconnect")!;

export const metadata: Metadata = {
  title: `${project.name} — Case Study`,
  description: project.summary,
  alternates: { canonical: `/projects/${project.slug}` },
  openGraph: {
    type: "article",
    title: `${project.name} — Case Study`,
    description: project.summary,
    url: `${site.url}/projects/${project.slug}`,
    images: project.screenshots[0]
      ? [{ url: project.screenshots[0].src, alt: project.screenshots[0].alt }]
      : undefined,
  },
};

export default function HostelConnectCaseStudy() {
  return <CaseStudy project={project} />;
}
