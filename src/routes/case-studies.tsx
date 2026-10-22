import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ArrowRight, ClipboardCheck, Handshake, Server } from "lucide-react";
import { FinalCTA, PageIntro } from "@/components/SiteChrome";
import { getCaseStudies } from "@/lib/case-studies.functions";
import { CaseStudyPreview } from "@/components/CaseStudyPreview";

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
  const cleanDomain = study.domain?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const imageSide = index % 2 === 1 ? "right" : "left";

  // Render the interactive iframe if a domain exists, otherwise fallback to the image
  const image = study.domain ? (
    <m.div
      initial={{ opacity: 0, scale: 1.04 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={revealViewport}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <CaseStudyPreview url={study.domain} title={study.title} />
    </m.div>
  ) : (
    <m.div
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
        <span className="case-study-browser-url">{cleanDomain}</span>
      </div>
      <div className="case-study-browser-viewport">
        <img src={study.image_url} alt={`${study.title} project preview`} loading="lazy" />
      </div>
    </m.div>
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
        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {study.bullets.map((bullet) => (
            <m.li variants={revealItem} key={bullet}>
              <span aria-hidden="true">✓</span>
              {bullet}
            </m.li>
          ))}
        </m.ul>
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
          href={`https://${cleanDomain}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit {cleanDomain} <ArrowRight aria-hidden="true" />
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
        <m.div
          className="case-studies-approach-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          {approachPrinciples.map(({ icon: Icon, title, description }) => (
            <m.article
              className="case-studies-approach-card"
              variants={revealItem}
              key={title}
            >
              <span className="case-studies-approach-icon" aria-hidden="true">
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

function CaseStudiesPage() {
  const {
    data: caseStudies = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["case-studies"],
    queryFn: () => getCaseStudies(),
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