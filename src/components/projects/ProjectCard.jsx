import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import ImageNotSupportedRoundedIcon from '@mui/icons-material/ImageNotSupportedRounded'

function formatWorkDate(value) {
  if (!value) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`
}

function ProjectCard({ project }) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [opening, setOpening] = useState(false)

  const workDate = formatWorkDate(project.work_date)

  const handleOpenDetail = () => {
    if (!project.detail_url) return
    setOpening(true)
    window.open(project.detail_url, '_blank', 'noopener,noreferrer')
    // 새 탭 전환 동안 잠깐 로딩 피드백을 보여주고 원상 복귀
    window.setTimeout(() => setOpening(false), 1200)
  }

  const handleOpenGithub = (event) => {
    // 카드 클릭(detail 열기)으로 이벤트가 전파되지 않도록 차단
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
        borderRadius: 3,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'secondary.main',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '@media (hover: hover)': {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 28px rgba(232, 58, 41, 0.18)',
          },
        },
        // 모바일 터치 피드백
        '&:active': {
          transform: 'scale(0.985)',
        },
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
        {/* 썸네일 */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            bgcolor: 'secondary.main',
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
              <ImageNotSupportedRoundedIcon sx={{ color: 'primary.light', fontSize: 36 }} />
              <Typography variant="caption" color="text.secondary">
                미리보기를 불러오지 못했어요
              </Typography>
            </Stack>
          ) : (
            <Box
              component="img"
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
                transition: 'opacity 0.3s ease',
              }}
            />
          )}

          {/* 클릭 피드백: 로딩 표시 */}
          {opening && (
            <Stack
              sx={{
                position: 'absolute',
                inset: 0,
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'rgba(255, 254, 239, 0.72)',
              }}
            >
              <CircularProgress size={30} sx={{ color: 'primary.main' }} />
            </Stack>
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, width: '100%', p: 2.5 }}>
          <Stack spacing={1.25} sx={{ height: '100%' }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
            >
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                {project.title}
              </Typography>
              {workDate && (
                <Typography variant="caption" color="text.disabled" sx={{ flexShrink: 0 }}>
                  {workDate}
                </Typography>
              )}
            </Stack>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </Typography>

            <Stack
              direction="row"
              spacing={0.75}
              useFlexGap
              sx={{ flexWrap: 'wrap', mt: 'auto', pt: 0.5 }}
            >
              {project.tech_stack?.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>

      {/* GitHub 버튼 */}
      {project.github_url && (
        <Box sx={{ px: 2.5, pb: 2 }}>
          <Chip
            icon={<GitHubIcon sx={{ fontSize: 18 }} />}
            label="GitHub"
            clickable
            onClick={handleOpenGithub}
            variant="outlined"
            sx={{
              borderColor: 'primary.main',
              color: 'primary.main',
              fontWeight: 600,
              '& .MuiChip-icon': { color: 'primary.main' },
              '&:hover': { bgcolor: 'secondary.main' },
            }}
          />
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
}

export default ProjectCard
