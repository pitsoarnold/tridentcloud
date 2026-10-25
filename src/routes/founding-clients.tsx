import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { m, type Variants } from "motion/react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Handshake,
  MessageCircle,
  Sparkles,
  Tag,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getFoundingAvailability,
  submitFoundingApplication,
} from "@/lib/founding-clients.functions";

const revealViewport = { once: true, margin: "-80px" as const };

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
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

export const Route = createFileRoute("/founding-clients")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: typeof search["plan"] === "string" ? search["plan"] : undefined,
  }),
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
    | { status: "ready"; filledSpots: number; totalSpots: number }
    | { status: "error" }
    | { status: "inactive" }
  >({ status: "loading" });
  const fetchAvailability = useServerFn(getFoundingAvailability);

  useEffect(() => {
    let active = true;

    void fetchAvailability()
      .then((availability) => {
        if (!active) return;
        setState(
          availability.isActive
            ? {
                status: "ready",
                filledSpots: availability.filledSpots,
                totalSpots: availability.totalSpots,
              }
            : { status: "inactive" },
        );
      })
      .catch(() => {
        if (!active) return;
        setState({ status: "error" });
      });

    return () => {
      active = false;
    };
  }, [fetchAvailability]);

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

  const filledSpots = Math.min(state.filledSpots, state.totalSpots);
  const remainingSpots = state.totalSpots - filledSpots;
  const progress = (filledSpots / state.totalSpots) * 100;

  return (
    <div
      className="founding-counter"
      role="status"
      aria-label={
        remainingSpots === 0
          ? "Cohort is full — join the waiting list"
          : `${filledSpots} of ${state.totalSpots} programme spots filled`
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
                {filledSpots} of {state.totalSpots}
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
        aria-valuemax={state.totalSpots}
        aria-valuenow={filledSpots}
      >
        <m.span
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

const tierByPlan: Record<string, "presence" | "digital-office" | "digital-sales"> = {
  Presence: "presence",
  "Digital Office": "digital-office",
  "Digital Sales": "digital-sales",
};
const preferredTierOptions = ["presence", "digital-office", "digital-sales", "unsure"] as const;
type PreferredTier = (typeof preferredTierOptions)[number];

function FoundingApplicationForm({ plan }: { plan: string | undefined }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [preferredTier, setPreferredTier] = useState<PreferredTier>(
    () => tierByPlan[plan ?? ""] ?? "unsure",
  );
  const [applicant, setApplicant] = useState({ name: "", email: "" });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const submitApplication = useServerFn(submitFoundingApplication);

  useEffect(() => {
    setPreferredTier(tierByPlan[plan ?? ""] ?? "unsure");
  }, [plan]);

  useEffect(() => {
    let frame = 0;
    const focusApplication = () => {
      if (window.location.hash !== "#apply") return;
      frame = window.requestAnimationFrame(() => {
        nameInputRef.current?.focus({ preventScroll: true });
      });
    };

    focusApplication();
    window.addEventListener("hashchange", focusApplication);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", focusApplication);
    };
  }, [plan]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const selectedTier = preferredTierOptions.find(
      (tier) => tier === String(formData.get("preferred_tier") ?? ""),
    );

    try {
      await submitApplication({
        data: {
          name,
          email,
          business_name: String(formData.get("business_name") ?? ""),
          preferred_tier: selectedTier ?? "unsure",
          message: String(formData.get("message") ?? ""),
          website: String(formData.get("website") ?? ""),
        },
      });
      setApplicant({ name, email });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="founding-form">
        <div className="founding-form-success" aria-live="polite">
          <span className="founding-form-success-icon">
            <CheckCircle2 aria-hidden="true" />
          </span>
          <h2>Application received</h2>
          <p>
            Thanks {applicant.name} — we'll review your application and get back to you within 2
            business days. A confirmation has been sent to {applicant.email}.
          </p>
          <Button asChild className="btn btn-outline-dark">
            <Link to="/">
              Back to homepage <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="founding-form">
      <form className="founding-form-fields" onSubmit={handleSubmit}>
        <div className="founding-form-field">
          <label htmlFor="founding-name">Your name *</label>
          <input
            ref={nameInputRef}
            id="founding-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Your full name"
          />
        </div>
        <div className="founding-form-field">
          <label htmlFor="founding-email">Work email *</label>
          <input
            id="founding-email"
            name="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
        <div className="founding-form-field">
          <label htmlFor="founding-business-name">Business name</label>
          <input
            id="founding-business-name"
            name="business_name"
            type="text"
            maxLength={150}
            autoComplete="organization"
            placeholder="Your business"
          />
        </div>
        <div className="founding-form-field">
          <label htmlFor="founding-preferred-tier">Which founding tier interests you? *</label>
          <select
            id="founding-preferred-tier"
            name="preferred_tier"
            required
            value={preferredTier}
            onChange={(event) => {
              const selectedTier = preferredTierOptions.find(
                (tier) => tier === event.currentTarget.value,
              );
              setPreferredTier(selectedTier ?? "unsure");
            }}
          >
            <option value="presence">Presence — R500/mo</option>
            <option value="digital-office">Digital Office — R1,500/mo</option>
            <option value="digital-sales">Digital Sales — R3,500/mo</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>
        <div className="founding-form-field">
          <label htmlFor="founding-message">Anything we should know?</label>
          <textarea
            id="founding-message"
            name="message"
            maxLength={2000}
            rows={5}
            placeholder="Tell us a little about your business or what you need."
          />
        </div>
        <div className="founding-form-honeypot" aria-hidden="true">
          <label htmlFor="founding-website">Leave this field empty</label>
          <input
            id="founding-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
        <div className="founding-form-submit">
          <Button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending application…" : "Submit application"}
            {status !== "sending" && <ArrowRight />}
          </Button>
          {status === "error" && (
            <p className="founding-form-error" role="alert" aria-live="polite">
              We couldn't send your application. Please try again or WhatsApp us at +266 6206 8252.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

function FoundingClientsPage() {
  const search = Route.useSearch();

  return (
    <main className="founding-page">
      <section className="founding-hero relative bg-[url('/founding-hero.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-[#0a1128]/85 -z-10"></div>
        <div className="site-container founding-hero-inner relative z-10">
          <m.div
            className="founding-hero-copy"
            initial="hidden"
            animate="visible"
            variants={titleVariants}
          >
            <m.span className="eyebrow" variants={titleLineVariants}>
              FOUNDING CLIENT PROGRAMME
            </m.span>
            <m.h1 variants={titleLineVariants}>
              The first 10 clients. Special pricing. Real partnership.
            </m.h1>
            <m.p variants={titleLineVariants}>
              We're opening our doors with a limited cohort. Founding Clients get preferred pricing,
              hands-on attention, and a stake in how we build.
            </m.p>
            <m.div className="founding-hero-actions" variants={titleLineVariants}>
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
            </m.div>
            <m.p className="founding-closing-note" variants={titleLineVariants}>
              Closes when 10 spots fill. No fixed deadline.
            </m.p>
          </m.div>
          <m.div
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
          </m.div>
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
          <m.div
            className="founding-benefit-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {benefits.map((benefit) => (
              <m.article
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
              </m.article>
            ))}
          </m.div>
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
          <m.div
            className="founding-tier-grid"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {tiers.map((tier) => (
              <m.article
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
                  <Link to="/founding-clients" search={{ plan: tier.name }} hash="apply">
                    Apply for {tier.name} <ArrowRight />
                  </Link>
                </Button>
              </m.article>
            ))}
          </m.div>
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
          <m.ul
            className="founding-ask-list"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {commitments.map((commitment) => (
              <m.li key={commitment.title} variants={itemVariants}>
                <span className="founding-check-icon">
                  <Check aria-hidden="true" />
                </span>
                <div>
                  <h3>{commitment.title}</h3>
                  <p>{commitment.body}</p>
                </div>
              </m.li>
            ))}
          </m.ul>
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
          <m.ol
            className="founding-timeline"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            {steps.map((step, index) => (
              <m.li key={step.title} variants={itemVariants}>
                <span className="founding-step-number">0{index + 1}</span>
                <div className="founding-step-copy">
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
                {index < steps.length - 1 && (
                  <>
                    <m.span
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
                    <m.span
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
              </m.li>
            ))}
          </m.ol>
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

      <section className="section section-muted founding-application-section" id="apply">
        <div className="site-container">
          <Reveal>
            <div className="founding-application-content">
              <div className="section-heading center">
                <span className="eyebrow">FOUNDING CLIENT APPLICATION</span>
                <h2>Tell us about your business</h2>
                <p>Share a few details and we’ll review your application within 2 business days.</p>
              </div>
              <FoundingApplicationForm plan={search.plan} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}