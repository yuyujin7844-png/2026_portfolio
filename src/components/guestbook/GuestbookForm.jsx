import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Rating,
  Alert,
} from '@mui/material'

const EMOJI_OPTIONS = ['😊', '😍', '🎉', '👍', '🙌', '✨']

function GuestbookForm({ onSubmit }) {
  const [authorName, setAuthorName] = useState('')
  const [message, setMessage] = useState('')
  const [snsHandle, setSnsHandle] = useState('')
  const [email, setEmail] = useState('')
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0])
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!authorName.trim() || !message.trim()) return
    setError('')
    setSubmitting(true)
    try {
      await onSubmit({ authorName, message, snsHandle, email, emoji, rating })
      setAuthorName('')
      setMessage('')
      setSnsHandle('')
      setEmail('')
      setEmoji(EMOJI_OPTIONS[0])
      setRating(5)
    } catch (err) {
      setError(err.message || '방명록 등록에 실패했어요. 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: '100%', textAlign: 'left' }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            label="이름"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
            fullWidth
            size="small"
          />
          <TextField
            label="SNS 계정 (선택)"
            placeholder="@instagram_id"
            value={snsHandle}
            onChange={(e) => setSnsHandle(e.target.value)}
            fullWidth
            size="small"
          />
        </Stack>

        <TextField
          label="방명록 메시지"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          fullWidth
          multiline
          minRows={3}
          size="small"
        />

        <TextField
          label="이메일 (선택, 비공개로만 저장돼요)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          size="small"
          helperText="답장이 필요할 때만 남겨주세요. 다른 방문자에게는 보이지 않아요."
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { sm: 'center' }, justifyContent: 'space-between' }}
        >
          <Stack spacing={0.5}>
            <Typography variant="caption" color="textSecondary">
              이모지 선택
            </Typography>
            <Stack direction="row" spacing={1}>
              {EMOJI_OPTIONS.map((option) => (
                <Box
                  key={option}
                  component="button"
                  type="button"
                  onClick={() => setEmoji(option)}
                  sx={{
                    fontSize: '1.25rem',
                    lineHeight: 1,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid',
                    borderColor: emoji === option ? 'primary.main' : 'divider',
                    bgcolor: emoji === option ? 'secondary.main' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {option}
                </Box>
              ))}
            </Stack>
          </Stack>

          <Stack spacing={0.5}>
            <Typography variant="caption" color="textSecondary">
              별점 평가
            </Typography>
            <Rating
              value={rating}
              onChange={(_e, value) => setRating(value)}
              sx={{ color: 'primary.main' }}
            />
          </Stack>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={submitting}
          sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' } }}
        >
          방명록 남기기
        </Button>
      </Stack>
    </Box>
  )
}

GuestbookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default GuestbookForm
