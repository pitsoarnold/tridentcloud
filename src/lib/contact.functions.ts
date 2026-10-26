import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const enquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional(),
  systemCount: z.string().trim().max(30).optional(),
  message: z.string().trim().min(10).max(3000),
  plan: z.string().trim().max(100).optional(),
  website: z.string().max(200).optional(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot check
    if (data.website) return { ok: true };

    // 1. Save to Supabase
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_enquiries").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      system_count: data.systemCount || null,
      message: data.message,
      plan: data.plan || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("We couldn't send your enquiry. Please try WhatsApp instead.");
    }

    // 2. Send Emails via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await Promise.all([
          // Admin Email
          resend.emails.send({
            from: "Trident Cloud <notifications@tridentcloud.co.za>",
            to: process.env.ADMIN_EMAIL || "pitsoarnold@gmail.com",
            replyTo: data.email,
            subject: `New enquiry from ${data.name}${data.company ? ` · ${data.company}` : ""}`,
            html: `
              <h2>New contact enquiry</h2>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Company:</strong> ${data.company || "N/A"}</p>
              <p><strong>Systems:</strong> ${data.systemCount || "N/A"}</p>
              <p><strong>Plan:</strong> ${data.plan || "N/A"}</p>
              <p><strong>Message:</strong></p>
              <p style="white-space:pre-wrap;">${data.message}</p>
            `,
          }),
          // Visitor Auto-Reply
          resend.emails.send({
            from: "Trident Cloud <hello@tridentcloud.co.za>",
            to: data.email,
            subject: "We've received your enquiry — Trident Cloud Services",
            html: `
              <h2>Thanks for getting in touch</h2>
              <p>Hi ${data.name}, thanks for reaching out.</p>
              <p>We've received your enquiry and will respond within one business day.</p>
              <br/>
              <p>— The Trident Cloud team</p>
            `,
          })
        ]);
      } catch (emailError) {
        console.error("Failed to send email notifications:", emailError);
        // We don't throw here so the user still sees a success message
      }
    }

    return { ok: true };
  });