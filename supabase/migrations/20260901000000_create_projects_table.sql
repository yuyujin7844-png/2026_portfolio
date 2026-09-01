-- 포트폴리오 Projects 탭용 테이블
create table if not exists public.projects (
  id            bigint generated always as identity primary key,
  title         text        not null,
  description   text        not null default '',
  tech_stack    text[]      not null default '{}',
  detail_url    text        not null,            -- 배포된 프로젝트 사이트 URL
  github_url    text,                            -- 저장소 URL (GitHub 버튼용)
  thumbnail_url text,                            -- image.thum.io API URL (비어있으면 detail_url로 클라이언트가 생성)
  work_date     date,                            -- 프로젝트 작업 날짜
  is_published  boolean     not null default true,
  sort_order    integer     not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.projects is '포트폴리오에 노출되는 프로젝트 목록';

-- updated_at 자동 갱신
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

-- RLS: 게시된 프로젝트는 누구나 조회 가능 (데모용 읽기 전용 공개)
alter table public.projects enable row level security;

create policy "published projects are viewable by everyone"
  on public.projects
  for select
  to public
  using (is_published = true);

create index projects_sort_idx on public.projects (is_published, sort_order, id);

-- 기본 프로젝트 데이터
insert into public.projects (title, description, tech_stack, detail_url, github_url, thumbnail_url, work_date, sort_order)
values
  (
    'Bloom Champagne',
    '논알코올 스파클링 브랜드의 무드를 담은 브랜드 랜딩페이지',
    array['React','Supabase','PostgreSQL','CSS3'],
    'https://yuyujin7844-png.github.io/yujin_portfolio/Bloom_Champagne/',
    'https://github.com/yuyujin7844-png/yujin_portfolio/tree/main/Bloom_Champagne',
    'https://image.thum.io/get/https://yuyujin7844-png.github.io/yujin_portfolio/Bloom_Champagne/',
    date '2026-08-25',
    1
  ),
  (
    'Movie All Day',
    '상영관·상영시간표를 골라 좌석까지 예매하는 영화 티켓 예약 앱',
    array['React','Supabase','PostgreSQL','CSS3'],
    'https://yuyujin7844-png.github.io/movie_app/',
    'https://github.com/yuyujin7844-png/movie_app',
    'https://image.thum.io/get/https://yuyujin7844-png.github.io/movie_app/',
    date '2026-08-27',
    2
  ),
  (
    'Moviestagram',
    '영화·공연 감상을 사진과 함께 공유하는 미니 SNS',
    array['React','Supabase','PostgreSQL','CSS3'],
    'https://yuyujin7844-png.github.io/yujin_portfolio/mini_sns/',
    'https://github.com/yuyujin7844-png/yujin_portfolio/tree/main/mini_sns',
    'https://image.thum.io/get/https://yuyujin7844-png.github.io/yujin_portfolio/mini_sns/',
    date '2026-08-25',
    3
  );
