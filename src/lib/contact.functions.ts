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

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input) => enquirySchema.parse(input))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_enquiries").insert({
      name: data.name, email: data.email, company: data.company,
      system_count: data.systemCount, message: data.message, plan: data.plan,
    });
    if (error) throw new Error("We couldn't send your enquiry. Please try WhatsApp instead.");
    return { ok: true };
  });
