import { useEffect, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
} from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// 왼쪽: Yujin's 로고(→ 홈) / 오른쪽: About · Project · Contact
const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Project', to: '/projects' },
  { label: 'Contact', to: '/', hash: 'contact' },
]

const SERIF = '"Cormorant Garamond", "Noto Serif KR", Georgia, serif'

function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Contact 는 홈의 #contact 섹션으로 스크롤 (HashRouter라 앵커 대신 직접 이동)
  const scrollToContact = () => {
    document
      .getElementById('contact')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClick = (item) => (event) => {
    if (item.hash) {
      event.preventDefault()
      if (pathname === '/') scrollToContact()
      else {
        navigate('/')
        window.setTimeout(scrollToContact, 80) // 홈 렌더 후 스크롤
      }
    }
    setMenuOpen(false)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled ? 'rgba(250, 246, 239, 0.82)' : 'background.default',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        borderBottom: '1px solid',
        borderColor: scrolled ? 'secondary.main' : 'transparent',
        transition: 'background-color .25s ease, border-color .25s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between', minHeight: { xs: 60, md: 72 } }}
        >
          <Button
            component={Link}
            to="/"
            onClick={() => setMenuOpen(false)}
            disableRipple
            sx={{
              p: 0,
              minWidth: 'auto',
              fontFamily: SERIF,
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 600,
              color: 'primary.main',
              letterSpacing: '0.01em',
              '&:hover': { bgcolor: 'transparent', color: 'primary.dark' },
            }}
          >
            Yujin&rsquo;s
          </Button>

          {/* 데스크톱 내비 */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            {navItems.map((item) => {
              const isActive = !item.hash && pathname === item.to
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.to}
                  onClick={handleClick(item)}
                  disableRipple
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    px: 1.5,
                    borderRadius: 0,
                    borderBottom: '2px solid',
                    borderColor: isActive ? 'secondary.main' : 'transparent',
                    '&:hover': {
                      bgcolor: 'transparent',
                      borderColor: 'secondary.light',
                    },
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Stack>

          {/* 모바일 햄버거 */}
          <IconButton
            aria-label="메뉴 열기"
            onClick={() => setMenuOpen(true)}
            sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'primary.main' }}
          >
            <MenuRoundedIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* 모바일 전체화면 오버레이 메뉴 */}
      <Drawer
        anchor="top"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: 'background.default',
            backgroundImage: 'none',
            height: '100dvh',
          },
        }}
      >
        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            aria-label="메뉴 닫기"
            onClick={() => setMenuOpen(false)}
            sx={{ color: 'primary.main' }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>
        <Stack spacing={1} sx={{ px: 3, pt: 4, alignItems: 'flex-start' }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              component={Link}
              to={item.to}
              onClick={handleClick(item)}
              disableRipple
              sx={{
                px: 0,
                fontFamily: SERIF,
                fontSize: '2rem',
                fontWeight: 500,
                color: 'text.primary',
                '&:hover': { bgcolor: 'transparent', color: 'primary.main' },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Stack>
      </Drawer>
    </AppBar>
  )
}

export default Navbar
