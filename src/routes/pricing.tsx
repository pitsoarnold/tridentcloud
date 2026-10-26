import { createFileRoute, Link } from "@tanstack/react-router";
import { m, type Variants } from "motion/react";
import { 
  ArrowRight, 
  Check, 
  Cloud, 
  Server, 
  ShieldCheck, 
  Building2, 
  Rocket,
  Zap,
  Lock,
  TrendingUp
} from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FinalCTA } from "@/components/SiteChrome";

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

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing & Packages | Trident Cloud Services" },
      {
        name: "description",
        content:
          "Transparent ZAR pricing for custom builds, managed hosting, and enterprise infrastructure. Bundled packages with free first-year hosting.",
      },
      { property: "og:title", content: "Pricing & Packages | Trident Cloud Services" },
      {
        property: "og:description",
        content: "One technical partner. Transparent pricing for every level of responsibility.",
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
    <section className="page-intro pricing-page-intro relative bg-[#0a1128] overflow-hidden">
      <div className="absolute inset-0 bg-[url('/services-hero.jpg')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1128]/80 to-[#0a1128]"></div>
      <div className="site-container pricing-intro-content relative z-10">
        <m.span
          className="eyebrow text-[#E31837]"
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          PRICING & PACKAGES
        </m.span>
        <m.h1
          className="text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <m.span className="hero-title-line" variants={titleLineVariants}>
            One technical partner.
          </m.span>
          <m.span className="hero-title-line" variants={titleLineVariants}>
            Transparent pricing.
          </m.span>
        </m.h1>
        <m.p
          className="text-gray-300"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          From one essential website to complex digital operations. Choose a starting point, and we'll confirm the scope together before any work begins.
        </m.p>
      </div>
    </section>
  );
}

const buildPackages = [
  {
    name: "Trident Built",
    subtitle: "Custom Build + 1st Year FREE Hosting",
    icon: Rocket,
    price: "R15,000",
    period: "once-off",
    renewal: "Renews at R2,990/yr from Year 2",
    badge: "Most Popular",
    features: [
      "Custom Website / Web App Build",
      "1 Year FREE Managed Hosting",
      "Domain & SSL Included",
      "2 hours/month content updates",
      "Daily backups & uptime monitoring",
      "Priority WhatsApp & Email support"
    ],
    cta: "Get a Quote (Includes Free Hosting)",
    link: "/contact",
    search: { plan: "Trident Built - Growth Package" },
    color: "border-[#E31837]",
    buttonColor: "bg-[#E31837] hover:bg-[#c44a12] text-white"
  }
];

const hostingTiers = [
  {
    name: "Managed Hosting",
    subtitle: "Single system. Fully supported.",
    icon: Cloud,
    price: "R3,990",
    period: "/year",
    features: [
      "1 system operated by Trident",
      "Daily backups (14-day retention)",
      "SSL certificate (auto-renewed)",
      "Uptime monitoring (5-minute checks)",
      "Security patching (OS + application)",
      "Business-hours support (email & WhatsApp)",
    ],
    cta: "Get Started",
    link: "/contact",
    search: { plan: "Managed Hosting" },
    color: "border-gray-200",
    buttonColor: "bg-[#0a1128] hover:bg-[#152042] text-white"
  },
  {
    name: "Managed Infrastructure",
    subtitle: "Multiple systems. Greater control.",
    icon: Server,
    price: "R21,000",
    period: "/year",
    features: [
      "Up to 3 systems operated by Trident",
      "Daily backups (30-day retention)",
      "SSL + DNS management (all domains)",
      "Resource monitoring (CPU, RAM, disk)",
      "Security hardening (firewall, IDS)",
      "Monthly operations review",
    ],
    cta: "Get Started",
    link: "/contact",
    search: { plan: "Managed Infrastructure" },
    color: "border-[#0a1128]",
    buttonColor: "bg-[#0a1128] hover:bg-[#152042] text-white",
    featured: true
  },
  {
    name: "Managed Operations",
    subtitle: "Your digital operations. Our full care.",
    icon: ShieldCheck,
    price: "R49,500",
    period: "/year",
    features: [
      "Up to 5 systems (additional +R7k)",
      "Disaster recovery strategy",
      "24/7 automated monitoring",
      "Advanced security audits",
      "Proactive performance optimisation",
      "Priority support (4-hour response)",
    ],
    cta: "Get Started",
    link: "/contact",
    search: { plan: "Managed Operations" },
    color: "border-gray-200",
    buttonColor: "bg-[#0a1128] hover:bg-[#152042] text-white"
  },
  {
    name: "Enterprise / Custom",
    subtitle: "Complex needs. Dedicated team.",
    icon: Building2,
    price: "Custom",
    period: "scoped",
    features: [
      "Unlimited sites & environments",
      "Custom infrastructure architecture",
      "High availability and multi-region",
      "Formal SLA for uptime and response",
      "POPIA and industry compliance",
      "Dedicated account manager",
    ],
    cta: "Talk to our team",
    link: "/contact",
    search: { plan: "Enterprise" },
    color: "border-gray-200",
    buttonColor: "bg-gray-100 hover:bg-gray-200 text-[#0a1128]"
  }
];

const subscriptions = [
  {
    name: "Maintenance Retainer",
    icon: Zap,
    price: "R2,500",
    period: "/month",
    description: "Ongoing development, SEO, and feature additions for your platform.",
    features: ["10 hours of dev time", "SEO monitoring", "Priority feature requests", "Monthly reporting"],
  },
  {
    name: "Compliance & Security",
    icon: Lock,
    price: "R1,500",
    period: "/month",
    description: "For POPIA compliance, vulnerability scanning, and security audits.",
    features: ["Monthly vuln scans", "POPIA compliance docs", "Incident response", "Staging environment"],
  },
  {
    name: "Growth & Strategy",
    icon: TrendingUp,
    price: "Custom",
    period: "/month",
    description: "Quarterly reviews, capacity planning, and CTO-level advisory.",
    features: ["Quarterly strategy", "Budget planning", "Architecture reviews", "Tech due diligence"],
  }
];

function PricingPage() {
  return (
    <main className="pricing-page bg-gray-50">
      <PricingIntro />

      {/* Custom Builds Section */}
      <section className="section bg-white">
        <div className="site-container max-w-4xl">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow text-[#E31837]">CUSTOM BUILDS</span>
              <h2 className="text-[#0a1128]">Start with a new build.</h2>
              <p className="text-gray-600">
                When we build your system, we bundle the first year of hosting for free.
              </p>
            </div>
          </Reveal>

          <div className="mt-12">
            {buildPackages.map((pkg) => (
              <Reveal key={pkg.name} delay={0.1}>
                <div className={`bg-white rounded-2xl p-8 border-2 ${pkg.color} shadow-xl relative overflow-hidden flex flex-col md:flex-row gap-8`}>
                  <div className="absolute top-0 right-0 bg-[#E31837] text-white px-6 py-2 rounded-bl-xl font-bold tracking-wide text-sm">
                    {pkg.badge}
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="w-12 h-12 bg-[#0a1128] text-white rounded-lg flex items-center justify-center mb-6">
                      <pkg.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0a1128] mb-1">{pkg.name}</h3>
                    <p className="text-[#E31837] font-medium mb-6">{pkg.subtitle}</p>
                    
                    <div className="mb-6">
                      <span className="text-5xl font-extrabold text-[#0a1128]">{pkg.price}</span>
                      <span className="text-gray-500 ml-2">{pkg.period}</span>
                      <p className="text-sm text-gray-500 mt-2">{pkg.renewal}</p>
                    </div>

                    <Button asChild className={`w-full ${pkg.buttonColor} py-6 text-lg rounded-xl`}>
                      <Link to={pkg.link} search={pkg.search}>
                        {pkg.cta} <ArrowRight className="ml-2 w-5 h-5" />
                      </Link>
                    </Button>
                  </div>

                  <div className="md:w-1/2 bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <h4 className="font-bold text-[#0a1128] mb-4 text-sm uppercase tracking-wider">What's Included</h4>
                    <ul className="space-y-3">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#E31837] shrink-0" />
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hosting Packages Section */}
      <section className="section bg-[#f8fafc]">
        <div className="site-container">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow text-[#0a1128]">HOSTING PACKAGES</span>
              <h2 className="text-[#0a1128]">For existing systems.</h2>
              <p className="text-gray-600">
                Already have a website or app? We'll take over the hosting, security, and maintenance.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 items-stretch">
            {hostingTiers.map((tier) => (
              <Reveal key={tier.name} delay={0.1}>
                <div className={`bg-white rounded-2xl p-6 border ${tier.color} h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow relative`}>
                  {tier.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a1128] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="w-10 h-10 bg-gray-100 text-[#0a1128] rounded-lg flex items-center justify-center mb-4">
                    <tier.icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold mb-1 text-[#0a1128]">{tier.name}</h3>
                  <p className="text-[#E31837] text-xs font-semibold mb-4 uppercase tracking-wide">{tier.subtitle}</p>
                  
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-[#0a1128]">{tier.price}</span>
                    <span className="text-gray-500 text-sm">{tier.period}</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 flex-grow border-t border-gray-100 pt-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className={`w-full ${tier.buttonColor}`}>
                    <Link to={tier.link} search={tier.search}>
                      {tier.cta}
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Subscriptions Section */}
      <section className="section bg-white border-t border-gray-200">
        <div className="site-container max-w-5xl">
          <Reveal>
            <div className="section-heading center">
              <span className="eyebrow text-[#E31837]">RETAINERS & SUBSCRIPTIONS</span>
              <h2 className="text-[#0a1128]">Continuous growth & maintenance.</h2>
              <p className="text-gray-600">
                Beyond hosting, we offer monthly retainers for active development, security compliance, and strategic advisory.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {subscriptions.map((sub) => (
              <Reveal key={sub.name} delay={0.1}>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-full flex flex-col">
                  <div className="w-10 h-10 bg-white text-[#E31837] border border-gray-200 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <sub.icon size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-[#0a1128] mb-2">{sub.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-[#0a1128]">{sub.price}</span>
                    <span className="text-gray-500 text-sm">{sub.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-6 flex-grow">{sub.description}</p>
                  <ul className="space-y-2 mb-6">
                    {sub.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E31837]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full bg-[#0a1128] hover:bg-[#152042] text-white mt-auto">
                    <Link to="/contact" search={{ plan: sub.name }}>
                      Inquire
                    </Link>
                  </Button>
                </div>
              </Reveal>
            ))}
          </div>
          
          <Reveal delay={0.2}>
            <p className="text-center text-sm text-gray-500 mt-8">
              All prices exclude VAT. Setup fees may apply for migration or onboarding. 
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}