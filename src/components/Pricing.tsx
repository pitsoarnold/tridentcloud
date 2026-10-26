import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Cloud, Server, ShieldCheck, Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";

const plans = [
  {
    name: "Trident Built",
    subtitle: "Custom build + 1st Year FREE Hosting",
    icon: Rocket,
    key: "growth",
    description: "A premium, custom-built website or web app. Includes your first year of managed hosting, domain, SSL, and 2 hours of content updates per month.",
    onceOff: "R15,000",
    annual: "R2,990",
    monthly: "R299",
    setup: "None",
    features: [
      "Custom Website / Web App Build",
      "1 Year FREE Managed Hosting",
      "Domain & SSL Included",
      "2 hours/month content updates",
      "Daily backups & uptime monitoring",
      "Priority WhatsApp & Email support"
    ],
    badge: "1st Year Hosting FREE",
  },
  {
    name: "Managed Hosting",
    subtitle: "For existing websites",
    icon: Server,
    key: "hosting",
    description: "Bulletproof hosting and operations for businesses who built their site elsewhere but need reliable, managed infrastructure.",
    onceOff: null,
    annual: "R3,990",
    monthly: "R399",
    setup: "R1,500 one-time",
    features: [
      "20GB SSD Storage",
      "Managed Database & Staging",
      "Daily backups (30-day retention)",
      "SSL certificate (auto-renewed)",
      "Uptime monitoring (5-min checks)",
      "Business-hours support"
    ],
    badge: "Price Anchor",
  },
  {
    name: "Enterprise & Scale",
    subtitle: "Mission-critical infrastructure",
    icon: Building2,
    key: "enterprise",
    description: "For larger organisations, tracking servers (like OrbitVision), POPIA compliance requirements, and mission-critical systems requiring tailored SLAs.",
    onceOff: null,
    annual: "R29,990",
    monthly: "R2,999",
    setup: "Custom, scoped per engagement",
    features: [
      "Unlimited sites & tracking servers",
      "Dedicated POPIA compliance alerts",
      "24/7 automated monitoring",
      "Priority support (4-hour response)",
      "Quarterly strategy & capacity plans",
      "Custom SLA agreements"
    ],
    badge: "High-Ticket",
  },
];

export function Pricing({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="section pricing-section" id="pricing">
      <div className="site-container">
        <div className="pricing-head">
          <div className="section-heading">
            <span className="eyebrow">OUR PRICING</span>
            <h2>One technical partner. Built for growth.</h2>
            <p>Every plan includes managed care, monitoring, backups and business-hours support. Choose the level that fits your systems.</p>
          </div>
          <div className="billing-switch" role="group" aria-label="Billing period">
            <button type="button" className={!annual ? "active" : ""} aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
            <button type="button" className={annual ? "active" : ""} aria-pressed={annual} onClick={() => setAnnual(true)}>Annual <span>· save up to 25%</span></button>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            // The Trident Built card has a special layout for the once-off price
            const isGrowth = plan.key === "growth";
            
            return (
              <article className={`price-card ${plan.key} ${isGrowth ? "popular border-2 border-[#E31837]" : ""}`} key={plan.name}>
                {isGrowth && (
                  <span className="popular-badge bg-[#E31837] text-white font-bold text-xs uppercase tracking-widest">
                    {plan.badge}
                  </span>
                )}
                
                <div className="price-band">
                  <plan.icon aria-hidden="true" />
                  <div>
                    <h3>{plan.name}</h3>
                    <small>{plan.subtitle}</small>
                  </div>
                </div>

                <div className="price-body">
                  <p className="price-desc">{plan.description}</p>
                  
                  {isGrowth ? (
                    <div className="mb-4">
                      <div className="price-value">{plan.onceOff} <span className="text-sm font-normal text-gray-500">once-off</span></div>
                      <p className="text-sm font-medium text-[#E31837] mt-2">
                        Then {annual ? plan.annual : plan.monthly} /{annual ? "year" : "month"} from Year 2
                      </p>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="price-value">
                        {annual ? plan.annual : plan.monthly} 
                        <span> /{annual ? "year" : "month"}</span>
                      </div>
                      <p className="price-note">Excl. VAT</p>
                      <p className="setup">Setup fee: {plan.setup}</p>
                    </div>
                  )}

                  <span className="feature-label">INCLUDES</span>
                  <ul className="feature-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Check aria-hidden="true" className={isGrowth ? "text-[#E31837]" : ""} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    className={`btn ${isGrowth ? "bg-[#E31837] hover:bg-[#c44a12] text-white" : plan.key === "enterprise" ? "btn-violet" : "btn-blue"}`}
                  >
                    <Link to="/contact" search={{ plan: plan.name }}>
                      {plan.key === "enterprise" ? "Talk to our team" : "Get started"}
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </article>
            );
          })}
        </div>

        <p className="pricing-footnote mt-8 text-center text-sm text-gray-500">
          Annual plans are billed upfront. Prices exclude VAT. Setup fees apply separately. Additional systems and custom requirements are scoped with your team.
        </p>
        {!compact && (
          <div className="mt-8 text-center">
            <Button asChild variant="link">
              <Link to="/pricing">Explore all pricing details <ArrowRight /></Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export const pricingFaq = [
  ["What does “managed” actually mean?", "We handle the technical work behind your systems: setup, monitoring, updates, backups and incident response, according to the scope of your plan."],
  ["What happens if my site goes down at 2am?", "Automated monitoring runs around the clock. Standard plans include business-hours response; 24/7 support options can be arranged for Enterprise clients."],
  ["Can I migrate from my current host?", "Yes. We'll review your current setup, plan the move and agree on a migration approach before changing anything."],
  ["Do you support POPIA compliance?", "We can support the infrastructure and security aspects of your POPIA programme. Legal compliance remains your organisation's responsibility."],
  ["Can I change plans later?", "Yes. We can review your systems and adjust your level of managed service as your requirements change."],
  ["What's not included?", "New application development, third-party licences and requirements outside the agreed scope are quoted separately. We'll clarify these before work begins."],
  ["How do I get started?", "Send us a short description of your systems. We'll arrange a conversation and recommend a suitable plan and scope."],
];

export function FAQ() {
  const faqs = pricingFaq.map(([q, a]) => ({ q, a }));
  return (
    <section className="section section-muted">
      <div className="site-container">
        <div className="section-heading center">
          <span className="eyebrow">COMMON QUESTIONS</span>
          <h2>Clear answers, from the start.</h2>
        </div>
        <FAQAccordion faqs={faqs} />
      </div>
    </section>
  );
}