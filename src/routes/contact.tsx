import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { PageIntro, whatsappUrl } from "@/components/SiteChrome";
import { ContactForm } from "@/components/ContactForm";
export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    plan: typeof search["plan"] === "string" ? search["plan"] : undefined,
    service: typeof search["service"] === "string" ? search["service"] : undefined,
    tier: typeof search["tier"] === "string" ? search["tier"] : undefined,
    payment: typeof search["payment"] === "string" ? search["payment"] : undefined,
    addons: typeof search["addons"] === "string" ? search["addons"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contact Trident Cloud Services | Discuss Your Systems" },
      {
        name: "description",
        content:
          "Get in touch with Trident Cloud Services about managed hosting, infrastructure and operations for your South African business.",
      },
      { property: "og:title", content: "Contact Trident Cloud Services" },
      {
        property: "og:description",
        content: "Tell us what you run. We'll talk through what support makes sense.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});
function Contact() {
  return (
    <main>
      <PageIntro
        eyebrow="GET IN TOUCH"
        title="Let's talk about what you're building."
        description="Whether you need a website, an application, an enterprise system, or someone to run your infrastructure — tell us what you have in mind."
      />
      <section className="section section-white">
        <div className="site-container contact-grid">
          <div>
            <div className="section-heading">
              <span className="eyebrow">SEND AN ENQUIRY</span>
              <h2>Start the conversation.</h2>
              <p>
                No sales script. Just a clear discussion about your project, your systems, and how
                we can help.
              </p>
            </div>
            <ContactForm />
          </div>
          <aside className="contact-side">
            <h3>Prefer a direct conversation?</h3>
            <p>Reach out through the channel that works best for you.</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp our team
            </a>
            <a href="mailto:hello@tridentcloud.co.za">
              <Mail /> hello@tridentcloud.co.za
            </a>
            <a href="https://tridentcloud.co.za" target="_blank" rel="noopener noreferrer">
              <MapPin /> South Africa
            </a>
            <p className="mt-10">
              Business-hours support. We respond to enquiries within one business day.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
