import PropTypes from 'prop-types'
import { Box, Container, Typography } from '@mui/material'

function Section({
  id,
  title,
  bgcolor = 'background.default',
  maxWidth = 'sm',
  children,
}) {
  return (
    <Box
      id={id}
      component="section"
      sx={{
        bgcolor,
        py: { xs: 8, md: 12 },
        px: 2,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 2 }}
        >
          {title}
        </Typography>
        {children}
      </Container>
    </Box>
  )
}

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  bgcolor: PropTypes.string,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', false]),
  children: PropTypes.node,
}

export default Section
