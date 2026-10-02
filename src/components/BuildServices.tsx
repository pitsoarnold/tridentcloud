import { useState } from "react";
import { ArrowRight, Globe, Monitor, Layout, Building2, Database, X, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

type Tier = {
  name: string;
  price: string;
  delivery: string;
  featured?: boolean;
  features: string[];
};

type Service = {
  id: string;
  icon: typeof Globe;
  title: string;
  tagline: string;
  description: string;
  tiers: Tier[];
};

const services: Service[] = [
  {
    id: "website",
    icon: Globe,
    title: "Website Development",
    tagline: "Websites that convert visitors into customers.",
    description: "From brochures to full e-commerce — a website that looks professional, loads fast, and works on every device.",
    tiers: [
      {
        name: "Starter",
        price: "R8,500",
        delivery: "2-3 weeks",
        features: ["Up to 5 pages", "Mobile-responsive", "Contact form + WhatsApp", "Basic SEO setup", "Google Analytics", "12 months hosting included"],
      },
      {
        name: "Business",
        price: "R18,000",
        delivery: "4-6 weeks",
        featured: true,
        features: ["Up to 15 pages", "CMS (edit content yourself)", "Blog + news section", "Advanced SEO", "Form submissions dashboard", "E-commerce ready", "12 months hosting included"],
      },
      {
        name: "Premium",
        price: "R38,000+",
        delivery: "8-12 weeks",
        features: ["Unlimited pages", "Custom design system", "Full e-commerce", "Multi-language", "Third-party integrations", "Bookings / memberships", "12 months hosting included"],
      },
    ],
  },
  {
    id: "web-app",
    icon: Layout,
    title: "Web Applications",
    tagline: "Custom software for the way your business actually works.",
    description: "Dashboards, portals, internal tools, booking systems — purpose-built web apps that solve real operational problems.",
    tiers: [
      {
        name: "MVP",
        price: "R35,000",
        delivery: "5-7 weeks",
        features: ["User authentication", "Core dashboard", "1-3 key features", "Admin panel", "Supabase backend", "Basic analytics", "12 months hosting included"],
      },
      {
        name: "Business",
        price: "R85,000",
        delivery: "10-14 weeks",
        featured: true,
        features: ["Multi-role accounts", "5-10 core features", "Third-party integrations", "Advanced reporting", "Email + WhatsApp notifications", "Custom admin panel", "12 months hosting included"],
      },
      {
        name: "Platform",
        price: "R180,000+",
        delivery: "16-24 weeks",
        features: ["Multi-tenant", "SaaS-ready architecture", "Advanced workflows", "API for external systems", "Custom infrastructure", "Team training", "12 months hosting included"],
      },
    ],
  },
  {
    id: "desktop",
    icon: Monitor,
    title: "Desktop Applications",
    tagline: "Powerful tools, running where your team works.",
    description: "Windows/Mac applications for teams that need offline capability, local processing, or dedicated workflows.",
    tiers: [
      {
        name: "Basic",
        price: "R65,000",
        delivery: "6-9 weeks",
        features: ["Single-PC installation", "Core features", "Local data storage", "Simple reports", "1 desktop install", "Team training", "12 months hosting included"],
      },
      {
        name: "Business",
        price: "R140,000",
        delivery: "12-16 weeks",
        featured: true,
        features: ["Multi-PC sync", "Cloud backend", "Role-based access", "Real-time updates", "Advanced reports", "Up to 10 installs", "12 months hosting included"],
      },
      {
        name: "Enterprise",
        price: "R300,000+",
        delivery: "18-28 weeks",
        features: ["Offline-first", "Complex workflows", "Legacy system integration", "Unlimited installs", "Custom SLAs", "On-site training", "12 months hosting included"],
      },
    ],
  },
  {
    id: "enterprise",
    icon: Building2,
    title: "Enterprise Systems",
    tagline: "Replace the maze with a system that fits.",
    description: "Custom internal systems, integrations, or platforms that replace the chaos of spreadsheets, emails, and disconnected tools.",
    tiers: [
      {
        name: "Integration",
        price: "R120,000",
        delivery: "8-14 weeks",
        features: ["Connect existing tools", "Data migration", "API integrations", "Staff training", "Documentation", "Support retainer available", "12 months hosting included"],
      },
      {
        name: "System Build",
        price: "R280,000",
        delivery: "16-24 weeks",
        featured: true,
        features: ["Custom internal system", "Multi-department", "Advanced permissions", "Custom reporting", "Migration from legacy", "On-site training", "12 months hosting included"],
      },
      {
        name: "Platform",
        price: "R600,000+",
        delivery: "24-40 weeks",
        features: ["Multi-location", "Multi-entity", "Complex workflows", "Custom SLAs", "Dedicated team", "24/7 support option", "12 months hosting included"],
      },
    ],
  },
  {
    id: "erp",
    icon: Database,
    title: "ERP Solutions",
    tagline: "One platform. Every department. Total visibility.",
    description: "Enterprise Resource Planning systems that connect finance, inventory, HR, and operations into a single source of truth.",
    tiers: [
      {
        name: "Small Business",
        price: "R150,000",
        delivery: "10-16 weeks",
        features: ["Core modules", "Inventory + invoicing", "Basic HR", "Standard reports", "5-user licenses", "Staff training", "12 months hosting included"],
      },
      {
        name: "Mid-Market",
        price: "R450,000",
        delivery: "20-30 weeks",
        featured: true,
        features: ["Full module suite", "Custom workflows", "Multi-currency", "Integrations", "Advanced reporting", "25-user licenses", "12 months hosting included"],
      },
      {
        name: "Enterprise",
        price: "R1.5M+",
        delivery: "32-52 weeks",
        features: ["Multi-entity / multi-location", "Custom modules", "Full compliance", "Legacy migration", "Dedicated team", "Unlimited users", "24/7 support"],
      },
    ],
  },
];

const paymentPlans = [
  { name: "Standard", detail: "50% upfront, 50% on delivery", recommended: true },
  { name: "Milestone", detail: "3 × 33% (kickoff, mid, delivery)" },
  { name: "Subscription", detail: "Monthly × 24 months (small premium)" },
];

export function BuildServices() {
  const [openService, setOpenService] = useState<Service | null>(null);
  const [plan, setPlan] = useState("Standard");

  return (
    <>
      <section className="section section-white">
        <div className="site-container">
          <div className="section-heading center">
            <span className="eyebrow">WHAT WE BUILD</span>
            <h2>From first sketch to final scale.</h2>
            <p>Five disciplines. One team. Whether you need a website, an app, or an enterprise system — we build it, deploy it on our infrastructure, and run it with you.</p>
          </div>

          <div className="build-grid">
            {services.map((s) => (
              <article key={s.id} className="build-card">
                <div className="build-icon">
                  <s.icon aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p className="build-tagline">{s.tagline}</p>
                <p className="build-desc">{s.description}</p>
                <button className="build-cta" onClick={() => { setOpenService(s); setPlan("Standard"); }}>
                  View pricing <ArrowRight />
                </button>
              </article>
            ))}
          </div>

          <div className="build-note">
            <Sparkles />
            <p><strong>Every project includes:</strong> 12 months of Managed Hosting · 90-day post-launch support · Full source code ownership · POPIA-compliant by default · Team training · Option to migrate off Trident anytime.</p>
          </div>

          <div className="build-cta-row">
            <Button asChild className="btn btn-primary"><Link to="/contact" search={{}}>Start a project <ArrowRight /></Link></Button>
            <Button asChild className="btn btn-outline-dark"><Link to="/contact" search={{}}>Book a discovery call</Link></Button>
          </div>
        </div>
      </section>

      {openService && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setOpenService(null)}>
          <div className="modal build-modal">
            <div className="modal-header">
              <div className="build-modal-head">
                <div className="build-icon build-icon-lg"><openService.icon aria-hidden="true" /></div>
                <div>
                  <span className="eyebrow">{openService.tagline}</span>
                  <h2>{openService.title}</h2>
                </div>
              </div>
              <button className="modal-close" onClick={() => setOpenService(null)} aria-label="Close"><X /></button>
            </div>

            <div className="modal-body">
              <p className="build-modal-desc">{openService.description}</p>

              <div className="tier-grid">
                {openService.tiers.map((t) => (
                  <div key={t.name} className={`tier ${t.featured ? "featured" : ""}`}>
                    {t.featured && <span className="tier-badge">RECOMMENDED</span>}
                    <div className="tier-name">{t.name}</div>
                    <div className="tier-price">{t.price}</div>
                    <div className="tier-delivery">{t.delivery}</div>
                    <ul className="tier-features">
                      {t.features.map((f) => (
                        <li key={f}><Check /> {f}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="payment-plans">
                <h4>Payment options</h4>
                <div className="plan-row">
                  {paymentPlans.map((p) => (
                    <button
                      key={p.name}
                      className={`plan-btn ${plan === p.name ? "active" : ""}`}
                      onClick={() => setPlan(p.name)}
                    >
                      <strong>{p.name}</strong>
                      <span>{p.detail}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="build-modal-cta">
                <Button asChild className="btn btn-primary"><Link to="/contact" search={{ plan: openService.title }}>Start this project <ArrowRight /></Link></Button>
                <Button asChild className="btn btn-outline-dark"><a href="https://wa.me/26662068252" target="_blank" rel="noreferrer">WhatsApp us</a></Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="section section-muted">
        <div className="site-container">
          <div className="section-heading center">
            <span className="eyebrow">NOT READY FOR A PROJECT?</span>
            <h2>Start with Trident Pulse.</h2>
            <p>A monthly subscription for SMMEs who want a professional online presence — hosted, secured, and managed by us. From R499/month.</p>
          </div>
          <div className="build-cta-row">
            <Button asChild className="btn btn-primary"><Link to="/pricing">See Pulse pricing <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}