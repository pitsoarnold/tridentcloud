import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Cloud, Server, ShieldCheck, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQAccordion } from "@/components/FAQAccordion";

const plans = [
  { name: "Managed Hosting", subtitle: "One system. Fully supported.", icon: Cloud, key: "hosting", description: "For websites, small business applications and simple digital systems that need reliable, hands-off operation.", monthly: "R850", annual: "R8,500", setup: "R1,500 one-time", features: ["1 system operated by Trident", "Daily backups (14-day retention)", "SSL certificate (auto-renewed)", "Uptime monitoring (5-minute checks)", "Security patching (OS + application)", "Business-hours support (email & WhatsApp)", "Monthly health report"] },
  { name: "Managed Infrastructure", subtitle: "Multiple systems. Greater control.", icon: Server, key: "infrastructure", description: "For growing businesses with two or three digital systems that need proactive management and one point of accountability.", monthly: "R2,200", annual: "R21,000", setup: "R2,500 one-time", features: ["Up to 3 systems operated by Trident", "Daily backups (30-day retention)", "SSL + DNS management (all domains)", "Resource monitoring (CPU, RAM, disk)", "Security hardening (firewall, intrusion detection)", "Business-hours support with escalation", "Monthly operations review with recommendations"] },
  { name: "Managed Operations", subtitle: "Your digital operations. Our full care.", icon: ShieldCheck, key: "operations", description: "For organisations where the entire digital operation depends on us. Multiple systems, custom backups and a genuine technical partnership.", monthly: "R5,500", annual: "R49,500", setup: "Custom, scoped per engagement", features: ["Up to 5 systems (additional systems +R700 each)", "Daily backups and disaster recovery strategy", "24/7 automated monitoring (business-hours response)", "Advanced security audits and remediation", "Proactive performance optimisation", "Priority support (4-hour response target)", "Quarterly strategy review and capacity plan"] },
  { name: "Enterprise / Custom", subtitle: "Complex needs. Dedicated team.", icon: Building2, key: "enterprise", description: "For larger organisations, multi-location operations, compliance requirements or mission-critical systems requiring tailored SLAs.", monthly: "Custom", annual: "Custom", setup: "Custom, scoped per engagement", features: ["Everything in Managed Operations, plus:", "Custom infrastructure architecture", "High availability and multi-region options", "Unlimited domains and environments", "Dedicated account manager", "Formal SLA for uptime and response", "POPIA and industry-specific compliance support", "24/7 support options available"] },
];

export function Pricing({ compact = false }: { compact?: boolean }) {
  const [annual, setAnnual] = useState(true);
  return <section className="section pricing-section" id="pricing">
    <div className="site-container">
      <div className="pricing-head">
        <div className="section-heading"><span className="eyebrow">OUR PRICING</span><h2>One technical partner. Four levels of responsibility.</h2><p>Every plan includes managed care, monitoring, backups and business-hours support. Choose the level that fits your systems.</p></div>
        <div className="billing-switch" role="group" aria-label="Billing period"><button type="button" className={!annual ? "active" : ""} aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button><button type="button" className={annual ? "active" : ""} aria-pressed={annual} onClick={() => setAnnual(true)}>Annual <span>· save up to 25%</span></button></div>
      </div>
      <div className="pricing-grid">{plans.map((plan) => <article className={`price-card ${plan.key} ${plan.key === "infrastructure" ? "popular" : ""}`} key={plan.name}>
        {plan.key === "infrastructure" && <span className="popular-badge">MOST POPULAR</span>}
        <div className="price-band"><plan.icon aria-hidden="true"/><div><h3>{plan.name}</h3><small>{plan.subtitle}</small></div></div>
        <div className="price-body"><p className="price-desc">{plan.description}</p><div className="price-value">{annual ? plan.annual : plan.monthly}{plan.key !== "enterprise" && <span> /{annual ? "year" : "month"}</span>}</div><p className="price-note">{plan.key === "enterprise" ? "Tailored to your requirements" : "Excl. VAT"}</p><p className="setup">Setup fee: {plan.setup}</p><span className="feature-label">INCLUDES</span><ul className="feature-list">{plan.features.map((feature) => <li key={feature}><Check aria-hidden="true"/>{feature}</li>)}</ul><Button asChild className={`btn ${plan.key === "enterprise" ? "btn-violet" : plan.key === "operations" ? "btn-navy" : "btn-blue"}`}><Link to="/contact" search={{ plan: plan.name }}>{plan.key === "enterprise" ? "Talk to our team" : "Get started"}<ArrowRight/></Link></Button></div>
      </article>)}</div>
      <p className="pricing-footnote">Annual plans are billed upfront. Prices exclude VAT. Setup fees apply separately. Additional systems and custom requirements are scoped with your team.</p>
      {!compact && <div className="mt-8 text-center"><Button asChild variant="link"><Link to="/pricing">Explore all pricing details <ArrowRight/></Link></Button></div>}
    </div>
  </section>;
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