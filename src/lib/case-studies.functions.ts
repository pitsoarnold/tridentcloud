import { createServerFn } from "@tanstack/react-start";

export const getCaseStudies = createServerFn({ method: "GET" }).handler(async () => {
  // Dynamic import keeps the server-side client out of the client bundle
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin
    .from("case_studies")
    .select("*")
    .order("sort_order");

  if (error) throw new Error(error.message);
  return data;
});