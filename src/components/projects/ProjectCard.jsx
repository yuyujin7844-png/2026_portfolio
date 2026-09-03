import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded'

function formatYear(value) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return String(date.getFullYear())
}

function ProjectCard({ project, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [opening, setOpening] = useState(false)

  const year = formatYear(project.work_date)
  const number = String(index + 1).padStart(2, '0')

  const handleOpenDetail = () => {
    if (!project.detail_url) return
    setOpening(true)
    window.open(project.detail_url, '_blank', 'noopener,noreferrer')
    window.setTimeout(() => setOpening(false), 1200)
  }

  const handleOpenGithub = (event) => {
    event.stopPropagation()
    if (!project.github_url) return
    window.open(project.github_url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 16px 34px rgba(58, 44, 35, 0.16)',
          },
          '&:hover .project-thumb': { transform: 'scale(1.06)' },
          '&:hover .project-arrow': { opacity: 1, transform: 'none' },
        },
        '&:active': { transform: 'scale(0.99)' },
      }}
    >
      <CardActionArea
        onClick={handleOpenDetail}
        disabled={!project.detail_url}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        {/* 썸네일 — 16:10, 카드보다 크게 확대돼 크롭 */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            bgcolor: 'background.paper',
            overflow: 'hidden',
          }}
        >
          {!imageLoaded && !imageError && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            />
          )}

          {imageError ? (
            <Stack
              sx={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}
              spacing={1}
            >
              <ImageNotSupportedRoundedIcon sx={{ color: 'primary.light', fontSize: 32 }} />
              <Typography variant="caption" color="text.secondary">
                미리보기를 불러오지 못했어요
              </Typography>
            </Stack>
          ) : (
            <Box
              component="img"
              className="project-thumb"
              src={project.thumbnail_url}
              alt={`${project.title} 미리보기`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1)',
              }}
            />
          )}

          {opening && (
            <Stack
              sx={{
                position: 'absolute',
                inset: 0,
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(250, 246, 239, 0.72)',
              }}
            >
              <CircularProgress size={28} sx={{ color: 'primary.main' }} />
            </Stack>
          )}
        </Box>

        <CardContent sx={{ width: '100%', p: 2.5 }}>
          <Stack spacing={1}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
            >
              <Typography
                variant="caption"
                sx={{ color: 'secondary.dark', letterSpacing: '0.12em', fontWeight: 600 }}
              >
                {number}
                {year ? ` · ${year}` : ''}
              </Typography>
              <NorthEastRoundedIcon
                className="project-arrow"
                sx={{
                  fontSize: 16,
                  color: 'primary.main',
                  opacity: 0,
                  transform: 'translate(-4px, 4px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                }}
              />
            </Stack>

            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
                color: 'text.primary',
                lineHeight: 1.25,
              }}
            >
              {project.title}
            </Typography>

            {project.description && (
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {project.description}
              </Typography>
            )}

            {project.tech_stack?.length > 0 && (
              <Typography
                variant="caption"
                sx={{ color: 'text.disabled', letterSpacing: '0.03em' }}
              >
                {project.tech_stack.join(' · ')}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>

      {project.github_url && (
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Box
            component="button"
            type="button"
            onClick={handleOpenGithub}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              px: 1.25,
              py: 0.5,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 999,
              bgcolor: 'transparent',
              color: 'text.secondary',
              font: 'inherit',
              fontSize: '0.75rem',
              fontWeight: 600,
              '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
            }}
          >
            <GitHubIcon sx={{ fontSize: 15 }} />
            GitHub
          </Box>
        </Box>
      )}
    </Card>
  )
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    tech_stack: PropTypes.arrayOf(PropTypes.string),
    detail_url: PropTypes.string,
    github_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
    work_date: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
}

export default ProjectCard
