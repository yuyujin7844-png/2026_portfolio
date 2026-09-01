import { supabase } from './supabaseClient'

const THUMBNAIL_API = 'https://image.thum.io/get'

/**
 * detail_url(배포된 사이트 URL)로부터 실시간 썸네일 URL을 만든다.
 * 별도 이미지 스토리지 없이 image.thum.io API가 캡처를 제공한다.
 */
export function buildThumbnailUrl(detailUrl) {
  if (!detailUrl) return ''
  return `${THUMBNAIL_API}/${detailUrl}`
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
    thumbnail_url: project.thumbnail_url || buildThumbnailUrl(project.detail_url),
  }))
}
