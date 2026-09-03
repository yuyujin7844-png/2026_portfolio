import { useEffect, useState } from 'react'
import { AppBar, Toolbar, Container, Stack, Button } from '@mui/material'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// 왼쪽: Yujin's 로고(→ 홈) / 오른쪽: About · Project · Contact
const navItems = [
  { label: 'About', to: '/about' },
  { label: 'Project', to: '/projects' },
  { label: 'Contact', to: '/', hash: 'contact' },
]

function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)

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

  const handleContact = (event) => {
    event.preventDefault()
    if (pathname === '/') {
      scrollToContact()
    } else {
      navigate('/')
      window.setTimeout(scrollToContact, 80) // 홈 렌더 후 스크롤
    }
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
            disableRipple
            sx={{
              p: 0,
              minWidth: 'auto',
              fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
              fontSize: { xs: '1.5rem', md: '1.75rem' },
              fontWeight: 600,
              color: 'primary.main',
              letterSpacing: '0.01em',
              '&:hover': { bgcolor: 'transparent', color: 'primary.dark' },
            }}
          >
            Yujin&rsquo;s
          </Button>

          <Stack direction="row" spacing={{ xs: 0.5, md: 2 }}>
            {navItems.map((item) => {
              const isActive = !item.hash && pathname === item.to
              return (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.to}
                  onClick={item.hash ? handleContact : undefined}
                  disableRipple
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    px: { xs: 1, md: 1.5 },
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
