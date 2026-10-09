import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, type Variants } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/components/SiteChrome";
import { ServicesSection } from "./index";

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

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Managed Cloud Services | Trident Cloud Services" },
      {
        name: "description",
        content:
          "Deploy, operate, protect and scale your business systems with Trident Cloud Services in South Africa.",
      },
      { property: "og:title", content: "Managed Services | Trident Cloud Services" },
      {
        property: "og:description",
        content: "One partner for deployment, operations, security and scale.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Services,
});

function Reveal({
  children,
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ServicesIntro() {
  return (
    <section className="page-intro services-page-intro">
      <img
        className="services-intro-image"
        src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=60"
        alt=""
        aria-hidden="true"
      />
      <div className="site-container services-intro-content">
        <motion.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          OUR SERVICES
        </motion.span>
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <motion.span className="hero-title-line" variants={titleLineVariants}>
            Infrastructure handled.
          </motion.span>
          <motion.span className="hero-title-line" variants={titleLineVariants}>
            Business moving.
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          We take care of the critical work behind your digital systems: deploying, operating,
          protecting and scaling them.
        </motion.p>
      </div>
    </section>
  );
}

function ServicesFinalCTA() {
  return (
    <section className="final-cta services-final-cta">
      <div className="site-container">
        <Reveal>
          <h2>Ready to hand over the technical side?</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p>
            Tell us about your setup. We&apos;ll have an honest conversation about what you need and
            whether we&apos;re the right fit.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="final-cta-actions">
            <Button asChild className="btn btn-primary">
              <Link to="/contact" search={{ plan: "Managed Hosting" }}>
                Book a discovery conversation <ArrowRight />
              </Link>
            </Button>
            <Button asChild className="btn btn-outline-light">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp us <MessageCircle />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <main className="services-page">
      <ServicesIntro />
      <ServicesSection />
      <ServicesFinalCTA />
    </main>
  );
}
