import { achievements } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

/**
 * Achievements & experience.
 *
 * Renders nothing at all when there are no verified entries — an empty
 * shell of "coming soon" cards would be worse than an honest omission.
 * Add entries in content/site.ts to reveal this section automatically.
 */
export function Achievements() {
  if (achievements.length === 0) return null;

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="relative border-t border-hairline py-24 md:py-32"
    >
      <div className="shell grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-4">
          <Reveal>
            <SectionHeading
              label="Achievements"
              title="Verified *results.*"
              intro="Only entries that can be pointed at directly."
            />
          </Reveal>
        </div>

        <div className="min-w-0 lg:col-span-8 lg:pl-12">
          <ul className="flex flex-col">
            {achievements.map((entry) => (
              <Reveal as="li" key={`${entry.type}-${entry.title}`}>
                <div className="group flex flex-col gap-3 border-b border-hairline py-6 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <span className="label text-[0.58rem]">{entry.type}</span>
                    <h3 className="mt-2 text-[1.15rem] font-medium text-bone">{entry.title}</h3>
                    <p className="mt-1.5 max-w-xl text-[0.85rem] leading-relaxed text-bone-mute">
                      {entry.detail}
                    </p>
                  </div>
                  {entry.date && (
                    <span className="shrink-0 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-bone-faint">
                      {entry.date}
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
