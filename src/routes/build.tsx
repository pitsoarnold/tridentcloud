import { createFileRoute } from "@tanstack/react-router";
import { PageIntro, FinalCTA } from "@/components/SiteChrome";
import { BuildServices } from "@/components/BuildServices";

export const Route = createFileRoute("/build")({
  head: () => ({
    meta: [
      { title: "What We Build | Web, Apps, Enterprise Systems | Trident Cloud" },
      { name: "description", content: "Websites, web apps, desktop applications, enterprise systems and ERP solutions — designed, built, and hosted on Trident Cloud infrastructure." },
      { property: "og:title", content: "What We Build | Trident Cloud Services" },
      { property: "og:description", content: "From first sketch to final scale. One partner for building and running your digital systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BuildPage,
});

function BuildPage() {
  return (
    <main>
      <PageIntro
        eyebrow="WHAT WE BUILD"
        title="Systems that move your business forward."
        description="Websites, web apps, desktop tools, enterprise systems and ERP — designed, built, hosted and managed by one partner."
      />
      <BuildServices />
      <FinalCTA />
    </main>
  );
}