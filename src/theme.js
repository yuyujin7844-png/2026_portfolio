import { createTheme } from '@mui/material/styles'

// ── Yujin's Portfolio 디자인 토큰 ──
// 메인: 밝은 크림베이지 / 포인트: 브라운 / 서브: 샴페인 골드
// 모던 & 클래식 — 제목은 세리프, 본문은 산세리프
const theme = createTheme({
  palette: {
    primary: {
      light: '#8C6A54',
      main: '#6B4A38', // 브라운 포인트
      dark: '#4A3226',
      contrastText: '#FAF6EF',
    },
    secondary: {
      light: '#E2CE9F',
      main: '#C9A96A', // 샴페인 골드 서브
      dark: '#A9873F',
      contrastText: '#3A2C23',
    },
    background: {
      default: '#FAF6EF', // 밝은 크림베이지 (지면 바탕)
      paper: '#F3EBDD', // 한 톤 진한 크림 (카드·구분 섹션)
    },
    text: {
      primary: '#3A2C23', // 딥 브라운블랙 (순검정 대신)
      secondary: '#7A6A5D', // 캡션·보조
      disabled: '#A99C8F',
    },
    accent: {
      main: '#C9A96A',
    },
    divider: 'rgba(58, 44, 35, 0.14)',
  },
  typography: {
    fontFamily:
      '"Inter", "Noto Sans KR", "Helvetica", "Arial", sans-serif',
    // 제목 계열은 세리프(Cormorant Garamond + Noto Serif KR)
    h1: {
      fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
      fontWeight: 500,
      fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
      lineHeight: 1.12,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
      fontWeight: 500,
      fontSize: 'clamp(1.9rem, 4.2vw, 2.9rem)',
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
      fontWeight: 500,
      fontSize: 'clamp(1.6rem, 3.4vw, 2.3rem)',
      lineHeight: 1.25,
    },
    h4: {
      fontFamily: '"Cormorant Garamond", "Noto Serif KR", Georgia, serif',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    overline: {
      letterSpacing: '0.18em',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
    body1: { lineHeight: 1.75 },
    body2: { lineHeight: 1.7 },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: '#C9A96A',
          '&:hover': { borderColor: '#A9873F', backgroundColor: 'rgba(201, 169, 106, 0.12)' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
})

export default theme
