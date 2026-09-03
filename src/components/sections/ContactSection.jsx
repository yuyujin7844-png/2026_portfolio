import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, Snackbar, Stack, Typography } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import Section from './Section'
import Reveal from '../Reveal'
import GuestbookForm from '../guestbook/GuestbookForm'
import GuestbookEntryItem from '../guestbook/GuestbookEntryItem'
import {
  createGuestbookEntry,
  fetchGuestbookEntries,
  getLikedEntryIds,
  likeGuestbookEntry,
} from '../../lib/guestbook'

const EMAIL = 'yuyujin7844@gmail.com'
const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf`

const LINKS = [
  {
    key: 'resume',
    icon: DescriptionRoundedIcon,
    label: 'Resume',
    value: 'PDF 이력서 열기',
    href: RESUME_URL,
    external: true,
  },
  {
    key: 'instagram',
    icon: InstagramIcon,
    label: 'Instagram',
    value: '@yuyujin_0711',
    href: 'https://instagram.com/yuyujin_0711',
    external: true,
  },
  {
    key: 'github',
    icon: GitHubIcon,
    label: 'GitHub',
    value: 'github.com/yuyujin7844-png',
    href: 'https://github.com/yuyujin7844-png',
    external: true,
  },
]

function ContactRow({ icon: Icon, label, value, href, external, onClick, hint }) {
  const isButton = !href
  return (
    <Box
      component={isButton ? 'button' : 'a'}
      type={isButton ? 'button' : undefined}
      href={href}
      onClick={onClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        width: '100%',
        textAlign: 'left',
        px: 2,
        py: 1.75,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'transparent',
        color: 'text.primary',
        font: 'inherit',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
        '&:hover': {
          borderColor: 'secondary.main',
          bgcolor: 'rgba(201, 169, 106, 0.08)',
        },
      }}
    >
      <Icon sx={{ color: 'primary.main', fontSize: 22, flexShrink: 0 }} />
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: 'text.disabled', display: 'block', letterSpacing: '0.08em' }}
        >
          {label}
          {hint ? ` · ${hint}` : ''}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Box>
      {external && (
        <NorthEastRoundedIcon sx={{ fontSize: 15, color: 'text.disabled', flexShrink: 0 }} />
      )}
    </Box>
  )
}

ContactRow.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  href: PropTypes.string,
  external: PropTypes.bool,
  onClick: PropTypes.func,
  hint: PropTypes.string,
}

function ContactSection() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [likedIds, setLikedIds] = useState(() => getLikedEntryIds())
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchGuestbookEntries()
      .then(setEntries)
      .finally(() => setLoading(false))
  }, [])

  const topLevelEntries = useMemo(
    () => entries.filter((e) => !e.parent_id),
    [entries]
  )
  const repliesOf = (id) => entries.filter((e) => e.parent_id === id)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  const handleCreate = async (payload) => {
    const newEntry = await createGuestbookEntry(payload)
    setEntries((prev) => [
      { ...newEntry, guestbook_likes: [{ count: 0 }] },
      ...prev,
    ])
  }

  const handleReply = async (parentId, { authorName, message }) => {
    const newReply = await createGuestbookEntry({
      authorName,
      message,
      parentId,
    })
    setEntries((prev) => [
      ...prev,
      { ...newReply, guestbook_likes: [{ count: 0 }] },
    ])
  }

  const handleLike = async (entryId) => {
    setLikedIds((prev) => [...prev, entryId])
    setEntries((prev) =>
      prev.map((e) =>
        e.id === entryId
          ? {
              ...e,
              guestbook_likes: [
                { count: (e.guestbook_likes?.[0]?.count ?? 0) + 1 },
              ],
            }
          : e
      )
    )
    try {
      await likeGuestbookEntry(entryId)
    } catch {
      // 이미 좋아요 했거나 네트워크 문제 — 낙관적 상태 유지
    }
  }

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <Section
      id="contact"
      title="Contact"
      bgcolor="background.default"
      maxWidth="md"
      align="left"
    >
      <Reveal>
        <Typography variant="h3" sx={{ color: 'text.primary', mb: 1 }}>
          같이 만들 팀을 찾고 있어요
        </Typography>
      </Reveal>
      <Reveal delay={80}>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4 }}>
          예쁘고 편한 화면을 함께 만들 팀이라면 언제든 편하게 연락 주세요.
        </Typography>
      </Reveal>

      {/* 연락 수단 */}
      <Stack spacing={1.5} sx={{ width: '100%', maxWidth: 460 }}>
        <ContactRow
          icon={EmailRoundedIcon}
          label="Email"
          value={EMAIL}
          onClick={handleCopyEmail}
          hint="클릭하면 복사"
        />
        {LINKS.map(({ key, icon, label, value, href, external }) => (
          <ContactRow
            key={key}
            icon={icon}
            label={label}
            value={value}
            href={href}
            external={external}
          />
        ))}
      </Stack>

      <Divider sx={{ width: '100%', my: 6 }} />

      {/* 방명록 */}
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" sx={{ color: 'primary.main', mb: 1 }}>
          방명록
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          포트폴리오를 보고 느낀 점을 자유롭게 남겨주세요.
        </Typography>

        <GuestbookForm onSubmit={handleCreate} />

        <Stack spacing={2} sx={{ mt: 4 }}>
          {loading ? (
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ textAlign: 'center', py: 2 }}
            >
              불러오는 중…
            </Typography>
          ) : topLevelEntries.length === 0 ? (
            <Typography
              variant="body2"
              color="text.disabled"
              sx={{ textAlign: 'center', py: 2 }}
            >
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
      </Box>

      {/* 푸터 */}
      <Stack
        direction="row"
        sx={{
          width: '100%',
          mt: 8,
          pt: 3,
          borderTop: '1px solid',
          borderColor: 'divider',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          © 2026 Yujin
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={scrollToTop}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            border: 'none',
            bgcolor: 'transparent',
            color: 'text.secondary',
            font: 'inherit',
            fontSize: '0.8rem',
            letterSpacing: '0.06em',
            '&:hover': { color: 'primary.main' },
          }}
        >
          Back to top
          <KeyboardArrowUpRoundedIcon sx={{ fontSize: 16 }} />
        </Box>
      </Stack>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="이메일 주소를 복사했어요"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Section>
  )
}

export default ContactSection
