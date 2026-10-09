import { useEffect, useState, type FormEvent } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicePicker, serviceGroups } from "@/components/ServicePicker";
import { submitEnquiry } from "@/lib/contact.functions";

function normalizeServiceSelection(rawValue: string, tier = "") {
  const raw = rawValue.trim().toLocaleLowerCase();
  if (!raw) return "";
  const allOptions = serviceGroups.flatMap((group) => group.items);
  const exactOption = allOptions.find((option) => option.toLocaleLowerCase() === raw);
  if (exactOption) return exactOption;

  const matchingGroup = serviceGroups.find((group) => {
    const label = group.label.toLocaleLowerCase();
    return label === raw || label.startsWith(raw) || raw.startsWith(label);
  });
  if (matchingGroup) {
    if (tier) {
      const normalizedTier = tier.trim().toLocaleLowerCase();
      const tierOption = matchingGroup.items.find((option) => {
        const [name, details = ""] = option.split(" — ");
        return (
          name.toLocaleLowerCase() === normalizedTier ||
          details.toLocaleLowerCase().startsWith(normalizedTier)
        );
      });
      if (tierOption) return tierOption;
    }
    return matchingGroup.items[0] ?? "";
  }

  const inferredTierOption = allOptions.find((option) => {
    const [name, details = ""] = option.split(" — ");
    const tierName = details.split("(")[0]?.trim().toLocaleLowerCase() ?? "";
    return tierName && raw.startsWith(`${name.toLocaleLowerCase()} — ${tierName}`);
  });
  if (inferredTierOption) return inferredTierOption;

  const optionPrefixMatch = allOptions.find((option) =>
    raw.startsWith(option.split(" — ")[0]?.toLocaleLowerCase() ?? ""),
  );
  if (optionPrefixMatch) return optionPrefixMatch;

  for (const group of serviceGroups) {
    const label = group.label.toLocaleLowerCase();
    const firstLabelWord = label.split(" ")[0] ?? "";
    const matchingItem = group.items.find((option) => {
      const optionName = option.split(" — ")[0]?.toLocaleLowerCase() ?? "";
      return (
        optionName === raw ||
        optionName.startsWith(`${raw} `) ||
        raw.startsWith(`${optionName} —`) ||
        (raw.startsWith(firstLabelWord) && optionName.startsWith(firstLabelWord))
      );
    });
    if (matchingItem) {
      if (tier) {
        const normalizedTier = tier.trim().toLocaleLowerCase();
        const tierOption = group.items.find((option) => {
          const [name, details = ""] = option.split(" — ");
          return (
            name.toLocaleLowerCase() === normalizedTier ||
            details.toLocaleLowerCase().startsWith(normalizedTier)
          );
        });
        if (tierOption) return tierOption;
      }
      return matchingItem;
    }
  }
  return "";
}

function formatAddonId(id: string) {
  return id
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ContactForm() {
  const search = useSearch({ strict: false }) as {
    plan?: string;
    service?: string;
    tier?: string;
    payment?: string;
    addons?: string;
  };
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [tier, setTier] = useState("");
  const [payment, setPayment] = useState("");
  const [contextService, setContextService] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [contextPlan, setContextPlan] = useState(search.plan || "");
  const [plan, setPlan] = useState<string>(() =>
    normalizeServiceSelection(search.service || search.plan || "", search.tier),
  );

  useEffect(() => {
    const serviceParam = (search.service || "").trim();
    const planParam = (search.plan || "").trim();
    setContextService(serviceParam);
    setContextPlan(planParam);
    const selection = serviceParam || planParam;
    if (selection) {
      setPlan(normalizeServiceSelection(selection, search.tier));
    }
    setTier((search.tier || "").trim().slice(0, 50));
    setAddons(
      (search.addons || "")
        .split(",")
        .map((addon) => addon.trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 10),
    );
    const paymentParam = search.payment;
    setPayment(
      paymentParam === "Standard" || paymentParam === "Milestone" || paymentParam === "Subscription"
        ? paymentParam
        : "",
    );
  }, [search.addons, search.payment, search.plan, search.service, search.tier]);

  const send = useServerFn(submitEnquiry);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    const baseMessage = String(data.get("message") || "");
    const selection = [contextService || contextPlan || plan, tier && `${tier} tier`]
      .filter(Boolean)
      .join(" — ");
    const selectionDetails = [
      selection,
      payment && `${payment} payment`,
      addons.length > 0 && `Add-ons: ${addons.map(formatAddonId).join(", ")}`,
    ]
      .filter(Boolean)
      .join("; ");
    const contextMessage = selectionDetails
      ? `\n\nSelected configuration: ${selectionDetails}`
      : "";
    const message = `${baseMessage.slice(0, Math.max(0, 3000 - contextMessage.length))}${contextMessage}`;
    try {
      await send({
        data: {
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          company: String(data.get("company") || ""),
          systemCount: String(data.get("systemCount") || ""),
          message,
          plan: [
            contextService || contextPlan || plan,
            tier && `${tier} tier`,
            payment && `${payment} payment`,
          ]
            .filter(Boolean)
            .join(" — "),
          website: String(data.get("website") || ""),
        },
      });
      setStatus("sent");
      form.reset();
      setPlan("");
      setContextPlan("");
      setContextService("");
      setTier("");
      setPayment("");
      setAddons([]);
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {(contextService || contextPlan || plan || tier || payment || addons.length > 0) && (
        <div className="contact-prefill-banner">
          <Info aria-hidden="true" />
          <div>
            <strong>You're enquiring about:</strong> {contextService || contextPlan || plan}
            {tier && `${contextService || contextPlan || plan ? " — " : ""}${tier} tier`}
            {payment && ` (${payment} payment)`}
            {addons.length > 0 && <span>Add-ons: {addons.map(formatAddonId).join(", ")}</span>}
            <span>Change the picker below if this isn't right.</span>
          </div>
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Your full name"
          />
        </div>
        <div className="field">
          <label htmlFor="email">Work email *</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={255}
            autoComplete="email"
            placeholder="you@company.co.za"
          />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            maxLength={150}
            autoComplete="organization"
            placeholder="Your organisation"
          />
        </div>
        <div className="field">
          <label htmlFor="systemCount">How many systems / sites?</label>
          <select id="systemCount" name="systemCount" defaultValue="">
            <option value="">Select an option</option>
            <option>1</option>
            <option>2–3</option>
            <option>4–5</option>
            <option>More than 5</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label id="plan-label">What can we help you with?</label>
        <ServicePicker
          value={plan}
          labelId="plan-label"
          onChange={(value) => {
            setPlan(value);
            setContextPlan(value);
            setContextService("");
            setTier("");
            setPayment("");
            setAddons([]);
          }}
          placeholder="Choose a service or plan..."
        />
        <input type="hidden" name="plan" value={plan} />
        <input type="hidden" name="tier" value={tier} />
        <input type="hidden" name="payment" value={payment} />
      </div>

      <div className="field">
        <label htmlFor="message">Tell us about your project or setup *</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={3000}
          placeholder="Tell us what you're trying to achieve — a new website, better hosting, a business system, or something else. Plain language is fine."
        />
      </div>

      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "sent" && (
        <p className="notice" role="status">
          Thank you. Your enquiry has been received. We'll be in touch within one business day.
        </p>
      )}
      {status === "error" && (
        <p className="notice" role="alert">
          We couldn't send your enquiry. Please try again or use WhatsApp.
        </p>
      )}

      <p className="contact-response-hint">
        Most enquiries are answered within a few hours during business hours.
      </p>
      <div className="contact-submit">
        <Button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
          <ArrowRight />
        </Button>
        <p className="contact-privacy-note">
          We'll only use this to respond to your enquiry. See our{" "}
          <Link to="/privacy">Privacy Notice</Link>.
        </p>
      </div>
    </form>
  );
}
