import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Zap, Rocket, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    id: "starter",
    name: "Pulse Starter",
    icon: Zap,
    tagline: "Get online. Look professional.",
    ideal: "New businesses, sole traders, side hustles",
    monthly: "R499",
    annual: "R4,990",
    annualSavings: "Save R998",
    features: [
      "1-page professional website",
      "Free .co.za domain (first year)",
      "Hosting on Trident infrastructure",
      "SSL certificate (auto-renewed)",
      "WhatsApp click-to-chat button",
      "Contact form",
      "Business email setup (1 address)",
      "POPIA-compliant by default",
      "Business-hours support",
      "Cancel after 12 months",
    ],
  },
  {
    id: "business",
    name: "Pulse Business",
    icon: Rocket,
    featured: true,
    tagline: "Grow. Get found. Get customers.",
    ideal: "Growing SMMEs, established small businesses",
    monthly: "R899",
    annual: "R8,990",
    annualSavings: "Save R1,798",
    features: [
      "Up to 5-page website",
      "Free .co.za domain (first year)",
      "Hosting on Trident infrastructure",
      "SSL certificate (auto-renewed)",
      "WhatsApp + contact form + bookings",
      "Blog / news section",
      "Advanced SEO setup",
      "Google Analytics + Search Console",
      "Monthly content updates (2 hours)",
      "Business email setup (3 addresses)",
      "Form submissions dashboard",
      "Monthly health report",
      "Business-hours support",
      "Cancel after 12 months",
    ],
  },
  {
    id: "premium",
    name: "Pulse Premium",
    icon: Crown,
    tagline: "Full presence. Full growth.",
    ideal: "Serious SMMEs ready to scale",
    monthly: "R1,499",
    annual: "R14,990",
    annualSavings: "Save R2,998",
    features: [
      "Up to 10-page website",
      "Free .co.za domain (first year)",
      "Hosting on Trident infrastructure",
      "SSL certificate (auto-renewed)",
      "E-commerce ready",
      "Bookings / appointment system",
      "Blog / news section",
      "Full SEO + Google Business Profile",
      "Google Analytics + Search Console",
      "Monthly content updates (5 hours)",
      "Business email setup (5 addresses)",
      "Admin dashboard (view submissions)",
      "Quarterly strategy call",
      "Priority support",
      "Cancel after 12 months",
    ],
  },
];

const alwaysIncluded = [
  "Full ownership — no lock-in, cancel anytime after 12 months",
  "90-day post-launch support on every plan",
  "Deployed on Trident Cloud infrastructure",
  "POPIA-compliant data handling",
  "Option to migrate off Trident anytime",
  "ZAR pricing, SA support hours",
];

export function PulsePricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <>
      {/* Billing toggle */}
      <div className="pulse-toggle-wrap">
        <div className="billing-switch" role="group" aria-label="Billing period">
          <button
            type="button"
            className={!annual ? "active" : ""}
            aria-pressed={!annual}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={annual ? "active" : ""}
            aria-pressed={annual}
            onClick={() => setAnnual(true)}
          >
            Annual <span>· save 17%</span>
          </button>
        </div>
      </div>

      {/* Pricing grid */}
      <div className="pulse-grid">
        {tiers.map((t) => (
          <article key={t.id} className={`pulse-card ${t.featured ? "featured" : ""}`}>
            {t.featured && <span className="pulse-badge">MOST POPULAR</span>}

            <div className="pulse-icon">
              <t.icon aria-hidden="true" />
            </div>

            <h3 className="pulse-name">{t.name}</h3>
            <p className="pulse-tagline">{t.tagline}</p>

            <div className="pulse-price">
              <span className="pulse-amount">{annual ? t.annual : t.monthly}</span>
              <span className="pulse-period">{annual ? " / year" : " / month"}</span>
            </div>
            {annual && <div className="pulse-savings">{t.annualSavings}</div>}
            <p className="pulse-ideal">Ideal for: {t.ideal}</p>

            <ul className="pulse-features">
              {t.features.map((f) => (
                <li key={f}>
                  <Check /> {f}
                </li>
              ))}
            </ul>

            <Button asChild className="btn btn-primary pulse-cta">
              <Link to="/contact" search={{ service: "Trident Pulse", tier: t.name }}>
                Get started <ArrowRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>

      {/* Always included */}
      <div className="pulse-included">
        <h4>Always included with Trident Pulse</h4>
        <ul>
          {alwaysIncluded.map((f) => (
            <li key={f}>
              <Check /> {f}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
