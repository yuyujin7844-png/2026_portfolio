import { useEffect, useState } from 'react'
import { Alert, Box, Skeleton, Typography } from '@mui/material'
import Section from './Section'
import ProjectCard from '../projects/ProjectCard'
import { fetchProjects } from '../../lib/projects'

// 로딩 중 보여줄 스켈레톤 카드 개수
const SKELETON_COUNT = 4

// Projects 탭과 동일한 카드 그리드 (모바일 1 · 태블릿 2 · 데스크톱 4열)
const GRID_COLUMNS = {
  xs: '1fr', // 모바일: 1열
  sm: 'repeat(2, 1fr)', // 태블릿: 2열
  md: 'repeat(4, 1fr)', // 데스크톱: 4열
}

function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    fetchProjects()
      .then((data) => {
        if (active) setProjects(data)
      })
      .catch((err) => {
        if (active) setError(err)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <Section id="projects" title="Projects" bgcolor="background.paper" maxWidth="lg">
      <Typography variant="h4" color="primary.main" gutterBottom>
        대표 프로젝트
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        직접 기획하고 만든 프로젝트들입니다. 카드를 누르면 배포된 사이트로 이동해요.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ maxWidth: 480, mx: 'auto', mb: 3 }}>
          프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </Alert>
      )}

      {!error && (
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: GRID_COLUMNS,
            gap: { xs: 2.5, md: 3 },
            alignItems: 'stretch',
            textAlign: 'left',
          }}
        >
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  height={440}
                  sx={{ borderRadius: 3 }}
                />
              ))
            : projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
        </Box>
      )}

      {!loading && !error && projects.length === 0 && (
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ textAlign: 'center', py: 4 }}
        >
          아직 등록된 프로젝트가 없어요.
        </Typography>
      )}
    </Section>
  )
}

export default ProjectsSection
