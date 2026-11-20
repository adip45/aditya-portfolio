/* ==================================================================
   SITE CONTENT — single source of truth
   ------------------------------------------------------------------
   Everything personal lives in this file. Edit here, and the whole
   site updates: hero, about, journey, project, skills, focus,
   achievements, contact, navigation and metadata.

   Notes on honesty (please keep these rules):
   • Achievements ship empty on purpose. Only add entries you can back up.
   • LinkedIn and email are intentionally blank until real values are
     provided — while blank, those UI elements stay hidden.
   • No metrics, ratings, CGPA or adoption claims anywhere on the site.
================================================================== */

export type NavItem = { id: string; label: string; href: string };

export const site = {
  name: "Aditya Patil",
  shortName: "Aditya",
  initials: "AP",
  role: "Computer Engineering Student",
  roleSecondary: "Software Developer",
  location: "Pune, India",
  college: "Pune Institute of Computer Technology (PICT)",
  collegeShort: "PICT Pune",
  year: "Second Year",
  degree: "B.Tech",
  branch: "Computer Engineering",
  availability: "Open to software development internships",
  description:
    "Second-year Computer Engineering student at PICT Pune, passionate about programming, problem-solving, and building practical software solutions.",
  url: "https://adityapatil.dev", // ← replace with your deployed domain
  ogImage: "/og.png",
} as const;

/* ------------------------------------------------------------------
   LINKS
   Set `linkedin` and `email` to real values to reveal those elements
   everywhere. Leave blank ("") to keep them hidden — no dead links.
------------------------------------------------------------------- */
export const links = {
  /* Verified live on 2026-11-20. */
  github: "https://github.com/adip45",
  githubHandle: "adip45",
  linkedin: "https://www.linkedin.com/in/aditya-patil-ap001/",
  linkedinHandle: "aditya-patil-ap001",
  email: "adyspatil@gmail.com",
  hostelConnectRepo: "https://github.com/adip45/HostelConnect",
} as const;

export const hasEmail = links.email.trim().length > 0;
export const hasLinkedIn = links.linkedin.trim().length > 0;

/* Derived once here so every surface formats them identically. */
export const mailto = `mailto:${links.email}` as const;
export const githubUrl = links.github;
export const linkedinUrl = links.linkedin;

/** Display form of the email — kept identical to `links.email`. */
export const emailDisplay = links.email;

/* ------------------------------------------------------------------
   NAVIGATION — order drives both the navbar and section numbering
------------------------------------------------------------------- */
export const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "journey", label: "Journey", href: "#journey" },
  { id: "projects", label: "Projects", href: "#projects" },
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "contact", label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------
   HERO
------------------------------------------------------------------- */
export const hero = {
  /* Exact copy from the hero brief. Keep line breaks intentional — the
     emphasised phrases are separate fields so the accent styling is not
     buried in a string of HTML. */
  eyebrow: "PICT Pune · Computer Engineering · Second year",
  name: {
    first: "ADITYA",
    last: "PATIL",
  },
  /* "I turn ideas into software that solves problems."
     Rendered as: lead / em / join / em2 / tail  */
  headline: {
    lead: "I turn ideas into ",
    em: "software",
    join: " that ",
    em2: "solves problems",
    tail: ".",
  },
  support:
    "I'm Aditya, a Computer Engineering student passionate about programming, problem-solving, and building useful digital products. I work with C and C++, explore Data Structures and Algorithms, and enjoy bringing ideas to life through code.",
  tags: ["C / C++", "Data Structures & Algorithms", "Software Development"],
  primaryCta: { label: "Explore My Work", href: "#projects" },
  secondaryCta: { label: "Let's Connect", href: "#contact" },
  marquee: [
    "C",
    "C++",
    "Python",
    "Data Structures",
    "Algorithms",
    "Problem Solving",
    "Next.js",
    "TypeScript",
    "Prisma",
    "PostgreSQL",
  ],
};

/* ------------------------------------------------------------------
   ABOUT
------------------------------------------------------------------- */
export const about = {
  label: "01 — About",
  title: "A little about me.",
  pull: "I like understanding how things work — then building them properly.",
  paragraphs: [
    "I'm Aditya Patil, a second-year Computer Engineering student at PICT Pune. I enjoy programming, understanding how software works, and solving problems through logical thinking.",
    "I have a strong foundation in C and C++, along with working knowledge of Python, Data Structures and Algorithms. I enjoy turning ideas into practical applications and continuously improving my skills through hands-on development.",
  ],
  facts: [
    { label: "Studying", value: "B.Tech Computer Engineering" },
    { label: "Institute", value: "PICT, Pune" },
    { label: "Currently", value: "Second year" },
    { label: "Core stack", value: "C · C++ · Python" },
  ],
  objective:
    "Develop strong software engineering skills, build useful applications, and find software development internship opportunities.",
};

/* ------------------------------------------------------------------
   JOURNEY / EDUCATION
   No dates or scores are claimed — add them only if verified.
------------------------------------------------------------------- */
export const journey = {
  label: "02 — Journey",
  title: "Where I'm learning.",
  intro:
    "An academic foundation in computer engineering, and deliberate space reserved for the work that comes next.",
  education: [
    {
      kind: "Education",
      status: "In progress",
      institute: "Pune Institute of Computer Technology (PICT)",
      place: "Pune, Maharashtra",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Engineering",
      year: "Second Year",
      notes:
        "Coursework and self-directed practice across programming fundamentals, data structures and algorithms.",
      current: true,
    },
  ],
  upcoming: [
    { title: "Internships", note: "Seeking my first software development internship.", icon: "briefcase" },
    { title: "Hackathons", note: "Building under pressure with a team.", icon: "flame" },
    { title: "Workshops", note: "Learning tools and practices hands-on.", icon: "wrench" },
    { title: "Achievements", note: "Room for results worth showing.", icon: "award" },
  ],
};

/* ------------------------------------------------------------------
   FEATURED PROJECT — HostelConnect
   All feature claims below were verified against the repository
   (server actions, Prisma schema, dashboards and middleware).
------------------------------------------------------------------- */
export const hostelConnect = {
  name: "HostelConnect",
  subtitle: "Student Accommodation Discovery & Booking Platform",
  kicker: "Featured project",
  year: "2026",
  status: "Ongoing",
  repo: links.hostelConnectRepo,
  summary:
    "A full-stack web application designed around two roles: students searching for hostels and PG accommodations, and managers who list, price and manage those properties.",
  positioning:
    "Two distinct experiences on a single Next.js codebase — discovery and booking for students, inventory and occupancy for managers — unified by role-aware authentication.",
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
  // Honest scope note used on both the card and the case study.
  attribution:
    "Built collaboratively as a team project at PICT. This repository is my working fork — I contribute to features across the student and manager experiences.",
  scopeNote:
    "No payments, chat, verification service or live deployment is claimed — this portfolio documents the application as implemented in the repository.",
};

/* ------------------------------------------------------------------
   SKILLS
   Grouped capabilities only — no percentages, ratings or progress bars.
   `open: true` renders an empty, inviting slot for future growth.
------------------------------------------------------------------- */
export const skills = {
  label: "04 — Toolkit",
  title: "What I build with.",
  intro:
    "A focused foundation, deliberately presented without scores or inflated lists. New tools get added as I genuinely use them.",
  groups: [
    {
      key: "programming",
      index: "01",
      title: "Programming",
      caption: "The languages I write and reason in",
      icon: "code",
      items: ["C", "C++", "Python"],
    },
    {
      key: "web",
      index: "02",
      title: "Web Development",
      caption: "Used hands-on in HostelConnect",
      icon: "monitor",
      items: [
        "Next.js",
        "React",
        "TypeScript",
        "Prisma ORM",
        "PostgreSQL",
        "NextAuth",
        "Tailwind CSS",
      ],
    },
    {
      key: "cs",
      index: "03",
      title: "Core Computer Science",
      caption: "Fundamentals I practise consistently",
      icon: "cpu",
      items: [
        "Data Structures",
        "Algorithms",
        "Object-Oriented Programming",
        "Problem Solving",
      ],
    },
    {
      key: "tools",
      index: "04",
      title: "Tools & Platforms",
      caption: "What I actually work in day to day",
      icon: "wrench",
      /* Only tools actually used. The list stays credible because it
         stays short — add Postman, Figma, Linux or similar once you
         genuinely work in them. */
      items: ["VS Code", "Git", "GitHub", "Supabase", "npm"],
    },
    {
      key: "growth",
      index: "05",
      title: "Growing Into",
      caption: "Currently exploring",
      icon: "sprout",
      items: [
        "Full-Stack Development",
        "Software Engineering Practices",
        "System Design",
      ],
    },
  ],
  principles: [
    "Write it to understand it.",
    "Understand the problem before the solution.",
    "Prefer clear code over clever code.",
  ],
};

/* ------------------------------------------------------------------
   CURRENT FOCUS
------------------------------------------------------------------- */
export const focus = {
  label: "05 — Current focus",
  title: "What I'm working towards.",
  intro:
    "Five deliberate directions — not a checklist, a practice routine.",
  cards: [
    {
      index: "01",
      title: "Improving DSA",
      subtitle: "Data structures & problem solving",
      body: "Practising consistently to recognise patterns faster and reason about complexity before writing a line of code.",
      icon: "network",
    },
    {
      index: "02",
      title: "Strengthening C++",
      subtitle: "The language I think in",
      body: "Going deeper into the standard library, memory model and idioms that make C++ programs correct and efficient.",
      icon: "binary",
    },
    {
      index: "03",
      title: "Exploring Full-Stack",
      subtitle: "From interface to database",
      body: "Understanding how a request travels through routing, auth, business logic and persistence — and how to keep that path clean.",
      icon: "layers",
    },
    {
      index: "04",
      title: "Building Real Software",
      subtitle: "Practical over theoretical",
      body: "Shipping applications that solve a specific problem for a specific person, then iterating on real feedback.",
      icon: "hammer",
    },
    {
      index: "05",
      title: "Engineering Principles",
      subtitle: "Writing software that lasts",
      body: "Version control hygiene, readable structure, honest error handling and the discipline of reviewing my own work.",
      icon: "compass",
    },
  ],
};

/* ------------------------------------------------------------------
   ACHIEVEMENTS / EXPERIENCE
   Intentionally EMPTY — the section only renders once real entries
   are added. Never fill this to balance the layout.

   Add entries in this shape:
   {
     type: "Hackathon",            // Hackathon | Competitive Programming |
                                   // Certification | Internship |
                                   // Workshop | Achievement
     title: "Event or role name",
     detail: "What you did / built — factual only.",
     date: "2026",                 // optional
     link: "https://…",            // optional
   }
------------------------------------------------------------------- */
export type Achievement = {
  type: string;
  title: string;
  detail: string;
  date?: string;
  link?: string;
};

export const achievements: Achievement[] = [];

/* ------------------------------------------------------------------
   CONTACT
------------------------------------------------------------------- */
export const contact = {
  label: "06 — Contact",
  title: "Let's *connect.*",
  body:
    "Have an interesting opportunity, project idea, or just want to talk about technology? I'd love to hear from you.",
  cards: [
    {
      icon: "mail",
      label: "Email",
      value: "adyspatil@gmail.com",
      action: "Send me an email",
      note: "The most direct way to reach me.",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      value: "Aditya Patil",
      action: "Connect on LinkedIn",
      note: "Professional profile and updates.",
    },
    {
      icon: "github",
      label: "GitHub",
      value: "Aditya Patil",
      action: "Explore my GitHub",
      note: "Repositories, commits and experiments.",
    },
  ],
  footerNote:
    "Designed and built from scratch with Next.js, TypeScript, Tailwind CSS and Framer Motion.",
};
