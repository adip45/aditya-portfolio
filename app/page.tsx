import type { Metadata } from "next";
import { site } from "@/content/site";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Focus } from "@/components/sections/focus";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role} & ${site.roleSecondary}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Focus />
      <Achievements />
      <Contact />
    </>
  );
}
