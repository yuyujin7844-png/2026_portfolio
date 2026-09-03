import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

const STORY = [
  '편집디자인을 하며 정보를 위계로 정리하는 훈련을 했습니다. 제목과 본문, 캡션의 크기와 간격을 정하는 일 — 결국 "무엇을 먼저 읽게 할까"를 정하는 일이더라고요.',
  '그 감각으로 웹 화면도 읽는 순서부터 설계합니다. 화려한 장식보다, 사용자가 멈칫하지 않고 다음 행동으로 넘어가는 흐름을 먼저 봅니다.',
  '긍정적이고 쿨한 편이라 피드백을 빠르게 받아들입니다. 내 시안에 대한 지적도 "더 좋아질 기회"로 듣고, 공감이 빨라서 사용자가 어디서 헤맬지 먼저 상상합니다.',
  '목표는 하나예요. 팀과 잘 소통하면서, 예쁘고 편안한 화면을 계속 만드는 것.',
]

const STRENGTHS = [
  ['손이 빠릅니다', '시안을 여러 개 빠르게 만들어 비교하고, 그만큼 더 많이 고쳐봅니다.'],
  ['눈치가 빠릅니다', '말로 다 설명되지 않은 요구도 맥락에서 읽어내려 합니다.'],
  ['소통이 편합니다', '디자인을 모르는 사람에게도 "왜 이렇게 했는지"를 쉬운 말로 설명합니다.'],
]

function AboutMe() {
  return (
    <Box
      component="main"
      sx={{
        bgcolor: 'background.default',
        minHeight: 'calc(100vh - 72px)',
        py: { xs: 10, md: 16 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Reveal>
          <Typography
            variant="overline"
            sx={{ color: 'primary.light', letterSpacing: '0.18em' }}
          >
            About
          </Typography>
          <Typography
            variant="h2"
            sx={{ color: 'text.primary', mt: 1, mb: 5, maxWidth: 640 }}
          >
            읽기 쉬운 화면을 만드는 신입 디자이너, Yujin입니다.
          </Typography>
        </Reveal>

        <Stack spacing={3} sx={{ maxWidth: 620 }}>
          {STORY.map((text, index) => (
            <Reveal key={index} delay={index * 80}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {text}
              </Typography>
            </Reveal>
          ))}
        </Stack>

        {/* 사진 자리 — 나중에 실제 이미지로 교체 */}
        <Reveal delay={120}>
          <Box
            sx={{
              mt: 6,
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            {['작업 책상', '스케치', '결과물 디테일'].map((label) => (
              <Box
                key={label}
                sx={{
                  aspectRatio: '4 / 5',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'flex-end',
                  p: 1.5,
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Reveal>

        <Box sx={{ mt: 8 }}>
          <Reveal>
            <Typography variant="h4" sx={{ color: 'primary.main', mb: 3 }}>
              이런 걸 잘해요
            </Typography>
          </Reveal>
          <Stack spacing={2.5}>
            {STRENGTHS.map(([title, desc], index) => (
              <Reveal key={title} delay={index * 80}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: 'text.primary', fontWeight: 700 }}
                  >
                    {title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {desc}
                  </Typography>
                </Box>
              </Reveal>
            ))}
          </Stack>
        </Box>

        <Stack direction="row" spacing={2} sx={{ mt: 8, flexWrap: 'wrap' }}>
          <Button
            component={Link}
            to="/projects"
            variant="outlined"
            sx={{ color: 'primary.main' }}
          >
            작업 보러 가기
          </Button>
          <Button component={Link} to="/" variant="text" sx={{ color: 'text.secondary' }}>
            홈으로
          </Button>
        </Stack>
      </Container>
    </Box>
  )
}

export default AboutMe
