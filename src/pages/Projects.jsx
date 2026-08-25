import { Box, Container, Typography } from '@mui/material'

function Projects() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.paper',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" color="primary.main" gutterBottom>
          Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈
          예정입니다.
        </Typography>
      </Container>
    </Box>
  )
}

export default Projects
