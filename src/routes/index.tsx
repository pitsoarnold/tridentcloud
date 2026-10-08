import { useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Calculator,
  CheckCircle2,
  Cloud,
  Layers3,
  LockKeyhole,
  MapPin,
  Play,
  Rocket,
  Server,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Pricing, FAQ } from "@/components/Pricing";
import { FinalCTA } from "@/components/SiteChrome";
import capeTown from "@/assets/cape-town-dusk.jpg";

const revealViewport = { once: true, margin: "-80px" as const };

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const revealItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Trident Cloud Services | Managed Infrastructure in South Africa" },
      {
        name: "description",
        content:
          "Trident Cloud Services operates the infrastructure behind your websites, applications and business systems. Managed hosting, security and operations in South Africa.",
      },
      {
        property: "og:title",
        content: "Trident Cloud Services | Your systems. Our responsibility.",
      },
      {
        property: "og:description",
        content: "Managed hosting, infrastructure and operations for South African businesses.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    number: "01",
    icon: Rocket,
    title: "Deploy",
    text: "We get your systems online and configured for success.",
    items: [
      "Server setup",
      "Domain & DNS",
      "SSL certificates",
      "Initial hardening",
      "Deployment automation",
    ],
  },
  {
    number: "02",
    icon: Settings2,
    title: "Operate",
    text: "We keep everything running, updated and optimised.",
    items: [
      "24/7 monitoring",
      "Daily backups",
      "Performance tuning",
      "Software updates",
      "Incident response",
    ],
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Protect",
    text: "We secure your data, monitor for threats and keep you backed up.",
    items: [
      "Security hardening",
      "Intrusion detection",
      "Firewall management",
      "Disaster recovery",
      "POPIA support",
    ],
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Scale",
    text: "We grow with your business, so you never outgrow your infrastructure.",
    items: [
      "Capacity planning",
      "Multi-region options",
      "Load balancing",
      "Resource optimisation",
      "Architecture reviews",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="section section-muted services-section">
      <img
        className="services-background-image"
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=60"
        alt=""
        aria-hidden="true"
      />
      <div className="site-container services-content">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">WHAT WE DO</span>
            <h2>From first deployment to what comes next.</h2>
            <p>
              Four connected disciplines. One team responsible for keeping your digital operation
              running.
            </p>
          </div>
        </Reveal>
        <motion.div
          className="pillars"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {pillars.map((pillar) => (
            <motion.article
              className="pillar"
              key={pillar.title}
              variants={revealItem}
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <div className="pillar-top">
                <pillar.icon aria-hidden="true" />
                <span className="pillar-number">{pillar.number} / 04</span>
              </div>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
              <ul>
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function WhySection() {
  return (
    <section className="section section-white why-section">
      <div className="site-container">
        <Reveal>
          <div className="section-heading">
            <span className="eyebrow">WHY TRIDENT</span>
            <h2>Accountability isn't an add-on.</h2>
            <p>We work alongside your business, not behind a ticket number.</p>
          </div>
        </Reveal>
        <motion.div
          className="why-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.article className="why-item" variants={revealItem}>
            <MapPin />
            <h3>Grounded in South Africa</h3>
            <p>
              Local business context, ZAR pricing and infrastructure decisions made with South
              African requirements, including POPIA, in mind.
            </p>
          </motion.article>
          <motion.article className="why-item" variants={revealItem}>
            <Users />
            <h3>Real humans. Clear ownership.</h3>
            <p>
              A direct line to people who know your systems. No vendor shuffle when something needs
              attention.
            </p>
          </motion.article>
          <motion.article className="why-item" variants={revealItem}>
            <Layers3 />
            <h3>Built for what comes next</h3>
            <p>
              From a single website to a connected digital operation, we plan with your growth in
              mind.
            </p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

export function CalculatorTeaser() {
  return (
    <section className="section section-muted">
      <div className="site-container">
        <div className="home-calc-teaser">
          <motion.div
            className="home-calc-text"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow">PRICING CALCULATOR</span>
            <h2>See your project cost in 30 seconds.</h2>
            <p>
              Pick a service, choose a tier, add extras. We'll show you three ways to pay — no
              quote, no call, no commitment.
            </p>
            <Button asChild className="btn btn-primary">
              <Link to="/calculator">
                Open the calculator <ArrowRight />
              </Link>
            </Button>
          </motion.div>
          <motion.div
            className="home-calc-preview"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={revealViewport}
            animate={{ y: [-3, 3, -3] }}
            transition={{
              opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 4, ease: "easeInOut", repeat: Infinity },
            }}
          >
            <div className="home-calc-mock">
              <div className="home-calc-mock-header">
                <Calculator aria-hidden="true" />
                <span>Your investment</span>
              </div>
              <div className="home-calc-mock-tabs">
                <span>Once-off</span>
                <span>Milestone</span>
                <span className="active">Subscription</span>
              </div>
              <div className="home-calc-mock-price">
                R863<em>/mo</em>
              </div>
              <div className="home-calc-mock-sub">× 24 months · R20,700 total</div>
              <div className="home-calc-mock-rows">
                <div className="home-calc-mock-row">
                  <span>Website — Business</span>
                  <span>R18,000</span>
                </div>
                <div className="home-calc-mock-row">
                  <span>Financing premium</span>
                  <span>~15%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const [pricingVisible, setPricingVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <main>
      <section className="hero" ref={heroRef}>
        <motion.img
          src={capeTown}
          className="hero-image"
          alt="Cape Town and Table Mountain at dusk"
          width={1920}
          height={1050}
          fetchPriority="high"
          style={{ y: heroImageY }}
        />
        <div className="site-container hero-inner">
          <div className="hero-content">
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              A TRIDENT DEVELOPMENT GROUP COMPANY · SOUTH AFRICA
            </motion.span>
            <motion.h1
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="hero-title-line" variants={revealItem}>
                We run the technology
              </motion.span>
              <motion.span className="hero-title-line" variants={revealItem}>
                <em>your business</em> depends on.
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Trident Cloud Services operates the infrastructure behind your websites, applications
              and business systems — so your team can focus on running the business, not the
              servers.
            </motion.p>
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
                <Button asChild className="btn btn-primary">
                  <Link to="/contact" search={{}}>
                    Get in touch <ArrowRight />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
                <Button asChild className="btn btn-outline-light">
                  <Link to="/services">
                    See how we work <Play />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="hero-badges"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="hero-badge"
              variants={{
                hidden: { opacity: 0, x: 24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <ShieldCheck />{" "}
              <span>
                24/7 monitoring
                <br />
                (business-hours response)
              </span>
            </motion.div>
            <motion.div
              className="hero-badge"
              variants={{
                hidden: { opacity: 0, x: 24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <LockKeyhole />{" "}
              <span>
                Advanced security
                <br />
                and backups
              </span>
            </motion.div>
            <motion.div
              className="hero-badge"
              variants={{
                hidden: { opacity: 0, x: 24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              <Cloud />{" "}
              <span>
                Scalable infrastructure
                <br />
                for growth
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="trust-strip">
        <motion.div
          className="site-container trust-inner"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.08, duration: 0.5 },
            },
          }}
        >
          <motion.span className="trust-title" variants={revealItem}>
            Built around what matters most
          </motion.span>
          <div className="trust-items">
            <motion.span variants={revealItem}>
              <ShieldCheck /> Security by design
            </motion.span>
            <motion.span variants={revealItem}>
              <Activity /> Proactive monitoring
            </motion.span>
            <motion.span variants={revealItem}>
              <Server /> Hands-on operations
            </motion.span>
            <motion.span variants={revealItem}>
              <CheckCircle2 /> One accountable partner
            </motion.span>
          </div>
        </motion.div>
      </div>

      <section className="section section-white problem-section">
        <img
          className="problem-background-image"
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=60"
          alt=""
          aria-hidden="true"
        />
        <div className="site-container problem-content">
          <Reveal>
            <div className="problem-copy section-heading center">
              <span className="eyebrow">THE PROBLEM</span>
              <h2>You're not in the hosting business. But you're running servers anyway.</h2>
              <p>
                When infrastructure becomes an afterthought, small issues turn into lost time.
                Backups get missed. Updates pile up. And when something breaks, too many vendors
                point at each other. We take responsibility for the systems beneath your business.
              </p>
            </div>
          </Reveal>
          <motion.div
            className="problem-points"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.div className="problem-point" variants={revealItem}>
              <AlertTriangle />
              <div>
                <strong>Downtime disrupts business</strong>
                <p>Monitor early, respond clearly and keep critical systems available.</p>
              </div>
            </motion.div>
            <motion.div className="problem-point" variants={revealItem}>
              <LockKeyhole />
              <div>
                <strong>Security needs constant care</strong>
                <p>Keep patches, backups and access under active management.</p>
              </div>
            </motion.div>
            <motion.div className="problem-point" variants={revealItem}>
              <Users />
              <div>
                <strong>Your team has better things to do</strong>
                <p>Put infrastructure in capable hands and focus on your work.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ServicesSection />
      <CalculatorTeaser />
      <motion.div
        className={`pricing-reveal${pricingVisible ? " is-visible" : ""}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => setPricingVisible(true)}
      >
        <Pricing />
      </motion.div>
      <WhySection />
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <FinalCTA />
      </Reveal>
    </main>
  );
}
