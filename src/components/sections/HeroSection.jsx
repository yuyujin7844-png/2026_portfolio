import { Box, Container, Stack, Typography } from '@mui/material'
import Reveal from '../Reveal'

const META = ['신입 웹 · 편집 디자이너', 'Photoshop · Illustrator · Figma']

function HeroSection() {
  return (
    <Box
      id="hero"
      component="section"
      sx={{
        position: 'relative',
        minHeight: { xs: 'calc(100svh - 60px)', md: 'calc(100vh - 72px)' },
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'background.default',
        px: 2,
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
      }}
    >
      {/* 옅은 골드 모눈 패턴 — 편집디자인 대지 느낌 */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(201,169,106,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,106,0.16) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 70% at 25% 40%, #000 0%, transparent 72%)',
          maskImage:
            'radial-gradient(ellipse 80% 70% at 25% 40%, #000 0%, transparent 72%)',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative' }}>
        <Reveal delay={0}>
          <Typography
            variant="overline"
            sx={{
              color: 'primary.light',
              letterSpacing: '0.2em',
              display: 'block',
              mb: { xs: 2, md: 3 },
            }}
          >
            Yujin&rsquo;s Portfolio
          </Typography>
          <Typography
            variant="h1"
            sx={{ color: 'text.primary', mb: { xs: 3, md: 4 } }}
          >
            보기 좋은 건 기본,
            <br />
            <Box
              component="span"
              sx={{
                position: 'relative',
                color: 'primary.main',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: '0.08em',
                  height: '0.12em',
                  bgcolor: 'secondary.main',
                  borderRadius: 2,
                },
              }}
            >
              읽기 쉬운
            </Box>{' '}
            걸 만듭니다.
          </Typography>
        </Reveal>

        <Reveal delay={140}>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', maxWidth: 520, fontSize: '1.05rem' }}
          >
            편집디자인을 공부하며 배운 건, 좋은 레이아웃은 눈에 띄는 게 아니라
            안 걸리는 거라는 것. 저는 화면을 그렇게 정리합니다.
          </Typography>
        </Reveal>

        <Reveal delay={260}>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: 'wrap', mt: { xs: 4, md: 5 } }}
          >
            {META.map((item) => (
              <Typography
                key={item}
                variant="caption"
                sx={{
                  px: 1.5,
                  py: 0.75,
                  border: '1px solid',
                  borderColor: 'secondary.main',
                  borderRadius: 999,
                  color: 'text.secondary',
                  letterSpacing: '0.04em',
                }}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Reveal>
      </Container>

      {/* 스크롤 유도 */}
      <Stack
        aria-hidden
        spacing={1}
        sx={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: 'text.disabled', letterSpacing: '0.2em' }}
        >
          SCROLL
        </Typography>
        <Box
          sx={{
            width: '1px',
            height: 40,
            bgcolor: 'primary.light',
            animation: 'hero-scroll-cue 1.8s ease-in-out infinite',
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        />
      </Stack>
    </Box>
  )
}

export default HeroSection
