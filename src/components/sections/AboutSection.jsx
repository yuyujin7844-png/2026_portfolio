import { useEffect, useRef, useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import Section from './Section'
import Reveal from '../Reveal'

// 산문형(haoqi.design 레이아웃 참고) — 블록으로 쪼개지 않고 한 편의 글처럼 흐르게
const PARAGRAPHS = [
  '편집디자인을 하며 정보를 위계로 정리하는 훈련을 했고, 그 감각으로 웹 화면도 "읽는 순서"부터 설계합니다.',
  '긍정적이고 쿨한 편이라 피드백을 빠르게 받아들이고, 공감이 빨라서 "이 사람이 왜 여기서 헤맬까"를 먼저 봅니다.',
  '목표는 하나예요. 팀과 잘 소통하면서, 예쁘고 편안한 화면을 계속 만드는 것.',
]

const AUTO_SCROLL_MS = 5000

function AboutSection() {
  const anchorRef = useRef(null)
  const [pending, setPending] = useState(false)
  const cancelRef = useRef(() => {})

  useEffect(() => {
    const el = anchorRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (sessionStorage.getItem('about-autoscrolled')) return

    let timer = 0
    let done = false

    const teardown = () => {
      window.removeEventListener('wheel', cancel, { passive: true })
      window.removeEventListener('touchstart', cancel, { passive: true })
      window.removeEventListener('keydown', cancel)
      window.removeEventListener('pointerdown', cancel)
    }

    function cancel() {
      if (done) return
      done = true
      window.clearTimeout(timer)
      teardown()
      setPending(false)
    }
    cancelRef.current = cancel

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.5 || timer || done)
          return
        io.disconnect()
        setPending(true)
        window.addEventListener('wheel', cancel, { passive: true })
        window.addEventListener('touchstart', cancel, { passive: true })
        window.addEventListener('keydown', cancel)
        window.addEventListener('pointerdown', cancel)
        timer = window.setTimeout(() => {
          teardown()
          if (done) return
          done = true
          setPending(false)
          sessionStorage.setItem('about-autoscrolled', '1')
          document
            .getElementById('skill')
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, AUTO_SCROLL_MS)
      },
      { threshold: [0.5] }
    )
    io.observe(el)

    return () => {
      window.clearTimeout(timer)
      teardown()
      io.disconnect()
    }
  }, [])

  return (
    <Section id="about" title="About" bgcolor="background.paper" maxWidth="md" align="left">
      <Box ref={anchorRef} sx={{ width: '100%' }}>
        <Reveal>
          <Typography
            variant="h3"
            sx={{ color: 'text.primary', mb: 4, maxWidth: 620 }}
          >
            저는 사용자가 &ldquo;생각 안 하고&rdquo; 쓰는 디자인을 지향합니다.
          </Typography>
        </Reveal>

        <Stack spacing={3} sx={{ maxWidth: 560 }}>
          {PARAGRAPHS.map((text, index) => (
            <Reveal key={index} delay={index * 90}>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                {text}
              </Typography>
            </Reveal>
          ))}
        </Stack>
      </Box>

      {pending && (
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            mt: 5,
            alignItems: 'center',
            color: 'text.disabled',
            fontSize: '0.85rem',
          }}
        >
          <Typography variant="caption">
            잠시 후 Skill 섹션으로 이동합니다
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={() => cancelRef.current()}
            sx={{ color: 'primary.main', minWidth: 'auto', px: 1 }}
          >
            정지
          </Button>
        </Stack>
      )}
    </Section>
  )
}

export default AboutSection
