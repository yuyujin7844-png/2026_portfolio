import { Box, Container, Typography } from '@mui/material'

function AboutMe() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" color="primary.main" gutterBottom>
          About Me
        </Typography>
        <Typography variant="body1" color="text.secondary">
          About Me 페이지가 개발될 공간입니다. 상세한 자기소개가 들어갈
          예정입니다.
        </Typography>
      </Container>
    </Box>
  )
}

export default AboutMe
