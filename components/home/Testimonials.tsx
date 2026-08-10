'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate, useInView } from 'framer-motion'

/**
 * ReviewsShowcase3D
 * A draggable 3D ring of review cards — Animos-style showcase.
 * Drag left/right to rotate the ring; auto-rotates gently when idle.
 *
 * Usage:
 *   <ReviewsShowcase3D reviews={myReviews} />
 *
 * If no reviews are passed, sample data is used so you can preview the effect immediately.
 */

interface Review {
  name: string
  role?: string
  quote: string
  rating?: number // 1-5
  avatarColor?: string
}

const SAMPLE_REVIEWS: Review[] = [
  { name: 'Sarah M.', role: 'E-commerce Founder', quote: 'Our organic traffic tripled in four months. Best marketing investment we\u2019ve made.', rating: 5, avatarColor: '#38bdf8' },
  { name: 'David R.', role: 'SaaS CEO', quote: 'They rebuilt our whole funnel and conversions jumped almost overnight.', rating: 5, avatarColor: '#8b5cf6' },
  { name: 'Priya K.', role: 'Local Business Owner', quote: 'Finally showing up on Google Maps for every service we offer.', rating: 5, avatarColor: '#a78bfa' },
  { name: 'James T.', role: 'Agency Partner', quote: 'Fast, sharp, and they actually explain what they\u2019re doing and why.', rating: 5, avatarColor: '#7c3aed' },
  { name: 'Lena V.', role: 'DTC Brand Owner', quote: 'Our ad spend dropped 30% while sales kept climbing. Real results.', rating: 5, avatarColor: '#38bdf8' },
  { name: 'Omar F.', role: 'Startup Founder', quote: 'The dashboard alone saved us hours every week of guessing what\u2019s working.', rating: 5, avatarColor: '#8b5cf6' },
  { name: 'Chloe B.', role: 'Retail Chain Manager', quote: 'Every location now ranks locally. Foot traffic is visibly up.', rating: 5, avatarColor: '#a78bfa' },
  { name: 'Marcus D.', role: 'B2B Founder', quote: 'Clear reporting, no fluff, and they hit every deadline they promised.', rating: 5, avatarColor: '#7c3aed' },
]

function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < rating ? '#38bdf8' : 'rgba(255,255,255,0.15)'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

interface ReviewsShowcase3DProps {
  reviews?: Review[]
  title?: string
  eyebrow?: string
  subtitle?: string
}

export default function ReviewsShowcase3D({
  reviews = SAMPLE_REVIEWS,
  eyebrow = 'Trusted By Growing Brands',
  title = 'What Clients Say',
  subtitle = 'Drag the ring to browse real results from real campaigns.',
}: ReviewsShowcase3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: '-10% 0px' })

  const count = reviews.length
  const anglePerCard = 360 / count

  // rotation state (degrees)
  const rotate = useMotionValue(0)
  const smoothRotate = useSpring(rotate, { stiffness: 120, damping: 22, mass: 0.9 })
  const [display, setDisplay] = useState(0)

  const dragging = useRef(false)
  const lastX = useRef(0)
  const velocity = useRef(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const idleControls = useRef<ReturnType<typeof animate> | null>(null)

  useEffect(() => {
    const unsub = smoothRotate.on('change', (v) => setDisplay(v))
    return unsub
  }, [smoothRotate])

  // gentle auto-rotate when idle
  const startIdleSpin = useCallback(() => {
    idleControls.current?.stop()
    idleControls.current = animate(rotate, rotate.get() - 360, {
      duration: 40,
      ease: 'linear',
      repeat: Infinity,
    })
  }, [rotate])

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => {
      if (!hasInteracted) startIdleSpin()
    }, 600)
    return () => clearTimeout(t)
  }, [inView, hasInteracted, startIdleSpin])

  const stopIdle = () => idleControls.current?.stop()

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    setHasInteracted(true)
    stopIdle()
    lastX.current = e.clientX
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    const dx = e.clientX - lastX.current
    lastX.current = e.clientX
    velocity.current = dx
    rotate.set(rotate.get() + dx * 0.35)
  }
  const endDrag = () => {
    if (!dragging.current) return
    dragging.current = false
    // momentum fling
    const target = rotate.get() + velocity.current * 4
    animate(rotate, target, { type: 'spring', stiffness: 60, damping: 18, mass: 0.9 })
  }

  const radius = 320 // px, distance of each card from center

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: '100px 24px 120px',
        overflow: 'hidden',
        background: '#05050a',
      }}
    >
      {/* ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: -160,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          width: 900,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.16) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* heading */}
      <motion.div
        style={{ position: 'relative', textAlign: 'center', maxWidth: 560, margin: '0 auto 64px' }}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#38bdf8' }} />
          <span style={{ fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#38bdf8' }}>
            {eyebrow}
          </span>
          <span style={{ display: 'inline-block', width: 24, height: 1, background: '#38bdf8' }} />
        </div>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', lineHeight: 1.15, margin: 0 }}>
          <span style={{ background: 'linear-gradient(135deg,#38bdf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {title}
          </span>
        </h2>
        <p style={{ marginTop: 14, fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{subtitle}</p>
      </motion.div>

      {/* 3D ring stage */}
      <div
        ref={wrapRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 340,
          margin: '0 auto',
          maxWidth: 1100,
        }}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: 1400,
            cursor: dragging.current ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: 220,
              height: 280,
              transformStyle: 'preserve-3d',
              transform: `rotateX(-14deg) rotateY(${display}deg)`,
            }}
          >
            {reviews.map((r, i) => {
              const angle = i * anglePerCard
              // normalized signed angle relative to current rotation, for fade/scale
              let rel = ((angle + display) % 360 + 360) % 360
              if (rel > 180) rel -= 360
              const facing = 1 - Math.min(Math.abs(rel) / 180, 1) // 1 = facing viewer, 0 = back
              const scale = 0.72 + facing * 0.28
              const opacity = 0.22 + facing * 0.78

              return (
                <div
                  key={r.name + i}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 18,
                      padding: 2,
                      background: 'linear-gradient(135deg, rgba(56,189,248,0.45), rgba(139,92,246,0.45))',
                      transform: `scale(${scale})`,
                      opacity,
                      transition: 'opacity 0.15s linear',
                      pointerEvents: 'none',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 16,
                        background: 'linear-gradient(160deg, #12121c, #0a0a12)',
                        boxShadow: '0 20px 50px -20px rgba(0,0,0,0.7)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '22px 20px',
                      }}
                    >
                      <div>
                        <svg width="22" height="16" viewBox="0 0 32 24" fill="none" style={{ opacity: 0.5, marginBottom: 10 }}>
                          <path d="M0 24V14.4C0 6.4 5.2 1 12.8 0L14 4C10 5.2 7.6 7.6 7.2 11.2H12.8V24H0ZM17.2 24V14.4C17.2 6.4 22.4 1 30 0L31.2 4C27.2 5.2 24.8 7.6 24.4 11.2H30V24H17.2Z" fill="#38bdf8" />
                        </svg>
                        <p style={{ fontSize: 12.5, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                          {r.quote}
                        </p>
                      </div>
                      <div>
                        <Stars rating={r.rating} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                          <div
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: '50%',
                              background: r.avatarColor ?? '#38bdf8',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 11,
                              fontWeight: 700,
                              color: '#05050a',
                              flexShrink: 0,
                            }}
                          >
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'white' }}>{r.name}</div>
                            {r.role && (
                              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.4)' }}>{r.role}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* drag hint */}
        <div
          style={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
            pointerEvents: 'none',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M4 7H1M10 7H13M1 7L4 4M1 7L4 10M13 7L10 4M13 7L10 10"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          drag to rotate
        </div>
      </div>
    </section>
  )
}