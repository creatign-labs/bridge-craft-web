CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  consent_given boolean NOT NULL DEFAULT false,
  consent_text text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_submissions TO anon, authenticated;
GRANT ALL ON public.contact_submissions TO service_role;

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
  ON public.contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    consent_given = true
    AND length(btrim(name)) BETWEEN 1 AND 100
    AND length(btrim(email)) BETWEEN 3 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(btrim(message)) BETWEEN 10 AND 2000
    AND (phone IS NULL OR length(btrim(phone)) <= 30)
    AND status = 'new'
  );

CREATE INDEX contact_submissions_email_created_idx
  ON public.contact_submissions (email, created_at DESC);

CREATE OR REPLACE FUNCTION public.contact_submissions_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.contact_submissions
    WHERE lower(email) = lower(NEW.email)
      AND created_at > now() - interval '60 seconds'
  ) THEN
    RAISE EXCEPTION 'rate_limited: please wait a minute before sending another enquiry';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER contact_submissions_rate_limit_trg
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.contact_submissions_rate_limit();