import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150),
  systemCount: z.string().trim().max(30),
  message: z.string().trim().min(10).max(3000),
  plan: z.string().trim().max(100),
  website: z.string().max(200).optional(),
});

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_enquiries").insert({
      name: data.name,
      email: data.email,
      company: data.company,
      system_count: data.systemCount,
      message: data.message,
      plan: data.plan,
    });
    if (error) {
  console.error("Supabase insert error:", JSON.stringify(error, null, 2));
  throw new Error("We couldn't send your enquiry. Please try WhatsApp instead.");
}

    const key = process.env["RESEND_API_KEY"];
    if (!key) {
      console.error("Unable to send enquiry notifications: RESEND_API_KEY is not configured.");
      return { ok: true };
    }

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeCompany = escapeHtml(data.company);
    const safeSystemCount = escapeHtml(data.systemCount);
    const safePlan = escapeHtml(data.plan);
    const safeMessage = escapeHtml(data.message);
    const submittedAt = new Date().toISOString();
    const sharedStyles =
      "font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#0f172a;line-height:1.5;";
    const headingStyles = "color:#0a2240;margin:0 0 20px;";
    const labelStyles =
      "color:#64748B;font-weight:600;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;width:38%;";
    const valueStyles = "padding:10px 12px;border:1px solid #e2e8f0;";

    try {
      const results = await Promise.allSettled([
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Trident Cloud Services <onboarding@resend.dev>",
            to: ["pitsoarnold@gmail.com"],
            reply_to: data.email,
            subject: `New enquiry from ${data.name}${data.company ? ` · ${data.company}` : ""}`,
            html: `<div style="${sharedStyles}">
              <h1 style="${headingStyles}">New contact enquiry</h1>
              <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;">
                <tr><th style="${labelStyles}">Name</th><td style="${valueStyles}">${safeName}</td></tr>
                <tr><th style="${labelStyles}">Email</th><td style="${valueStyles}"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
                <tr><th style="${labelStyles}">Company</th><td style="${valueStyles}">${safeCompany}</td></tr>
                <tr><th style="${labelStyles}">Systems count</th><td style="${valueStyles}">${safeSystemCount}</td></tr>
                <tr><th style="${labelStyles}">Plan/Service</th><td style="${valueStyles}">${safePlan}</td></tr>
                <tr><th style="${labelStyles}">Message</th><td style="${valueStyles}white-space:pre-wrap;">${safeMessage}</td></tr>
                <tr><th style="${labelStyles}">Submitted</th><td style="${valueStyles}">${submittedAt}</td></tr>
              </table>
              <p style="color:#64748B;font-size:13px;margin-top:20px;">Reply directly to this email to contact the sender.</p>
            </div>`,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(
              `Resend admin email returned ${response.status}: ${await response.text()}`,
            );
          }
        }),
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Trident Cloud Services <onboarding@resend.dev>",
            to: [data.email],
            reply_to: "hello@tridentcloud.co.za",
            subject: "We've received your enquiry — Trident Cloud Services",
            html: `<div style="${sharedStyles}">
              <h1 style="${headingStyles}">Thanks for getting in touch</h1>
              <p>Hi ${safeName}, thanks for getting in touch.</p>
              <p>We've received your enquiry and will respond within one business day. Most enquiries are answered within a few hours during business hours.</p>
              <div style="border:1px solid #e2e8f0;padding:14px 16px;margin:20px 0;">
                <p style="color:#64748B;font-weight:600;margin:0 0 8px;">Your message</p>
                <p style="margin:0;white-space:pre-wrap;">${safeMessage}</p>
              </div>
              <p style="color:#64748B;font-size:13px;">If you need to reach us sooner, reply to this email or WhatsApp us at <a href="https://wa.me/26662068252">wa.me/26662068252</a></p>
              <p>— The Trident Cloud team</p>
            </div>`,
          }),
        }).then(async (response) => {
          if (!response.ok) {
            throw new Error(
              `Resend visitor email returned ${response.status}: ${await response.text()}`,
            );
          }
        }),
      ]);

      results.forEach((result, index) => {
        if (result.status === "rejected") {
          console.error(`Email ${index === 0 ? "admin" : "visitor"} failed:`, result.reason);
        }
      });
    } catch (emailError) {
      console.error("Failed to send enquiry notifications:", emailError);
    }

    return { ok: true };
  });
