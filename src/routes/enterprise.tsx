import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  Server,
  Globe2,
  FileCheck,
  Headphones,
  TrendingUp,
  Check,
} from "lucide-react";
import { FinalCTA, whatsappUrl } from "@/components/SiteChrome";
import { Button } from "@/components/ui/button";
import { FAQAccordion, type FAQItem } from "@/components/FAQAccordion";

export const Route = createFileRoute("/enterprise")({
  head: () => ({
    meta: [
      { title: "Enterprise Infrastructure Management | Trident Cloud" },
      {
        name: "description",
        content:
          "Enterprise-grade managed infrastructure for South African organisations. Formal SLAs, POPIA compliance, dedicated account management, and 24/7 support.",
      },
      { property: "og:title", content: "Enterprise Infrastructure | Trident Cloud Services" },
      {
        property: "og:description",
        content:
          "For organisations where infrastructure is mission-critical. Formal SLAs, dedicated account management, and compliance support.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EnterprisePage,
});

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const revealItemVariants: Variants = {
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
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function EnterpriseIntro() {
  return (
    <section className="page-intro enterprise-page-intro">
      <img
        className="enterprise-intro-image"
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=60"
        alt=""
        aria-hidden="true"
      />
      <div className="site-container enterprise-intro-content">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          ENTERPRISE
        </motion.span>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <motion.span className="hero-title-line" variants={titleLineVariants}>
            Infrastructure management for organisations
          </motion.span>
          <motion.span className="hero-title-line" variants={titleLineVariants}>
            where downtime isn&apos;t an option.
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Formal SLAs, dedicated account management, POPIA compliance, and 24/7 support. For South
          African enterprises with mission-critical systems.
        </motion.p>
      </div>
    </section>
  );
}

const pillars = [
  {
    icon: FileCheck,
    title: "Formal SLAs",
    body: "Uptime guarantees, response time commitments, and financial remedies — in writing. No handshake agreements.",
  },
  {
    icon: Users,
    title: "Dedicated account manager",
    body: "A single named contact who knows your systems, your team, and your priorities. No ticket queues.",
  },
  {
    icon: Shield,
    title: "POPIA & compliance",
    body: "Data handling that meets POPIA standards. Audit logs, access controls, and compliance documentation on request.",
  },
  {
    icon: Server,
    title: "Custom infrastructure",
    body: "Multi-region deployments, high availability, disaster recovery — architected for your specific requirements.",
  },
  {
    icon: Clock,
    title: "24/7 support options",
    body: "Round-the-clock response for mission-critical systems. Escalation paths with clear ownership at every tier.",
  },
  {
    icon: Globe2,
    title: "Multi-location ready",
    body: "Unlimited domains, environments, and regional deployments. Scale across South Africa and beyond.",
  },
];

const slaRows = [
  { metric: "Uptime guarantee", standard: "99.9%", enterprise: "99.95%" },
  { metric: "Critical incident response", standard: "4 hours", enterprise: "1 hour" },
  { metric: "Standard support response", standard: "Business hours", enterprise: "24/7 available" },
  { metric: "Named technical contact", standard: "Shared", enterprise: "Dedicated" },
  { metric: "Monthly reporting", standard: "Yes", enterprise: "Yes + quarterly review" },
  { metric: "Disaster recovery test", standard: "Annual", enterprise: "Semi-annual" },
  { metric: "Compliance documentation", standard: "On request", enterprise: "Included" },
  { metric: "Financial SLA remedies", standard: "—", enterprise: "Yes" },
];

const onboardingSteps = [
  {
    number: "01",
    title: "Discovery",
    body: "We review your current infrastructure, systems, and pain points. Two weeks of assessment, no commitment.",
  },
  {
    number: "02",
    title: "Proposal & SLA",
    body: "A tailored proposal with scope, SLA commitments, pricing, and migration plan. Your legal team reviews it.",
  },
  {
    number: "03",
    title: "Migration plan",
    body: "Detailed migration timeline with rollback procedures. Zero-downtime cutover where possible.",
  },
  {
    number: "04",
    title: "Onboarding",
    body: "We take over. Dedicated account manager assigned. Escalation paths documented. Team introduced.",
  },
  {
    number: "05",
    title: "Steady state",
    body: "Ongoing monitoring, reporting, quarterly reviews, and continuous improvement. Your infrastructure, our responsibility.",
  },
];

const faqs: FAQItem[] = [
  {
    q: "What size organisations do you work with?",
    a: "Our Enterprise tier is built for organisations with 50+ staff, multi-location operations, or mission-critical systems. If you have one or more systems that cannot afford downtime, this is for you.",
  },
  {
    q: "Can you sign a formal SLA?",
    a: "Yes. Our Enterprise agreements include formal SLAs with uptime commitments, response time guarantees, and financial remedies if we miss them. Your legal team can review and negotiate.",
  },
  {
    q: "How do you handle POPIA compliance?",
    a: "We handle data on your behalf under POPIA standards — encryption, access controls, audit logging, and documented data handling procedures. We can sign a POPIA-compliant data processing agreement.",
  },
  {
    q: "Do you support multi-region deployments?",
    a: "Yes. We can architect for multiple regions (Cape Town, Johannesburg, Europe) with failover, load balancing, and latency optimisation.",
  },
  {
    q: "What happens if something goes wrong at 2 AM?",
    a: "Enterprise clients have access to our 24/7 escalation line. Critical incidents trigger our on-call rotation and we respond within the SLA commitment — typically within one hour.",
  },
  {
    q: "Can you migrate us off our current provider?",
    a: "Yes. We handle the migration from assessment through cutover, with rollback procedures. Most migrations complete without downtime.",
  },
  {
    q: "How is pricing structured?",
    a: "Enterprise pricing is scoped per engagement based on your infrastructure, SLA requirements, and support level. We provide a fixed monthly or annual fee with no hidden costs.",
  },
  {
    q: "What's your onboarding timeline?",
    a: "Typically 4-6 weeks from first conversation to full onboarding. We can move faster for urgent requirements.",
  },
];

function EnterprisePage() {
  return (
    <main className="enterprise-page">
      <EnterpriseIntro />

      {/* Pillars */}
      <section className="section section-white">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">WHAT ENTERPRISE GETS YOU</span>
              <h2>Beyond managed hosting — a technical partnership.</h2>
              <p>
                Enterprise clients need more than a service provider. They need a partner who signs
                SLAs, attends quarterly reviews, and answers the phone at 2 AM.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="enterprise-pillars"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {pillars.map((p) => (
              <motion.article
                key={p.title}
                className="enterprise-pillar"
                variants={revealItemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <div className="enterprise-pillar-icon">
                  <p.icon aria-hidden="true" />
                </div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SLA Comparison */}
      <section className="section section-muted enterprise-sla-section">
        <img
          className="enterprise-sla-image"
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=60"
          alt=""
          aria-hidden="true"
        />
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">SLA COMMITMENTS</span>
              <h2>What we commit to. In writing.</h2>
              <p>
                Enterprise SLAs are contractual. If we miss them, there are remedies. This is what
                that looks like side-by-side with our standard plans.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="sla-table"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0 } },
            }}
          >
            <motion.div className="sla-header" variants={revealItemVariants}>
              <div className="sla-cell sla-cell-first">Commitment</div>
              <div className="sla-cell">Standard plans</div>
              <div className="sla-cell sla-cell-enterprise">Enterprise</div>
            </motion.div>
            {slaRows.map((row, index) => (
              <motion.div
                className="sla-row"
                key={row.metric}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, delay: index * 0.05 },
                  },
                }}
              >
                <div className="sla-cell sla-cell-first sla-cell-label">{row.metric}</div>
                <div className="sla-cell sla-cell-standard">{row.standard}</div>
                <div className="sla-cell sla-cell-enterprise">
                  <motion.span
                    className="sla-check"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 + 0.12 }}
                  >
                    <Check />
                  </motion.span>
                  {row.enterprise}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Onboarding */}
      <section className="section section-white enterprise-onboarding-section">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">HOW ONBOARDING WORKS</span>
              <h2>From first conversation to full takeover in 4-6 weeks.</h2>
              <p>
                No abrupt transitions. No surprise cutovers. A clear, documented process with your
                team at every step.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="enterprise-onboarding"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            onViewportEnter={(entry) => {
              entry.target.classList.add("is-visible");
            }}
          >
            {onboardingSteps.map((step, index) => (
              <motion.div
                key={step.number}
                className="enterprise-step"
                variants={revealItemVariants}
              >
                <motion.span
                  className="enterprise-step-number"
                  initial={{ scale: 0.94 }}
                  whileInView={{ scale: [0.94, 1.08, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.12 + 0.1 }}
                >
                  {step.number}
                </motion.span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="section section-muted">
        <div className="site-container">
          <div className="enterprise-ideal">
            <div className="enterprise-ideal-copy">
              <span className="eyebrow">IDEAL FOR</span>
              <h2>If any of these describe you, let's talk.</h2>
              <motion.ul
                className="enterprise-ideal-list"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {[
                  "Multi-location operations with shared systems",
                  "Compliance requirements (POPIA, ISO, industry-specific)",
                  "Mission-critical systems that cannot afford downtime",
                  "50+ staff relying on your infrastructure daily",
                  "Finance, healthcare, government, or regulated industries",
                  "Looking for a partner, not a vendor",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={{
                      hidden: { opacity: 0, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                      },
                    }}
                  >
                    <Check /> {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            <motion.div
              className="enterprise-ideal-card"
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow">NOT SURE IF YOU QUALIFY?</span>
              <h3>Book a 15-minute conversation.</h3>
              <p>
                Tell us what you run. We'll have an honest conversation about whether we're the
                right fit. If we're not, we'll tell you — and point you somewhere better.
              </p>
              <div className="enterprise-ideal-ctas">
                <Button asChild className="btn btn-primary">
                  <Link
                    to="/contact"
                    search={{ plan: "Enterprise Systems — Not sure of tier yet" }}
                  >
                    Book a discovery call <ArrowRight />
                  </Link>
                </Button>
                <Button asChild className="btn btn-outline-dark">
                  <a href={whatsappUrl} target="_blank" rel="noreferrer">
                    <Headphones /> WhatsApp us
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enterprise Services */}
      <section className="section section-white">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">WHAT WE MANAGE</span>
              <h2>From infrastructure to operations.</h2>
              <p>
                Everything in our standard plans, plus the additional scope and support enterprise
                organisations require.
              </p>
            </div>
          </Reveal>

          <motion.div
            className="enterprise-services"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div
              className="enterprise-service"
              variants={revealItemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="enterprise-pillar-icon">
                <Server aria-hidden="true" />
              </div>
              <h3>Managed Infrastructure</h3>
              <p>
                Every system, every environment, monitored and maintained 24/7. High availability,
                disaster recovery, and capacity planning included.
              </p>
            </motion.div>
            <motion.div
              className="enterprise-service"
              variants={revealItemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="enterprise-pillar-icon">
                <Shield aria-hidden="true" />
              </div>
              <h3>Advanced Security</h3>
              <p>
                Security audits, intrusion detection, access controls, incident response, and
                compliance documentation.
              </p>
            </motion.div>
            <motion.div
              className="enterprise-service"
              variants={revealItemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="enterprise-pillar-icon">
                <TrendingUp aria-hidden="true" />
              </div>
              <h3>Continuous Optimisation</h3>
              <p>
                Quarterly strategy reviews, capacity planning, and proactive performance
                optimisation — not just keep-the-lights-on.
              </p>
            </motion.div>
          </motion.div>

          <div className="enterprise-cta-row">
            <Button asChild className="btn btn-primary">
              <Link to="/build">
                Explore build services <ArrowRight />
              </Link>
            </Button>
            <Button asChild className="btn btn-outline-dark">
              <Link to="/pricing">See all pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-muted enterprise-faq-section">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">COMMON QUESTIONS</span>
              <h2>Answers for enterprise teams.</h2>
            </div>
          </Reveal>

          <Reveal>
            <FAQAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      <Reveal>
        <FinalCTA />
      </Reveal>
    </main>
  );
}
