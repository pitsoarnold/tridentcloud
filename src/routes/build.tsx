import { createFileRoute } from "@tanstack/react-router";
import { FinalCTA } from "@/components/SiteChrome";
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
      <section className="page-intro relative overflow-hidden">
        <img
          src="/build-hero.png"
          alt="Trident Cloud Build Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 70% dark navy overlay to keep the text readable */}
        <div className="absolute inset-0 bg-[#0a1128]/70"></div>
        
        <div className="site-container relative z-10 py-20">
          <span className="eyebrow">WHAT WE BUILD</span>
          <h1 className="mt-4 mb-6">Systems that move your business forward.</h1>
          <p className="max-w-2xl text-lg">
            Websites, web apps, desktop tools, enterprise systems and ERP — designed, built, hosted and managed by one partner.
          </p>
        </div>
      </section>
      
      <BuildServices />
      <FinalCTA />
    </main>
  );
}