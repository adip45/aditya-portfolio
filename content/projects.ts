/* ==================================================================
   PROJECTS — single source of truth
   ------------------------------------------------------------------
   Every project card AND every /projects/<slug> case-study page is
   generated from this array. To add a project, append one object here
   and nothing else needs to change.

   House rules (please keep them):
   • Every claim must be traceable to the repository, the live
     deployment, or the owner's own description. No invented features,
     metrics, adoption, users or awards.
   • `demo` is only set when a deployment actually responds. There is no
     "coming soon" button anywhere.
   • `screenshots` must be real captures of the running product or of
     genuine repo assets. Never a mock-up presented as a screenshot.
   • `contribution` states only what is demonstrably true — for team
     repositories and forks that means naming the collaboration, not
     claiming the whole build.
   • `status` distinguishes "Live", "Complete" and "In progress" honestly.
================================================================== */

export type ProjectStatus = "Live" | "Complete" | "In progress";

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
  /** Real captures are labelled as such; reconstructed UI is labelled too. */
  kind: "capture" | "reconstructed";
};

export type Project = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  /** One-sentence summary used on the card. */
  summary: string;
  /** Longer lead paragraph used at the top of the case study. */
  lead: string;
  status: ProjectStatus;
  year: string;
  type: string;
  /** Where the work sits relative to other people. */
  contribution: string;
  repo: string;
  /** Original repository, when `repo` is a fork. Shown for honesty. */
  upstream?: string;
  /** Set ONLY when the deployment is verifiably live. */
  demo?: string;
  stack: string[];
  highlights: string[];
  /** Card + case-study preview images. */
  screenshots: Screenshot[];
  /* ---------- Case study chapters ---------- */
  problem: { lead: string; points: { title: string; body: string }[] };
  objective: string[];
  features: { title: string; body: string }[];
  workflow: { step: string; title: string; body: string }[];
  architecture: { title: string; body: string }[];
  /** Optional: honest caveats / scope notes. */
  scopeNote: string;
};

export const projects: Project[] = [
  /* ================================================================
     01 — HOSTELCONNECT
     ================================================================ */
  {
    slug: "hostelconnect",
    index: "01",
    name: "HostelConnect",
    tagline: "Student accommodation discovery & booking",
    summary:
      "A full-stack platform built around two roles: students searching for hostels and PG accommodation, and managers who list, price and manage those properties.",
    lead:
      "Moving into a hostel or PG usually starts with scattered WhatsApp forwards and site visits. HostelConnect replaces that with one role-aware platform: students search, compare and request a bed; managers publish listings and answer those requests from a single dashboard.",
    status: "In progress",
    year: "2026",
    type: "Full-stack web application",
    contribution:
      "Collaborative team project. This repository is my working fork; my commits are the interface layer — login, signup, navbar and overall frontend design — on a codebase shared with the team.",
    repo: "https://github.com/adip45/HostelConnect",
    upstream: "https://github.com/SrujalWadekar/HostelConnect",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Prisma ORM",
      "PostgreSQL",
      "NextAuth",
      "Tailwind CSS",
      "Framer Motion",
    ],
    highlights: [
      "Role-aware student and manager experiences",
      "Search, filters and bed-aware discovery",
      "Booking requests with approve / reject flow",
      "Occupancy and estimated revenue dashboard",
    ],
    screenshots: [
      {
        src: "/projects/hostelconnect-student.svg",
        alt: "Reconstructed student dashboard showing hostel listings with prices and availability",
        caption: "Student dashboard — listing cards with price, beds and status",
        kind: "reconstructed",
      },
      {
        src: "/projects/hostelconnect-manager.svg",
        alt: "Reconstructed manager dashboard showing booking requests and occupancy",
        caption: "Manager dashboard — incoming requests and occupancy",
        kind: "reconstructed",
      },
    ],
    problem: {
      lead:
        "Accommodation discovery for students is informal, and management is manual.",
      points: [
        {
          title: "Scattered information",
          body: "Listings live across messaging groups and notice boards, with no consistent way to compare price, distance or availability.",
        },
        {
          title: "Stale availability",
          body: "A bed that was free last week may be gone today. Without a shared source of truth, both sides waste visits.",
        },
        {
          title: "Manual requests",
          body: "Managers track enquiries by hand, so approvals and rejections leave no reliable record.",
        },
      ],
    },
    objective: [
      "Give students one place to discover, filter and compare accommodation by price, type and gender preference.",
      "Give managers a dashboard that keeps bed counts honest and turns enquiries into an explicit approve / reject queue.",
      "Keep the two experiences isolated behind role-aware access so neither side sees the other's tools.",
    ],
    features: [
      {
        title: "Bed-aware discovery",
        body: "Students search by city, property name and area, then filter by accommodation type, gender preference and maximum budget. Fully occupied properties can be hidden entirely.",
      },
      {
        title: "Booking request lifecycle",
        body: "A request moves PENDING → APPROVED or REJECTED. Approval runs inside a Prisma transaction that decrements available beds, so inventory can't be double-sold.",
      },
      {
        title: "Manager dashboard",
        body: "Listing CRUD with ownership checks, editable prices and bed counts, an incoming-request queue, and occupancy with an estimated revenue figure.",
      },
      {
        title: "Google sign-in with roles",
        body: "NextAuth with a Google provider issues JWT sessions; a role intent captured at sign-up decides which portal a user lands in, and middleware enforces it.",
      },
      {
        title: "Reviews with eligibility rules",
        body: "Reviews are gated on whether a student actually had an approved booking for that property, which keeps ratings meaningful.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Land and pick a role",
        body: "A visitor chooses the student or manager path. Google sign-in captures the intent and NextAuth issues a JWT session.",
      },
      {
        step: "02",
        title: "Discover",
        body: "The student browses listings, narrows with filters, and opens a property to compare daily versus monthly pricing.",
      },
      {
        step: "03",
        title: "Request",
        body: "Submitting a booking request creates a PENDING record tied to the student and property.",
      },
      {
        step: "04",
        title: "Approve",
        body: "The manager sees the request in their queue. Approving it atomically moves one bed out of inventory; rejecting closes it with no inventory change.",
      },
      {
        step: "05",
        title: "Track",
        body: "The student follows status and history; once approved, they become eligible to review the property.",
      },
    ],
    architecture: [
      {
        title: "One codebase, two portals",
        body: "Next.js App Router with separate route groups for the student and manager dashboards, sharing a single Prisma schema.",
      },
      {
        title: "Data model",
        body: "Four models and three enums in PostgreSQL: users, hostels, bookings and reviews, with roles and booking states expressed as enums rather than free-text fields.",
      },
      {
        title: "Transaction-safe inventory",
        body: "The approve action reads available beds and decrements them inside prisma.$transaction, guarding against two managers approving the last bed simultaneously.",
      },
      {
        title: "Role enforcement at the edge",
        body: "middleware.ts wraps protected routes with withAuth, so a student session can't reach manager screens even by typing the URL.",
      },
    ],
    scopeNote:
      "No payments, chat, verification service or live deployment is claimed. The case study documents the application as implemented in the repository.",
  },

  /* ================================================================
     02 — TOWERS OF HANOI SIMULATOR
     ================================================================ */
  {
    slug: "towers-of-hanoi",
    index: "02",
    name: "Towers of Hanoi",
    tagline: "Interactive recursion & stack visualiser",
    summary:
      "A data-structures mini project that makes recursion visible: step through a solution move by move, or watch it play automatically, with a C++ implementation of the same algorithm alongside.",
    lead:
      "Recursion is easy to describe and hard to picture. This simulator turns the classic Towers of Hanoi problem into something you can operate — choose up to eight disks, step forward and back through the optimal solution, and watch the recursion tree unwind one move at a time.",
    status: "Live",
    year: "2026",
    type: "Data structures mini project",
    contribution: "Personal project — designed and built end to end.",
    repo: "https://github.com/adip45/towers-of-hanoi-simulator",
    demo: "https://adip45.github.io/towers-of-hanoi-simulator/",
    stack: ["HTML", "CSS", "JavaScript", "C++", "std::vector", "GitHub Pages"],
    highlights: [
      "Interactive 1–8 disk simulation",
      "Step forward, undo and auto-play",
      "Recursive solver with move counter",
      "Separate C++ implementation for coursework",
    ],
    screenshots: [
      {
        src: "/projects/towers-of-hanoi.png",
        alt: "Towers of Hanoi simulator showing three rods, disk controls and a move inspector panel",
        caption: "The simulator: puzzle workspace, move inspector and playback controls",
        kind: "capture",
      },
    ],
    problem: {
      lead:
        "The recursive solution to Towers of Hanoi is short enough to memorise and subtle enough to misunderstand.",
      points: [
        {
          title: "Recursion stays abstract",
          body: "Reading hanoi(n-1, from, aux, to) tells you the shape of the algorithm but not the order of the moves.",
        },
        {
          title: "Stack operations are invisible",
          body: "Treating each rod as a stack makes the constraints obvious only if you can watch pushes and pops happen.",
        },
        {
          title: "Optimality is unverifiable by eye",
          body: "Without a reference count, there's no way to tell whether a solution took the minimum 2ⁿ − 1 moves.",
        },
      ],
    },
    objective: [
      "Make each recursive call observable as a discrete, reversible disk move.",
      "Show the minimum move count so an optimal run is verifiable rather than assumed.",
      "Ship the same algorithm in C++ for the data-structures submission, since the coursework requires it.",
    ],
    features: [
      {
        title: "Adjustable problem size",
        body: "One to eight disks, with the minimum move count recalculated as 2ⁿ − 1 whenever the size changes.",
      },
      {
        title: "Playback control",
        body: "Play, next move, undo and reset, plus a speed slider for watching the full solution at your own pace.",
      },
      {
        title: "Move inspector",
        body: "A panel naming the next move (for example “Disk 1: A → C”) and explaining the constraint that forces it.",
      },
      {
        title: "Progress tracking",
        body: "Moves completed against the minimum, so a run in progress is measured against the optimal.",
      },
      {
        title: "C++ implementation",
        body: "The same recursion compiled separately, with rods modelled as std::vector stacks and an optional step-by-step console mode.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Choose",
        body: "Pick a disk count from one to eight. The minimum move count updates immediately.",
      },
      {
        step: "02",
        title: "Start",
        body: "Press Play for an automatic run, or Next move to advance a single recursion step.",
      },
      {
        step: "03",
        title: "Inspect",
        body: "The move inspector names the move and explains why it is legal, which is where the recursion becomes legible.",
      },
      {
        step: "04",
        title: "Compare",
        body: "Moves completed is shown against the minimum, so you can see whether the run was optimal.",
      },
    ],
    architecture: [
      {
        title: "Single-page, no build step",
        body: "One self-contained HTML file with inline CSS and JavaScript — it opens directly in a browser with no install and no network access required.",
      },
      {
        title: "Recursion as the driver",
        body: "The solver mirrors the textbook recursion, emitting a move list that the UI plays back. Separating solve from playback is what makes step and undo trivial.",
      },
      {
        title: "Stacks for state",
        body: "Each rod is array-backed and only the top disk is ever movable, so an illegal move is impossible to express rather than merely prevented.",
      },
      {
        title: "Deployed on GitHub Pages",
        body: "Served straight from the repository, which keeps the demo URL permanent and costs nothing to run.",
      },
    ],
    scopeNote:
      "The browser simulator is the interactive deliverable; the C++ file exists for the coursework submission of the same algorithm. Neither uses a database or a backend.",
  },

  /* ================================================================
     03 — TRAVEL PLATFORM (SIH 2026)
     ================================================================ */
  {
    slug: "sih-2026",
    index: "03",
    name: "Nirmān",
    tagline: "Tourism discovery, planning & crowd management",
    summary:
      "A three-sided tourism platform built for Smart India Hackathon: travellers plan trips and report issues, local providers manage homestays and services, and authorities monitor footfall and respond to complaints.",
    lead:
      "Tourism platforms usually serve one audience. This one is built around three, and the interesting engineering is what happens where they meet: a traveller's complaint becomes an authority's task, and live footfall data decides when a destination needs managing.",
    status: "Live",
    year: "2026",
    type: "Hackathon web application",
    contribution:
      "Built with the NEXT MILE team at PICT for Smart India Hackathon 2026. This repository is a working fork of the team's codebase, and the large majority of commits in it are mine.",
    repo: "https://github.com/adip45/SIH-2026",
    upstream: "https://github.com/Atharva-Patil07/SIH-2026",
    demo: "https://sih-2026-one-fawn.vercel.app",
    stack: ["React", "TypeScript", "Vite", "Firebase Auth", "Vercel"],
    highlights: [
      "Three distinct role experiences",
      "Trip planning and destination discovery",
      "Traveller complaints with status tracking",
      "Authority dashboard for crowd monitoring",
    ],
    screenshots: [
      {
        src: "/projects/sih-hero.png",
        alt: "Nirmān landing page with the headline Discover the world, one journey at a time",
        caption: "Landing page — destination discovery entry point",
        kind: "capture",
      },
      {
        src: "/projects/sih-roles.png",
        alt: "Role selection screen with traveller, local provider and authority options",
        caption: "Role selection — the platform splits into three experiences from here",
        kind: "capture",
      },
    ],
    problem: {
      lead:
        "Tourism software tends to serve visitors and ignore the people who have to manage them.",
      points: [
        {
          title: "Three audiences, one destination",
          body: "A traveller, a homestay owner and a municipal officer all care about the same place for completely different reasons.",
        },
        {
          title: "Crowd safety is reactive",
          body: "Overcrowding at popular sites is usually discovered after the fact, when an authority has no live picture of footfall.",
        },
        {
          title: "Complaints vanish",
          body: "A traveller reporting a problem has no way to know whether anyone owns it, and no way to follow it to resolution.",
        },
      ],
    },
    objective: [
      "Unify discovery, local services and civic oversight behind one account system with three role types.",
      "Give authorities a live view of footfall against thresholds they set themselves.",
      "Turn traveller reports into assigned, status-tracked work with a visible resolution path.",
    ],
    features: [
      {
        title: "Trip planning",
        body: "Travellers browse real destinations with best-visit timing and duration, then build a trip plan they can return to.",
      },
      {
        title: "Local providers",
        body: "Homestay owners, guides and craftspeople keep a profile and respond to traveller requests, which carry an accepted or declined state.",
      },
      {
        title: "Crowd monitoring",
        body: "Authorities see visitors against a per-destination critical threshold, with density states from relaxed through to packed.",
      },
      {
        title: "Complaint workflow",
        body: "Cleanliness reports move open → in-review → resolved, with an assigned officer and an audit trail of state changes.",
      },
      {
        title: "Reviews and safety logs",
        body: "Traveller reviews and safety records sit alongside each destination so the authority view has context, not just numbers.",
      },
      {
        title: "Flexible storage",
        body: "Data layer supports a cloud mode backed by Firebase with a device-local fallback, so a demo never depends on connectivity.",
      },
    ],
    workflow: [
      {
        step: "01",
        title: "Choose a role",
        body: "From the landing page a visitor picks traveller, local provider or authority; Firebase Auth handles sign-in and sign-up for each.",
      },
      {
        step: "02",
        title: "Traveller",
        body: "Discover destinations, plan a trip, check crowd conditions, message providers and file a cleanliness report if something is wrong.",
      },
      {
        step: "03",
        title: "Provider",
        body: "Manage the homestay or guide profile and accept or decline the traveller requests that arrive.",
      },
      {
        step: "04",
        title: "Authority",
        body: "Monitor visitors per destination against thresholds, review complaints, and assign officers to resolve them.",
      },
    ],
    architecture: [
      {
        title: "Client-side app",
        body: "Vite with React and TypeScript — a single-page application where routing and state are handled in the client rather than on a server.",
      },
      {
        title: "Typed domain store",
        body: "A central store module defines the domain as TypeScript types — roles, providers, trip plans, reports, requests, chat threads and settings — so every screen reads and writes the same shapes.",
      },
      {
        title: "Authentication",
        body: "Firebase Auth with email/password and Google sign-in. Role selection is captured before authentication so a session lands in the right experience.",
      },
      {
        title: "Deployment",
        body: "Deployed on Vercel as a static single-page build.",
      },
    ],
    scopeNote:
      "A hackathon build. The deployed site still carries the original HostelConnect name in its header, and automation is simulated rather than backed by live municipal data. Data is stored per-device or in Firebase; there is no municipal integration.",
  },
];

/** Slug lookup used by the dynamic case-study route. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** The first project is treated as the primary piece of work. */
export const featuredProject = projects[0];
