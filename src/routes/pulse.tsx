import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap, Shield, Clock, Sparkles } from "lucide-react";
import { PageIntro, FinalCTA } from "@/components/SiteChrome";
import { PulsePricing } from "@/components/PulsePricing";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pulse")({
  head: () => ({
    meta: [
      { title: "Trident Pulse — Websites from R499/month | Trident Cloud" },
      { name: "description", content: "A monthly subscription for SMMEs. Professional website, hosting, domain, SSL, support — all handled by Trident Cloud from R499/month." },
      { property: "og:title", content: "Trident Pulse — Websites from R499/month" },
      { property: "og:description", content: "Everything your business needs online. One monthly price. Zero technical headaches." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PulsePage,
});

const benefits = [
  { icon: Zap, title: "Live in days, not months", body: "We handle everything from design to deployment. Your site is up and running in under two weeks." },
  { icon: Shield, title: "Always secure, always up", body: "SSL certificates, security patches, daily backups, uptime monitoring — all included by default." },
  { icon: Clock, title: "Real people, real support", body: "Business-hours support from real humans on WhatsApp and email. No ticket queues, no waiting." },
  { icon: Sparkles, title: "Grows with your business", body: "Upgrade tiers, add pages, add features anytime. No re-platforming, no rebuilds." },
];

const faqs = [
  ["What exactly is Trident Pulse?", "Pulse is our monthly subscription for small businesses that want a professional online presence without the technical overhead. You get a website, hosting, domain, SSL, support, and monthly content updates — all handled by us, all on one monthly price."],
  ["Why monthly instead of once-off?", "Two reasons: (1) It keeps upfront costs low so you can launch today. (2) It keeps us invested in your success — we handle updates, security, and support every month, so your site stays current."],
  ["Can I cancel at any time?", "You commit for the first 12 months (this covers the setup work). After that, you can cancel with 30 days' notice, or buy out the site entirely for a fixed fee."],
  ["What happens if I want to leave?", "You can buy out the site at any time for R5,000 (Starter) / R8,000 (Business) / R12,000 (Premium). This covers migrating you off our infrastructure with full ownership of the code and content."],
  ["What if I need something bigger later?", "Pulse is designed to grow with you. You can upgrade tiers anytime. When you outgrow Pulse, you can transition to our Build services — everything transfers cleanly."],
  ["Do you offer the domain?", "Yes. We register and manage a .co.za domain for you in the first year, free. After that, it's included in your subscription."],
  ["Can I use my existing domain?", "Absolutely. Point your existing domain to us and we'll handle the rest — no extra cost."],
    ["Is there a setup fee?", "No setup fee. Everything is covered by your monthly or annual subscription."],
  ["Is there a loyalty discount?", "Yes. If you stay on Pulse for 36 months, the full site — code, content, and domain — transfers to you at no cost. No buy-out fee. You own it outright."],
  ["What if I cancel before 12 months?", "You're committing to a 12-month minimum. If you need to cancel earlier, you can buy out the site at any time using our standard buy-out fees, and we'll migrate you off Trident infrastructure with full ownership."],
];

function PulsePage() {
  return (
    <main>
      <PageIntro
        eyebrow="TRIDENT PULSE"
        title="Everything your business needs online. One monthly price."
        description="A subscription for SMMEs who want a professional online presence — designed, deployed, and managed by Trident Cloud. From R499/month."
      />

      {/* Benefits */}
      <section className="section section-white">
        <div className="site-container">
          <div className="section-heading center">
            <span className="eyebrow">WHY PULSE</span>
            <h2>Skip the setup. Skip the headaches. Just launch.</h2>
            <p>Most small businesses need a website to be found. But between hosting, domains, SSL, email, design, updates — the technical side eats weeks of your time. Pulse removes all of that.</p>
          </div>

          <div className="pulse-benefits">
            {benefits.map((b, i) => (
              <div key={i} className="pulse-benefit">
                <div className="pulse-benefit-icon"><b.icon aria-hidden="true" /></div>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section section-muted" id="pricing">
  <div className="site-container">
    <div className="section-heading center">
      <span className="eyebrow">PRICING</span>
      <h2>Three plans. One monthly price. Everything included.</h2>
      <p>Choose your tier. Cancel anytime after the first 12 months. No hidden fees, no surprises.</p>
    </div>

    <div className="pulse-loyalty-note">
      <strong>Loyalty discount:</strong> Stay on Pulse for 36 months and the site transfers to you for free. No buy-out fee, no strings attached.
    </div>

    <PulsePricing />
  </div>
</section>

      {/* Pulse vs Once-Off Comparison */}
      <section className="section section-white">
        <div className="site-container">
          <div className="section-heading center">
            <span className="eyebrow">PULSE VS ONCE-OFF</span>
            <h2>Which is right for you?</h2>
            <p>Pulse is our subscription. Once-off is our traditional project model. Both give you full ownership and 12 months of hosting. The difference is upfront cost.</p>
          </div>

          <div className="pulse-compare">
            <div className="pulse-compare-card">
              <div className="pulse-compare-tag">PULSE SUBSCRIPTION</div>
              <h3>From R499/month</h3>
              <ul>
                <li><Check /> Lowest upfront cost</li>
                <li><Check /> Full hosting, domain, SSL, support included</li>
                <li><Check /> Perfect for launching fast</li>
                <li><Check /> Monthly content updates included</li>
                <li><Check /> Buy-out option available</li>
              </ul>
              <p className="pulse-compare-note">Best for: New businesses, tight budgets, quick launches.</p>
            </div>

            <div className="pulse-compare-card">
              <div className="pulse-compare-tag">ONCE-OFF PROJECT</div>
              <h3>From R8,500 once-off</h3>
              <ul>
                <li><Check /> You own the system outright</li>
                <li><Check /> No ongoing subscription (12 mo hosting included)</li>
                <li><Check /> Custom features, integrations</li>
                <li><Check /> Larger scope, longer timeline</li>
                <li><Check /> Traditional agency engagement</li>
              </ul>
              <p className="pulse-compare-note">Best for: Established businesses wanting full ownership.</p>
            </div>
          </div>

          <div className="pulse-compare-cta">
            <Button asChild className="btn btn-primary">
              <Link to="/build">Explore once-off services <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-muted">
        <div className="site-container">
          <div className="section-heading center">
            <span className="eyebrow">FAQ</span>
            <h2>Common questions</h2>
          </div>

          <div className="faq-list">
            {faqs.map(([q, a]) => (
              <details className="faq-item" key={q}>
                <summary>{q}<span aria-hidden="true">+</span></summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
    </main>
  );
}

// Re-export Check icon used in comparison section
import { Check } from "lucide-react";