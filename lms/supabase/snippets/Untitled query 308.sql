create table public.events (
  id uuid not null default gen_random_uuid (),
  title text not null,
  description text not null,
  type text null default 'announcement'::text,
  date timestamp with time zone null,
  link text null,
  image_url text null,
  created_at timestamp with time zone null default now(),
  constraint events_pkey primary key (id),
  constraint events_type_check check (
    (
      type = any (array['event'::text, 'announcement'::text])
    )
  )
) TABLESPACE pg_default;