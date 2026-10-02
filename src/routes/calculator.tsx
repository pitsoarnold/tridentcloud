import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FinalCTA } from "@/components/SiteChrome";
import { BundleCalculator } from "@/components/BundleCalculator";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Project Cost Calculator | Trident Cloud" },
      { name: "description", content: "Configure your website, application, or enterprise system and see live pricing for three payment options: once-off, milestone, or monthly subscription." },
      { property: "og:title", content: "Bundle Calculator | Trident Cloud Services" },
      { property: "og:description", content: "Build your project bundle and see live pricing in Rands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  return (
    <main>
      <PageIntro
        eyebrow="BUNDLE CALCULATOR"
        title="Configure your project. See live pricing."
        description="Pick a service, choose a tier, add extras. We'll show you three ways to pay — no quote required."
      />
      <section className="section section-white">
        <div className="site-container">
          <BundleCalculator />
        </div>
      </section>
      <FinalCTA />
    </main>
  );
}