-- Projects 탭에 'Winter Forest Market in Taehwa' 추가
-- 태화강 국가정원에서 열리는 첫 크리스마스 마켓 행사 랜딩페이지
insert into public.projects (title, description, tech_stack, detail_url, github_url, thumbnail_url, work_date, sort_order)
values
  (
    'Winter Forest Market in Taehwa',
    '태화강 국가정원에서 열리는 첫 번째 크리스마스 마켓 행사 소개 랜딩페이지',
    array['React','Supabase','PostgreSQL','CSS3'],
    'https://yuyujin7844-png.github.io/yujin_portfolio/winter_foreste_market/',
    'https://github.com/yuyujin7844-png/yujin_portfolio/tree/main/winter_foreste_market',
    'https://yuyujin7844-png.github.io/yujin_portfolio/winter_foreste_market/poster-red.jpg',
    date '2026-09-01',
    4
  );
