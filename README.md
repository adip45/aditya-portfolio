<<<<<<< HEAD
# Aditya Patil — Developer Portfolio

A production-quality personal portfolio for **Aditya Patil**, second-year B.Tech Computer
Engineering student at PICT Pune. Built as a static Next.js site: dark editorial design,
restrained animation, one featured project documented as a full case study.

Live routes:

| Route | What it is |
| --- | --- |
| `/` | Homepage — hero, about, journey, featured project, skills, current focus, contact |
| `/projects/hostelconnect` | Deep case study of the HostelConnect platform |
| `/sitemap.xml`, `/robots.txt` | SEO plumbing, generated from `content/site.ts` |

---

## 1. Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static production build
npm start        # serve the build
npm run typecheck
```

Requires Node 18.18+ (tested on Node 20). No environment variables, no database,
no external services — the whole site is prerendered.

---

## 2. Update your details — one file

Everything personal lives in **`content/site.ts`**. Contact channels are
defined once and consumed everywhere:

```ts
export const links = {
  github: "https://github.com/adip45",
  githubHandle: "adip45",
  linkedin: "https://www.linkedin.com/in/aditya-patil-ap001/",
  linkedinHandle: "aditya-patil-ap001",
  email: "adyspatil@gmail.com",
  hostelConnectRepo: "https://github.com/adip45/HostelConnect",
};
```

Derived helpers (`mailto`, `githubUrl`, `linkedinUrl`, `emailDisplay`) are
exported alongside it, and `hasEmail` / `hasLinkedIn` gate any UI that should
only appear when a value is real. Change a URL here and it updates the hero,
the contact cards, the footer, the mobile menu and the JSON-LD block at once.

The three contact cards are declared in `contact.cards`; each entry names an
icon, a value, and the action label shown on its button.

> **Note on attribution.** HostelConnect is a collaborative team project and
> the linked repository is a working fork. The site states this on the project
> card and at the top of the case study rather than implying solo authorship.

## 3. Project structure

```
app/
├── layout.tsx                  # fonts, metadata, Person JSON-LD, header + footer
├── page.tsx                    # homepage composition (order of sections)
├── globals.css                 # design tokens, utility classes, reduced-motion rules
├── projects/hostelconnect/     # the case study route
├── icon.svg  opengraph-image.png  not-found.tsx  sitemap.ts  robots.ts
components/
├── ui/                         # header, footer, scroll progress, reveal primitives,
│                               # page transition, section heading, hero diagram,
│                               # cursor-glow (interactive ambient light)
├── sections/                   # hero, about, journey, projects, skills, focus,
│                               # achievements (conditional), contact
├── previews/                   # reconstructed HostelConnect UI panels
└── case-study/                 # reserved for case-study-only pieces
content/
├── site.ts                     # ← all personal content lives here
└── project.ts                  # ← case study content, verified against the repo
lib/
├── hooks.ts                    # scroll, active section, body lock, pointer spotlight
└── utils.ts                    # cn(), external link props
```

---

## 4. Design system

All tokens live in `app/globals.css` (`:root`) and mirror `tailwind.config.ts`.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#0a0b0d` | page background |
| `--ink-850/800` | `#0d0f12` / `#111316` | raised surfaces |
| `--bone` | `#f2efe9` | primary type |
| `--bone-mute` / `--bone-faint` | `#8b8983` / `#7d7b76` | secondary / tertiary type (both ≥ 4.5:1 on every surface) |
| `--signal` | `#4f9dff` | the single accent |
| `--hairline` | `rgba(242,239,233,0.09)` | every border on the site |

Typography: **Geist** (UI + editorial), **Instrument Serif italic** (the accent voice on
headline phrases), **JetBrains Mono** (labels, data, code). Each is wired through
`next/font`, so there are no network font requests at runtime.

### Type roles

Four roles cover every heading on the site. They are defined once in
`globals.css` and applied via `.type-display`, `.type-section`,
`.type-statement` and `.type-card`, so a heading can never drift out of the
scale. Tracking tightens as size grows (optical sizing) while weight stays at
500 throughout — the hierarchy comes from size, tracking and colour, not from
stacking bold on bold.

| Role | Size | Used by |
| --- | --- | --- |
| `--text-display` | `clamp(3.25rem, 8.6vw, 8rem)` | the name, the featured project |
| `--text-section` | `clamp(1.95rem, 3.9vw, 3.15rem)` | every section heading |
| `--text-statement` | `clamp(1.5rem, 2.7vw, 2.15rem)` | pull-quotes, lead paragraphs |
| `--text-card` | `clamp(1.05rem, 1.5vw, 1.2rem)` | card and row titles |

`.type-body` sets the measured body copy, and `.type-meta` the mono metadata —
the deliberate counterweight that gives large type something to push against.

### Vertical rhythm

`.section-lg` / `.section-md` map to `--space-section-lg` / `--space-section-md`.
Sections alternate between them, so scrolling has a pulse rather than a
metronome. `components/ui/surface.tsx` exposes `<Section>`, which owns this
rhythm plus the divider.

### Surfaces

`.surface` and `.surface-raised` replace flat bordered boxes with three light
cues: a top hairline highlight, an inset shadow, and a soft cast shadow.
`<TiltSurface>` adds a pointer-tracked sheen and a ±1.2° tilt — small enough to
read as physical depth, never as a wobble. Both are switched off for touch and
reduced-motion visitors.

Other utility classes worth knowing:

- `.shell` — the page container (84rem, responsive gutters)
- `.kicker` — mono eyebrow with a signal-coloured lead-in rule
- `.grid-field` — the fine two-density lattice in the hero
- `.ambient-light__lattice` — the page-wide lattice, painted *inside* the light
  stack so the cursor glow illuminates it
- `.accent-serif` — italic serif emphasis
- `.link-underline`, `.lift` — interaction treatments

---

## 5. Interactive ambient light

A fixed lighting layer (`components/ui/cursor-glow.tsx`) makes the background glow
softly around the cursor. It is mounted once in `app/layout.tsx` via `<CursorGlow />`,
so it covers every route including the case study.

**How it is built** — three stacked layers in `app/globals.css`:

| Layer | Effect |
| --- | --- |
| `.ambient-light__field` | Wide, very soft bloom (radius ≈ 2.1× `--glow-r`) |
| `.ambient-light__core` | Brighter pool directly under the cursor |
| `.ambient-light__grid` | The same 72px lattice as `.grid-field`, in signal blue, **masked to the glow** so lines light up only as it passes |

**Performance.** The pointer position is written straight to the CSS custom
properties `--glow-x` / `--glow-y` (plus one opacity value) inside a
`requestAnimationFrame` loop — **no React state, so zero re-renders while moving.**
The loop parks itself as soon as the glow settles, and is cancelled entirely while
the tab is hidden. Easing is delta-time corrected, so the feel is identical at
60/90/120 Hz.

**Stacking.** The layer sits at `z-index: 0`; `header`, `main` and `footer` are lifted
to `z-index: 1` so their opaque backgrounds paint *above* the light while the page
background shows through it. It is `pointer-events: none` and `aria-hidden`, so it
never intercepts clicks — verified by hit-testing every link and button on the page.

**Fallbacks.** Touch/coarse pointers and `prefers-reduced-motion: reduce` get a
single calm static pool instead of a tracking glow (`data-mode="static"`), which also
avoids touching the battery on mobile.

### Hydration safety in the hero diagram

`components/ui/hero-diagram.tsx` computes polar coordinates at render time, which makes
it a hydration risk in two specific ways — both are fixed and worth preserving:

1. **Trig output is not bit-identical across engines.** `Math.sin` / `Math.cos` are not
   required to be correctly rounded, so Node serialised `y1="439.8410477655294"` where
   the browser produced `439.84104776552937`. React compares the serialised strings and
   reported a mismatch. **All coordinates now pass through `rnd()` (3 decimal places)**
   before reaching the DOM, so both sides emit identical bytes. Never render raw
   `Math.cos()` output into an attribute.

2. **Never pass `animate={undefined}` to a `motion.*` element.** Framer Motion then
   writes literal `opacity="undefined"` / `transform="…undefined…"` onto the node. The
   reduced-motion branches used to do this; they now pass explicit values
   (`animate={reduced ? { rotate: 0 } : { rotate: 360 }}`) and let the transition's
   `duration: 0` disable the motion instead.

Verify with the bundled script (it needs the dev server running and Playwright
available):

```bash
npm run dev            # in one shell
node scripts/verify-hydration.js
```

It asserts zero hydration warnings on every route and that the SSR markup and the
hydrated client markup are byte-for-byte identical.

> Two gotchas encoded in the CSS, worth keeping in mind before editing it:
> 1. `radial-gradient(circle 600px at …)` is **invalid** CSS — one length is not a
>    valid shape size. If a mask uses it, the whole `mask-image` is dropped and the
>    layer renders unmasked, edge to edge. The grid mask therefore uses an explicit
>    `ellipse <r> <r>` size.
> 2. Painting the field as a *tiled* background (`background-size` + `background-position`)
>    leaves a visible rectangular tile edge on large viewports. It is a single
>    full-viewport gradient instead.

---

## 6. Motion

Framer Motion, used sparingly:

- `Reveal` / `RevealGroup` / `RevealItem` (`components/ui/reveal.tsx`) — scroll-triggered
  entrances with stagger. They animate `opacity` and the `transform` **property**
  (not `x`/`y` shorthands) so no leftover `translate` stays on the element box.
- `HeroDiagram` — SVG instrument: rotating dashed ring, orbiting signal, breathing nodes.
- `PageTransition` — route-level fade/lift keyed on pathname.
- Pointer spotlights on project and focus cards (`useSpotlight`) — mouse only.

**Reduced motion**: `prefers-reduced-motion: reduce` collapses every transition and
animation in `globals.css`, and each component checks `useReducedMotion()` so content
appears without movement. Verified that all sections remain at `opacity: 1`.

---

## 7. Accessibility & SEO

- Semantic landmarks (`header`, `main`, `nav`, `footer`), one `h1` per page, ordered headings
- Visible focus rings, a skip link, `aria-current` on the active nav item
- `aria-expanded` / `aria-controls` on the mobile menu; `Escape` closes it; scroll lock
- Every icon-only control has an `aria-label`; decorative SVGs are `aria-hidden`
- External links use `target="_blank"` with `rel="noopener noreferrer"`
- Metadata: title template, description, canonical, Open Graph + Twitter card (PNG
  generated to match the site), `Person` JSON-LD, sitemap and robots
- `html` `lang="en"`, `color-scheme: dark`, theme colour

---

## 8. About the HostelConnect case study

Every technical claim in `content/project.ts` was verified against the repository
(`prisma/schema.prisma`, `app/actions/booking.ts`, `app/actions/hostel.ts`,
`app/dashboard/*`, `middleware.ts`, `lib/auth.ts`) — the four-model schema, the
`PENDING → APPROVED/REJECTED` lifecycle, the atomic bed decrement/restore inside
`prisma.$transaction`, the review gating on approved bookings, and role-based
middleware.

Two honesty rules are baked in:

1. **No invented deployment.** There is no live-demo button; only the GitHub repository.
2. **No screenshots exist in the repo**, so the UI panels are labelled
   *"Reconstructed UI"* with a note explaining they are faithful renderings of the
   real screens, not captures. Sample property names and prices inside them are
   illustrative demo data.

If you later add real screenshots, drop them in `public/hostelconnect/` and swap the
`PreviewFigure` children for `next/image` — the surrounding labels already distinguish
the two states.

---

## 9. Deploy

The site is fully static (`next build` prerenders every route). Deploy to Vercel,
Netlify, Cloudflare Pages or any static host. Remember to update `site.url` first so
canonical URLs, the sitemap and social cards point at the real domain.
=======
# aditya-portfolio
Personal developer portfolio website built with Next.js.
>>>>>>> fca5999ca4dcb8b40c5662fc12105c11f7f7b3c7
