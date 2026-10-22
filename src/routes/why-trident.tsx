import { createFileRoute, Link } from "@tanstack/react-router";
import { m, type Variants } from "motion/react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Handshake,
  Layers,
  LockKeyhole,
  Server,
  Shield,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { FinalCTA, PageIntro } from "@/components/SiteChrome";

const viewport = { once: true, margin: "-80px" as const };

const Q: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const QContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const valueItems: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Handshake,
    title: "One partner, no handoffs",
    description:
      "Most businesses deal with three vendors — one builds, another hosts, a third manages security. When something breaks, they all point at each other. We do all three. One team, one accountability.",
  },
  {
    icon: Layers,
    title: "Build + host + manage under one roof",
    description:
      "We don't just build your website or app. We run it. Same team, same responsibility, from first commit to fifth year in production.",
  },
  {
    icon: LockKeyhole,
    title: "You own it. Migrate anytime.",
    description:
      "Full source code, content, and domain are yours. No lock-in, no hostage situations. Most clients stay because the work is good — not because they're trapped.",
  },
  {
    icon: Sparkles,
    title: "AI-generated is a starting point",
    description:
      "AI gives you code. We give you a business that works — deployed, secured, monitored, and ready to grow. The gap between generated code and a running system is where we work.",
  },
  {
    icon: Shield,
    title: "POPIA-aligned, SA-context",
    description:
      "Local compliance, ZAR pricing, SA support hours. Data handling that reflects South African requirements. Not a US or EU agency pretending to understand the local market.",
  },
  {
    icon: Server,
    title: "12 months hosting included",
    description:
      "Every plan includes hosting on our infrastructure. Most agencies quote you a website and then you still need to find a hosting provider. Ours is bundled.",
  },
  {
    icon: UserRound,
    title: "Direct access to the founder",
    description:
      "You talk to the people who actually run your systems. No account managers in the middle. When something needs attention, you get answers, not tickets.",
  },
];

type ComparisonStatus = "check" | "no" | "partial";
type ComparisonValue = { status: ComparisonStatus; label?: string };

const check: ComparisonValue = { status: "check" };
const no: ComparisonValue = { status: "no" };
const partial = (label: string): ComparisonValue => ({ status: "partial", label });

const comparisons: {
  feature: string;
  trident: ComparisonValue;
  agency: ComparisonValue;
  host: ComparisonValue;
  ai: ComparisonValue;
}[] = [
  {
    feature: "Builds your system",
    trident: check,
    agency: check,
    host: no,
    ai: partial("Partial"),
  },
  { feature: "Hosts it for you", trident: check, agency: no, host: check, ai: no },
  {
    feature: "Security + backups",
    trident: check,
    agency: no,
    host: partial("Basic"),
    ai: no,
  },
  {
    feature: "Ongoing monitoring",
    trident: check,
    agency: no,
    host: partial("Server-only"),
    ai: no,
  },
  {
    feature: "You own the source code",
    trident: check,
    agency: partial("Sometimes"),
    host: { status: "no", label: "N/A" },
    ai: partial("Varies"),
  },
  {
    feature: "POPIA-aligned handling",
    trident: check,
    agency: partial("Varies"),
    host: partial("Varies"),
    ai: no,
  },
  { feature: "ZAR pricing", trident: check, agency: check, host: check, ai: no },
  {
    feature: "Human support",
    trident: check,
    agency: partial("Business hours"),
    host: partial("Ticket-based"),
    ai: no,
  },
  { feature: "Direct founder access", trident: check, agency: no, host: no, ai: no },
];

const comparisonColumns = [
  { key: "trident", label: "Trident" },
  { key: "agency", label: "Web Agency" },
  { key: "host", label: "Hosting Provider" },
  { key: "ai", label: "AI Tools" },
] as const;

const principles = [
  {
    title: "We say no when we should",
    description:
      "If a project isn't a fit, we say so. We'd rather lose a deal than take work we can't do well.",
  },
  {
    title: "We build for maintenance",
    description:
      "Everything we ship is documented, tested, and handed over cleanly. If you ever leave, you leave with a complete system — not a maze.",
  },
  {
    title: "We measure what matters",
    description:
      "Uptime, response times, backups, incidents. What we track, we improve. What we don't track, we don't promise.",
  },
  {
    title: "We stay honest",
    description:
      "No fake case studies. No invented testimonials. No inflated numbers. When we've got real proof, we show it. When we don't, we say so.",
  },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

function Status({ value }: { value: ComparisonValue }) {
  const Icon = value.status === "check" ? Check : value.status === "no" ? X : AlertTriangle;
  const label =
    value.label ?? (value.status === "check" ? "Yes" : value.status === "no" ? "No" : "Partial");

  return (
    <span className={`why-status why-status-${value.status}`} role="img" aria-label={label}>
      <Icon aria-hidden="true" />
      <span className="why-sr-only">{label}</span>
    </span>
  );
}

function ValueStack() {
  return (
    <section className="why-section why-value-section" aria-labelledby="why-value-heading">
      <div className="site-container">
        <Reveal>
          <div className="why-section-heading">
            <span className="eyebrow">THE VALUE STACK</span>
            <h2 id="why-value-heading">What you actually get</h2>
            <p>Seven commitments. Every client. Every project.</p>
          </div>
        </Reveal>
        <m.div
          className="why-value-stack-grid"
          variants={QContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {valueItems.map(({ icon: Icon, title, description }) => (
            <m.article
              className="why-value-card"
              key={title}
              variants={Q}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <span className="why-value-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function ComparisonTable() {
  return (
    <section
      className="why-section why-comparison-section"
      aria-labelledby="why-comparison-heading"
    >
      <div className="site-container">
        <Reveal>
          <div className="why-section-heading">
            <span className="eyebrow">THE COMPARISON</span>
            <h2 id="why-comparison-heading">How we compare</h2>
            <p>Every option has trade-offs. Here's ours, honestly.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="why-comparison-desktop">
            <table className="why-comparison-table">
              <thead>
                <tr>
                  <th scope="col">Feature</th>
                  {comparisonColumns.map(({ key, label }) => (
                    <th
                      className={key === "trident" ? "why-trident-column" : ""}
                      key={key}
                      scope="col"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row) => (
                  <tr key={row.feature}>
                    <th scope="row">{row.feature}</th>
                    {comparisonColumns.map(({ key }) => (
                      <td className={key === "trident" ? "why-trident-column" : ""} key={key}>
                        <Status value={row[key]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="why-comparison-mobile">
            {comparisons.map((row) => (
              <article className="why-comparison-card" key={row.feature}>
                <h3>{row.feature}</h3>
                <div className="why-comparison-card-values">
                  {comparisonColumns.map(({ key, label }) => (
                    <div
                      className={key === "trident" ? "why-comparison-mobile-trident" : ""}
                      key={key}
                    >
                      <span>{label}</span>
                      <Status value={row[key]} />
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="why-comparison-note">
            A practical comparison, not a claim that every provider works the same way.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section
      className="why-section why-principles-section"
      aria-labelledby="why-principles-heading"
    >
      <div className="site-container">
        <Reveal>
          <div className="why-section-heading">
            <span className="eyebrow">OUR PRINCIPLES</span>
            <h2 id="why-principles-heading">How we work</h2>
          </div>
        </Reveal>
        <m.div
          className="why-principles-grid"
          variants={QContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          {principles.map(({ title, description }, index) => (
            <m.article className="why-principle-card" variants={Q} key={title}>
              <span className="why-principle-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  );
}

function FounderNote() {
  return (
    <section className="why-section why-founder-section" aria-labelledby="why-founder-heading">
      <div className="site-container">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <article className="why-founder-card">
            <div className="why-founder-portrait">
              <img
                src="/team/pitso.jpg"
                alt="Pitso Arnold, Founder of Trident Cloud Services"
                loading="lazy"
              />
            </div>
            <div className="why-founder-copy">
              <span className="eyebrow">A NOTE FROM THE FOUNDER</span>
              <h2 id="why-founder-heading">Accountability is the point.</h2>
              <p>
                I started Trident Cloud because I kept meeting businesses that had been let down —
                by agencies that disappeared after launch, by hosts that couldn't build, by AI tools
                that left them with code they couldn't run. The gap wasn't talent. It was
                accountability.
              </p>
              <p>
                If we work together, you'll talk to me. My name goes on the system we build. If it
                breaks, I hear about it. That's the entire promise.
              </p>
              <p className="why-founder-signature">— Pitso Arnold, Founder</p>
              <Link className="why-founder-link" to="/about">
                Read more about the team <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </article>
        </m.div>
      </div>
    </section>
  );
}

function WhyTrident() {
  return (
    <main className="why-page">
      <PageIntro
        eyebrow="WHY TRIDENT"
        title="A partner who takes ownership."
        description="A capable technical team, clear accountability and a practical understanding of the businesses we serve."
      />
      <ValueStack />
      <ComparisonTable />
      <Principles />
      <FounderNote />
      <FinalCTA />
    </main>
  );
}

export const Route = createFileRoute("/why-trident")({
  head: () => ({
    meta: [
      { title: "Why Trident | Local, Accountable Infrastructure Care" },
      {
        name: "description",
        content:
          "Why South African businesses choose Trident Cloud Services: local context, real human support and accountable operations.",
      },
      { property: "og:title", content: "Why Trident Cloud Services" },
      {
        property: "og:description",
        content: "South African context, real humans and clear accountability.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyTrident,
});
