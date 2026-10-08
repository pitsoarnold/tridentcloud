import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, MessageSquare, ShieldCheck, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/SiteChrome";
import { WhySection } from "./index";

const revealViewport = { once: true, margin: "-80px" as const };

const revealItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const valueContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const timelineContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const valueCard: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stats = [
  { value: "99.9%", label: "Uptime target" },
  { value: "24/7", label: "Monitoring coverage" },
  { value: "1 hour", label: "Critical response target" },
  { value: "ZAR", label: "Local pricing, no USD surprises" },
];

const milestones = [
  { date: "2025 Q4", title: "Trident Development Group founded" },
  { date: "2026 Q1", title: "Trident Cloud Services launched" },
  { date: "2026 Q2", title: "First managed hosting clients onboarded" },
  { date: "2026 Q3", title: "Enterprise tier launched with formal SLAs" },
];

const teamMembers = [
  {
    name: "Pitso Arnold",
    role: "Founder",
    bio: "Senior infrastructure engineer who has run the systems behind small and mid-size businesses across Southern Africa.",
  },
];

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

function AboutStats() {
  return (
    <section className="about-stats-section" aria-labelledby="about-stats-heading">
      <Reveal>
        <h2 id="about-stats-heading">By the numbers</h2>
      </Reveal>
      <motion.div
        className="about-stat-grid"
        variants={valueContainer}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
      >
        {stats.map(({ value, label }) => (
          <motion.div className="about-stat" key={label} variants={valueCard}>
            <div className="about-stat-value">{value}</div>
            <div className="about-stat-label">{label}</div>
          </motion.div>
        ))}
      </motion.div>
      <p className="about-section-note">Numbers grow with us. Check back as we scale.</p>
    </section>
  );
}

function AboutTimeline() {
  return (
    <section className="about-timeline-section" aria-labelledby="about-timeline-heading">
      <Reveal>
        <h2 id="about-timeline-heading">Milestones</h2>
      </Reveal>
      <div className="about-timeline">
        <motion.div
          className="about-timeline-line"
          aria-hidden="true"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={revealViewport}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.div
          className="about-timeline-list"
          variants={timelineContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {milestones.map(({ date, title }) => (
            <motion.div className="about-timeline-item" key={date} variants={revealItem}>
              <motion.div
                className="about-timeline-marker"
                aria-hidden="true"
                initial={{ scale: 0.7 }}
                whileInView={{ scale: [0.7, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              />
              <div className="about-timeline-content">
                <div className="about-timeline-date">{date}</div>
                <div className="about-timeline-title">{title}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <p className="about-section-note">
        This timeline is short today. It&apos;s already getting longer.
      </p>
    </section>
  );
}

function AboutTeam() {
  return (
    <section className="about-team-section" aria-labelledby="about-team-heading">
      <Reveal>
        <div className="about-team-copy">
          <span className="eyebrow">WHO WE ARE</span>
          <h2 id="about-team-heading">Small team. Senior hands.</h2>
          <p>
            Clients work directly with the people who run their systems. There are no account
            managers between you and the engineer responsible for the work.
          </p>
        </div>
      </Reveal>
      <motion.div
        className="about-team-grid"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {teamMembers.map(({ name, role, bio }) => (
          <article className="about-team-card" key={name}>
            <div className="about-team-avatar">
              <img
                src="/team/pitso.jpg"
                alt="Pitso Arnold, Founder of Trident Cloud Services"
                className="about-team-photo"
                loading="lazy"
              />
            </div>
            <h3>{name}</h3>
            <p className="about-team-role">{role}</p>
            <p className="about-team-bio">{bio}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
}

function AboutIntro() {
  return (
    <section className="page-intro about-intro">
      <div className="site-container">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          ABOUT TRIDENT
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={revealViewport}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Technology works best when someone owns it.
        </motion.h1>
        <Reveal delay={0.15}>
          <p>
            We&apos;re a managed infrastructure and operations partner for South African
            organisations that need their systems to work, every day.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function AboutCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <Reveal>
      <aside className="about-cta-card">
        <p>Want to learn how we&apos;d approach your systems?</p>
        <motion.div
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [1, 0.95, 1] }}
          transition={
            shouldReduceMotion ? undefined : { duration: 3, ease: "easeInOut", repeat: Infinity }
          }
        >
          <Button asChild className="btn btn-primary">
            <Link to="/contact" search={{}}>
              Let&apos;s talk. <ArrowRight />
            </Link>
          </Button>
        </motion.div>
      </aside>
    </Reveal>
  );
}

function About() {
  return (
    <main className="about-page">
      <AboutIntro />
      <section className="section section-white about-approach">
        <div className="site-container about-content">
          <Reveal>
            <div className="about-approach-copy">
              <span className="eyebrow">OUR APPROACH</span>
              <h2>Your systems. Our responsibility.</h2>
            </div>
          </Reveal>
          <motion.div
            className="about-body-copy"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={revealViewport}
          >
            <motion.p variants={revealItem}>
              Trident Cloud Services is part of Trident Development Group. We focus on the practical
              work of keeping websites, applications and business systems available, secure and
              ready to grow.
            </motion.p>
            <motion.p variants={revealItem}>
              Our approach is straightforward: understand what you run, agree on what matters, and
              take clear responsibility for the infrastructure behind it. From deployment and daily
              monitoring to backups and security, we&apos;re here to make the technical side less of
              a burden.
            </motion.p>
          </motion.div>

          <AboutStats />

          <div className="about-values">
            <Reveal>
              <h2>What we stand for</h2>
            </Reveal>
            <motion.div
              className="about-value-grid"
              variants={valueContainer}
              initial="hidden"
              whileInView="visible"
              viewport={revealViewport}
            >
              <motion.article
                className="about-value-card"
                variants={valueCard}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="about-value-icon" aria-hidden="true">
                  <ShieldCheck />
                </span>
                <h3>Ownership</h3>
                <p>One accountable partner instead of a maze of vendors.</p>
              </motion.article>
              <motion.article
                className="about-value-card"
                variants={valueCard}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="about-value-icon" aria-hidden="true">
                  <MessageSquare />
                </span>
                <h3>Clarity</h3>
                <p>Direct communication about scope, risks and next steps.</p>
              </motion.article>
              <motion.article
                className="about-value-card"
                variants={valueCard}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <span className="about-value-icon" aria-hidden="true">
                  <TrendingUp />
                </span>
                <h3>Steady improvement</h3>
                <p>Operations that evolve with your business.</p>
              </motion.article>
            </motion.div>
          </div>

          <AboutTimeline />
          <AboutTeam />
          <AboutCTA />
        </div>
      </section>
      <WhySection />
      <FinalCTA />
    </main>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Trident Cloud Services | Our Approach" },
      {
        name: "description",
        content:
          "Learn about Trident Cloud Services and our approach to dependable managed infrastructure for South African businesses.",
      },
      { property: "og:title", content: "About Trident Cloud Services" },
      {
        property: "og:description",
        content: "A hands-on South African partner for the systems your business depends on.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});
