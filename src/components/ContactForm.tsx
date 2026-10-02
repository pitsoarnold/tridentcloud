import { useState, type FormEvent } from "react";
import { useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitEnquiry } from "@/lib/contact.functions";

/**
 * Grouped options for the "What can we help with?" dropdown.
 * The first item in each group is the "general enquiry" default so that
 * links from /build and /pulse land cleanly on the right section.
 */
const planGroups: Record<string, string[]> = {
  "Trident Pulse (Subscription)": [
    "Trident Pulse — Not sure of tier yet",
    "Pulse Starter — R499/mo",
    "Pulse Business — R899/mo",
    "Pulse Premium — R1,499/mo",
  ],
  "Website Development": [
    "Website Development — Not sure of tier yet",
    "Website — Starter (R8,500)",
    "Website — Business (R18,000)",
    "Website — Premium (R38,000+)",
  ],
  "Web Applications": [
    "Web Applications — Not sure of tier yet",
    "Web App — MVP (R35,000)",
    "Web App — Business (R85,000)",
    "Web App — Platform (R180,000+)",
  ],
  "Desktop Applications": [
    "Desktop Applications — Not sure of tier yet",
    "Desktop — Basic (R65,000)",
    "Desktop — Business (R140,000)",
    "Desktop — Enterprise (R300,000+)",
  ],
  "Enterprise Systems": [
    "Enterprise Systems — Not sure of tier yet",
    "Enterprise — Integration (R120,000)",
    "Enterprise — System Build (R280,000)",
    "Enterprise — Platform (R600,000+)",
  ],
  "ERP Solutions": [
    "ERP Solutions — Not sure of tier yet",
    "ERP — Small Business (R150,000)",
    "ERP — Mid-Market (R450,000)",
    "ERP — Platform (R1.5M+)",
  ],
  "Cloud Hosting & Management": [
    "Cloud Hosting — Not sure of plan yet",
    "Managed Hosting",
    "Managed Infrastructure",
    "Managed Operations",
    "Enterprise / Custom Hosting",
  ],
  "Something else": [
    "Something else — I'll describe it below",
  ],
};

export function ContactForm() {
  const search = useSearch({ strict: false }) as { plan?: string };
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const send = useServerFn(submitEnquiry);

  // Normalise the incoming plan value:
  // - If it's already a full option string, use it
  // - Otherwise, try to match the group and use its default
  const rawPlan = (search.plan || "").trim();
  let prefillPlan = "";

  if (rawPlan) {
    // Check if rawPlan matches an option exactly
    const allOptions = Object.values(planGroups).flat();
    if (allOptions.includes(rawPlan)) {
      prefillPlan = rawPlan;
    } else {
      // Try to find the group that matches this title and use its first option
      for (const [group, options] of Object.entries(planGroups)) {
        if (group.toLowerCase().includes(rawPlan.toLowerCase()) ||
            rawPlan.toLowerCase().includes(group.toLowerCase().split(" ")[0])) {
          prefillPlan = options[0];
          break;
        }
      }
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      await send({
        data: {
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          company: String(data.get("company") || ""),
          systemCount: String(data.get("systemCount") || ""),
          message: String(data.get("message") || ""),
          plan: String(data.get("plan") || ""),
          website: String(data.get("website") || ""),
        },
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {prefillPlan && (
        <div className="contact-prefill-banner">
          <Info aria-hidden="true" />
          <div>
            <strong>You're enquiring about:</strong> {prefillPlan}
            <span>Change the dropdown below if this isn't right.</span>
          </div>
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name *</label>
          <input id="name" name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your full name" />
        </div>
        <div className="field">
          <label htmlFor="email">Work email *</label>
          <input id="email" name="email" type="email" required maxLength={255} autoComplete="email" placeholder="you@company.co.za" />
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" maxLength={150} autoComplete="organization" placeholder="Your organisation" />
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
        <label htmlFor="plan">What can we help you with?</label>
        <select id="plan" name="plan" defaultValue={prefillPlan}>
          <option value="">Not sure yet / Just exploring</option>
          {Object.entries(planGroups).map(([group, options]) => (
            <optgroup key={group} label={group}>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </optgroup>
          ))}
        </select>
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