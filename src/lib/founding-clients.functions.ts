import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const foundingApplicationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  business_name: z.string().trim().max(150).optional(),
  preferred_tier: z.enum(["presence", "digital-office", "digital-sales", "unsure"]),
  message: z.string().trim().max(2000).optional(),
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
    return entities[character] ?? character;
  });

const tierLabels = {
  presence: "Presence",
  "digital-office": "Digital Office",
  "digital-sales": "Digital Sales",
  unsure: "Not sure yet",
} as const;

export const getFoundingAvailability = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: config, error: configError } = await supabaseAdmin
    .from("founding_client_config")
    .select("is_active, total_spots, manual_taken")
    .single();

  if (configError) {
    console.error("Could not load founding client config:", configError);
    throw new Error("Founding client availability is currently unavailable.");
  }

  if (!Number.isInteger(config.total_spots) || config.total_spots < 1) {
    console.error("Founding client config has an invalid total_spots value:", config.total_spots);
    throw new Error("Founding client availability is currently unavailable.");
  }

  if (!config.is_active) return { isActive: false, filledSpots: 0, totalSpots: config.total_spots };

  const { count, error: countError } = await supabaseAdmin
    .from("founding_client_applications")
    .select("id", { count: "exact", head: true })
    .eq("status", "accepted");

  if (countError || count === null) {
    console.error("Could not count accepted founding client applications:", countError);
    throw new Error("Founding client availability is currently unavailable.");
  }

  return {
    isActive: true,
    filledSpots: Math.min(config.total_spots, config.manual_taken ?? count),
    totalSpots: config.total_spots,
  };
});

export const submitFoundingApplication = createServerFn({ method: "POST" })
  .inputValidator((input) => foundingApplicationSchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: insertError } = await supabaseAdmin.from("founding_client_applications").insert({
      name: data.name,
      email: data.email,
      business_name: data.business_name || null,
      preferred_tier: data.preferred_tier,
      message: data.message || null,
      status: "new",
    });

    if (insertError) {
      console.error("Founding application insert error:", insertError);
      throw new Error("We couldn't send your application. Please try again or WhatsApp us.");
    }

    const resendApiKey = process.env["RESEND_API_KEY"];
    if (!resendApiKey) {
      console.error(
        "Unable to send founding application emails: RESEND_API_KEY is not configured.",
      );
      return { ok: true };
    }

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeBusinessName = escapeHtml(data.business_name || "—");
    const safeTier = escapeHtml(tierLabels[data.preferred_tier]);
    const safeMessage = escapeHtml(data.message || "—");
    const submittedAt = new Date().toISOString();
    const sharedStyles =
      "font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;color:#0f172a;line-height:1.5;";
    const headingStyles = "color:#0a2240;margin:0 0 20px;";
    const labelStyles =
      "color:#64748B;font-weight:600;text-align:left;padding:10px 12px;border:1px solid #e2e8f0;width:38%;";
    const valueStyles = "padding:10px 12px;border:1px solid #e2e8f0;";
    const subjectName = data.name.replace(/[\r\n]+/g, " ");
    const subjectBusinessName = data.business_name?.replace(/[\r\n]+/g, " ");

    const sendEmail = async (payload: Record<string, unknown>) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Resend returned ${response.status}: ${await response.text()}`);
      }
    };

    const results = await Promise.allSettled([
      sendEmail({
        from: "Trident Cloud Services <onboarding@resend.dev>",
        to: ["pitsoarnold@gmail.com"],
        reply_to: data.email,
        subject: `New founding client application — ${subjectName}${subjectBusinessName ? ` (${subjectBusinessName})` : ""}`,
        html: `<div style="${sharedStyles}">
          <h1 style="${headingStyles}">New founding client application</h1>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;">
            <tr><th style="${labelStyles}">Name</th><td style="${valueStyles}">${safeName}</td></tr>
            <tr><th style="${labelStyles}">Email</th><td style="${valueStyles}"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><th style="${labelStyles}">Business name</th><td style="${valueStyles}">${safeBusinessName}</td></tr>
            <tr><th style="${labelStyles}">Preferred tier</th><td style="${valueStyles}">${safeTier}</td></tr>
            <tr><th style="${labelStyles}">Message</th><td style="${valueStyles}white-space:pre-wrap;">${safeMessage}</td></tr>
            <tr><th style="${labelStyles}">Submitted</th><td style="${valueStyles}">${submittedAt}</td></tr>
          </table>
          <p style="color:#64748B;font-size:13px;margin-top:20px;">Reply directly to this email to contact the applicant.</p>
        </div>`,
      }),
      sendEmail({
        from: "Trident Cloud Services <onboarding@resend.dev>",
        to: [data.email],
        reply_to: "hello@tridentcloud.co.za",
        subject: "We've received your founding client application",
        html: `<div style="${sharedStyles}">
          <h1 style="${headingStyles}">Application received</h1>
          <p>Hi ${safeName}, thanks for applying to the Founding Client Programme.</p>
          <p>We've received your application and will review it within 2 business days. You'll hear from us on this email address.</p>
          <p style="color:#64748B;font-weight:600;margin:20px 0 8px;">Your application summary:</p>
          <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;">
            <tr><th style="${labelStyles}">Business name</th><td style="${valueStyles}">${safeBusinessName}</td></tr>
            <tr><th style="${labelStyles}">Preferred tier</th><td style="${valueStyles}">${safeTier}</td></tr>
            <tr><th style="${labelStyles}">Message</th><td style="${valueStyles}white-space:pre-wrap;">${safeMessage}</td></tr>
          </table>
          <p>While you wait, feel free to reply to this email with any questions, or WhatsApp us at <a href="https://wa.me/26662068252">wa.me/26662068252</a>.</p>
          <p>— The Trident Cloud team</p>
        </div>`,
      }),
    ]);

    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.error(
          `Founding application ${index === 0 ? "admin" : "applicant"} email failed:`,
          result.reason,
        );
      }
    });

    return { ok: true };
  });
