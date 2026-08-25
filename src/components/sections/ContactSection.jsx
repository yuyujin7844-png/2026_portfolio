import { Card, CardContent, Typography } from '@mui/material'
import Section from './Section'

function ContactSection() {
  return (
    <Section id="contact" title="Contact" bgcolor="background.default">
      <Card
        elevation={0}
        sx={{ width: '100%', bgcolor: 'secondary.main', borderRadius: 3 }}
      >
        <CardContent sx={{ py: 6 }}>
          <Typography variant="h4" color="primary.main" gutterBottom>
            Contact 섹션
          </Typography>
          <Typography variant="body1" color="text.secondary">
            여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이
            들어갈 예정입니다.
          </Typography>
        </CardContent>
      </Card>
    </Section>
  )
}

export default ContactSection
