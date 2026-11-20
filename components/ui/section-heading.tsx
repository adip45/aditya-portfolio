import { cn } from "@/lib/utils";

/**
 * Editorial section header.
 *
 * Four type roles are used site-wide, and this component is the only place
 * the section-level ones are applied: a mono kicker index, an optional
 * single-line statement above the heading, the heading itself, and a body
 * intro. `title` may contain `*emphasis*` segments rendered in the serif
 * italic accent face.
 *
 * `index` renders as `01 /` in mono — it reads as editorial furniture
 * rather than decoration, and gives each section a fixed position.
 */
export function SectionHeading({
  label,
  title,
  intro,
  align = "left",
  className,
  as: Tag = "h2",
  id,
  aside,
}: {
  label: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
  id?: string;
  /** Optional content pinned to the right on wide screens. */
  aside?: React.ReactNode;
}) {
  const [index, ...rest] = label.split(" — ");
  const labelText = rest.join(" — ");

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className="type-meta text-signal/80">{index}</span>
        <span
          aria-hidden="true"
          className="h-px w-6 bg-gradient-to-r from-signal/50 to-transparent"
        />
        <span className="type-meta">{labelText || index}</span>
      </div>

      <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <Tag id={id} className="type-section max-w-[18ch] text-balance text-bone">
          <RichTitle text={title} />
        </Tag>
        {aside ? <div className="shrink-0 md:pb-1.5">{aside}</div> : null}
      </div>

      {intro ? (
        <p className="type-body mt-5 max-w-[46ch] text-pretty">{intro}</p>
      ) : null}
    </div>
  );
}

/** Renders `*emphasis*` as serif italic, everything else as-is. */
export function RichTitle({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);

  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="accent-serif text-signal-soft">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
