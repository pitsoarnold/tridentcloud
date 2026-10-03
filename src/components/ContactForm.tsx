import { useState, type FormEvent } from "react";
import { useSearch } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServicePicker, serviceGroups } from "@/components/ServicePicker";
import { submitEnquiry } from "@/lib/contact.functions";

export function ContactForm() {
  const search = useSearch({ strict: false }) as { plan?: string };
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [plan, setPlan] = useState<string>(() => {
    // Normalise incoming query param to a valid option
    const raw = (search.plan || "").trim();
    if (!raw) return "";
    const allOptions = serviceGroups.flatMap((g) => g.items);
    if (allOptions.includes(raw)) return raw;
    // Try to match by group prefix
    for (const group of serviceGroups) {
      if (
        group.label.toLowerCase().includes(raw.toLowerCase()) ||
        raw.toLowerCase().includes(group.label.toLowerCase().split(" ")[0])
      ) {
        return group.items[0];
      }
    }
    return "";
  });

  const send = useServerFn(submitEnquiry);

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
          plan,
          website: String(data.get("website") || ""),
        },
      });
      setStatus("sent");
      form.reset();
      setPlan("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      {plan && (
        <div className="contact-prefill-banner">
          <Info aria-hidden="true" />
          <div>
            <strong>You're enquiring about:</strong> {plan}
            <span>Change the picker below if this isn't right.</span>
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
        <label>What can we help you with?</label>
        <ServicePicker value={plan} onChange={setPlan} placeholder="Choose a service or plan..." />
        <input type="hidden" name="plan" value={plan} />
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