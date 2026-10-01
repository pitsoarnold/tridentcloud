CREATE TABLE public.contact_enquiries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL, email text NOT NULL, company text, system_count text, message text NOT NULL, plan text, created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.contact_enquiries TO service_role;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
CREATE OR REPLACE FUNCTION public.set_contact_enquiry_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;
CREATE TRIGGER contact_enquiries_updated_at BEFORE UPDATE ON public.contact_enquiries FOR EACH ROW EXECUTE FUNCTION public.set_contact_enquiry_updated_at();