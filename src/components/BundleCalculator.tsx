import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─────────────────────────────────────────────────────────────
   Service + tier data — mirrors the /build page structure
   ───────────────────────────────────────────────────────────── */
type Tier = {
  name: string;
  price: number; // Rands
  featured?: boolean;
};

type ServiceOption = {
  id: string;
  name: string;
  shortName: string;
  tiers: Tier[];
};

const services: ServiceOption[] = [
  {
    id: "website",
    name: "Website Development",
    shortName: "Website",
    tiers: [
      { name: "Starter", price: 8500 },
      { name: "Business", price: 18000, featured: true },
      { name: "Premium", price: 38000 },
    ],
  },
  {
    id: "web-app",
    name: "Web Applications",
    shortName: "Web App",
    tiers: [
      { name: "MVP", price: 35000 },
      { name: "Business", price: 85000, featured: true },
      { name: "Platform", price: 180000 },
    ],
  },
  {
    id: "desktop",
    name: "Desktop Applications",
    shortName: "Desktop App",
    tiers: [
      { name: "Basic", price: 65000 },
      { name: "Business", price: 140000, featured: true },
      { name: "Enterprise", price: 300000 },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Systems",
    shortName: "Enterprise System",
    tiers: [
      { name: "Integration", price: 120000 },
      { name: "System Build", price: 280000, featured: true },
      { name: "Platform", price: 600000 },
    ],
  },
  {
    id: "erp",
    name: "ERP Solutions",
    shortName: "ERP",
    tiers: [
      { name: "Small Business", price: 150000 },
      { name: "Mid-Market", price: 450000, featured: true },
      { name: "Enterprise", price: 1500000 },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────
   Add-ons — optional extras that add to the base price
   ───────────────────────────────────────────────────────────── */
type AddOn = {
  id: string;
  label: string;
  description: string;
  price: number;
};

const addOns: AddOn[] = [
  { id: "extra-hosting", label: "Extra year of Managed Hosting", description: "Additional 12 months on top of the standard year", price: 10200 },
  { id: "priority-support", label: "Priority support upgrade", description: "4-hour response during business hours + escalation line", price: 5000 },
  { id: "team-training", label: "On-site team training", description: "Half-day training session for your team", price: 2500 },
  { id: "extended-warranty", label: "Extended warranty (24 months)", description: "24-month post-launch support extension", price: 8000 },
];

/* ─────────────────────────────────────────────────────────────
   Formatting + math helpers
   ───────────────────────────────────────────────────────────── */
function formatR(n: number): string {
  return "R" + Math.round(n).toLocaleString("en-ZA");
}

const SUBSCRIPTION_PREMIUM = 0.15; // 15% financing premium
const SUBSCRIPTION_MONTHS = 24;

/* ─────────────────────────────────────────────────────────────
   Main component
   ───────────────────────────────────────────────────────────── */
export function BundleCalculator() {
  const [serviceId, setServiceId] = useState<string>("website");
  const [tierName, setTierName] = useState<string>("Business");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const currentService = services.find((s) => s.id === serviceId) ?? services[0];

  // If the user changes services and the selected tier doesn't exist, snap to featured
  const currentTier = useMemo(() => {
    const match = currentService.tiers.find((t) => t.name === tierName);
    if (match) return match;
    return currentService.tiers.find((t) => t.featured) ?? currentService.tiers[0];
  }, [currentService, tierName]);

  // Keep tierName in sync when service changes
  const effectiveTierName = currentTier.name;

  const addOnTotal = useMemo(
    () => addOns.filter((a) => selectedAddOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0),
    [selectedAddOns]
  );

  const baseTotal = currentTier.price + addOnTotal;
  const subscriptionTotal = baseTotal * (1 + SUBSCRIPTION_PREMIUM);
  const monthlyPayment = subscriptionTotal / SUBSCRIPTION_MONTHS;

  const handleServiceChange = (newId: string) => {
    setServiceId(newId);
    const nextService = services.find((s) => s.id === newId);
    if (nextService) {
      // Snap to featured tier on service change
      const featured = nextService.tiers.find((t) => t.featured) ?? nextService.tiers[0];
      setTierName(featured.name);
    }
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Pre-fill string sent to the contact page
  const enquiryPlan = `${currentService.shortName} — ${effectiveTierName}${
    selectedAddOns.length > 0 ? ` + ${selectedAddOns.length} add-on${selectedAddOns.length > 1 ? "s" : ""}` : ""
  }`;

  return (
    <div className="calc-shell">
      <div className="calc-grid">
        {/* ─── LEFT: INPUTS ──────────────────────────────── */}
        <div className="calc-inputs">
          <div className="calc-inputs-header">
            <Calculator aria-hidden="true" />
            <div>
              <h3>Your project</h3>
              <p>Configure your bundle to see live pricing</p>
            </div>
          </div>

          {/* Service */}
          <div className="calc-field">
            <label htmlFor="calc-service">What are you building?</label>
            <select
              id="calc-service"
              value={serviceId}
              onChange={(e) => handleServiceChange(e.target.value)}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Tier */}
          <div className="calc-field">
            <label htmlFor="calc-tier">Which tier?</label>
            <select
              id="calc-tier"
              value={effectiveTierName}
              onChange={(e) => setTierName(e.target.value)}
            >
              {currentService.tiers.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name} — {formatR(t.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Add-ons */}
          <div className="calc-field">
            <label>Optional add-ons</label>
            <div className="calc-addons">
              {addOns.map((a) => (
                <label key={a.id} className={`calc-addon ${selectedAddOns.includes(a.id) ? "active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(a.id)}
                    onChange={() => toggleAddOn(a.id)}
                  />
                  <div className="calc-addon-body">
                    <div className="calc-addon-top">
                      <span className="calc-addon-label">{a.label}</span>
                      <span className="calc-addon-price">+{formatR(a.price)}</span>
                    </div>
                    <span className="calc-addon-desc">{a.description}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Summary line */}
          <div className="calc-summary">
            <div className="calc-summary-row">
              <span>{currentService.shortName} — {effectiveTierName}</span>
              <span>{formatR(currentTier.price)}</span>
            </div>
            {addOnTotal > 0 && (
              <div className="calc-summary-row calc-summary-addons">
                <span>Add-ons ({selectedAddOns.length})</span>
                <span>+{formatR(addOnTotal)}</span>
              </div>
            )}
            <div className="calc-summary-total">
              <span>Base project total</span>
              <span>{formatR(baseTotal)}</span>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: OUTPUT ────────────────────────────── */}
        <div className="calc-outputs">
          <div className="calc-outputs-header">
            <span className="eyebrow">YOUR INVESTMENT</span>
            <h3>Three ways to pay</h3>
            <p>Same project, same scope. Choose the structure that fits your cash flow.</p>
          </div>

          <div className="calc-options">
            {/* Once-off */}
            <div className="calc-option">
              <div className="calc-option-name">Once-off</div>
              <div className="calc-option-price">{formatR(baseTotal)}</div>
              <div className="calc-option-sub">Paid as a project</div>
              <ul className="calc-option-rows">
                <li><span>Due at kickoff</span><span>{formatR(baseTotal * 0.5)}</span></li>
                <li><span>Due on delivery</span><span>{formatR(baseTotal * 0.5)}</span></li>
              </ul>
              <div className="calc-option-total">
                <span>Total</span><span>{formatR(baseTotal)}</span>
              </div>
              <Button asChild className="btn btn-outline-dark calc-option-cta">
                <Link to="/contact" search={{ plan: enquiryPlan }}>
                  Choose this <ArrowRight />
                </Link>
              </Button>
            </div>

            {/* Milestone */}
            <div className="calc-option">
              <div className="calc-option-name">Milestone</div>
              <div className="calc-option-price">{formatR(baseTotal / 3)}<em>/mo equivalent</em></div>
              <div className="calc-option-sub">Paid as 3 equal parts</div>
              <ul className="calc-option-rows">
                <li><span>Kickoff</span><span>{formatR(baseTotal / 3)}</span></li>
                <li><span>Mid-project</span><span>{formatR(baseTotal / 3)}</span></li>
                <li><span>On delivery</span><span>{formatR(baseTotal / 3)}</span></li>
              </ul>
              <div className="calc-option-total">
                <span>Total</span><span>{formatR(baseTotal)}</span>
              </div>
              <Button asChild className="btn btn-outline-dark calc-option-cta">
                <Link to="/contact" search={{ plan: enquiryPlan }}>
                  Choose this <ArrowRight />
                </Link>
              </Button>
            </div>

            {/* Subscription */}
            <div className="calc-option featured">
              <span className="calc-option-badge">LOWEST MONTHLY</span>
              <div className="calc-option-name">Subscription</div>
              <div className="calc-option-price">{formatR(monthlyPayment)}<em>/month</em></div>
              <div className="calc-option-sub">× {SUBSCRIPTION_MONTHS} months</div>
              <ul className="calc-option-rows">
                <li><span>Monthly payment</span><span>{formatR(monthlyPayment)}</span></li>
                <li><span>Terms</span><span>{SUBSCRIPTION_MONTHS} months</span></li>
                <li><span>Financing premium</span><span>~15%</span></li>
              </ul>
              <div className="calc-option-total">
                <span>Total</span><span>{formatR(subscriptionTotal)}</span>
              </div>
              <Button asChild className="btn btn-primary calc-option-cta">
                <Link to="/contact" search={{ plan: enquiryPlan }}>
                  Choose this <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>

          {/* Included note */}
          <div className="calc-included">
            <Check />
            <span>
              <strong>Every option includes:</strong> 12 months of Managed Hosting · 90-day post-launch support ·
              Full source code ownership · POPIA-compliant by default · Team training · Option to migrate off Trident anytime.
            </span>
          </div>

          {/* WhatsApp alternative */}
          <div className="calc-alt">
            <span>Not sure which option fits?</span>
            <a href="https://wa.me/26662068252?text=Hi%20Trident%20Cloud%2C%20I%27d%20like%20to%20discuss%20a%20project%20quote." target="_blank" rel="noreferrer">
              <MessageCircle /> WhatsApp us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}