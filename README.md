<div align="center">

# Aditya Patil — Portfolio

**A static Next.js portfolio for a second-year Computer Engineering student at PICT Pune.**
Dark editorial design, restrained motion, and real projects documented honestly.

[![Next.js](https://img.shields.io/badge/Next.js-15.5-000?logo=nextdotjs&logoColor=fff)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-087EA4?logo=react&logoColor=fff)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![Static export](https://img.shields.io/badge/output-static-2ea043)](#deployment)

</div>

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

That's it. No database, no API keys, no environment variables required. Every
route is prerendered at build time.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server on `0.0.0.0:3000` |
| `npm run build` | Production build (prerenders all routes) |
| `npm start` | Serve the production build |
| `npm run export` | Static `out/` folder for any plain-file host |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | `next lint` — **needs one-time ESLint setup on first run** |

Node 20+ recommended.

---

## Routes

| Route | What it is |
| --- | --- |
| `/` | Homepage — hero, about, journey, projects, skills, focus, contact |
| `/projects/hostelconnect` | HostelConnect case study |
| `/projects/towers-of-hanoi` | Towers of Hanoi case study |
| `/projects/sih-2026` | Nirmān (SIH 2026) case study |
| `/sitemap.xml` · `/robots.txt` | Generated from `content/` |
| anything else | Styled 404 |

The three case-study URLs are prerendered from `content/projects.ts` via
`generateStaticParams`. `/projects/hostelconnect` also exists as its own static
route so the original URL keeps resolving independently of the dynamic one.

---

## Editing content

Two files hold **everything**. No component needs to be touched to change content.

### `content/site.ts` — personal details

Identity, hero copy, links, skills, tools, and the achievements list are all
exported from here.

```ts
export const links = {
  github: "https://github.com/adip45",
  githubHandle: "adip45",
  linkedin: "https://www.linkedin.com/in/aditya-patil-ap001/",
  linkedinHandle: "aditya-patil-ap001",
  email: "adyspatil@gmail.com",
  hostelConnectRepo: "https://github.com/adip45/HostelConnect",
} as const;
```

Derived helpers (`mailto`, `githubUrl`, `linkedinUrl`, `emailDisplay`) sit
alongside it, and `hasEmail` / `hasLinkedIn` gate any UI that should only appear
when a value is real — so an empty string hides the element instead of shipping a
dead link. Change a URL once and the hero, contact cards, footer, mobile menu and
`Person` JSON-LD all follow.

The hero headline uses a segmented shape so the serif accent can sit mid-sentence
without splitting the copy into separate strings:

```ts
headline: { lead: "I turn ideas into ", em: "software", join: " that ", em2: "solves", tail: " problems." }
```

### `content/projects.ts` — every project, one object each

This is the single source of truth for the showcase **and** the case studies.
Adding a fourth project is one object — the card, the route, the metadata and the
sitemap entry all follow automatically.

```ts
export const projects: Project[] = [
  {
    slug: "towers-of-hanoi",        // → /projects/towers-of-hanoi
    index: "02",
    name: "Towers of Hanoi",
    tagline: "Interactive recursion & stack visualiser",
    status: "Live",                 // "Live" | "Complete" | "In progress"
    repo: "https://github.com/adip45/towers-of-hanoi-simulator",
    demo: "https://adip45.github.io/towers-of-hanoi-simulator/", // omit if not live
    screenshots: [
      { src: "/projects/towers-of-hanoi.png", kind: "capture", alt: "…", caption: "…" },
    ],
    // …summary, lead, stack, highlights, problem, objective,
    //   features, workflow, architecture, scopeNote
  },
];
```

**Two fields carry honesty guarantees — don't guess at them:**

- **`demo`** — only set it when you have loaded the deployment and it works. There
  is no fallback UI; the Live Demo button simply doesn't render without it.
- **`screenshots[].kind`** — `"capture"` for a real screenshot of the running
  product, `"reconstructed"` for anything redrawn by hand. The badge on the card
  and the caption in the case study are both derived from this value, so a mock
  cannot be accidentally presented as a capture.

`upstream` is optional and, when set, renders a "Team fork" marker plus a
"Forked from" row in the case study — used for the two collaborative repos.

---

## Project structure

```
app/
├── layout.tsx                 # fonts, metadata, Person JSON-LD, header + footer
├── page.tsx                   # homepage composition
├── globals.css                # design tokens, type roles, motion rules
├── projects/[slug]/page.tsx   # all case studies (generateStaticParams)
├── projects/hostelconnect/    # preserved static route, same template
├── icon.svg · opengraph-image.png · not-found.tsx · sitemap.ts · robots.ts
components/
├── ui/                        # header, footer, reveal, surfaces, hero-stack,
│                              # project-card, skill-accordion, cursor-glow
├── sections/                  # hero, about, journey, projects, skills, focus,
│                              # achievements (conditional), contact, case-study
content/
├── site.ts                    # ← personal content
└── projects.ts                # ← all project + case-study content
lib/
├── hooks.ts                   # scroll, active section, body lock, pointer spotlight
└── utils.ts                   # cn(), asset(), external link props
scripts/
└── verify-hydration.js        # 46 headless-browser assertions
```

---

## Design system

Tokens live in `app/globals.css` (`:root`) and mirror `tailwind.config.ts`.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0a0b0d` | page background |
| `--ink-950 / 850 / 800` | `#07080a` / `#0d0f12` / `#111316` | depth, raised surfaces |
| `--bone` | `#f2efe9` | primary type |
| `--bone-dim` / `-mute` / `-faint` | `#b9b6b0` / `#8b8983` / `#7d7b76` | descending emphasis |
| `--signal` | `#4f9dff` | the single accent |
| `--hairline` | `rgba(242,239,233,0.09)` | every border |

`--bone-faint` was tuned to clear 4.5:1 on all three surfaces (4.66 on ink, 4.54
on ink-850, 4.74 on ink-950). If you darken it further, recheck contrast.

**Type:** Geist (UI + editorial), Instrument Serif italic (accent phrases),
JetBrains Mono (labels, data). All loaded through `next/font` — zero runtime
network requests, no layout shift.

### Type roles

Five roles cover every heading; they're defined once and applied by class so a
heading can't drift off-scale. Hierarchy comes from size, tracking and colour —
weight stays at 500 throughout, never bold-on-bold.

| Role | Size | Used by |
| --- | --- | --- |
| `.type-display` | `clamp(3.25rem, 8.6vw, 8rem)` | the name in the hero |
| `.type-section` | `clamp(1.95rem, 3.9vw, 3.15rem)` | section headings |
| `.type-statement` | `clamp(1.5rem, 2.7vw, 2.15rem)` | lead paragraphs, card titles |
| `.type-card` | `clamp(1.05rem, 1.5vw, 1.2rem)` | row and panel titles |
| `.type-body` / `.type-meta` | 0.9375rem / 0.625rem mono | body copy / metadata |

### Surfaces and rhythm

`.surface` and `.surface-raised` replace flat bordered boxes with three light
cues: a top hairline highlight, an inset shadow, a soft cast shadow.
`<TiltSurface>` adds a pointer-tracked sheen and a ±1.2° tilt — enough to read as
physical depth, never as a wobble. Both are disabled for touch and reduced motion.

`.section-lg` / `.section-md` alternate down the homepage so scrolling has a pulse
rather than a metronome; `<Section>` owns that rhythm plus the divider.

Other utilities worth knowing: `.shell` (84rem container), `.kicker` (mono
eyebrow with signal rule), `.grid-field` (two-density lattice), `.accent-serif`
(italic emphasis), `.link-underline`, `.lift`.

---

## Motion

Framer Motion, used sparingly:

- `Reveal` / `RevealGroup` / `RevealItem` — scroll entrances with stagger. They
  animate `opacity` and the `transform` **property** (not `x`/`y` shorthands) so no
  leftover `translate` stays on the element box.
- `HeroStack` — eight CSS-3D planes plus a CSS keyframe drift. No canvas, no
  images, no random values.
- `PageTransition` — route-level fade keyed on pathname.
- Pointer spotlights on project and focus cards — mouse only.

**Reduced motion** is honoured twice over: `globals.css` collapses every transition
and animation under `prefers-reduced-motion: reduce`, and each component checks
`useReducedMotion()` so content renders in place with no movement. The verify
script asserts sections land at `opacity: 1` in that mode.

---

## Interactive ambient light

`components/ui/cursor-glow.tsx` mounts once in the layout, so it covers every
route including case studies. Three stacked layers:

| Layer | Effect |
| --- | --- |
| `.ambient-light__field` | wide, very soft bloom |
| `.ambient-light__core` | brighter pool under the cursor |
| `.ambient-light__grid` | the `.grid-field` lattice, in signal blue, **masked to the glow** |

**Performance.** Pointer position is written straight to `--glow-x` / `--glow-y`
inside a `requestAnimationFrame` loop — **no React state, so zero re-renders while
moving.** The loop parks when the glow settles and cancels while the tab is
hidden. Easing is delta-time corrected, so it feels identical at 60/90/120 Hz.

**Stacking.** The layer sits at `z-index: 0`, `pointer-events: none`,
`aria-hidden`; `header`/`main`/`footer` are lifted to `z-index: 1` so their opaque
backgrounds paint above it. It can never intercept a click.

**Fallbacks.** Coarse pointers and reduced-motion get one calm static pool
(`data-mode="static"`) instead of a tracking glow.

> **Two CSS traps encoded here** — worth knowing before editing:
> 1. `radial-gradient(circle 600px at …)` is **invalid** CSS; one length is not a
>    valid shape size. If a mask uses it the whole `mask-image` is dropped and the
>    layer renders unmasked, edge to edge. The grid mask uses an explicit
>    `ellipse <r> <r>`.
> 2. Painting the field as a *tiled* background leaves a visible rectangular seam
>    on large viewports. It is one full-viewport gradient instead.

---

## Correctness guarantees

### Hydration

`HeroStack` is deliberately built from plain divs with no `Math.sin`/`cos`, so
server and client serialise identical bytes. Two rules are held everywhere:

1. **Never render raw float math into an attribute.** `Math.sin` / `Math.cos` are
   not required to be bit-identical across engines — Node once emitted
   `439.8410477655294` where Chrome produced `439.84104776552937`. Round any such
   value (3 dp) before it reaches the DOM.
2. **Never pass `animate={undefined}` to a `motion.*` element.** Framer Motion then
   writes literal `opacity="undefined"` onto the node. Use explicit values and
   disable movement via the transition (`duration: 0`) instead.

### Verification

```bash
npm run build && npm start        # or: npm run export && npx serve out
node scripts/verify-hydration.js
```

46 assertions across four routes, covering:

| # | Checks |
| --- | --- |
| 1 | Zero hydration warnings and console errors per route |
| 2 | SSR markup === hydrated markup, byte for byte |
| 3 | Reduced-motion settles the hero stack instead of animating |
| 4–5 | Hero composition and copy match the brief |
| 6 | All three project cards render previews, CTAs and correct badges |
| 7 | Every case-study route returns 200 with seven chapters and no overflow |
| 8 | Unknown slug returns 404 |

Point it at a deployed URL — it checks more than "does it load":

```bash
BASE=https://aditya-patil.is-a.dev node scripts/verify-hydration.js
```

**Requires a local Playwright install** — it is intentionally not a project
dependency, so `npm install` stays lean. If the script can't resolve
`playwright-core`, install it globally or point the `require` at an existing
install. It never ships to the browser.

---

## Accessibility & SEO

- Semantic landmarks, one `h1` per page, ordered headings
- Visible focus rings, skip link, `aria-current` on the active nav item
- `aria-expanded` / `aria-controls` on the mobile menu; `Escape` closes; scroll lock
- Every icon-only control has an `aria-label`; decorative SVG is `aria-hidden`
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- Metadata: title template, description, canonical, Open Graph + Twitter card,
  `Person` JSON-LD, sitemap, robots
- `lang="en"`, `color-scheme: dark`, theme colour

---

## Honesty rules

These are enforced by the data model, not by good intentions:

1. **No invented deployments.** `demo` is set only for URLs that were loaded and
   returned 200. HostelConnect has no live site, so it has no Live Demo button.
2. **No fake screenshots.** `kind: "capture"` means a real capture of the running
   product. The two HostelConnect panels are `"reconstructed"` and are labelled as
   such in the UI — they're faithful redrawings of real screens, not captures, and
   the sample data inside them is illustrative.
3. **No invented stats.** No commit counts, star counts, user counts or
   performance numbers appear anywhere.
4. **Collaboration is stated.** HostelConnect and SIH-2026 are forks; the site says
   so on the card, in the fact panel, and in the contribution text. HostelConnect's
   contribution line names the specific area worked on rather than implying
   ownership of the whole codebase.

---

## Deployment

Fully static — `next build` prerenders every route. No server needed.

**One env var controls the canonical domain.** Set it in your host's dashboard:

```
NEXT_PUBLIC_SITE_URL=https://your-domain-here
```

It feeds `metadataBase`, canonical tags, `sitemap.xml`, `robots.txt` and every
OpenGraph URL. There is nothing else to change — don't hardcode a domain in a
component.

### Vercel (recommended)

Import the repo, add `NEXT_PUBLIC_SITE_URL`, deploy. Every push to `main`
redeploys. Custom domains are handled in **Settings → Domains**, with TLS issued
automatically.

### GitHub Pages / any static host

```bash
npm run export          # writes out/
```

A ready-made workflow is at `.github/workflows/deploy-pages.yml` (enable
**Settings → Pages → Source: GitHub Actions**). If the site is served from a
subpath such as `https://user.github.io/repo/`, also set:

```
NEXT_PUBLIC_BASE_PATH=/repo
```

> **Subpath gotcha:** Next.js rewrites `_next/*` assets for `basePath` but **not**
> plain string `src` values pointing at `public/` files. Any image path held in
> content data must go through `asset()` from `lib/utils.ts`, or it 404s on a
> subpath deployment. Both image components already do.

### Free custom domain

`.is-a.dev` subdomains (forever free, via GitHub PR) and the GitHub Student Pack
(`.dev` free for a year) are both documented in **[`FREE-DOMAIN.md`](./FREE-DOMAIN.md)**.
Full hosting walkthroughs are in **[`DEPLOY.md`](./DEPLOY.md)**.

---

## Design notes

A few decisions that look like details but aren't:

- **Reading order matches build order.** "Data → Logic → Interface" in the hero
  traces the request path of a full-stack app. The layout describes the work.
- **The hero visual is not a screenshot.** It's a CSS-3D exploded architecture
  diagram, marked `aria-hidden`; the legend beneath it carries the meaning as real
  text, so the content survives without the illustration.
- **One accent colour.** Signal blue is the only chromatic value in the interface;
  everything else is ink and bone. Status badges (live / in progress) are the one
  place a second hue is allowed, because state should be instantly legible.
- **Equal weight for projects.** Every project renders through the same
  `<ProjectCard>` at the same scale. The lead project differs only in title size
  and column split — nothing is demoted to a small card.

---

<div align="center">
<sub>Built by <a href="https://github.com/adip45">Aditya Patil</a> · Next.js · TypeScript · Tailwind CSS · Framer Motion</sub>
</div>
