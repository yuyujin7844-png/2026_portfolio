import PropTypes from 'prop-types'
import { Box, Container, Typography } from '@mui/material'

function Section({
  id,
  title,
  bgcolor = 'background.default',
  maxWidth = 'sm',
  align = 'center',
  children,
}) {
  const left = align === 'left'

  return (
    <Box
      id={id}
      component="section"
      sx={{
        bgcolor,
        py: { xs: 10, md: 16 },
        px: 2,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{
          textAlign: left ? 'left' : 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: left ? 'flex-start' : 'center',
          gap: 2,
        }}
      >
        <Typography
          variant="overline"
          sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: '0.18em' }}
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
  align: PropTypes.oneOf(['center', 'left']),
  children: PropTypes.node,
}

export default Section
