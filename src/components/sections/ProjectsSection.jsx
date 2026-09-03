import { useEffect, useState } from 'react'
import { Alert, Box, Skeleton, Typography } from '@mui/material'
import Section from './Section'
import ProjectCard from '../projects/ProjectCard'
import Reveal from '../Reveal'
import { fetchProjects } from '../../lib/projects'

// 로딩 중 보여줄 스켈레톤 카드 개수
const SKELETON_COUNT = 4

// leoparpeix.com "Selected Projects" 참고 — 데스크톱 2열, 카드는 절반 크기로 컴팩트하게
const GRID_COLUMNS = {
  xs: '1fr', // 모바일: 1열
  sm: 'repeat(2, 1fr)', // 태블릿·데스크톱: 2열
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
    <Section id="projects" title="Project" bgcolor="background.paper" maxWidth="md" align="left">
      <Reveal>
        <Typography variant="h3" sx={{ color: 'text.primary', mb: 1 }}>
          Selected Works
        </Typography>
      </Reveal>
      <Reveal delay={80}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }}>
          직접 기획하고 만든 작업들입니다. 카드를 누르면 배포된 사이트로 이동해요.
        </Typography>
      </Reveal>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
          프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </Alert>
      )}

      {!error && (
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: GRID_COLUMNS,
            gap: { xs: 3, md: 4 },
            alignItems: 'stretch',
          }}
        >
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rounded"
                  height={300}
                  sx={{ borderRadius: 2 }}
                />
              ))
            : projects.map((project, index) => (
                <Reveal key={project.id} delay={(index % 2) * 90} sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <ProjectCard project={project} index={index} />
                  </Box>
                </Reveal>
              ))}
        </Box>
      )}

      {!loading && !error && projects.length === 0 && (
        <Typography
          variant="body2"
          color="text.disabled"
          sx={{ textAlign: 'center', py: 4, width: '100%' }}
        >
          아직 등록된 프로젝트가 없어요.
        </Typography>
      )}
    </Section>
  )
}

export default ProjectsSection
