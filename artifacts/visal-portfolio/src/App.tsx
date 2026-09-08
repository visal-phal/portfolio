import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useState,
} from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Circle,
  Download,
  ExternalLink,
  ImagePlus,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Pencil,
  Phone,
  Plus,
  Send,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Link, Route, Switch, Router as WouterRouter } from "wouter";

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL;
const assetPath = (path: string) => `${basePath}${path}`;
const defaultPortrait = assetPath("assets/pdf-extracted/visal-000.jpg");
const ADMIN_EMAIL = "emilyplank090923@gmail.com";
const ADMIN_PASSWORD = "sasal090197";

type ExperienceItem = {
  id: string;
  date: string;
  company: string;
  role: string;
  description: string;
};
type EducationItem = {
  id: string;
  date: string;
  school: string;
  title: string;
  detail: string;
};
type ProjectItem = {
  id: string;
  title: string;
  type: string;
  year: string;
  description: string;
  tags: string;
  link: string;
};
type CapabilityItem = { id: string; title: string; description: string };
type SocialItem = { id: string; label: string; url: string };
type FactItem = { id: string; label: string; value: string };
type PortfolioContent = {
  nameFirst: string;
  nameLast: string;
  eyebrow: string;
  year: string;
  intro: string;
  availability: string;
  portrait: string;
  portraitLabel: string;
  ageLine: string;
  statement: string;
  aboutHeading: string;
  facts: FactItem[];
  contactEmail: string;
  phone: string;
  location: string;
  experienceHeading: string;
  experienceNote: string;
  experiences: ExperienceItem[];
  educationIntro: string;
  education: EducationItem[];
  skillsIntro: string;
  skills: string[];
  projectsHeading: string;
  projectsIntro: string;
  projects: ProjectItem[];
  capabilitiesHeading: string;
  capabilitiesIntro: string;
  capabilities: CapabilityItem[];
  quote: string;
  quoteAttribution: string;
  socials: SocialItem[];
};
type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  sentAt: string;
  read: boolean;
};

const defaultContent: PortfolioContent = {
  nameFirst: "Visal",
  nameLast: "Phal.",
  eyebrow: "Phnom Penh, Cambodia",
  year: "2026",
  intro:
    "A fresh software engineering graduate with a curious eye for useful details and a soft spot for thoughtful interfaces.",
  availability: "Open to thoughtful opportunities",
  portrait: defaultPortrait,
  portraitLabel: "No. 01 / self portrait",
  ageLine: "23 years young / still learning",
  statement:
    "I build with care, stay curious, and bring calm energy to complicated problems.",
  aboutHeading: "Good work starts with care.",
  facts: [
    { id: "fact-1", label: "Currently", value: "Finishing my BSE" },
    { id: "fact-2", label: "Based in", value: "Phnom Penh, KH" },
    { id: "fact-3", label: "Known for", value: "Asking better questions" },
    { id: "fact-4", label: "Approach", value: "Warm, precise, adaptable" },
  ],
  contactEmail: "visalphal951230@gmail.com",
  phone: "+855 87 645 263",
  location: "Dang Ka district, Phnom Penh",
  experienceHeading: "Every role taught me something.",
  experienceNote:
    "Experience is not a straight line. It is a collection of useful instincts.",
  experiences: [
    {
      id: "job-1",
      date: "APR — JUL 2025",
      company: "Kerry Worldbridge Logistics",
      role: "Documentation Officer Intern",
      description:
        "Kept the details moving behind the scenes: data entry, inbound and outbound documentation, inventory management, and customer service.",
    },
    {
      id: "job-2",
      date: "JUL 2025 — JUN 2026",
      company: "Vireak Buntham Traveling",
      role: "Ticket Online Booking",
      description:
        "Met customers where they were — at the counter, on the phone, and through accurate transactions. Handled call center support, reporting, data entry, and reception.",
    },
    {
      id: "job-3",
      date: "JUN — AUG 2026",
      company: "Mr Piccolo Restaurant",
      role: "Account / Service / Barista",
      description:
        "A little bit of everything, done with a smile: customer service, daily sales and expense management, reception, coffee, and drinks.",
    },
  ],
  educationIntro:
    "A practical education, with plenty of room left for curiosity.",
  education: [
    {
      id: "edu-1",
      date: "2022 — 2026",
      school: "Beltei International University",
      title: "Bachelor's Degree in Software Engineering",
      detail: "Phnom Penh",
    },
    {
      id: "edu-2",
      date: "2020 — 2022",
      school: "Prek Kompers High School",
      title: "Passed BAC II",
      detail: "",
    },
  ],
  skillsIntro:
    "The human side of making things work — in code, in teams, and in the spaces between.",
  skills: [
    "Critical Thinking",
    "Problem-Solving",
    "Collaboration & Teamwork",
    "Flexibility",
    "Fast Learning",
  ],
  projectsHeading: "Small ideas, made useful.",
  projectsIntro:
    "A few example projects are here as placeholders. Replace them with work you are proud to share.",
  projects: [
    {
      id: "project-1",
      title: "Personal Portfolio",
      type: "Web experience",
      year: "2026",
      description:
        "A warm, editorial portfolio that turns a resume into a living introduction.",
      tags: "React, Vite, Design",
      link: "",
    },
    {
      id: "project-2",
      title: "Booking Flow Concept",
      type: "Product concept",
      year: "2026",
      description:
        "An example redesign for making travel booking feel calmer, clearer, and more human.",
      tags: "UX, Prototyping, Research",
      link: "",
    },
    {
      id: "project-3",
      title: "Your next project",
      type: "Add your work here",
      year: "2026",
      description:
        "Use the editor to replace this example with a real project, case study, or experiment.",
      tags: "Your tools, Your role",
      link: "",
    },
  ],
  capabilitiesHeading: "How I can help.",
  capabilitiesIntro:
    "The kind of work I am excited to learn through, contribute to, and make better with a thoughtful team.",
  capabilities: [
    {
      id: "capability-1",
      title: "Front-end foundations",
      description:
        "Building responsive interfaces with careful structure, clear states, and a human eye for details.",
    },
    {
      id: "capability-2",
      title: "Product thinking",
      description:
        "Turning a messy question into a simpler flow by listening, asking, and iterating.",
    },
    {
      id: "capability-3",
      title: "Team contribution",
      description:
        "Bringing dependable communication, flexibility, and a willingness to learn quickly.",
    },
  ],
  quote: "The smallest details are often where the best work begins.",
  quoteAttribution: "— Visal Phal, probably",
  socials: [
    { id: "social-1", label: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "social-2", label: "GitHub", url: "https://github.com" },
  ],
};

function makeId(prefix: string) {
  return `${prefix}-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : Date.now()}`;
}

function readContent(): PortfolioContent {
  try {
    const stored = JSON.parse(localStorage.getItem("visal-content") || "{}");
    return {
      ...defaultContent,
      ...stored,
      facts: stored.facts || defaultContent.facts,
      experiences: stored.experiences || defaultContent.experiences,
      education: stored.education || defaultContent.education,
      skills: stored.skills || defaultContent.skills,
      projects: stored.projects || defaultContent.projects,
      capabilities: stored.capabilities || defaultContent.capabilities,
      socials: stored.socials || defaultContent.socials,
    };
  } catch {
    return defaultContent;
  }
}

function readMessages(): Message[] {
  try {
    return JSON.parse(localStorage.getItem("visal-messages") || "[]");
  } catch {
    return [];
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={basePath.replace(/\/$/, "")}>
            <Switch>
              <Route path="/admin" component={Admin} />
              <Route path="/" component={Home} />
              <Route component={NotFound} />
            </Switch>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

function SiteHeader({ content }: { content: PortfolioContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ["About", "#about"],
    ["Experience", "#experience"],
    ["Work", "#work"],
    ["Skills", "#skills"],
    ["Contact", "#contact"],
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-5 py-5 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <a
          data-testid="link-logo"
          href="#top"
          className="group flex items-center gap-3 font-mono-custom text-[11px] font-medium uppercase tracking-[.2em]"
        >
          <span className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
            VP
          </span>
          <span className="hidden sm:block">
            {content.nameFirst} / {content.year}
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([label, href]) => (
            <a
              data-testid={`link-nav-${label.toLowerCase()}`}
              key={href}
              href={href}
              className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
          <a
            data-testid="link-download-resume"
            href={assetPath("assets/Visal_Phal_Resume.pdf")}
            download
            className="flex items-center gap-2 border border-foreground px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.16em] transition-all duration-300 hover:-translate-y-1 hover:bg-foreground hover:text-background"
          >
            <Download size={13} /> Resume
          </a>
        </nav>
        <button
          data-testid="button-toggle-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          className="border border-foreground p-2 transition-transform hover:rotate-3 md:hidden"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen && (
        <div className="menu-pop absolute left-5 right-5 top-16 border border-foreground bg-background p-5 shadow-[6px_6px_0_hsl(var(--primary))] md:hidden">
          <nav className="flex flex-col gap-5">
            {links.map(([label, href]) => (
              <a
                data-testid={`link-mobile-${label.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                key={href}
                href={href}
                className="font-mono-custom text-xs uppercase tracking-[.16em] transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

function Home() {
  const [content, setContent] = useState<PortfolioContent>(readContent);
  useEffect(() => {
    const sync = () => setContent(readContent());
    window.addEventListener("storage", sync);
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll"),
    );
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("is-visible");
                  observer?.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.12 },
          )
        : null;
    revealElements.forEach((element) => observer?.observe(element));
    if (!observer)
      revealElements.forEach((element) => element.classList.add("is-visible"));
    return () => {
      window.removeEventListener("storage", sync);
      observer?.disconnect();
    };
  }, []);
  return (
    <div id="top" className="paper-grain overflow-hidden">
      <SiteHeader content={content} />
      <main>
        <Hero content={content} />
        <About content={content} />
        <Experience content={content} />
        <Education content={content} />
        <Projects content={content} />
        <Capabilities content={content} />
        <Skills content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}

function Hero({ content }: { content: PortfolioContent }) {
  return (
    <section
      className="relative flex min-h-[800px] items-center border-b border-foreground px-5 pb-20 pt-36 sm:px-10 lg:min-h-[900px] lg:px-16"
      style={{ background: "hsl(39 45% 94%)" }}
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10">
        <div className="relative z-10">
          <div className="reveal mb-8 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.22em] text-primary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />{" "}
            {content.eyebrow}{" "}
            <span className="text-muted-foreground">/ {content.year}</span>
          </div>
          <h1
            data-testid="text-hero-name"
            className="reveal reveal-delay-1 max-w-[780px] font-display text-[clamp(5.5rem,14vw,13.8rem)] leading-[.72] tracking-[-.065em] text-foreground"
          >
            {content.nameFirst}
            <br />
            <em className="ml-[.19em] text-primary">{content.nameLast}</em>
          </h1>
          <div className="reveal reveal-delay-2 mt-12 grid max-w-[680px] grid-cols-[80px_1fr] gap-5 border-t border-foreground pt-5 sm:grid-cols-[120px_1fr]">
            <p className="font-mono-custom text-[10px] uppercase leading-relaxed tracking-[.14em] text-primary">
              About the
              <br />
              person
            </p>
            <p
              data-testid="text-hero-intro"
              className="max-w-[500px] text-lg leading-relaxed text-balance sm:text-xl"
            >
              {content.intro}
            </p>
          </div>
          <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <a
              data-testid="link-contact-hero"
              href="#contact"
              className="group flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_hsl(var(--foreground))]"
            >
              Let's talk{" "}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
            <span className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground">
              {content.availability}
            </span>
          </div>
        </div>
        <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[500px] lg:justify-self-end">
          <div className="orbit absolute -right-5 -top-8 h-24 w-24 border-2 border-primary sm:-right-10 sm:-top-12 sm:h-32 sm:w-32" />
          <div className="absolute -bottom-7 -left-7 z-20 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-center font-mono-custom text-[9px] uppercase leading-tight tracking-[.12em] transition-transform duration-500 hover:rotate-12 hover:scale-110 sm:-left-10 sm:h-28 sm:w-28">
            <span>
              Made with
              <br />
              curiosity
            </span>
          </div>
          <div className="relative aspect-[.83] overflow-hidden border border-foreground bg-secondary p-4 shadow-[14px_14px_0_hsl(var(--primary))] transition-all duration-700 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[18px_18px_0_hsl(var(--primary))] sm:p-6">
            <div className="relative h-full overflow-hidden bg-primary">
              <img
                data-testid="img-portrait"
                src={content.portrait || defaultPortrait}
                alt={`${content.nameFirst} ${content.nameLast} portrait`}
                className="h-full w-full object-cover object-top mix-blend-multiply opacity-90 grayscale-[20%] transition-transform duration-1000 hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = defaultPortrait;
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(155deg,transparent_55%,rgba(47,11,12,.38))]" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-primary-foreground">
                <span className="font-mono-custom text-[9px] uppercase tracking-[.16em]">
                  {content.portraitLabel}
                </span>
                <span className="font-display text-5xl">VP</span>
              </div>
            </div>
          </div>
          <p className="mt-7 text-right font-mono-custom text-[9px] uppercase tracking-[.13em] text-muted-foreground">
            {content.ageLine}
          </p>
        </div>
      </div>
      <a
        data-testid="link-scroll-about"
        href="#about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-custom text-[9px] uppercase tracking-[.2em] text-muted-foreground transition-transform hover:translate-y-1 lg:flex"
      >
        <ArrowDown size={14} /> Scroll to explore
      </a>
    </section>
  );
}

function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-12 flex items-center gap-4 font-mono-custom text-[10px] uppercase tracking-[.2em] text-primary">
      <span>{number}</span>
      <span className="ink-line w-12" />
      <span>{children}</span>
    </div>
  );
}

function About({ content }: { content: PortfolioContent }) {
  const heading = content.aboutHeading.split(" ");
  return (
    <section
      id="about"
      className="reveal-on-scroll border-b border-foreground px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel number="01">The short version</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <h2 className="font-display text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl lg:text-[9.5rem]">
            {heading.map((word, index) => (
              <span className="block" key={`${word}-${index}`}>
                <em
                  className={index === heading.length - 2 ? "text-primary" : ""}
                >
                  {word}
                </em>
                {index < heading.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
          <div className="max-w-2xl lg:pt-5">
            <p
              data-testid="text-about-statement"
              className="font-display text-4xl leading-[.98] tracking-[-.03em] sm:text-5xl"
            >
              {content.statement}
            </p>
            <div className="mt-12 grid gap-7 border-t border-foreground pt-7 sm:grid-cols-2">
              {content.facts.map((fact) => (
                <Fact key={fact.id} label={fact.label} value={fact.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 font-mono-custom text-[9px] uppercase tracking-[.16em] text-primary">
        {label}
      </p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function Experience({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="experience"
      className="bg-primary px-5 py-24 text-primary-foreground sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel number="02">The work so far</SectionLabel>
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <h2 className="max-w-3xl font-display text-6xl leading-[.86] tracking-[-.04em] sm:text-8xl lg:text-[9rem]">
            {content.experienceHeading.split(" ").map((word, index) => (
              <span className="mr-[.2em] inline-block" key={`${word}-${index}`}>
                <em className={index === 2 ? "text-accent" : ""}>{word}</em>
              </span>
            ))}
          </h2>
          <p className="max-w-xs border-l border-primary-foreground/35 pl-5 font-mono-custom text-[10px] uppercase leading-[1.8] tracking-[.12em] text-primary-foreground/70">
            {content.experienceNote}
          </p>
        </div>
        <div className="border-t border-primary-foreground/40">
          {content.experiences.map((job, index) => (
            <article
              data-testid={`card-job-${index + 1}`}
              key={job.id}
              className="group grid gap-6 border-b border-primary-foreground/40 py-8 transition-all duration-500 hover:bg-primary-foreground hover:px-4 hover:text-primary md:grid-cols-[110px_1fr_1.1fr] md:gap-10"
            >
              <div className="font-mono-custom text-[10px] tracking-[.12em] opacity-70">
                {String(index + 1).padStart(2, "0")}{" "}
                <span className="mx-2">/</span> {job.date}
              </div>
              <div>
                <h3 className="font-display text-3xl leading-none sm:text-4xl">
                  {job.role}
                </h3>
                <p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[.12em] opacity-75">
                  {job.company}
                </p>
              </div>
              <p className="max-w-lg text-sm leading-relaxed opacity-80 md:justify-self-end">
                {job.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ content }: { content: PortfolioContent }) {
  return (
    <section className="reveal-on-scroll border-b border-foreground px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.7fr_1.3fr]">
        <div>
          <SectionLabel number="03">The foundation</SectionLabel>
          <p className="max-w-sm font-display text-4xl leading-none sm:text-5xl">
            {content.educationIntro}
          </p>
        </div>
        <div className="relative border-l border-foreground pl-7 sm:pl-12">
          {content.education.map((item, index) => (
            <div className="relative pb-12 last:pb-0" key={item.id}>
              <div
                className={`absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full ${index === 0 ? "bg-primary" : "border border-primary bg-background"}`}
              />
              <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">
                {item.date}
              </p>
              <h3 className="mt-4 font-display text-4xl leading-none sm:text-6xl">
                {item.title}
              </h3>
              <p className="mt-5 text-sm text-muted-foreground">
                {item.school}
                {item.detail ? ` / ${item.detail}` : ""}
              </p>
              {index < content.education.length - 1 && (
                <div className="my-12 h-px w-full bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="work"
      className="reveal-on-scroll border-b border-foreground bg-secondary px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel number="04">Selected work</SectionLabel>
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <h2 className="max-w-3xl font-display text-7xl leading-[.83] tracking-[-.04em] sm:text-9xl">
            {content.projectsHeading}
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {content.projectsIntro}
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {content.projects.map((project, index) => (
            <article
              key={project.id}
              className="hover-lift group flex min-h-[360px] flex-col justify-between border border-foreground bg-background p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-foreground hover:text-background"
            >
              <div>
                <div className="mb-12 flex items-center justify-between font-mono-custom text-[9px] uppercase tracking-[.15em] text-primary group-hover:text-accent">
                  <span>
                    {String(index + 1).padStart(2, "0")} / {project.type}
                  </span>
                  <span>{project.year}</span>
                </div>
                <h3 className="font-display text-4xl leading-none">
                  {project.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-background/70">
                  {project.description}
                </p>
              </div>
              <div className="flex items-end justify-between gap-4">
                <p className="font-mono-custom text-[9px] uppercase leading-relaxed tracking-[.13em] text-primary group-hover:text-accent">
                  {project.tags}
                </p>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${project.title}`}
                    className="transition-transform hover:-translate-y-1 hover:translate-x-1"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                ) : (
                  <Sparkles
                    size={18}
                    className="text-primary group-hover:text-accent"
                  />
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Capabilities({ content }: { content: PortfolioContent }) {
  return (
    <section className="reveal-on-scroll border-b border-foreground px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel number="05">The useful part</SectionLabel>
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <h2 className="max-w-md font-display text-7xl leading-[.84] tracking-[-.04em] sm:text-9xl">
              {content.capabilitiesHeading}
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {content.capabilitiesIntro}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.capabilities.map((capability, index) => (
              <div
                key={capability.id}
                className="border-t border-foreground pt-5 transition-transform duration-500 hover:-translate-y-2"
              >
                <p className="font-mono-custom text-[10px] text-primary">
                  0{index + 1}
                </p>
                <h3 className="mt-14 font-display text-3xl leading-none">
                  {capability.title}
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ content }: { content: PortfolioContent }) {
  return (
    <section
      id="skills"
      className="reveal-on-scroll border-b border-foreground bg-secondary px-5 py-24 sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel number="06">The toolkit</SectionLabel>
        <div className="grid items-start gap-12 lg:grid-cols-[.6fr_1.4fr]">
          <div>
            <h2 className="font-display text-7xl leading-[.85] tracking-[-.04em] sm:text-9xl">
              Soft
              <br />
              <em className="text-primary">skills.</em>
            </h2>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {content.skillsIntro}
            </p>
          </div>
          <div className="grid border-t border-foreground sm:grid-cols-2">
            {content.skills.map((skill, index) => (
              <div
                data-testid={`text-skill-${index}`}
                key={`${skill}-${index}`}
                className="flex min-h-28 items-center justify-between border-b border-foreground p-4 transition-colors duration-300 hover:bg-background sm:p-6"
              >
                <span className="font-display text-3xl leading-none sm:text-4xl">
                  {skill}
                </span>
                <Circle
                  size={15}
                  fill={index === 0 ? "currentColor" : "none"}
                  className="shrink-0 text-primary"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact({ content }: { content: PortfolioContent }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const next: Message = {
      ...form,
      id: Date.now(),
      sentAt: new Date().toISOString(),
      read: false,
    };
    localStorage.setItem(
      "visal-messages",
      JSON.stringify([next, ...readMessages()]),
    );
    setForm({ name: "", email: "", message: "" });
    setSent(true);
  };
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-foreground px-5 py-24 text-background sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-background/20 motion-orbit sm:h-96 sm:w-96" />
      <div className="absolute right-10 top-20 h-4 w-4 bg-accent" />
      <div className="relative mx-auto max-w-[1440px]">
        <SectionLabel number="07">Make an introduction</SectionLabel>
        <div className="grid gap-16 lg:grid-cols-[1fr_.8fr] lg:gap-28">
          <div>
            <h2 className="font-display text-7xl leading-[.82] tracking-[-.04em] sm:text-[9rem]">
              Have a<br />
              <em className="text-accent">good idea?</em>
            </h2>
            <p className="mt-10 max-w-md text-lg leading-relaxed text-background/70">
              Whether it is a first job, a useful collaboration, or simply a
              hello — I would genuinely like to hear from you.
            </p>
            <div className="mt-10 space-y-4 border-t border-background/25 pt-6 font-mono-custom text-[10px] uppercase tracking-[.13em]">
              <a
                data-testid="link-email"
                href={`mailto:${content.contactEmail}`}
                className="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Mail size={15} /> {content.contactEmail}
              </a>
              <a
                data-testid="link-phone"
                href={`tel:${content.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 transition-colors hover:text-accent"
              >
                <Phone size={15} /> {content.phone}
              </a>
              <p className="flex items-center gap-3 text-background/60">
                <MapPin size={15} /> {content.location}
              </p>
            </div>
          </div>
          <form
            data-testid="form-contact"
            onSubmit={submit}
            className="border border-background/35 bg-background/5 p-6 transition-colors duration-500 hover:border-accent sm:p-8"
          >
            {sent ? (
              <div
                data-testid="status-message-sent"
                className="flex min-h-[340px] flex-col items-center justify-center text-center"
              >
                <div className="mb-6 flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-accent text-foreground">
                  <Check size={24} />
                </div>
                <h3 className="font-display text-4xl">Message received.</h3>
                <p className="mt-3 max-w-xs text-sm text-background/60">
                  Thanks for reaching out. Visal will get back to you soon.
                </p>
                <button
                  data-testid="button-send-another"
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-8 font-mono-custom text-[10px] uppercase tracking-[.16em] text-accent underline underline-offset-4"
                >
                  Send another
                </button>
              </div>
            ) : (
              <>
                <p className="mb-8 font-mono-custom text-[10px] uppercase tracking-[.16em] text-background/60">
                  Drop a line / 01
                </p>
                <label className="mb-6 block">
                  <span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-background/60">
                    Your name
                  </span>
                  <input
                    data-testid="input-contact-name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border-b border-background/35 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent"
                    placeholder="What should I call you?"
                  />
                </label>
                <label className="mb-6 block">
                  <span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-background/60">
                    Email address
                  </span>
                  <input
                    data-testid="input-contact-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full border-b border-background/35 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="mb-8 block">
                  <span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-background/60">
                    Your note
                  </span>
                  <textarea
                    data-testid="input-contact-message"
                    required
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full resize-none border-b border-background/35 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent"
                    placeholder="Tell me a little about it..."
                  />
                </label>
                <button
                  data-testid="button-submit-contact"
                  type="submit"
                  className="group flex w-full items-center justify-between bg-accent px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_hsl(var(--primary))]"
                >
                  <span>Send message</span>
                  <Send
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </>
            )}
          </form>
        </div>
        <div className="mt-20 border-t border-background/25 pt-6">
          <p className="max-w-3xl font-display text-3xl leading-tight sm:text-5xl">
            “{content.quote}”
          </p>
          <p className="mt-5 font-mono-custom text-[10px] uppercase tracking-[.16em] text-background/50">
            {content.quoteAttribution}
          </p>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: PortfolioContent }) {
  return (
    <footer className="flex flex-col justify-between gap-4 bg-foreground px-5 pb-7 text-background sm:flex-row sm:px-10 lg:px-16">
      <p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-background/50">
        © {content.year} {content.nameFirst} {content.nameLast}
      </p>
      <div className="flex flex-wrap gap-5 font-mono-custom text-[9px] uppercase tracking-[.15em] text-background/50">
        {content.socials.map((social) => (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            {social.label} <ExternalLink size={11} className="ml-1 inline" />
          </a>
        ))}
        <Link
          data-testid="link-admin"
          href="/admin"
          className="transition-colors hover:text-accent"
        >
          Admin
        </Link>
      </div>
    </footer>
  );
}

function Field({
  label,
  value,
  onChange,
  textarea = false,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary">
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          placeholder={placeholder}
          className="admin-input mt-2 w-full resize-y border border-foreground bg-transparent p-3 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="admin-input mt-2 w-full border-b border-foreground bg-transparent py-3 text-sm outline-none focus:border-primary"
        />
      )}
    </label>
  );
}

function EditorCard({
  title,
  index,
  onRemove,
  children,
}: {
  title: string;
  index: number;
  onRemove: () => void;
  children: ReactNode;
}) {
  return (
    <article className="editor-card border border-foreground/30 bg-background/50 p-4 transition-all duration-300 hover:border-primary sm:p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono-custom text-[10px] text-primary">
            0{index + 1}
          </span>
          <h3 className="font-display text-2xl">{title || "Untitled entry"}</h3>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center gap-2 font-mono-custom text-[9px] uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-destructive"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
      {children}
    </article>
  );
}

function Admin() {
  const [authed, setAuthed] = useState(
    () => localStorage.getItem("visal-admin") === "true",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [content, setContent] = useState<PortfolioContent>(readContent);
  const [messages, setMessages] = useState<Message[]>(readMessages);
  const [saved, setSaved] = useState(false);
  const update = <K extends keyof PortfolioContent>(
    key: K,
    value: PortfolioContent[K],
  ) => setContent((current) => ({ ...current, [key]: value }));
  const login = (event: FormEvent) => {
    event.preventDefault();
    if (
      email.trim().toLowerCase() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("visal-admin", "true");
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("That email and password do not match.");
    }
  };
  const save = () => {
    localStorage.setItem("visal-content", JSON.stringify(content));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };
  const removeMessage = (id: number) => {
    const next = messages.filter((message) => message.id !== id);
    setMessages(next);
    localStorage.setItem("visal-messages", JSON.stringify(next));
  };
  const handlePortrait = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => update("portrait", String(reader.result));
    reader.readAsDataURL(file);
  };
  const resetPortrait = () => update("portrait", defaultPortrait);
  const addExperience = () =>
    update("experiences", [
      ...content.experiences,
      {
        id: makeId("job"),
        date: "NEW DATE",
        company: "New company",
        role: "New role",
        description: "Add what you learned or contributed here.",
      },
    ]);
  const addEducation = () =>
    update("education", [
      ...content.education,
      {
        id: makeId("edu"),
        date: "YEAR — YEAR",
        school: "School or university",
        title: "Degree or achievement",
        detail: "Location",
      },
    ]);
  const addProject = () =>
    update("projects", [
      ...content.projects,
      {
        id: makeId("project"),
        title: "New project",
        type: "Project type",
        year: content.year,
        description:
          "Describe the project, your role, and what made it useful.",
        tags: "Tools, Skills, Role",
        link: "",
      },
    ]);
  const addCapability = () =>
    update("capabilities", [
      ...content.capabilities,
      {
        id: makeId("capability"),
        title: "New capability",
        description: "Describe how this strength shows up in your work.",
      },
    ]);
  const addFact = () =>
    update("facts", [
      ...content.facts,
      { id: makeId("fact"), label: "New label", value: "New value" },
    ]);
  const addSocial = () =>
    update("socials", [
      ...content.socials,
      { id: makeId("social"), label: "New link", url: "https://" },
    ]);
  if (!authed)
    return (
      <div className="admin-shell flex min-h-[100dvh] items-center justify-center bg-background px-5">
        <form
          onSubmit={login}
          className="admin-login w-full max-w-md border border-foreground bg-card p-8 shadow-[10px_10px_0_hsl(var(--primary))]"
        >
          <Link
            data-testid="link-admin-back"
            href="/"
            className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary"
          >
            ← Back to portfolio
          </Link>
          <h1 className="mt-12 font-display text-6xl leading-none">
            Hello,
            <br />
            <em className="text-primary">editor.</em>
          </h1>
          <p className="mt-5 text-sm text-muted-foreground">
            A private room for keeping the portfolio current.
          </p>
          <label className="mt-10 block">
            <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary">
              Email address
            </span>
            <input
              data-testid="input-admin-email-login"
              autoComplete="username"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-input mt-2 w-full border-b border-foreground bg-transparent py-3 outline-none focus:border-primary"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="mt-6 block">
            <span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary">
              Password
            </span>
            <input
              data-testid="input-admin-password"
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input mt-2 w-full border-b border-foreground bg-transparent py-3 outline-none focus:border-primary"
              placeholder="Your private password"
              required
            />
          </label>
          {loginError && (
            <p
              role="alert"
              className="mt-4 font-mono-custom text-[10px] uppercase tracking-[.1em] text-destructive"
            >
              {loginError}
            </p>
          )}
          <button
            data-testid="button-admin-login"
            className="mt-8 flex w-full items-center justify-between bg-primary px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_hsl(var(--foreground))]"
          >
            Enter the room <ArrowUpRight size={15} />
          </button>
          <p className="mt-5 font-mono-custom text-[9px] uppercase leading-relaxed tracking-[.12em] text-muted-foreground">
            Static hosting mode: edits, uploads, messages, and login state stay
            in this browser. Use server-backed auth before publishing private
            data.
          </p>
        </form>
      </div>
    );
  return (
    <div className="admin-shell min-h-[100dvh] bg-background px-5 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <header className="sticky top-0 z-30 -mx-5 mb-12 border-b border-foreground/20 bg-background/90 px-5 py-5 backdrop-blur-md sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-primary">
                Visal Phal / private room
              </p>
              <h1 className="mt-2 font-display text-5xl">Portfolio editor.</h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                data-testid="link-admin-view-site"
                href="/"
                className="hidden border border-foreground px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] transition-colors hover:bg-foreground hover:text-background sm:block"
              >
                View site
              </Link>
              <button
                data-testid="button-admin-logout"
                onClick={() => {
                  localStorage.removeItem("visal-admin");
                  setAuthed(false);
                }}
                className="px-2 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary transition-colors hover:text-foreground"
              >
                Log out
              </button>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-foreground/20 pt-4">
            <p className="font-mono-custom text-[9px] uppercase tracking-[.13em] text-muted-foreground">
              Every change is saved in this browser.
            </p>
            <button
              type="button"
              onClick={save}
              className="flex items-center gap-2 bg-primary px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary-foreground transition-all hover:-translate-y-0.5"
            >
              {saved ? <Check size={13} /> : null}
              {saved ? "Saved" : "Save all changes"}
            </button>
          </div>
        </header>
        <div className="grid gap-10 pb-16 xl:grid-cols-[1.35fr_.65fr]">
          <main className="space-y-8">
            <AdminPanel
              eyebrow="01 / Identity"
              title="Shape the first impression"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First name"
                  value={content.nameFirst}
                  onChange={(value) => update("nameFirst", value)}
                />
                <Field
                  label="Last name / mark"
                  value={content.nameLast}
                  onChange={(value) => update("nameLast", value)}
                />
                <Field
                  label="Eyebrow location"
                  value={content.eyebrow}
                  onChange={(value) => update("eyebrow", value)}
                />
                <Field
                  label="Portfolio year"
                  value={content.year}
                  onChange={(value) => update("year", value)}
                />
              </div>
              <Field
                label="Hero introduction"
                value={content.intro}
                onChange={(value) => update("intro", value)}
                textarea
              />
              <Field
                label="Availability line"
                value={content.availability}
                onChange={(value) => update("availability", value)}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Portrait label"
                  value={content.portraitLabel}
                  onChange={(value) => update("portraitLabel", value)}
                />
                <Field
                  label="Portrait footer line"
                  value={content.ageLine}
                  onChange={(value) => update("ageLine", value)}
                />
              </div>
              <div className="grid gap-5 md:grid-cols-[180px_1fr]">
                <div className="aspect-[.83] overflow-hidden border border-foreground bg-primary p-2">
                  <img
                    src={content.portrait || defaultPortrait}
                    alt="Current portfolio portrait"
                    className="h-full w-full object-cover object-top mix-blend-multiply"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4">
                  <div>
                    <p className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary">
                      Portrait image
                    </p>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      Upload a new JPG, PNG, or WebP. It is converted to a local
                      browser image so the public page updates immediately after
                      saving.
                    </p>
                  </div>
                  <label className="inline-flex w-fit cursor-pointer items-center gap-2 border border-foreground px-4 py-3 font-mono-custom text-[10px] uppercase tracking-[.14em] transition-colors hover:bg-foreground hover:text-background">
                    <ImagePlus size={15} /> Upload new picture
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handlePortrait}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={resetPortrait}
                    className="w-fit font-mono-custom text-[10px] uppercase tracking-[.14em] text-muted-foreground underline underline-offset-4 hover:text-primary"
                  >
                    Restore resume portrait
                  </button>
                </div>
              </div>
            </AdminPanel>
            <AdminPanel eyebrow="02 / About" title="Edit the personal story">
              <Field
                label="About heading"
                value={content.aboutHeading}
                onChange={(value) => update("aboutHeading", value)}
              />
              <Field
                label="About statement"
                value={content.statement}
                onChange={(value) => update("statement", value)}
                textarea
              />
              <div className="grid gap-4">
                {content.facts.map((fact, index) => (
                  <EditorCard
                    key={fact.id}
                    title={fact.label}
                    index={index}
                    onRemove={() =>
                      update(
                        "facts",
                        content.facts.filter((item) => item.id !== fact.id),
                      )
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Fact label"
                        value={fact.label}
                        onChange={(value) =>
                          update(
                            "facts",
                            content.facts.map((item) =>
                              item.id === fact.id
                                ? { ...item, label: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Fact value"
                        value={fact.value}
                        onChange={(value) =>
                          update(
                            "facts",
                            content.facts.map((item) =>
                              item.id === fact.id ? { ...item, value } : item,
                            ),
                          )
                        }
                      />
                    </div>
                  </EditorCard>
                ))}
              </div>
              <AddButton label="Add a fact" onClick={addFact} />
            </AdminPanel>
            <AdminPanel
              eyebrow="03 / Experience"
              title="Add every role and lesson"
            >
              <Field
                label="Section heading"
                value={content.experienceHeading}
                onChange={(value) => update("experienceHeading", value)}
              />
              <Field
                label="Section note"
                value={content.experienceNote}
                onChange={(value) => update("experienceNote", value)}
                textarea
              />
              <div className="space-y-4">
                {content.experiences.map((job, index) => (
                  <EditorCard
                    key={job.id}
                    title={job.role}
                    index={index}
                    onRemove={() =>
                      update(
                        "experiences",
                        content.experiences.filter(
                          (item) => item.id !== job.id,
                        ),
                      )
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Role"
                        value={job.role}
                        onChange={(value) =>
                          update(
                            "experiences",
                            content.experiences.map((item) =>
                              item.id === job.id
                                ? { ...item, role: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Company"
                        value={job.company}
                        onChange={(value) =>
                          update(
                            "experiences",
                            content.experiences.map((item) =>
                              item.id === job.id
                                ? { ...item, company: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Dates"
                        value={job.date}
                        onChange={(value) =>
                          update(
                            "experiences",
                            content.experiences.map((item) =>
                              item.id === job.id
                                ? { ...item, date: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="What you did / learned"
                        value={job.description}
                        onChange={(value) =>
                          update(
                            "experiences",
                            content.experiences.map((item) =>
                              item.id === job.id
                                ? { ...item, description: value }
                                : item,
                            ),
                          )
                        }
                        textarea
                      />
                    </div>
                  </EditorCard>
                ))}
              </div>
              <AddButton label="Add experience" onClick={addExperience} />
            </AdminPanel>
            <AdminPanel
              eyebrow="04 / Education"
              title="Keep the foundation current"
            >
              <Field
                label="Education introduction"
                value={content.educationIntro}
                onChange={(value) => update("educationIntro", value)}
                textarea
              />
              <div className="space-y-4">
                {content.education.map((item, index) => (
                  <EditorCard
                    key={item.id}
                    title={item.title}
                    index={index}
                    onRemove={() =>
                      update(
                        "education",
                        content.education.filter(
                          (entry) => entry.id !== item.id,
                        ),
                      )
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Achievement / degree"
                        value={item.title}
                        onChange={(value) =>
                          update(
                            "education",
                            content.education.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, title: value }
                                : entry,
                            ),
                          )
                        }
                      />
                      <Field
                        label="School"
                        value={item.school}
                        onChange={(value) =>
                          update(
                            "education",
                            content.education.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, school: value }
                                : entry,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Dates"
                        value={item.date}
                        onChange={(value) =>
                          update(
                            "education",
                            content.education.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, date: value }
                                : entry,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Location / detail"
                        value={item.detail}
                        onChange={(value) =>
                          update(
                            "education",
                            content.education.map((entry) =>
                              entry.id === item.id
                                ? { ...entry, detail: value }
                                : entry,
                            ),
                          )
                        }
                      />
                    </div>
                  </EditorCard>
                ))}
              </div>
              <AddButton label="Add education" onClick={addEducation} />
            </AdminPanel>
            <AdminPanel
              eyebrow="05 / Selected work"
              title="Show the work behind the words"
            >
              <Field
                label="Work section heading"
                value={content.projectsHeading}
                onChange={(value) => update("projectsHeading", value)}
              />
              <Field
                label="Work introduction"
                value={content.projectsIntro}
                onChange={(value) => update("projectsIntro", value)}
                textarea
              />
              <div className="space-y-4">
                {content.projects.map((project, index) => (
                  <EditorCard
                    key={project.id}
                    title={project.title}
                    index={index}
                    onRemove={() =>
                      update(
                        "projects",
                        content.projects.filter(
                          (item) => item.id !== project.id,
                        ),
                      )
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Project title"
                        value={project.title}
                        onChange={(value) =>
                          update(
                            "projects",
                            content.projects.map((item) =>
                              item.id === project.id
                                ? { ...item, title: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Type / category"
                        value={project.type}
                        onChange={(value) =>
                          update(
                            "projects",
                            content.projects.map((item) =>
                              item.id === project.id
                                ? { ...item, type: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Year"
                        value={project.year}
                        onChange={(value) =>
                          update(
                            "projects",
                            content.projects.map((item) =>
                              item.id === project.id
                                ? { ...item, year: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Tags, separated by commas"
                        value={project.tags}
                        onChange={(value) =>
                          update(
                            "projects",
                            content.projects.map((item) =>
                              item.id === project.id
                                ? { ...item, tags: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Description"
                        value={project.description}
                        onChange={(value) =>
                          update(
                            "projects",
                            content.projects.map((item) =>
                              item.id === project.id
                                ? { ...item, description: value }
                                : item,
                            ),
                          )
                        }
                        textarea
                      />
                      <Field
                        label="Project link (optional)"
                        value={project.link}
                        onChange={(value) =>
                          update(
                            "projects",
                            content.projects.map((item) =>
                              item.id === project.id
                                ? { ...item, link: value }
                                : item,
                            ),
                          )
                        }
                        type="url"
                        placeholder="https://..."
                      />
                    </div>
                  </EditorCard>
                ))}
              </div>
              <AddButton label="Add project" onClick={addProject} />
            </AdminPanel>
            <AdminPanel
              eyebrow="06 / Skills & capabilities"
              title="Make the toolkit yours"
            >
              <Field
                label="Skills introduction"
                value={content.skillsIntro}
                onChange={(value) => update("skillsIntro", value)}
                textarea
              />
              <div className="space-y-3">
                {content.skills.map((skill, index) => (
                  <div
                    className="flex items-center gap-3"
                    key={`${skill}-${index}`}
                  >
                    <span className="font-mono-custom text-[10px] text-primary">
                      0{index + 1}
                    </span>
                    <input
                      value={skill}
                      onChange={(e) =>
                        update(
                          "skills",
                          content.skills.map((item, itemIndex) =>
                            itemIndex === index ? e.target.value : item,
                          ),
                        )
                      }
                      className="admin-input w-full border-b border-foreground bg-transparent py-3 text-sm outline-none focus:border-primary"
                    />
                    <button
                      type="button"
                      aria-label={`Remove ${skill}`}
                      onClick={() =>
                        update(
                          "skills",
                          content.skills.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        )
                      }
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <AddButton
                label="Add skill"
                onClick={() =>
                  update("skills", [...content.skills, "New skill"])
                }
              />
              <div className="mt-8 border-t border-foreground/20 pt-8">
                <Field
                  label="Capabilities heading"
                  value={content.capabilitiesHeading}
                  onChange={(value) => update("capabilitiesHeading", value)}
                />
                <Field
                  label="Capabilities introduction"
                  value={content.capabilitiesIntro}
                  onChange={(value) => update("capabilitiesIntro", value)}
                  textarea
                />
                <div className="mt-4 space-y-4">
                  {content.capabilities.map((capability, index) => (
                    <EditorCard
                      key={capability.id}
                      title={capability.title}
                      index={index}
                      onRemove={() =>
                        update(
                          "capabilities",
                          content.capabilities.filter(
                            (item) => item.id !== capability.id,
                          ),
                        )
                      }
                    >
                      <Field
                        label="Capability title"
                        value={capability.title}
                        onChange={(value) =>
                          update(
                            "capabilities",
                            content.capabilities.map((item) =>
                              item.id === capability.id
                                ? { ...item, title: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <div className="mt-4">
                        <Field
                          label="Capability description"
                          value={capability.description}
                          onChange={(value) =>
                            update(
                              "capabilities",
                              content.capabilities.map((item) =>
                                item.id === capability.id
                                  ? { ...item, description: value }
                                  : item,
                              ),
                            )
                          }
                          textarea
                        />
                      </div>
                    </EditorCard>
                  ))}
                </div>
                <AddButton label="Add capability" onClick={addCapability} />
              </div>
            </AdminPanel>
            <AdminPanel
              eyebrow="07 / Contact & footer"
              title="Keep your door open"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Public email"
                  value={content.contactEmail}
                  onChange={(value) => update("contactEmail", value)}
                  type="email"
                />
                <Field
                  label="Phone"
                  value={content.phone}
                  onChange={(value) => update("phone", value)}
                />
              </div>
              <Field
                label="Location"
                value={content.location}
                onChange={(value) => update("location", value)}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Footer quote"
                  value={content.quote}
                  onChange={(value) => update("quote", value)}
                  textarea
                />
                <Field
                  label="Quote attribution"
                  value={content.quoteAttribution}
                  onChange={(value) => update("quoteAttribution", value)}
                />
              </div>
              <div className="space-y-4">
                {content.socials.map((social, index) => (
                  <EditorCard
                    key={social.id}
                    title={social.label}
                    index={index}
                    onRemove={() =>
                      update(
                        "socials",
                        content.socials.filter((item) => item.id !== social.id),
                      )
                    }
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field
                        label="Link label"
                        value={social.label}
                        onChange={(value) =>
                          update(
                            "socials",
                            content.socials.map((item) =>
                              item.id === social.id
                                ? { ...item, label: value }
                                : item,
                            ),
                          )
                        }
                      />
                      <Field
                        label="Link URL"
                        value={social.url}
                        onChange={(value) =>
                          update(
                            "socials",
                            content.socials.map((item) =>
                              item.id === social.id
                                ? { ...item, url: value }
                                : item,
                            ),
                          )
                        }
                        type="url"
                      />
                    </div>
                  </EditorCard>
                ))}
              </div>
              <AddButton label="Add social link" onClick={addSocial} />
            </AdminPanel>
            <button
              type="button"
              onClick={save}
              className="flex w-full items-center justify-center gap-3 bg-primary px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-[7px_7px_0_hsl(var(--foreground))]"
            >
              {saved ? <Check size={15} /> : <Pencil size={15} />}
              {saved ? "All changes saved locally" : "Save all changes"}
            </button>
          </main>
          <aside className="space-y-8">
            <section className="admin-sidebar-panel border border-foreground bg-card p-6">
              <div className="flex items-center justify-between border-b border-foreground/20 pb-4">
                <div>
                  <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">
                    Inbox
                  </p>
                  <h2 className="mt-2 font-display text-4xl">
                    Messages{" "}
                    <span className="font-sans text-sm text-muted-foreground">
                      ({messages.length})
                    </span>
                  </h2>
                </div>
                <MessageCircle className="text-primary" />
              </div>
              {messages.length === 0 ? (
                <div className="py-12 text-center">
                  <Sparkles className="mx-auto mb-4 text-primary" size={22} />
                  <p className="font-display text-2xl">No messages yet.</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    The next good conversation starts here.
                  </p>
                </div>
              ) : (
                <div>
                  {messages.map((message) => (
                    <article
                      data-testid={`card-admin-message-${message.id}`}
                      key={message.id}
                      className="border-b border-foreground/20 py-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl">
                            {message.name}
                          </h3>
                          <a
                            href={`mailto:${message.email}`}
                            className="font-mono-custom text-[10px] text-primary"
                          >
                            {message.email}
                          </a>
                        </div>
                        <button
                          data-testid={`button-delete-message-${message.id}`}
                          onClick={() => removeMessage(message.id)}
                          className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground hover:text-primary"
                        >
                          Delete
                        </button>
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                        {message.message}
                      </p>
                      <p className="mt-4 font-mono-custom text-[9px] uppercase tracking-[.12em] text-muted-foreground">
                        {new Date(message.sentAt).toLocaleString()}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </section>
            <section className="border border-foreground/30 bg-secondary p-6">
              <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">
                Quick guide
              </p>
              <h2 className="mt-3 font-display text-3xl">Make it yours.</h2>
              <ul className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <span className="mr-2 text-primary">01</span> Replace the
                  example projects with real work.
                </li>
                <li>
                  <span className="mr-2 text-primary">02</span> Upload a fresh
                  portrait or restore the resume photo.
                </li>
                <li>
                  <span className="mr-2 text-primary">03</span> Save once after
                  editing any section.
                </li>
                <li>
                  <span className="mr-2 text-primary">04</span> Refresh the
                  public page to see your updates.
                </li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}

function AdminPanel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-panel border border-foreground bg-card p-6 shadow-[5px_5px_0_hsl(var(--secondary))] sm:p-8">
      <div className="mb-8 border-b border-foreground/20 pb-5">
        <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-4xl leading-none">{title}</h2>
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary transition-transform hover:translate-x-1"
    >
      <Plus size={15} /> {label}
    </button>
  );
}

function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background px-5 text-center">
      <div>
        <p className="font-mono-custom text-xs uppercase tracking-[.2em] text-primary">
          404 / lost page
        </p>
        <h1 className="mt-5 font-display text-8xl">Not here.</h1>
        <Link
          data-testid="link-not-found-home"
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.15em] text-primary-foreground"
        >
          Return home <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default App;
