'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  radius: number
  life: number
  maxLife: number
}

export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    const spawn = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      for (let i = 0; i < 2; i++) {
        const life = 80 + Math.random() * 120
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.5,
          alpha: 0,
          radius: 0.8 + Math.random() * 1.4,
          life: 0,
          maxLife: life,
        })
      }
    }

    const CYAN = '130, 210, 230'
    const VIOLET = '140, 90, 230'

    const tick = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      spawn()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.life++

        const progress = p.life / p.maxLife
        p.alpha = progress < 0.2
          ? (progress / 0.2) * 0.7
          : progress > 0.7
            ? ((1 - progress) / 0.3) * 0.7
            : 0.7

        const color = p.x / w < 0.5 ? CYAN : VIOLET
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.alpha * 0.6})`
        ctx.fill()

        if (p.life >= p.maxLife) particles.splice(i, 1)
      }

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80) {
            const opacity = (1 - dist / 80) * 0.15
            const color = (particles[i].x + particles[j].x) / 2 / w < 0.5 ? CYAN : VIOLET
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${color}, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
