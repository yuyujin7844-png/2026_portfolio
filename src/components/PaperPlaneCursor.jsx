import { useEffect, useRef } from 'react'

// custom-cursor.html 프로토타입을 React 로 이식한 버전.
// 종이비행기(20px) + 호버 골드 링 + 클릭 확산 링.
const STYLE = `
.ppc { position: fixed; left: 0; top: 0; width: 20px; height: 20px; margin: -10px 0 0 -10px; z-index: 9999; pointer-events: none; will-change: transform; }
.ppc__plane { display: block; width: 100%; height: 100%; color: #6B4A38; transition: filter .25s ease; }
.ppc--glow .ppc__plane { filter: drop-shadow(0 0 6px rgba(201,169,106,.85)); }
.ppc-ring { position: fixed; left: 0; top: 0; width: 14px; height: 14px; margin: -7px 0 0 -7px; z-index: 9998; pointer-events: none; will-change: transform; }
.ppc-ring__inner { position: absolute; inset: 0; border: 1.5px solid #C9A96A; border-radius: 50%; opacity: 0; transform: scale(.6); transition: opacity .2s cubic-bezier(.22,1,.36,1), transform .2s cubic-bezier(.22,1,.36,1); }
.ppc-ring--on .ppc-ring__inner { opacity: 1; transform: scale(1); }
.ppc-ripple { position: fixed; left: 0; top: 0; width: 14px; height: 14px; margin: -7px 0 0 -7px; border: 1.5px solid #C9A96A; border-radius: 50%; pointer-events: none; z-index: 9997; }
@media (prefers-reduced-motion: reduce) { .ppc-ring__inner { transition: opacity .01s linear; transform: none; } .ppc-ring--on .ppc-ring__inner { transform: none; } }
@media (hover: none), (pointer: coarse) { .ppc, .ppc-ring { display: none; } }
`

const HOVER_SEL = 'a, button, [role="button"], input[type="submit"], .cursor-hover'

function PaperPlaneCursor() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring) return

    document.body.classList.add('ppc-on')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let x = mouseX
    let y = mouseY
    let angle = 0
    let raf = 0
    const EASE = 0.15

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      ring.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }

    const render = () => {
      if (reduceMotion) {
        x = mouseX
        y = mouseY
      } else {
        const dx = mouseX - x
        const dy = mouseY - y
        x += dx * EASE
        y += dy * EASE
        const target = Math.max(-12, Math.min(12, dx * 0.6))
        angle += (target - angle) * 0.12
      }
      cursor.style.transform = `translate(${x}px, ${y}px) rotate(${angle.toFixed(2)}deg)`
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onOver = (e) => {
      if (e.target.closest?.(HOVER_SEL)) ring.classList.add('ppc-ring--on')
    }
    const onOut = (e) => {
      if (e.target.closest?.(HOVER_SEL)) ring.classList.remove('ppc-ring--on')
    }

    const onDown = (e) => {
      cursor.classList.add('ppc--glow')
      window.setTimeout(() => cursor.classList.remove('ppc--glow'), 250)
      if (reduceMotion) return

      const ripple = document.createElement('div')
      ripple.className = 'ppc-ripple'
      ripple.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`
      document.body.appendChild(ripple)
      requestAnimationFrame(() => {
        ripple.style.transition =
          'transform .4s cubic-bezier(.22,1,.36,1), opacity .4s ease-out'
        ripple.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${40 / 14})`
        ripple.style.opacity = '0'
      })
      window.setTimeout(() => ripple.remove(), 460)
    }

    const onLeave = () => {
      cursor.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      cursor.style.opacity = '1'
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      document.body.classList.remove('ppc-on')
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      <style>{STYLE}</style>
      <div className="ppc" ref={cursorRef} aria-hidden>
        <svg className="ppc__plane" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.6 3.2 2.8 11.1c-.9.38-.83 1.63.1 1.9l6.06 1.83 2.32 6.28c.32.87 1.53.95 1.96.13l8.9-16.9c.42-.8-.4-1.7-1.24-1.37z" />
        </svg>
      </div>
      <div className="ppc-ring" ref={ringRef} aria-hidden>
        <span className="ppc-ring__inner" />
      </div>
    </>
  )
}

export default PaperPlaneCursor
