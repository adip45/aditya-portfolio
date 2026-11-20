/** Tiny class-name joiner — avoids an extra dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Standard attributes for links that leave the site. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;

/** True when running on the server. */
export const isServer = typeof window === "undefined";
