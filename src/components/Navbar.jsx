import { AppBar, Toolbar, Container, Stack, Button } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About Me', to: '/about' },
  { label: 'Projects', to: '/projects' },
]

function Navbar() {
  const { pathname } = useLocation()

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.default',
        borderBottom: '1px solid',
        borderColor: 'secondary.main',
      }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
          <Stack direction="row" spacing={1}>
            {navItems.map((item) => {
              const isActive = pathname === item.to
              return (
                <Button
                  key={item.to}
                  component={Link}
                  to={item.to}
                  sx={{
                    color: 'text.primary',
                    fontWeight: 600,
                    bgcolor: isActive ? 'secondary.main' : 'transparent',
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
