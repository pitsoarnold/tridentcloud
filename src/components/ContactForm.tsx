import { useEffect, useState, type FormEvent } from "react";
import { useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicePicker, serviceGroups } from "@/components/ServicePicker";
import { submitEnquiry } from "@/lib/contact.functions";

function normalizeServiceSelection(rawValue: string) {
  const raw = rawValue.trim();
  if (!raw) return "";
  const allOptions = serviceGroups.flatMap((group) => group.items);
  if (allOptions.includes(raw)) return raw;

  for (const group of serviceGroups) {
    if (
      group.label.toLowerCase().includes(raw.toLowerCase()) ||
      raw.toLowerCase().includes(group.label.toLowerCase().split(" ")[0])
    ) {
      return group.items[0] ?? "";
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
  const search = useSearch({ strict: false }) as { plan?: string };
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [tier, setTier] = useState("");
  const [payment, setPayment] = useState("");
  const [contextService, setContextService] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [contextPlan, setContextPlan] = useState(search.plan || "");
  const [plan, setPlan] = useState<string>(() => normalizeServiceSelection(search.plan || ""));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceParam = (params.get("service") || "").trim();
    const planParam = (params.get("plan") || search.plan || "").trim();
    setContextService(serviceParam);
    setContextPlan(planParam);
    if (serviceParam) {
      setPlan(normalizeServiceSelection(serviceParam));
    } else if (planParam) {
      setPlan(normalizeServiceSelection(planParam));
    }
    setTier((params.get("tier") || "").trim().slice(0, 50));
    setAddons(
      (params.get("addons") || "")
        .split(",")
        .map((addon) => addon.trim().slice(0, 60))
        .filter(Boolean)
        .slice(0, 10),
    );
    const paymentParam = params.get("payment");
    setPayment(
      paymentParam === "Standard" || paymentParam === "Milestone" || paymentParam === "Subscription"
        ? paymentParam
        : "",
    );
  }, [search.plan]);

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
        <label>What can we help you with?</label>
        <ServicePicker
          value={plan}
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
          placeholder="What are you trying to build or improve? Include any context that helps us understand your needs."
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

      <Button className="btn btn-primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send enquiry"}
        <ArrowRight />
      </Button>
    </form>
  );
}
