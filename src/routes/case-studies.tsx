import { createFileRoute } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight, ClipboardCheck, Handshake, Server } from "lucide-react";
import { FinalCTA, PageIntro } from "@/components/SiteChrome";

const revealViewport = { once: true, margin: "-80px" as const };

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

type CaseStudy = {
  id: string;
  title: string;
  eyebrow: string;
  subtitle: string;
  description: string;
  features: string[];
  stats: { value: string; label: string }[];
  rowClass: "case-study-row";
  href?: string;
  browserUrl: string;
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
};

const caseStudies: CaseStudy[] = [
  {
    id: "auction-bid-pro",
    title: "Auction Bid Pro",
    eyebrow: "AUTOMOTIVE AUCTION HOUSE · LESOTHO",
    subtitle: "Auction platform for a Lesotho vehicle auction house",
    description:
      "{{title}} runs physical vehicle auctions. When they needed a professional online presence to capture seller bookings and bidder applications, they came to us. The site handles appointments, bidder registrations, and enquiries end-to-end — with WhatsApp notifications on every submission.",
    features: [
      "Public site (services, portfolio, contact)",
      "Seller appointment booking system",
      "Bidder application form with approval workflow",
      "Admin dashboard for managing enquiries",
      "Dual email notifications (admin + applicant)",
      "Deployed on our managed infrastructure",
    ],
    stats: [
      { value: "< 5 days", label: "Time to first deploy" },
      { value: "100%", label: "Uptime since launch" },
      { value: "24/7", label: "Automated monitoring" },
    ],
    rowClass: "case-study-row",
    href: "https://auctionbidpro.co.ls",
    browserUrl: "auctionbidpro.co.ls",
    image: "/case-studies/abp-home.png",
    imageAlt: "Vehicle auction platform website homepage",
    imageSide: "left",
  },
  {
    id: "homely-taste",
    title: "Homely Taste",
    eyebrow: "BAKERY · LESOTHO",
    subtitle: "E‑commerce and order management for a local bakery",
    description:
      "{{title}} needed a simple way to showcase their products, take orders, and manage prices. We built a fully dynamic site with an admin panel where they can update products, prices, and contact details — all without touching code. Customers can browse, place orders via WhatsApp, and see banking details instantly.",
    features: [
      "Public product catalogue with per‑cookie pricing",
      "Order form integrated with WhatsApp",
      "Admin panel for products, prices, and site settings",
      "Supabase backend with real‑time updates",
      "Contact page with banking and M‑Pesa details",
      "Deployed on our managed infrastructure",
    ],
    stats: [
      { value: "2 days", label: "Time to first deploy" },
      { value: "100%", label: "Uptime since launch" },
      { value: "24/7", label: "Automated monitoring" },
    ],
    rowClass: "case-study-row",
    href: "https://homelytaste.co.ls",
    browserUrl: "homelytaste.co.ls",
    image: "/case-studies/homelytaste-home.png",
    imageAlt: "Bakery products and ordering website homepage",
    imageSide: "right",
  },
  {
    id: "orbitvision",
    title: "OrbitVision",
    eyebrow: "LOGISTICS · FLEET MANAGEMENT",
    subtitle: "Fleet operations dashboard for a CTMS provider",
    description:
      "{{title}} provides fleet management and telematics solutions. They needed a real‑time dashboard to track vehicles, drivers, and deliveries. We built a web‑based operations centre that integrates GPS data, driver check‑ins, and daily reporting — giving their team a single view of the entire fleet.",
    features: [
      "Real‑time fleet tracking dashboard",
      "GPS integration (Traccar)",
      "Driver check‑in and delivery tracking",
      "Operational reporting and alerts",
      "Role-based access for dispatch and management",
      "Deployed on our managed infrastructure",
    ],
    stats: [
      { value: "Real‑time", label: "Vehicle tracking" },
      { value: "99.9%", label: "Uptime since launch" },
      { value: "API‑first", label: "Integrations ready" },
    ],
    rowClass: "case-study-row",
    browserUrl: "app.orbitvision.co.za",
    image: "/case-studies/orbitvision-dashboard.png",
    imageAlt: "Fleet management and vehicle tracking dashboard",
    imageSide: "left",
  },
];

const approachPrinciples = [
  {
    icon: ClipboardCheck,
    title: "Built to last — and to hand over",
    description: "Every system is documented, tested, and delivered with full ownership.",
  },
  {
    icon: Server,
    title: "Real infrastructure, not templates",
    description:
      "We build on our own managed hosting. You're not inheriting someone else's plugin stack.",
  },
  {
    icon: Handshake,
    title: "Accountability over time",
    description:
      "The case study ends where the relationship starts. We stay on the system after launch.",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  const image = (
    <motion.div
      className="case-study-browser"
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={revealViewport}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="case-study-browser-bar" aria-hidden="true">
        <span className="case-study-browser-dot" />
        <span className="case-study-browser-dot" />
        <span className="case-study-browser-dot" />
        <span className="case-study-browser-url">{study.browserUrl}</span>
      </div>
      <div className="case-study-browser-viewport">
        <img src={study.image} alt={study.imageAlt} loading="lazy" />
      </div>
    </motion.div>
  );

  const content = (
    <div className="case-study-content">
      <span className="case-study-eyebrow">{study.eyebrow}</span>
      <h2 className="case-study-title" id={`case-study-title-${study.id}`}>
        {study.title}
      </h2>
      <p className="case-study-subtitle">{study.subtitle}</p>
      <p className="case-study-description">
        {study.description.replace("{{title}}", study.title)}
      </p>

      <div className="case-study-built">
        <h3>What we built</h3>
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {study.features.map((feature) => (
            <motion.li variants={revealItem} key={feature}>
              <span aria-hidden="true">✓</span>
              {feature}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="case-study-stats" aria-label="Project results">
        {study.stats.map(({ value, label }) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {study.href && (
        <a
          className="case-study-visit-link"
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {study.href.replace(/^https?:\/\//, "")} <ArrowRight aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <Reveal>
      <article
        className={`${study.rowClass}${study.imageSide === "right" ? " reverse" : ""}`}
        aria-labelledby={`case-study-title-${study.id}`}
      >
        {image}
        {content}
      </article>
    </Reveal>
  );
}

function CaseStudies() {
  return (
    <section className="case-studies-featured-section" aria-label="Client case studies">
      <div className="site-container case-studies-list">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </div>
    </section>
  );
}

function ClientWorkApproach() {
  return (
    <section
      className="case-studies-approach-section"
      aria-labelledby="case-studies-approach-heading"
    >
      <div className="site-container">
        <Reveal>
          <div className="case-studies-section-heading">
            <span className="eyebrow">HOW WE WORK</span>
            <h2 id="case-studies-approach-heading">How we approach client work</h2>
          </div>
        </Reveal>
        <motion.div
          className="case-studies-approach-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {approachPrinciples.map(({ icon: Icon, title, description }) => (
            <motion.article
              className="case-studies-approach-card"
              variants={revealItem}
              key={title}
            >
              <span className="case-studies-approach-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CaseStudiesPage() {
  return (
    <main className="case-studies-page">
      <PageIntro
        eyebrow="CLIENT WORK"
        title="Systems we've built and run."
        description="Real projects. Real clients. Real systems in production. Every case study shows what we built, what it does, and how it's running today."
      />
      <CaseStudies />
      <ClientWorkApproach />
      <FinalCTA />
    </main>
  );
}

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies | Client Work by Trident Cloud Services" },
      {
        name: "description",
        content:
          "Real client projects built and managed by Trident Cloud Services, including recent systems in production.",
      },
    ],
  }),
  component: CaseStudiesPage,
});
