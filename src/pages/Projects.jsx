import { useEffect, useState } from 'react'
import { Alert, Box, Container, Skeleton, Typography } from '@mui/material'
import ProjectCard from '../components/projects/ProjectCard'
import { fetchProjects } from '../lib/projects'

const GRID_COLUMNS = {
  xs: '1fr', // 모바일: 1열
  sm: 'repeat(2, 1fr)', // 태블릿: 2열
  md: 'repeat(4, 1fr)', // 데스크톱: 4열
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
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
          <Typography variant="h3" color="primary.main" gutterBottom>
            Projects
          </Typography>
          <Typography variant="body1" color="text.secondary">
            직접 기획하고 만든 프로젝트들입니다. 카드를 누르면 배포된 사이트로 이동해요.
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ maxWidth: 480, mx: 'auto' }}>
            프로젝트를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          </Alert>
        )}

        {!error && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: GRID_COLUMNS,
              gap: { xs: 2.5, md: 3 },
              alignItems: 'stretch',
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
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
      </Container>
    </Box>
  )
}

export default Projects
