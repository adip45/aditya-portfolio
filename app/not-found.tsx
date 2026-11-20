import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden pt-[4.5rem]">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 hero-light" />
        <div className="grid-field absolute inset-0 z-[1]" />
      </div>

      <div className="shell">
        <p className="label">Error 404</p>
        <h1 className="mt-6 text-[clamp(3rem,10vw,7rem)] font-medium leading-[0.95] tracking-[-0.05em] text-bone">
          Nothing
          <br />
          <span className="accent-serif text-signal-soft">here yet.</span>
        </h1>
        <p className="mt-6 max-w-md text-[0.9rem] leading-relaxed text-bone-mute">
          This route doesn&rsquo;t exist — or it was an idea I haven&rsquo;t shipped. Both are
          fixable.
        </p>

        <div className="mt-9 flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-bone px-5 text-[0.8rem] font-medium text-ink transition-colors hover:bg-white"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={2}
              aria-hidden="true"
            />
            Back home
          </Link>
          <Link
            href="/#projects"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline-strong px-5 text-[0.8rem] text-bone transition-colors hover:border-signal/50"
          >
            See the case studies
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
