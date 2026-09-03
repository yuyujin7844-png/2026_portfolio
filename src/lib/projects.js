import { supabase } from './supabaseClient'

const THUMBNAIL_API = 'https://image.thum.io/get'

// Unsplash CDN 의 영화/영화관 테마 이미지 풀 (영구 URL)
// detail_url 캡처(thum.io)가 느리거나 비어 있을 때, 게시물 썸네일을 이 풀에서 뽑아 채운다.
const MOVIE_THUMBNAILS = [
  'photo-1489599849927-2ee91cede3ba', // 붉은 좌석의 상영관
  'photo-1440404653325-ab127d49abc1', // 팝콘과 극장
  'photo-1517604931442-7e0c8ed2963c', // 팝콘 클로즈업
  'photo-1536440136628-849c177e76a1', // 파란 조명의 스크린
  'photo-1478720568477-152d9b164e26', // 텅 빈 극장 좌석
  'photo-1594908900066-3f47337549d8', // 필름 릴
  'photo-1485846234645-a62644f84728', // 상영관 통로
  'photo-1512070679279-8988d32161be', // 네온 극장 간판
]

const UNSPLASH_CDN = 'https://images.unsplash.com'
const UNSPLASH_PARAMS = 'auto=format&fit=crop&w=1200&q=80'

/** 문자열/숫자 시드로부터 안정적인 해시값을 만든다. */
function hashSeed(seed) {
  const text = String(seed ?? '')
  let hash = 0
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i)
    hash |= 0 // 32비트 정수로 유지
  }
  return Math.abs(hash)
}

/**
 * 게시물마다 movie 테마 Unsplash 이미지를 하나 뽑는다.
 * 같은 시드는 항상 같은 이미지를 돌려줘 새로고침해도 흔들리지 않는다.
 */
export function pickMovieThumbnail(seed) {
  const photoId = MOVIE_THUMBNAILS[hashSeed(seed) % MOVIE_THUMBNAILS.length]
  return `${UNSPLASH_CDN}/${photoId}?${UNSPLASH_PARAMS}`
}

/**
 * detail_url(배포된 사이트 URL)로부터 실시간 썸네일 URL을 만든다.
 * 별도 이미지 스토리지 없이 image.thum.io API가 캡처를 제공한다.
 */
export function buildThumbnailUrl(detailUrl) {
  if (!detailUrl) return ''
  return `${THUMBNAIL_API}/${detailUrl}`
}

/** thum.io 자동 캡처거나 비어 있으면 별도 썸네일을 지정하지 않은 것으로 본다. */
function hasCustomThumbnail(url) {
  return Boolean(url) && !url.includes('image.thum.io')
}

/** 게시된 프로젝트를 sort_order 순으로 가져온다. */
export async function fetchProjects() {
  const { data, error } = await supabase
    .from('projects')
    .select(
      'id, title, description, tech_stack, detail_url, github_url, thumbnail_url, work_date, sort_order'
    )
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('id', { ascending: true })

  if (error) throw error

  return (data ?? []).map((project) => ({
    ...project,
    // 직접 올린 이미지가 있으면 그대로, 아니면 movie 테마 Unsplash 이미지로 재현
    thumbnail_url: hasCustomThumbnail(project.thumbnail_url)
      ? project.thumbnail_url
      : pickMovieThumbnail(project.id ?? project.title ?? project.detail_url),
  }))
}
