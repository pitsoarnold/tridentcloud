import { createFileRoute, Link } from "@tanstack/react-router";
import { m, type Variants } from "motion/react";
import { 
  ArrowRight, 
  MessageCircle, 
  Server, 
  Globe2, 
  Database, 
  Lock, 
  Check,
  X,
  Cloud,
  Layers,
  ShieldCheck
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/components/SiteChrome";

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

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Managed Cloud Services | Trident Cloud Services" },
      {
        name: "description",
        content:
          "Enterprise cloud hosting, managed databases, edge networking, and TLS/SSL security. The power of Cloudflare and Supabase, managed by South African engineers.",
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
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </m.div>
  );
}

function ServicesIntro() {
  return (
    <section className="page-intro services-page-intro relative overflow-hidden bg-[#0a1128]">
      <img 
        src="/services-hero.jpg" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#0a1128]/75"></div>
      <div className="site-container services-intro-content relative z-10">
        <m.span
          className="eyebrow text-[#E31837]"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          MANAGED CLOUD & HOSTING
        </m.span>
        <m.h1
          className="text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <m.span className="hero-title-line" variants={titleLineVariants}>
            Infrastructure handled.
          </m.span>
          <m.span className="hero-title-line" variants={titleLineVariants}>
            Business moving.
          </m.span>
        </m.h1>
        <m.p
          className="text-gray-300"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          The raw power of edge networking and managed databases, combined with the accountability of South African engineers. We don't just sell hosting. We run the entire operation.
        </m.p>
      </div>
    </section>
  );
}

const coreServices = [
  {
    icon: Globe2,
    title: "Edge Networking & CDN",
    body: "Global content delivery with built-in DDoS protection. We route traffic through the closest edge nodes to your users for sub-millisecond latency.",
  },
  {
    icon: Database,
    title: "Managed Databases",
    body: "Postgres-grade reliability with automated backups, point-in-time recovery, and daily snapshots. No more late-night database migrations.",
  },
  {
    icon: Lock,
    title: "TLS / SSL Security",
    body: "Enterprise-grade SSL certificates auto-renewed. We enforce TLS 1.3, HSTS, and strict transport security across all your domains.",
  },
  {
    icon: Server,
    title: "Dedicated App Hosting",
    body: "High-performance Node.js, Python, or Go environments. We handle the containers, the load balancers, and the OS patching.",
  },
];

const comparisonData = [
  { feature: "Custom Development", trident: true, agency: true, hosting: false, freelancer: "Maybe" },
  { feature: "Hosting & Infrastructure", trident: true, agency: false, hosting: true, freelancer: true },
  { feature: "Security & TLS/SSL", trident: true, agency: false, hosting: "Partial", freelancer: "Partial" },
  { feature: "Ongoing Maintenance", trident: true, agency: false, hosting: false, freelancer: true },
  { feature: "Single Point of Contact", trident: true, agency: false, hosting: false, freelancer: false },
  { feature: "Formal SLAs (ZAR)", trident: true, agency: false, hosting: false, freelancer: false },
];

const serviceTiers = [
  {
    name: "Managed Hosting",
    subtitle: "Single system. Fully supported.",
    icon: Cloud,
    description: "For websites, small business applications and simple digital systems that need reliable, hands-off operation.",
    features: [
      "1 system operated by Trident",
      "Daily backups (14-day retention)",
      "SSL certificate (auto-renewed)",
      "Uptime monitoring (5-minute checks)",
      "Security patching (OS + application)",
      "Business-hours support (email & WhatsApp)",
      "Monthly health report"
    ],
  },
  {
    name: "Managed Infrastructure",
    subtitle: "Multiple systems. Greater control.",
    icon: Layers,
    featured: true,
    description: "For growing businesses with two or three digital systems that need proactive management and one point of accountability.",
    features: [
      "Up to 3 systems operated by Trident",
      "Daily backups (30-day retention)",
      "SSL + DNS management (all domains)",
      "Resource monitoring (CPU, RAM, disk)",
      "Security hardening (firewall, intrusion detection)",
      "Business-hours support with escalation",
      "Monthly operations review with recommendations"
    ],
  },
  {
    name: "Managed Operations",
    subtitle: "Your digital operations. Our full care.",
    icon: ShieldCheck,
    description: "For organisations where the entire digital operation depends on us. Multiple systems, custom backups and a genuine technical partnership.",
    features: [
      "Up to 5 systems (additional systems quoted)",
      "Daily backups and disaster recovery strategy",
      "24/7 automated monitoring (business-hours response)",
      "Advanced security audits and remediation",
      "Proactive performance optimisation",
      "Priority support (4-hour response target)",
      "Quarterly strategy review and capacity plan"
    ],
  },
  {
    name: "Enterprise / Custom",
    subtitle: "Complex needs. Dedicated team.",
    icon: Server,
    description: "For larger organisations, multi-location operations, compliance requirements or mission-critical systems requiring tailored SLAs.",
    features: [
      "Everything in Managed Operations, plus:",
      "Custom infrastructure architecture",
      "High availability and multi-region options",
      "Unlimited domains and environments",
      "Dedicated account manager",
      "Formal SLA for uptime and response",
      "POPIA and industry-specific compliance support"
    ],
  }
];

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

      {/* Core Services Grid */}
      <section className="section section-white">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">THE TRIDENT ADVANTAGE</span>
              <h2>The full house service.</h2>
              <p>
                Most businesses have to stitch together a Dev Agency, a Hosting Provider, and a Freelance SysAdmin. We do all three, natively.
              </p>
            </div>
          </Reveal>

          <m.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
            variants={staggerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {coreServices.map((service) => (
              <m.article
                key={service.title}
                className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
              >
                <div className="w-12 h-12 bg-[#0a1128] text-white rounded-lg flex items-center justify-center mb-6">
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#0a1128]">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.body}</p>
              </m.article>
            ))}
          </m.div>
        </div>
      </section>

      {/* The Comparison Chart (Brand Themed) */}
      <section className="section bg-white border-y border-gray-200">
        <div className="site-container max-w-5xl">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow text-[#E31837]">HEAD TO HEAD</span>
              <h2 className="text-[#0a1128]">Trident vs. The Fragmented Stack</h2>
              <p className="text-gray-600">
                When you hire separate agencies and hosts, things fall through the cracks. We take total responsibility.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 overflow-x-auto shadow-xl rounded-2xl border border-gray-200">
            <table className="w-full text-left border-collapse bg-white">
              <thead>
                <tr className="bg-[#0a1128] text-white">
                  <th className="py-5 px-6 font-semibold text-gray-300 w-1/4">Capability</th>
                  <th className="py-5 px-6 font-bold text-[#E31837] text-lg bg-[#152042] border-l border-gray-700">Trident</th>
                  <th className="py-5 px-6 font-semibold text-gray-300 border-l border-gray-700">Dev Agency</th>
                  <th className="py-5 px-6 font-semibold text-gray-300 border-l border-gray-700">Hosting Platform</th>
                  <th className="py-5 px-6 font-semibold text-gray-300 border-l border-gray-700">Freelancer</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr key={row.feature} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="py-4 px-6 text-sm font-medium text-[#0a1128] border-b border-gray-100">{row.feature}</td>
                    
                    <td className="py-4 px-6 border-b border-l border-gray-200 bg-orange-50">
                      {row.trident === true ? (
                        <div className="flex items-center gap-2 text-[#E31837] font-bold">
                          <Check className="w-5 h-5" /> Included
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">{row.trident}</span>
                      )}
                    </td>

                    <td className="py-4 px-6 border-b border-l border-gray-200 text-sm text-gray-500">
                      {row.agency === true ? <Check className="w-5 h-5 text-green-500" /> : row.agency === false ? <X className="w-5 h-5 text-red-400" /> : row.agency}
                    </td>

                    <td className="py-4 px-6 border-b border-l border-gray-200 text-sm text-gray-500">
                      {row.hosting === true ? <Check className="w-5 h-5 text-green-500" /> : row.hosting === false ? <X className="w-5 h-5 text-red-400" /> : row.hosting}
                    </td>

                    <td className="py-4 px-6 border-b border-l border-gray-200 text-sm text-gray-500">
                      {row.freelancer === true ? <Check className="w-5 h-5 text-green-500" /> : row.freelancer === false ? <X className="w-5 h-5 text-red-400" /> : row.freelancer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Service Tiers (No Prices) */}
      <section className="section section-white">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow">LEVELS OF RESPONSIBILITY</span>
              <h2>Choose your level of support.</h2>
              <p>We tailor the scope to your systems. Pricing is available on our pricing page.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {serviceTiers.map((tier) => (
              <Reveal key={tier.name} delay={0.1}>
                <div className={`bg-white rounded-2xl p-6 border h-full flex flex-col ${tier.featured ? 'border-[#E31837] shadow-xl relative' : 'border-gray-200 shadow-sm'}`}>
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E31837] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="w-10 h-10 bg-[#0a1128] text-white rounded-lg flex items-center justify-center mb-4">
                    <tier.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[#0a1128]">{tier.name}</h3>
                  <p className="text-[#E31837] text-xs font-semibold mb-3 uppercase tracking-wide">{tier.subtitle}</p>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{tier.description}</p>
                  
                  <ul className="space-y-3 mb-8 border-t border-gray-100 pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className={`w-full ${tier.featured ? 'bg-[#E31837] hover:bg-[#c44a12] text-white' : 'bg-gray-100 hover:bg-gray-200 text-[#0a1128]'}`}>
                    <Link to="/contact" search={{ plan: tier.name }}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal delay={0.2}>
            <div className="text-center mt-12">
              <Button asChild className="bg-[#0a1128] hover:bg-[#152042] text-white px-8 py-6 text-lg rounded-full">
                <Link to="/pricing">
                  View Pricing & Packages <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesFinalCTA />
    </main>
  );
}