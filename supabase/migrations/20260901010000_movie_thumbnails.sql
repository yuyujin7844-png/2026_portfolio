-- 게시물 썸네일을 movie 테마 Unsplash 이미지로 교체
-- (thum.io 실시간 캡처가 느리거나 비어 보이는 문제를 해결)
update public.projects
set thumbnail_url = 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1200&q=80'
where title = 'Bloom Champagne';

update public.projects
set thumbnail_url = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80'
where title = 'Movie All Day';

update public.projects
set thumbnail_url = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&q=80'
where title = 'Moviestagram';
