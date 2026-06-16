-- Supabase PostgreSQL schema for Meet5

create table users (
  user_id serial primary key,
  username text not null unique,
  display_name text not null,
  avatar_url text
);

create table articles (
  article_id serial primary key,
  author_id int not null references users(user_id) on delete cascade,
  title text not null,
  summary text,
  content text not null,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table interactions (
  interaction_id serial primary key,
  article_id int not null references articles(article_id) on delete cascade,
  user_id int not null references users(user_id) on delete cascade,
  type text not null,
  duration_seconds int not null default 0,
  device_type text,
  created_at timestamptz not null default now()
);

-- Sample data for demo
insert into users (username, display_name, avatar_url)
values
  ('mockuser', 'Demo User', null);

insert into articles (author_id, title, summary, content, status, published_at)
values
  (1, 'Why email should be banned', 'A short manifesto against email overload.', 'Email kills productivity and should be replaced by smaller async tools.', 'published', now()),
  (1, 'The case for 4-day weeks', 'How shorter weeks can boost deep work.', 'A four-day work week helps people focus and improves well-being.', 'published', now());
