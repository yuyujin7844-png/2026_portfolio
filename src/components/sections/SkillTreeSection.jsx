import { Card, CardContent, Typography } from '@mui/material'
import Section from './Section'

function SkillTreeSection() {
  return (
    <Section id="skill-tree" title="Skill Tree" bgcolor="background.default">
      <Card
        elevation={0}
        sx={{ width: '100%', bgcolor: 'secondary.main', borderRadius: 3 }}
      >
        <CardContent sx={{ py: 6 }}>
          <Typography variant="h4" color="primary.main" gutterBottom>
            Skill Tree 섹션
          </Typography>
          <Typography variant="body1" color="text.secondary">
            여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로
            시각화할 예정입니다.
          </Typography>
        </CardContent>
      </Card>
    </Section>
  )
}

export default SkillTreeSection
