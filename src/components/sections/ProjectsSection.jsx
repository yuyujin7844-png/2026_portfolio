import { Card, CardContent, Typography, Button } from '@mui/material'
import Section from './Section'

function ProjectsSection() {
  return (
    <Section id="projects" title="Projects" bgcolor="background.paper">
      <Card elevation={0} sx={{ width: '100%', borderRadius: 3 }}>
        <CardContent sx={{ py: 6 }}>
          <Typography variant="h4" color="primary.main" gutterBottom>
            Projects 섹션
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 &apos;더
            보기&apos; 버튼이 들어갈 예정입니다.
          </Typography>
          <Button variant="outlined" color="primary">
            더 보기
          </Button>
        </CardContent>
      </Card>
    </Section>
  )
}

export default ProjectsSection
