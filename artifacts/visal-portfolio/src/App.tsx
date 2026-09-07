import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Circle, Download, ExternalLink, Mail, MapPin, Menu, MessageCircle, Phone, Send, Sparkles, X } from 'lucide-react';
import { Link, Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL;
const assetPath = (path: string) => `${basePath}${path}`;
const portrait = assetPath('assets/pdf-extracted/visal-000.png');

type PortfolioContent = {
  intro: string;
  availability: string;
  statement: string;
  contactEmail: string;
  phone: string;
  location: string;
};
type Message = { id: number; name: string; email: string; message: string; sentAt: string; read: boolean };
const defaultContent: PortfolioContent = {
  intro: 'A fresh software engineering graduate with a curious eye for useful details and a soft spot for thoughtful interfaces.',
  availability: 'Open to thoughtful opportunities',
  statement: 'I build with care, stay curious, and bring calm energy to complicated problems.',
  contactEmail: 'visalphal951230@gmail.com',
  phone: '+855 87 645 263',
  location: 'Dang Ka district, Phnom Penh',
};

function readContent(): PortfolioContent {
  try { return { ...defaultContent, ...JSON.parse(localStorage.getItem('visal-content') || '{}') }; } catch { return defaultContent; }
}
function readMessages(): Message[] {
  try { return JSON.parse(localStorage.getItem('visal-messages') || '[]'); } catch { return []; }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={basePath.replace(/\/$/, '')}>
          <Switch>
            <Route path="/admin" component={Admin} />
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [['About', '#about'], ['Experience', '#experience'], ['Skills', '#skills'], ['Contact', '#contact']];
  return (
    <header className="absolute inset-x-0 top-0 z-40 px-5 py-5 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <a data-testid="link-logo" href="#top" className="group flex items-center gap-3 font-mono-custom text-[11px] font-medium uppercase tracking-[.2em]">
          <span className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground transition-transform group-hover:rotate-12">VP</span>
          <span className="hidden sm:block">Portfolio / 2026</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => <a data-testid={`link-nav-${label.toLowerCase()}`} key={href} href={href} className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          <a data-testid="link-download-resume" href={assetPath('assets/Visal_Phal_Resume.pdf')} download className="flex items-center gap-2 border border-foreground px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.16em] transition-colors hover:bg-foreground hover:text-background"><Download size={13} /> Resume</a>
        </nav>
        <button data-testid="button-toggle-menu" onClick={() => setMenuOpen(!menuOpen)} className="border border-foreground p-2 md:hidden" aria-label="Toggle menu">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
      </div>
      {menuOpen && <div className="absolute left-5 right-5 top-16 border border-foreground bg-background p-5 shadow-[6px_6px_0_hsl(var(--primary))] md:hidden">
        <nav className="flex flex-col gap-5">{links.map(([label, href]) => <a data-testid={`link-mobile-${label.toLowerCase()}`} onClick={() => setMenuOpen(false)} key={href} href={href} className="font-mono-custom text-xs uppercase tracking-[.16em]">{label}</a>)}</nav>
      </div>}
    </header>
  );
}

function Home() {
  const [content, setContent] = useState<PortfolioContent>(readContent);
  useEffect(() => {
    const sync = () => setContent(readContent());
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);
  return <div id="top" className="paper-grain overflow-hidden">
    <SiteHeader />
    <main>
      <Hero content={content} />
      <About content={content} />
      <Experience />
      <Education />
      <Skills />
      <Contact content={content} />
    </main>
    <Footer />
  </div>;
}

function Hero({ content }: { content: PortfolioContent }) {
  return <section className="relative flex min-h-[800px] items-center border-b border-foreground px-5 pb-20 pt-36 sm:px-10 lg:min-h-[900px] lg:px-16" style={{ background: 'hsl(39 45% 94%)' }}>
    <div className="mx-auto grid w-full max-w-[1440px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-10">
      <div className="relative z-10">
        <div className="reveal mb-8 flex items-center gap-3 font-mono-custom text-[10px] uppercase tracking-[.22em] text-primary"><span className="h-2 w-2 rounded-full bg-primary" /> Phnom Penh, Cambodia <span className="text-muted-foreground">/ 2026</span></div>
        <h1 data-testid="text-hero-name" className="reveal reveal-delay-1 max-w-[780px] font-display text-[clamp(5.5rem,14vw,13.8rem)] leading-[.72] tracking-[-.065em] text-foreground">Visal<br /><em className="ml-[.19em] text-primary">Phal.</em></h1>
        <div className="reveal reveal-delay-2 mt-12 grid max-w-[680px] grid-cols-[80px_1fr] gap-5 border-t border-foreground pt-5 sm:grid-cols-[120px_1fr]">
          <p className="font-mono-custom text-[10px] uppercase leading-relaxed tracking-[.14em] text-primary">About the<br />person</p>
          <p data-testid="text-hero-intro" className="max-w-[500px] text-lg leading-relaxed text-balance sm:text-xl">{content.intro}</p>
        </div>
        <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
          <a data-testid="link-contact-hero" href="#contact" className="group flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary-foreground transition-transform hover:-translate-y-1">Let's talk <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          <span className="font-mono-custom text-[10px] uppercase tracking-[.13em] text-muted-foreground">{content.availability}</span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-[500px] lg:justify-self-end">
        <div className="absolute -right-5 -top-8 h-24 w-24 border-2 border-primary sm:-right-10 sm:-top-12 sm:h-32 sm:w-32" />
        <div className="absolute -bottom-7 -left-7 z-20 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-center font-mono-custom text-[9px] uppercase leading-tight tracking-[.12em] sm:-left-10 sm:h-28 sm:w-28"><span>Made with<br />curiosity</span></div>
        <div className="relative aspect-[.83] overflow-hidden border border-foreground bg-secondary p-4 shadow-[14px_14px_0_hsl(var(--primary))] sm:p-6">
          <div className="relative h-full overflow-hidden bg-primary">
            <img data-testid="img-portrait" src={portrait} alt="Visal Phal portrait" className="h-full w-full object-cover object-top mix-blend-multiply opacity-90 grayscale-[20%]" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <div className="absolute inset-0 bg-[linear-gradient(155deg,transparent_55%,rgba(47,11,12,.38))]" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-primary-foreground">
              <span className="font-mono-custom text-[9px] uppercase tracking-[.16em]">No. 01 / self portrait</span><span className="font-display text-5xl">VP</span>
            </div>
          </div>
        </div>
        <p className="mt-7 text-right font-mono-custom text-[9px] uppercase tracking-[.13em] text-muted-foreground">23 years young / still learning</p>
      </div>
    </div>
    <a data-testid="link-scroll-about" href="#about" className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 font-mono-custom text-[9px] uppercase tracking-[.2em] text-muted-foreground lg:flex"><ArrowDown size={14} /> Scroll to explore</a>
  </section>;
}

function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <div className="mb-12 flex items-center gap-4 font-mono-custom text-[10px] uppercase tracking-[.2em] text-primary"><span>{number}</span><span className="ink-line w-12" /><span>{children}</span></div>;
}

function About({ content }: { content: PortfolioContent }) {
  return <section id="about" className="border-b border-foreground px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto max-w-[1440px]">
      <SectionLabel number="01" children="The short version" />
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
        <h2 className="font-display text-6xl leading-[.9] tracking-[-.04em] sm:text-8xl lg:text-[9.5rem]">Good work<br /><em className="text-primary">starts</em><br />with care.</h2>
        <div className="max-w-2xl lg:pt-5">
          <p data-testid="text-about-statement" className="font-display text-4xl leading-[.98] tracking-[-.03em] sm:text-5xl">{content.statement}</p>
          <div className="mt-12 grid gap-7 border-t border-foreground pt-7 sm:grid-cols-2">
            <Fact label="Currently" value="Finishing my BSE" />
            <Fact label="Based in" value="Phnom Penh, KH" />
            <Fact label="Known for" value="Asking better questions" />
            <Fact label="Approach" value="Warm, precise, adaptable" />
          </div>
        </div>
      </div>
    </div>
  </section>;
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div><p className="mb-2 font-mono-custom text-[9px] uppercase tracking-[.16em] text-primary">{label}</p><p className="text-sm">{value}</p></div>;
}

const jobs = [
  { date: 'APR — JUL 2025', company: 'Kerry Worldbridge Logistics', role: 'Documentation Officer Intern', desc: 'Kept the details moving behind the scenes: data entry, inbound and outbound documentation, inventory management, and customer service.', number: '01' },
  { date: 'JUL 2025 — JUN 2026', company: 'Vireak Buntham Traveling', role: 'Ticket Online Booking', desc: 'Met customers where they were — at the counter, on the phone, and through accurate transactions. Handled call center support, reporting, data entry, and reception.', number: '02' },
  { date: 'JUN — AUG 2026', company: 'Mr Piccolo Restaurant', role: 'Account / Service / Barista', desc: 'A little bit of everything, done with a smile: customer service, daily sales and expense management, reception, coffee, and drinks.', number: '03' },
];
function Experience() {
  return <section id="experience" className="bg-primary px-5 py-24 text-primary-foreground sm:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto max-w-[1440px]">
      <SectionLabel number="02" children="The work so far" />
      <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-3xl font-display text-6xl leading-[.86] tracking-[-.04em] sm:text-8xl lg:text-[9rem]">Every role<br /><em className="text-accent">taught me</em><br />something.</h2><p className="max-w-xs border-l border-primary-foreground/35 pl-5 font-mono-custom text-[10px] uppercase leading-[1.8] tracking-[.12em] text-primary-foreground/70">Experience is not a straight line. It is a collection of useful instincts.</p></div>
      <div className="border-t border-primary-foreground/40">{jobs.map((job) => <article data-testid={`card-job-${job.number}`} key={job.number} className="group grid gap-6 border-b border-primary-foreground/40 py-8 transition-colors hover:bg-primary-foreground hover:text-primary md:grid-cols-[110px_1fr_1.1fr] md:gap-10">
        <div className="font-mono-custom text-[10px] tracking-[.12em] opacity-70">{job.number} <span className="mx-2">/</span> {job.date}</div>
        <div><h3 className="font-display text-3xl leading-none sm:text-4xl">{job.role}</h3><p className="mt-3 font-mono-custom text-[10px] uppercase tracking-[.12em] opacity-75">{job.company}</p></div>
        <p className="max-w-lg text-sm leading-relaxed opacity-80 md:justify-self-end">{job.desc}</p>
      </article>)}</div>
    </div>
  </section>;
}

function Education() {
  return <section className="border-b border-foreground px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[.7fr_1.3fr]">
      <div><SectionLabel number="03" children="The foundation" /><p className="max-w-sm font-display text-4xl leading-none sm:text-5xl">A practical education, with plenty of room left for curiosity.</p></div>
      <div className="relative border-l border-foreground pl-7 sm:pl-12">
        <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-primary" />
        <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">2022 — 2026</p>
        <h3 className="mt-4 font-display text-4xl leading-none sm:text-6xl">Bachelor's Degree<br /><em className="text-primary">in Software Engineering</em></h3>
        <p className="mt-5 text-sm text-muted-foreground">Beltei International University / Phnom Penh</p>
        <div className="my-12 h-px w-full bg-border" />
        <div className="absolute -left-[5px] top-[238px] h-2.5 w-2.5 rounded-full border border-primary bg-background" />
        <p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">2020 — 2022</p>
        <h3 className="mt-4 font-display text-4xl leading-none sm:text-5xl">Passed BAC II</h3>
        <p className="mt-5 text-sm text-muted-foreground">Prek Kompers High School</p>
      </div>
    </div>
  </section>;
}

const skills = ['Critical Thinking', 'Problem-Solving', 'Collaboration & Teamwork', 'Flexibility', 'Fast Learning'];
function Skills() {
  return <section id="skills" className="border-b border-foreground bg-secondary px-5 py-24 sm:px-10 lg:px-16 lg:py-32">
    <div className="mx-auto max-w-[1440px]">
      <SectionLabel number="04" children="The toolkit" />
      <div className="grid items-start gap-12 lg:grid-cols-[.6fr_1.4fr]">
        <div><h2 className="font-display text-7xl leading-[.85] tracking-[-.04em] sm:text-9xl">Soft<br /><em className="text-primary">skills.</em></h2><p className="mt-8 max-w-xs text-sm leading-relaxed text-muted-foreground">The human side of making things work — in code, in teams, and in the spaces between.</p></div>
        <div className="grid border-t border-foreground sm:grid-cols-2">{skills.map((skill, index) => <div data-testid={`text-skill-${index}`} key={skill} className="flex min-h-28 items-center justify-between border-b border-foreground p-4 sm:p-6"><span className="font-display text-3xl leading-none sm:text-4xl">{skill}</span><Circle size={15} fill={index === 0 ? 'currentColor' : 'none'} className="shrink-0 text-primary" /></div>)}</div>
      </div>
    </div>
  </section>;
}

function Contact({ content }: { content: PortfolioContent }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const next: Message = { ...form, id: Date.now(), sentAt: new Date().toISOString(), read: false };
    localStorage.setItem('visal-messages', JSON.stringify([next, ...readMessages()]));
    setForm({ name: '', email: '', message: '' });
    setSent(true);
  };
  return <section id="contact" className="relative overflow-hidden bg-foreground px-5 py-24 text-background sm:px-10 lg:px-16 lg:py-32">
    <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full border border-background/20 sm:h-96 sm:w-96" /><div className="absolute right-10 top-20 h-4 w-4 bg-accent" />
    <div className="relative mx-auto max-w-[1440px]">
      <SectionLabel number="05" children="Make an introduction" />
      <div className="grid gap-16 lg:grid-cols-[1fr_.8fr] lg:gap-28">
        <div><h2 className="font-display text-7xl leading-[.82] tracking-[-.04em] sm:text-[9rem]">Have a<br /><em className="text-accent">good idea?</em></h2><p className="mt-10 max-w-md text-lg leading-relaxed text-background/70">Whether it is a first job, a useful collaboration, or simply a hello — I would genuinely like to hear from you.</p><div className="mt-10 space-y-4 border-t border-background/25 pt-6 font-mono-custom text-[10px] uppercase tracking-[.13em]"><a data-testid="link-email" href={`mailto:${content.contactEmail}`} className="flex items-center gap-3 transition-colors hover:text-accent"><Mail size={15} /> {content.contactEmail}</a><a data-testid="link-phone" href={`tel:${content.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 transition-colors hover:text-accent"><Phone size={15} /> {content.phone}</a><p className="flex items-center gap-3 text-background/60"><MapPin size={15} /> {content.location}</p></div></div>
        <form data-testid="form-contact" onSubmit={submit} className="border border-background/35 bg-background/5 p-6 sm:p-8">
          {sent ? <div data-testid="status-message-sent" className="flex min-h-[340px] flex-col items-center justify-center text-center"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-foreground"><Check size={24} /></div><h3 className="font-display text-4xl">Message received.</h3><p className="mt-3 max-w-xs text-sm text-background/60">Thanks for reaching out. Visal will get back to you soon.</p><button data-testid="button-send-another" type="button" onClick={() => setSent(false)} className="mt-8 font-mono-custom text-[10px] uppercase tracking-[.16em] text-accent underline underline-offset-4">Send another</button></div> : <><p className="mb-8 font-mono-custom text-[10px] uppercase tracking-[.16em] text-background/60">Drop a line / 01</p><label className="mb-6 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-background/60">Your name</span><input data-testid="input-contact-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border-b border-background/35 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent" placeholder="What should I call you?" /></label><label className="mb-6 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-background/60">Email address</span><input data-testid="input-contact-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border-b border-background/35 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent" placeholder="you@example.com" /></label><label className="mb-8 block"><span className="mb-2 block font-mono-custom text-[10px] uppercase tracking-[.13em] text-background/60">Your note</span><textarea data-testid="input-contact-message" required rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full resize-none border-b border-background/35 bg-transparent py-3 text-lg outline-none transition-colors placeholder:text-background/30 focus:border-accent" placeholder="Tell me a little about it..." /></label><button data-testid="button-submit-contact" type="submit" className="group flex w-full items-center justify-between bg-accent px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-foreground transition-transform hover:-translate-y-1"><span>Send message</span><Send size={15} className="transition-transform group-hover:translate-x-1" /></button></>}
        </form>
      </div>
      <div className="mt-20 border-t border-background/25 pt-6"><p className="max-w-3xl font-display text-3xl leading-tight sm:text-5xl">“The smallest details are often where the best work begins.”</p><p className="mt-5 font-mono-custom text-[10px] uppercase tracking-[.16em] text-background/50">— Visal Phal, probably</p></div>
    </div>
  </section>;
}

function Footer() {
  return <footer className="flex flex-col justify-between gap-4 bg-foreground px-5 pb-7 text-background sm:flex-row sm:px-10 lg:px-16"><p className="font-mono-custom text-[9px] uppercase tracking-[.15em] text-background/50">© 2026 Visal Phal</p><div className="flex gap-5 font-mono-custom text-[9px] uppercase tracking-[.15em] text-background/50"><a data-testid="link-footer-linkedin" href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="hover:text-accent">LinkedIn <ExternalLink size={11} className="ml-1 inline" /></a><Link data-testid="link-admin" href="/admin" className="hover:text-accent">Admin</Link></div></footer>;
}

function Admin() {
  const [authed, setAuthed] = useState(() => localStorage.getItem('visal-admin') === 'true');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<PortfolioContent>(readContent);
  const [messages, setMessages] = useState<Message[]>(readMessages);
  const [saved, setSaved] = useState(false);
  const login = (e: FormEvent) => { e.preventDefault(); if (password === 'visal2026') { localStorage.setItem('visal-admin', 'true'); setAuthed(true); } };
  const save = () => { localStorage.setItem('visal-content', JSON.stringify(content)); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  const removeMessage = (id: number) => { const next = messages.filter((message) => message.id !== id); setMessages(next); localStorage.setItem('visal-messages', JSON.stringify(next)); };
  if (!authed) return <div className="flex min-h-[100dvh] items-center justify-center bg-background px-5"><form onSubmit={login} className="w-full max-w-md border border-foreground bg-card p-8 shadow-[10px_10px_0_hsl(var(--primary))]"><input type="text" name="username" autoComplete="username" value="admin" readOnly tabIndex={-1} aria-hidden="true" className="sr-only" /><Link data-testid="link-admin-back" href="/" className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">← Back to portfolio</Link><h1 className="mt-12 font-display text-6xl leading-none">Hello,<br /><em className="text-primary">admin.</em></h1><p className="mt-5 text-sm text-muted-foreground">A tiny private room for keeping the portfolio current.</p><label className="mt-10 block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary">Password</span><input data-testid="input-admin-password" autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-2 w-full border-b border-foreground bg-transparent py-3 outline-none focus:border-primary" placeholder="Try visal2026" /></label><button data-testid="button-admin-login" className="mt-8 flex w-full items-center justify-between bg-primary px-5 py-4 font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary-foreground">Enter the room <ArrowUpRight size={15} /></button><p className="mt-5 font-mono-custom text-[9px] uppercase leading-relaxed tracking-[.12em] text-muted-foreground">Local browser access for static hosting. Use a server-backed auth system before publishing private data.</p></form></div>;
  return <div className="min-h-[100dvh] bg-background px-5 py-8 sm:px-10 lg:px-16"><div className="mx-auto max-w-[1200px]"><header className="flex items-center justify-between border-b border-foreground pb-6"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.18em] text-primary">Visal Phal / private room</p><h1 className="mt-3 font-display text-5xl">Portfolio editor.</h1></div><div className="flex gap-4"><Link data-testid="link-admin-view-site" href="/" className="border border-foreground px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] hover:bg-foreground hover:text-background">View site</Link><button data-testid="button-admin-logout" onClick={() => { localStorage.removeItem('visal-admin'); setAuthed(false); }} className="px-4 py-2 font-mono-custom text-[10px] uppercase tracking-[.14em] text-primary">Log out</button></div></header><div className="grid gap-12 py-12 lg:grid-cols-[1fr_1.2fr]"><section><p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">Edit the voice</p><h2 className="mt-3 font-display text-4xl">Small changes,<br />big impression.</h2><div className="mt-8 space-y-6"><label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em]">Hero intro</span><textarea data-testid="input-admin-intro" rows={4} value={content.intro} onChange={(e) => setContent({ ...content, intro: e.target.value })} className="mt-2 w-full border border-foreground bg-transparent p-3 text-sm outline-none focus:border-primary" /></label><label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em]">Availability line</span><input data-testid="input-admin-availability" value={content.availability} onChange={(e) => setContent({ ...content, availability: e.target.value })} className="mt-2 w-full border-b border-foreground bg-transparent py-3 text-sm outline-none focus:border-primary" /></label><label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em]">About statement</span><textarea data-testid="input-admin-statement" rows={3} value={content.statement} onChange={(e) => setContent({ ...content, statement: e.target.value })} className="mt-2 w-full border border-foreground bg-transparent p-3 text-sm outline-none focus:border-primary" /></label><div className="grid gap-5 sm:grid-cols-2"><label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em]">Email</span><input data-testid="input-admin-email" type="email" value={content.contactEmail} onChange={(e) => setContent({ ...content, contactEmail: e.target.value })} className="mt-2 w-full border-b border-foreground bg-transparent py-3 text-sm outline-none focus:border-primary" /></label><label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em]">Phone</span><input data-testid="input-admin-phone" value={content.phone} onChange={(e) => setContent({ ...content, phone: e.target.value })} className="mt-2 w-full border-b border-foreground bg-transparent py-3 text-sm outline-none focus:border-primary" /></label></div><label className="block"><span className="font-mono-custom text-[10px] uppercase tracking-[.14em]">Location</span><input data-testid="input-admin-location" value={content.location} onChange={(e) => setContent({ ...content, location: e.target.value })} className="mt-2 w-full border-b border-foreground bg-transparent py-3 text-sm outline-none focus:border-primary" /></label><button data-testid="button-admin-save" onClick={save} className="flex items-center gap-3 bg-primary px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary-foreground">{saved ? <Check size={14} /> : null}{saved ? 'Saved locally' : 'Save changes'}</button></div></section><section><div className="flex items-end justify-between border-b border-foreground pb-4"><div><p className="font-mono-custom text-[10px] uppercase tracking-[.16em] text-primary">Inbox</p><h2 className="mt-2 font-display text-4xl">Messages <span className="font-sans text-sm text-muted-foreground">({messages.length})</span></h2></div><MessageCircle className="text-primary" /></div>{messages.length === 0 ? <div className="border-b border-foreground py-16 text-center"><Sparkles className="mx-auto mb-4 text-primary" size={22} /><p className="font-display text-2xl">No messages yet.</p><p className="mt-2 text-sm text-muted-foreground">The next good conversation starts here.</p></div> : <div>{messages.map((message) => <article data-testid={`card-admin-message-${message.id}`} key={message.id} className="border-b border-foreground py-6"><div className="flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl">{message.name}</h3><a href={`mailto:${message.email}`} className="font-mono-custom text-[10px] text-primary">{message.email}</a></div><button data-testid={`button-delete-message-${message.id}`} onClick={() => removeMessage(message.id)} className="font-mono-custom text-[10px] uppercase tracking-[.12em] text-muted-foreground hover:text-primary">Delete</button></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{message.message}</p><p className="mt-4 font-mono-custom text-[9px] uppercase tracking-[.12em] text-muted-foreground">{new Date(message.sentAt).toLocaleString()}</p></article>)}</div>}</section></div></div></div>;
}

function NotFound() {
  return <div className="flex min-h-[100dvh] items-center justify-center bg-background px-5 text-center"><div><p className="font-mono-custom text-xs uppercase tracking-[.2em] text-primary">404 / lost page</p><h1 className="mt-5 font-display text-8xl">Not here.</h1><Link data-testid="link-not-found-home" href="/" className="mt-8 inline-flex items-center gap-2 bg-primary px-5 py-3 font-mono-custom text-[10px] uppercase tracking-[.15em] text-primary-foreground">Return home <ChevronRight size={14} /></Link></div></div>;
}

export default App;