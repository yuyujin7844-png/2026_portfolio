import { Card, CardContent, Typography, Button } from '@mui/material'
import Section from './Section'

function AboutSection() {
  return (
    <Section id="about" title="About Me" bgcolor="background.paper">
      <Card elevation={0} sx={{ width: '100%', borderRadius: 3 }}>
        <CardContent sx={{ py: 6 }}>
          <Typography variant="h4" color="primary.main" gutterBottom>
            About Me 섹션
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            여기는 About Me 섹션입니다. 간단한 자기소개와 &apos;더
            알아보기&apos; 버튼이 들어갈 예정입니다.
          </Typography>
          <Button variant="contained" color="primary">
            더 알아보기
          </Button>
        </CardContent>
      </Card>
    </Section>
  )
}

export default AboutSection
