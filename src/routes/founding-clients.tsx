import { createFileRoute, Link } from "@tanstack/react-router";
import type { SupabaseClient } from "@supabase/supabase-js";
import { motion, type Variants } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  Handshake,
  MessageCircle,
  Sparkles,
  Tag,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

const revealViewport = { once: true, margin: "-80px" as const };

type FoundingDatabase = Omit<Database, "public"> & {
  public: Omit<Database["public"], "Tables"> & {
    Tables: Database["public"]["Tables"] & {
      founding_client_config: {
        Row: { id: string; is_active: boolean };
        Insert: { id?: string };
        Update: { id?: string; is_active?: boolean };
        Relationships: [];
      };
      founding_client_applications: {
        Row: { id: string; status: string };
        Insert: { id?: string; status: string };
        Update: { id?: string; status?: string };
        Relationships: [];
      };
    };
  };
};

// These public tables are provisioned in Supabase but are not in the generated local schema yet.
const foundingSupabase = supabase as unknown as SupabaseClient<FoundingDatabase>;
const contactSearch = (plan: string | undefined) => ({
  plan,
  service: undefined,
  tier: undefined,
  payment: undefined,
  addons: undefined,
});

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const titleVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const titleLineVariants: Variants = {
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

export const Route = createFileRoute("/founding-clients")({
  head: () => ({
    meta: [
      { title: "Founding Client Programme | Trident Cloud Services" },
      {
        name: "description",
        content:
          "Join our first 10 clients. Special pricing, free AI assistant, priority support, and a partnership that shapes how we build.",
      },
      { property: "og:title", content: "Founding Client Programme | Trident Cloud Services" },
      {
        property: "og:description",
        content:
          "Join our first 10 clients. Special pricing, free AI assistant, priority support, and a partnership that shapes how we build.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FoundingClientsPage,
});

const benefits = [
  {
    icon: Tag,
    title: "Founding pricing",
    body: "R500 / R1,500 / R3,500 monthly for the tiers below",
  },
  {
    icon: Sparkles,
    title: "Free AI assistant (Business tier)",
    body: "3 months of our AI sales assistant included at no cost",
  },
  {
    icon: Zap,
    title: "Priority attention",
    body: "Direct line to the founder. Fast answers, real context.",
  },
  {
    icon: BookOpen,
    title: "Case study partnership",
    body: "We work with you to tell your story — you keep all content",
  },
];

const tiers = [
  {
    name: "Presence",
    price: "R500",
    standardRate: "R1,000",
    features: [
      "1-page professional website",
      "Hosting + domain + SSL",
      "Contact form + WhatsApp",
      "Business email (1 address)",
    ],
  },
  {
    name: "Digital Office",
    price: "R1,500",
    standardRate: "R2,500",
    featured: true,
    features: [
      "Up to 5 pages",
      "Everything in Presence, plus:",
      "Blog + SEO setup",
      "Form submissions dashboard",
      "Admin panel",
      "Business email (3 addresses)",
    ],
  },
  {
    name: "Digital Sales",
    price: "R3,500",
    standardRate: "R4,500",
    features: [
      "Up to 10 pages",
      "Everything in Digital Office, plus:",
      "E-commerce or bookings",
      "Advanced SEO",
      "Monthly reporting",
      "Business email (5 addresses)",
    ],
  },
];

const commitments = [
  {
    title: "12-month hosting commitment",
    body: "Covers our setup and design work.",
  },
  {
    title: "Case study permission",
    body: "We can publicly reference your work (you approve final copy).",
  },
  {
    title: "One referral introduction",
    body: "Introduce us to one other business that might benefit.",
  },
  {
    title: "Honest feedback",
    body: "Tell us what's working and what isn't. We build the product around it.",
  },
];

const steps = [
  { title: "Apply", body: "Fill the short form below." },
  { title: "Review", body: "We reply within 2 business days." },
  { title: "Discovery call", body: "30 minutes, no pressure." },
  { title: "Agreement", body: "Sign, and we start." },
  { title: "Launch", body: "Live within 30 days." },
];

function FoundingCounter() {
  const [state, setState] = useState<
    | { status: "loading" }
    | { status: "ready"; acceptedCount: number }
    | { status: "error" }
    | { status: "inactive" }
  >({ status: "loading" });

  useEffect(() => {
    let active = true;

    const loadAvailability = async () => {
      try {
        const configResult = await foundingSupabase
          .from("founding_client_config")
          .select("is_active")
          .single();

        if (!active) return;

        if (configResult.error) {
          console.error("Could not load founding client config.", configResult.error);
          setState({ status: "error" });
          return;
        }

        if (!configResult.data.is_active) {
          setState({ status: "inactive" });
          return;
        }

        const applicationsResult = await foundingSupabase
          .from("founding_client_applications")
          .select("*", { count: "exact", head: true })
          .eq("status", "accepted");

        if (!active) return;

        if (applicationsResult.error || applicationsResult.count === null) {
          if (applicationsResult.error)
            console.error(
              "Could not count accepted founding client applications.",
              applicationsResult.error,
            );
          setState({ status: "error" });
          return;
        }

        setState({ status: "ready", acceptedCount: applicationsResult.count });
      } catch (error) {
        if (!active) return;
        console.error("Unable to check founding client availability.", error);
        setState({ status: "error" });
      }
    };

    void loadAvailability();

    return () => {
      active = false;
    };
  }, []);

  if (state.status === "inactive") return null;

  if (state.status === "loading") {
    return (
      <div className="founding-counter" aria-live="polite">
        <span>Checking available spots…</span>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="founding-counter founding-counter-error" role="status">
        <span>First 10 clients only</span>
      </div>
    );
  }

  const cohortSize = 10;
  const filledSpots = Math.min(state.acceptedCount, cohortSize);
  const remainingSpots = cohortSize - filledSpots;
  const progress = (filledSpots / cohortSize) * 100;

  return (
    <div
      className="founding-counter"
      role="status"
      aria-label={
        remainingSpots === 0
          ? "Cohort is full — join the waiting list"
          : `${filledSpots} of ${cohortSize} programme spots filled`
      }
      aria-live="polite"
    >
      <div className="founding-counter-label">
        {remainingSpots === 0 ? (
          <strong>Cohort is full — join the waiting list</strong>
        ) : (
          <>
            <span>
              <strong>
                {filledSpots} of {cohortSize}
              </strong>{" "}
              spots filled
            </span>
            <span>{remainingSpots} spots remaining</span>
          </>
        )}
      </div>
      <div
        className="founding-progress-track"
        role="progressbar"
        aria-label="Founding Client Programme spots filled"
        aria-valuemin={0}
        aria-valuemax={cohortSize}
        aria-valuenow={filledSpots}
      >
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

function FoundingClientsPage() {
  return (
    <main className="founding-page">
      <section className="founding-hero">
        <div className="site-container founding-hero-inner">
          <motion.div
            className="founding-hero-copy"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <motion.span className="eyebrow" variants={titleLineVariants}>
              FOUNDING CLIENT PROGRAMME
            </motion.span>
            <motion.h1 variants={titleLineVariants}>
              The first 10 clients. Special pricing. Real partnership.
            </motion.h1>
            <motion.p variants={titleLineVariants}>
              We're opening our doors with a limited cohort. Founding Clients get preferred pricing,
              hands-on attention, and a stake in how we build.
            </motion.p>
            <motion.div className="founding-hero-actions" variants={titleLineVariants}>
              <Button asChild className="btn btn-primary">
                <a href="#apply">
                  Apply to the programme <ArrowRight />
                </a>
              </Button>
              <Button asChild className="btn btn-outline-light">
                <Link to="/contact" search={contactSearch(undefined)}>
                  Talk to us first <MessageCircle />
                </Link>
              </Button>
            </motion.div>
            <motion.p className="founding-closing-note" variants={titleLineVariants}>
              Closes when 10 spots fill. No fixed deadline.
            </motion.p>
          </motion.div>
          <motion.div
            className="founding-hero-aside"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            <FoundingCounter />
            <div className="founding-aside-note">
              <Handshake aria-hidden="true" />
              <span>Small cohort. Direct founder access. Built together.</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section section-white founding-benefits-section">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">THE FOUNDING CLIENT ADVANTAGE</span>
              <h2>More than a launch discount</h2>
              <p>
                Get the attention and influence that only comes with being part of the first cohort.
              </p>
            </div>
          </Reveal>
          <motion.div
            className="founding-benefit-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {benefits.map((benefit) => (
              <motion.article
                className="founding-benefit-card"
                key={benefit.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="founding-icon">
                  <benefit.icon aria-hidden="true" />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="section section-muted founding-pricing-section">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">FOUNDING TIERS</span>
              <h2>Choose the right start for your business</h2>
              <p>Three clear packages with founding rates for the first 10 clients.</p>
            </div>
          </Reveal>
          <motion.div
            className="founding-tier-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {tiers.map((tier) => (
              <motion.article
                className={`founding-tier-card${tier.featured ? " featured" : ""}`}
                key={tier.name}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                {tier.featured && <span className="founding-tier-badge">MOST POPULAR</span>}
                <div className="founding-tier-heading">
                  <h3>{tier.name}</h3>
                  <span className="founding-tier-commitment">12-month commitment</span>
                </div>
                <p className="founding-tier-price">
                  <strong>{tier.price}</strong>
                  <span>/month</span>
                </p>
                <ul>
                  {tier.features.map((feature) => (
                    <li key={feature}>
                      <Check aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p className="founding-tier-note">
                  Founding rate. Standard rate: {tier.standardRate}/month.
                </p>
                <Button asChild className="btn btn-primary">
                  <Link to="/contact" search={contactSearch(tier.name)}>
                    Ask about {tier.name} <ArrowRight />
                  </Link>
                </Button>
              </motion.article>
            ))}
          </motion.div>
          <Reveal delay={0.1}>
            <div className="founding-discount-callout">
              <Sparkles aria-hidden="true" />
              <p>
                Founding pricing is locked for 12 months. After that, standard rates apply — but
                founding clients keep a lifetime discount on any Trident service.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-white founding-asks-section">
        <div className="site-container founding-two-column">
          <Reveal>
            <div className="founding-section-intro">
              <span className="eyebrow">A PARTNERSHIP</span>
              <h2>What we ask in return</h2>
              <p>
                Founding pricing is a shared commitment. Here’s what helps us make the programme
                work for everyone.
              </p>
            </div>
          </Reveal>
          <motion.ul
            className="founding-ask-list"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {commitments.map((commitment) => (
              <motion.li key={commitment.title} variants={itemVariants}>
                <span className="founding-check-icon">
                  <Check aria-hidden="true" />
                </span>
                <div>
                  <h3>{commitment.title}</h3>
                  <p>{commitment.body}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      <section className="section section-muted founding-process-section">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">SIMPLE BY DESIGN</span>
              <h2>How it works</h2>
              <p>Clear steps from first conversation to launch.</p>
            </div>
          </Reveal>
          <motion.ol
            className="founding-timeline"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {steps.map((step, index) => (
              <motion.li key={step.title} variants={itemVariants}>
                <span className="founding-step-number">0{index + 1}</span>
                <div className="founding-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                {index < steps.length - 1 && (
                  <>
                    <motion.span
                      className="founding-timeline-connector founding-timeline-connector-desktop"
                      aria-hidden="true"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={revealViewport}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                    <motion.span
                      className="founding-timeline-connector founding-timeline-connector-mobile"
                      aria-hidden="true"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={revealViewport}
                      transition={{
                        duration: 0.6,
                        delay: index * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  </>
                )}
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <section className="section section-white founding-cta-section">
        <div className="site-container">
          <Reveal>
            <div className="founding-cta-panel">
              <div>
                <span className="eyebrow">LIMITED TO 10 CLIENTS</span>
                <h2>Ready to apply? Or just want to talk?</h2>
                <p>Start with the short application, or speak with us before you decide.</p>
              </div>
              <div className="founding-cta-actions">
                <Button asChild className="btn btn-primary">
                  <a href="#apply">
                    Apply to the programme <ArrowRight />
                  </a>
                </Button>
                <Button asChild className="btn btn-outline-dark">
                  <Link to="/contact" search={contactSearch(undefined)}>
                    Book a call instead <MessageCircle />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TODO: Application form goes here (Prompt B will build this) */}
      {/* Form will post to Supabase table `founding_client_applications`. Fields: name, email, business_name, preferred_tier, message. */}
      <section className="section section-muted founding-application-section" id="apply">
        <div className="site-container">
          <Reveal>
            <div className="founding-application-placeholder">
              <div className="founding-icon">
                <Users aria-hidden="true" />
              </div>
              <span className="eyebrow">FOUNDING CLIENT APPLICATION</span>
              <h2>Application form coming soon</h2>
              <p>
                We’re preparing a short application form. In the meantime, tell us you’re interested
                and we’ll get back to you within 2 business days.
              </p>
              <Button asChild className="btn btn-primary">
                <Link to="/contact" search={contactSearch("Founding Client Programme")}>
                  Register your interest <ArrowRight />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
