import { Card, CardContent, Typography } from '@mui/material'
import Section from './Section'

function HeroSection() {
  return (
    <Section id="hero" title="Hero" bgcolor="background.default">
      <Card
        elevation={0}
        sx={{ width: '100%', bgcolor: 'secondary.main', borderRadius: 3 }}
      >
        <CardContent sx={{ py: 6 }}>
          <Typography variant="h1" color="primary.main" gutterBottom>
            Hero 섹션
          </Typography>
          <Typography variant="body1" color="text.secondary">
            여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈
            예정입니다.
          </Typography>
        </CardContent>
      </Card>
    </Section>
  )
}

export default HeroSection
