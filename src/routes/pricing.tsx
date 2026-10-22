import { createFileRoute } from "@tanstack/react-router";
import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { FinalCTA } from "@/components/SiteChrome";
import { Pricing, FAQ } from "@/components/Pricing";

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

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Managed Hosting Pricing in Rand | Trident Cloud Services" },
      {
        name: "description",
        content:
          "Compare Trident Cloud Services' four managed hosting and operations plans. Transparent monthly and annual ZAR pricing for South African businesses.",
      },
      { property: "og:title", content: "Managed Cloud Pricing | Trident Cloud Services" },
      {
        property: "og:description",
        content: "Four levels of responsibility, from managed hosting to enterprise operations.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

function PricingIntro() {
  return (
    <section className="page-intro pricing-page-intro">
      <img
        className="pricing-intro-image"
        src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=60"
        alt=""
        aria-hidden="true"
      />
      <div className="site-container pricing-intro-content">
        <m.span
          className="eyebrow"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          PRICING
        </m.span>
        <m.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <m.span className="hero-title-line" variants={titleLineVariants}>
            The right level of care
          </m.span>
          <m.span className="hero-title-line" variants={titleLineVariants}>
            for your systems.
          </m.span>
        </m.h1>
        <m.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          From one essential website to complex digital operations, choose a starting point.
          We&apos;ll confirm the scope together before any work begins.
        </m.p>
      </div>
    </section>
  );
}

function PricingPage() {
  return (
    <main className="pricing-page">
      <PricingIntro />
      <m.div
        className="pricing-page-plans"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onViewportEnter={(entry) => {
          entry.target.classList.add("is-visible");
        }}
      >
        <img
          className="pricing-background-image"
          src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=60"
          alt=""
          aria-hidden="true"
        />
        <Pricing compact />
      </m.div>
      <Reveal>
        <FAQ />
      </Reveal>
      <Reveal>
        <FinalCTA />
      </Reveal>
    </main>
  );
}
