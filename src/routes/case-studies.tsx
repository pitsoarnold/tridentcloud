import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight, ClipboardCheck, Handshake, Server } from "lucide-react";
import { FinalCTA, PageIntro } from "@/components/SiteChrome";
import { supabase } from "@/integrations/supabase/client";

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
  subtitle: string;
  category: string;
  domain: string;
  description: string;
  image_url: string;
  bullets: string[];
  stats: { value: string; label: string }[];
  sort_order: number;
};

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

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const domainUrl = study.domain.startsWith("http") ? study.domain : `https://${study.domain}`;
  const browserUrl = study.domain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const imageSide = index % 2 === 1 ? "right" : "left";
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
        <span className="case-study-browser-url">{browserUrl}</span>
      </div>
      <div className="case-study-browser-viewport">
        <img src={study.image_url} alt={`${study.title} project preview`} loading="lazy" />
      </div>
    </motion.div>
  );

  const content = (
    <div className="case-study-content">
      <span className="case-study-eyebrow">{study.category}</span>
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
          {study.bullets.map((bullet) => (
            <motion.li variants={revealItem} key={bullet}>
              <span aria-hidden="true">✓</span>
              {bullet}
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

      {study.domain && (
        <a
          className="case-study-visit-link"
          href={domainUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {browserUrl} <ArrowRight aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <Reveal>
      <article
        className={`case-study-row${imageSide === "right" ? " reverse" : ""}`}
        aria-labelledby={`case-study-title-${study.id}`}
      >
        {image}
        {content}
      </article>
    </Reveal>
  );
}

function CaseStudies({
  caseStudies,
  isLoading,
  hasError,
}: {
  caseStudies: CaseStudy[];
  isLoading: boolean;
  hasError: boolean;
}) {
  if (isLoading) return null;

  return (
    <section className="case-studies-featured-section" aria-label="Client case studies">
      <div className="site-container case-studies-list">
        {hasError ? (
          <p role="status">Client case studies are temporarily unavailable.</p>
        ) : (
          caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))
        )}
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
  const {
    data: caseStudies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase.from("case_studies").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  return (
    <main className="case-studies-page">
      <PageIntro
        eyebrow="CLIENT WORK"
        title="Systems we've built and run."
        description="Real projects. Real clients. Real systems in production. Every case study shows what we built, what it does, and how it's running today."
      />
      <CaseStudies caseStudies={caseStudies} isLoading={isLoading} hasError={isError} />
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
