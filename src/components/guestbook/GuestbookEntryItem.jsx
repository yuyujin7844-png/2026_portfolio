import { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Rating,
  IconButton,
  Button,
  TextField,
} from '@mui/material'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'

function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function ReplyForm({ onSubmit, onCancel }) {
  const [authorName, setAuthorName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!authorName.trim() || !message.trim()) return
    setSubmitting(true)
    try {
      await onSubmit({ authorName, message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1.5 }}>
      <Stack spacing={1}>
        <TextField
          label="이름"
          size="small"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
        />
        <TextField
          label="답글"
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          multiline
          minRows={2}
        />
        <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={onCancel}>
            취소
          </Button>
          <Button size="small" variant="contained" type="submit" disabled={submitting}>
            답글 등록
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

ReplyForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

function GuestbookEntryItem({ entry, replies, liked, onLike, onReply }) {
  const [replying, setReplying] = useState(false)
  const likeCount = entry.guestbook_likes?.[0]?.count ?? 0

  return (
    <Card elevation={0} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 3 }}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant="h6" component="span">
              {entry.emoji}
            </Typography>
            <Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 700 }}>
                {entry.author_name}
                {entry.sns_handle && (
                  <Typography component="span" variant="caption" color="textSecondary" sx={{ ml: 1 }}>
                    {entry.sns_handle}
                  </Typography>
                )}
              </Typography>
              <Typography variant="caption" color="textDisabled">
                {formatDate(entry.created_at)}
              </Typography>
            </Box>
          </Stack>
          {entry.rating && (
            <Rating value={entry.rating} readOnly size="small" sx={{ color: 'primary.main' }} />
          )}
        </Stack>

        <Typography variant="body2" color="textSecondary" sx={{ mt: 1.5, whiteSpace: 'pre-wrap' }}>
          {entry.message}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: 'center' }}>
          <IconButton size="small" onClick={() => onLike(entry.id)} disabled={liked}>
            {liked ? (
              <FavoriteRoundedIcon fontSize="small" color="primary" />
            ) : (
              <FavoriteBorderRoundedIcon fontSize="small" />
            )}
          </IconButton>
          <Typography variant="caption" color="textSecondary">
            {likeCount}
          </Typography>
          <Button size="small" onClick={() => setReplying((v) => !v)}>
            답글달기
          </Button>
        </Stack>

        {replying && (
          <ReplyForm
            onSubmit={async (payload) => {
              await onReply(entry.id, payload)
              setReplying(false)
            }}
            onCancel={() => setReplying(false)}
          />
        )}

        {replies.length > 0 && (
          <Stack spacing={1.5} sx={{ mt: 2, pl: 2, borderLeft: '2px solid', borderColor: 'divider' }}>
            {replies.map((reply) => (
              <Box key={reply.id}>
                <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: 700 }}>
                  {reply.author_name}
                  <Typography component="span" variant="caption" color="textDisabled" sx={{ ml: 1 }}>
                    {formatDate(reply.created_at)}
                  </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'pre-wrap' }}>
                  {reply.message}
                </Typography>
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

GuestbookEntryItem.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author_name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sns_handle: PropTypes.string,
    emoji: PropTypes.string,
    rating: PropTypes.number,
    created_at: PropTypes.string.isRequired,
    guestbook_likes: PropTypes.array,
  }).isRequired,
  replies: PropTypes.array.isRequired,
  liked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
}

export default GuestbookEntryItem
