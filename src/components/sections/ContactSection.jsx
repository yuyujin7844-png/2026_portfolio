import { useEffect, useMemo, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  IconButton,
  CircularProgress,
  Divider,
} from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import InstagramIcon from '@mui/icons-material/Instagram'
import Section from './Section'
import GuestbookForm from '../guestbook/GuestbookForm'
import GuestbookEntryItem from '../guestbook/GuestbookEntryItem'
import {
  createGuestbookEntry,
  fetchGuestbookEntries,
  getLikedEntryIds,
  likeGuestbookEntry,
} from '../../lib/guestbook'

const CONTACT_INFO = [
  {
    icon: EmailRoundedIcon,
    label: 'Email',
    value: 'yuyujin7844@gmail.com',
    href: 'mailto:yuyujin7844@gmail.com',
  },
  {
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/yuyujin7844-png',
    href: 'https://github.com/yuyujin7844-png',
  },
]

const SNS_LINKS = [
  { icon: GitHubIcon, label: 'GitHub', href: 'https://github.com/yuyujin7844-png' },
  { icon: EmailRoundedIcon, label: 'Email', href: 'mailto:yuyujin7844@gmail.com' },
  { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/yuyujin_0711' },
]

function ContactSection() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [likedIds, setLikedIds] = useState(() => getLikedEntryIds())

  useEffect(() => {
    fetchGuestbookEntries()
      .then(setEntries)
      .finally(() => setLoading(false))
  }, [])

  const topLevelEntries = useMemo(() => entries.filter((e) => !e.parent_id), [entries])
  const repliesOf = (id) => entries.filter((e) => e.parent_id === id)

  const handleCreate = async (payload) => {
    const newEntry = await createGuestbookEntry(payload)
    setEntries((prev) => [{ ...newEntry, guestbook_likes: [{ count: 0 }] }, ...prev])
  }

  const handleReply = async (parentId, { authorName, message }) => {
    const newReply = await createGuestbookEntry({ authorName, message, parentId })
    setEntries((prev) => [...prev, { ...newReply, guestbook_likes: [{ count: 0 }] }])
  }

  const handleLike = async (entryId) => {
    setLikedIds((prev) => [...prev, entryId])
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? { ...e, guestbook_likes: [{ count: (e.guestbook_likes?.[0]?.count ?? 0) + 1 }] }
          : e
      )
    )
    try {
      await likeGuestbookEntry(entryId)
    } catch {
      // already liked from this browser or a network hiccup; local state stays optimistic
    }
  }

  return (
    <Section id="contact" title="Contact" bgcolor="background.default">
      <Card elevation={0} sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 3 }}>
        <CardContent sx={{ py: 6, px: { xs: 3, sm: 6 } }}>
          <Typography variant="h4" color="textSecondary" gutterBottom sx={{ fontWeight: 700 }}>
            함께 이야기 나눠요
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            궁금한 점이나 남기고 싶은 말이 있다면 언제든 편하게 연락해주세요.
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 3,
              maxWidth: 420,
              mx: 'auto',
              mb: 4,
            }}
          >
            {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
              <Stack
                key={label}
                component="a"
                href={href}
                spacing={1}
                sx={{
                  alignItems: 'center',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Icon sx={{ color: 'primary.main', fontSize: 28 }} />
                <Box>
                  <Typography variant="caption" display="block" color="textDisabled">
                    {label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ wordBreak: 'break-word' }}
                  >
                    {value}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>

          <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', mb: 5 }}>
            {SNS_LINKS.map(({ icon: Icon, label, href }) => (
              <IconButton
                key={label}
                component="a"
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  '&:hover': { bgcolor: 'primary.dark' },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Stack>

          <Divider sx={{ mb: 5 }} />

          <Typography variant="h5" color="textSecondary" gutterBottom sx={{ fontWeight: 700 }}>
            방명록
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            포트폴리오를 보고 느낀 점을 자유롭게 남겨주세요.
          </Typography>

          <GuestbookForm onSubmit={handleCreate} />

          <Stack spacing={2} sx={{ mt: 4 }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={28} sx={{ color: 'primary.main' }} />
              </Box>
            ) : topLevelEntries.length === 0 ? (
              <Typography variant="body2" color="textDisabled" sx={{ textAlign: 'center', py: 2 }}>
                아직 방명록이 없어요. 첫 메시지를 남겨보세요!
              </Typography>
            ) : (
              topLevelEntries.map((entry) => (
                <GuestbookEntryItem
                  key={entry.id}
                  entry={entry}
                  replies={repliesOf(entry.id)}
                  liked={likedIds.includes(entry.id)}
                  onLike={handleLike}
                  onReply={handleReply}
                />
              ))
            )}
          </Stack>
        </CardContent>
      </Card>
    </Section>
  )
}

export default ContactSection
