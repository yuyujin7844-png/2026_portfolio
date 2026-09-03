import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/**
 * 스크롤해서 화면에 들어오면 opacity + translateY 로 부드럽게 등장시킨다.
 * prefers-reduced-motion 이면 애니메이션 없이 바로 보여준다.
 */
function Reveal({ children, delay = 0, y = 16, sx, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      sx={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : `translateY(${y}px)`,
        transition: `opacity 0.6s ${EASE} ${delay}ms, transform 0.6s ${EASE} ${delay}ms`,
        '@media (prefers-reduced-motion: reduce)': {
          opacity: 1,
          transform: 'none',
          transition: 'none',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Box>
  )
}

Reveal.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  y: PropTypes.number,
  sx: PropTypes.object,
}

export default Reveal
