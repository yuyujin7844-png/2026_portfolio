import { useEffect, useState } from 'react'
import { Alert, Box, Container, Skeleton, Typography } from '@mui/material'
import ProjectCard from '../components/projects/ProjectCard'
import { fetchProjects } from '../lib/projects'

const GRID_COLUMNS = {
  xs: '1fr', // 모바일: 1열
  sm: 'repeat(2, 1fr)', // 태블릿·데스크톱: 2열
}

function Projects() {
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
    <Box
      component="main"
      sx={{
        bgcolor: 'background.paper',
        minHeight: 'calc(100vh - 64px)',
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography variant="overline" sx={{ color: 'primary.light', letterSpacing: '0.18em' }}>
            Project
          </Typography>
          <Typography variant="h3" sx={{ color: 'text.primary', mt: 1 }}>
            Selected Works
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1.5 }}>
            직접 기획하고 만든 작업들입니다. 카드를 누르면 배포된 사이트로 이동해요.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </Alert>
        )}

        {!error && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: GRID_COLUMNS,
              gap: { xs: 3, md: 4 },
              alignItems: 'stretch',
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    height={300}
                    sx={{ borderRadius: 2 }}
                  />
                ))
              : projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
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
      </Container>
    </Box>
  )
}

export default Projects
