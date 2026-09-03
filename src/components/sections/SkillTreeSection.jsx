import PropTypes from 'prop-types'
import { Box, Stack, Typography } from '@mui/material'
import Section from './Section'
import Reveal from '../Reveal'

const SKILLS = [
  {
    name: 'Photoshop',
    level: 3,
    uses: ['이미지 보정 · 합성', '상세페이지 편집', '배너 · 썸네일 제작'],
  },
  {
    name: 'Illustrator',
    level: 4,
    uses: ['로고 · 아이콘', '벡터 드로잉', '인포그래픽 · 편집물'],
  },
  {
    name: 'Figma',
    level: 3,
    uses: ['UI 화면 설계', '컴포넌트 · 오토레이아웃', '프로토타입'],
  },
]

// 숙련도 4점 척도 — 숫자 대신 "무엇을 할 수 있는가" 기준
const RUBRIC = [
  ['●●●●', '튜토리얼 없이 처음부터 끝까지 완성 · 단축키가 몸에 익음 · 남에게 설명 가능'],
  ['●●●○', '대부분 혼자 작업 · 막히면 검색으로 해결 · 과제·개인작 결과물 다수'],
  ['●●○○', '기본 기능 이해 · 참고 자료를 보며 작업 가능'],
  ['●○○○', '학습 중 · 핵심 개념만 파악'],
]

function LevelDots({ level }) {
  return (
    <Stack direction="row" spacing={0.75} aria-label={`숙련도 ${level} / 4`}>
      {[1, 2, 3, 4].map((n) => (
        <Box
          key={n}
          sx={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            border: '1.5px solid',
            borderColor: 'primary.main',
            bgcolor: n <= level ? 'primary.main' : 'transparent',
          }}
        />
      ))}
    </Stack>
  )
}

LevelDots.propTypes = {
  level: PropTypes.number.isRequired,
}

function SkillTreeSection() {
  return (
    <Section id="skill" title="Skill" bgcolor="background.default" maxWidth="lg" align="left">
      <Reveal>
        <Typography variant="h3" sx={{ color: 'text.primary', mb: 1 }}>
          주로 쓰는 도구
        </Typography>
      </Reveal>
      <Reveal delay={80}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 5 }}>
          숫자보다 결과물로 보시는 게 빠릅니다 — 아래 Project 섹션도 함께 봐주세요.
        </Typography>
      </Reveal>

      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: { xs: 2.5, md: 3 },
          alignItems: 'stretch',
        }}
      >
        {SKILLS.map((skill, index) => (
          <Reveal key={skill.name} delay={index * 100} sx={{ display: 'flex' }}>
            <Box
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 2,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'secondary.main',
                transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s ease',
                '@media (hover: hover)': {
                  '&:hover': { transform: 'scale(1.03)', borderColor: 'secondary.dark' },
                },
              }}
            >
              <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>
                {skill.name}
              </Typography>
              <Stack spacing={0.75} sx={{ mb: 2.5 }}>
                {skill.uses.map((use) => (
                  <Typography
                    key={use}
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {use}
                  </Typography>
                ))}
              </Stack>
              <LevelDots level={skill.level} />
            </Box>
          </Reveal>
        ))}
      </Box>

      <Box sx={{ mt: 5, width: '100%' }}>
        <Typography
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block', mb: 1.5, letterSpacing: '0.08em' }}
        >
          숙련도 기준
        </Typography>
        <Stack spacing={1}>
          {RUBRIC.map(([dots, desc]) => (
            <Stack key={dots} direction="row" spacing={1.5} sx={{ alignItems: 'baseline' }}>
              <Typography
                variant="caption"
                sx={{ color: 'primary.light', letterSpacing: '0.15em', flexShrink: 0 }}
              >
                {dots}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {desc}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Section>
  )
}

export default SkillTreeSection
