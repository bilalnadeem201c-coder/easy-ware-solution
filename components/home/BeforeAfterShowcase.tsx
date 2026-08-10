'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, animate, useInView } from 'framer-motion'

/**
 * BeforeAfterShowcase
 * Drop this above your "What We Do" section.
 * Renders two LIVE animated dashboard mockups instead of static images —
 * "before" = a cluttered, dated-looking panel; "after" = a premium animated
 * 3D dashboard with count-up stats, a growing bar chart, and a drawn line chart.
 */

// ─── Count-up number ────────────────────────────────────────────────────────

function CountUp({
  value,
  suffix = '',
  decimals = 0,
  start,
}: {
  value: number
  suffix?: string
  decimals?: number
  start: boolean
}) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!start) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [start, value])
  return (
    <>
      {display.toFixed(decimals)}
      {suffix}
    </>
  )
}

// ─── OLD dashboard (the "before") ──────────────────────────────────────────

function OldDashboard() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#e9e9e4',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        overflow: 'hidden',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#1e3a5f' }}>Marketing Dashboard v1.2</span>
        <span style={{ fontSize: 9, color: '#888', border: '1px solid #ccc', padding: '1px 5px' }}>refresh: manual</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
        {[
          { label: 'Total impressions', val: '8', box: '#4a5fc1' },
          { label: 'Average CTR', val: '0%', box: '#7a4fc1' },
          { label: 'Avg. position', val: '23.8', box: '#e9e9e4', text: true },
          { label: 'Avg. ROAS', val: '1.2x', box: '#e9e9e4', text: true },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: s.text ? '#fff' : s.box,
              border: '1px solid #c7c7c0',
              padding: '8px 6px',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 9, height: 9, border: '1px solid #999', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: 9, color: s.text ? '#555' : '#eee' }}>{s.label}</span>
            </div>
            <span style={{ fontSize: 18, fontWeight: 700, color: s.text ? '#222' : '#fff' }}>{s.val}</span>
            <span style={{ fontSize: 8, color: s.text ? '#999' : '#dcdcf5', alignSelf: 'flex-end' }}>[?]</span>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #c7c7c0', padding: 8, flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 9, color: '#555', fontWeight: 700 }}>Campaign list (unsorted)</span>
        {['summer_promo_final', 'q2_retarget', 'brand_v3_OLD', 'test_dontuse'].map((c, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 9,
              color: '#444',
              borderBottom: '1px dashed #ddd',
              padding: '2px 0',
            }}
          >
            <span>{c}</span>
            <span style={{ color: i % 2 === 0 ? '#c14a4a' : '#999' }}>{i % 2 === 0 ? 'stale' : 'active'}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 34, background: '#fff', border: '1px solid #c7c7c0', padding: 4 }}>
        {[9, 22, 14, 30, 11, 26, 17, 8, 20, 13].map((h, i) => (
          <div key={i} style={{ width: 6, height: h, background: '#9a9a9a' }} />
        ))}
      </div>
    </div>
  )
}

// ─── NEW dashboard (the "after") — premium, animated, 3D ──────────────────

function NewDashboard({ active }: { active: boolean }) {
  const bars = [40, 65, 50, 82, 60, 95, 74]
  const linePoints = '0,42 20,30 40,34 60,18 80,22 100,6'

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(160deg, #0d0d16, #05050a)',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8', display: 'inline-block', boxShadow: '0 0 8px #38bdf8' }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>Campaign Analytics</span>
        </div>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>LIVE</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {[
          { label: 'Impressions', val: 482, suffix: 'K', decimals: 0, color: '#38bdf8' },
          { label: 'Avg. CTR', val: 6.8, suffix: '%', decimals: 1, color: '#8b5cf6' },
          { label: 'Avg. position', val: 2.3, suffix: '', decimals: 1, color: '#a78bfa' },
          { label: 'Avg. ROAS', val: 4.1, suffix: 'x', decimals: 1, color: '#7c3aed' },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              padding: '9px 8px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span style={{ fontSize: 8.5, color: 'rgba(255,255,255,0.45)', letterSpacing: '0.02em' }}>{s.label}</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: s.color }}>
              <CountUp value={s.val} suffix={s.suffix} decimals={s.decimals} start={active} />
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          flex: 1,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minHeight: 0,
        }}
      >
        <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>Traffic trend</span>
        <svg viewBox="0 0 100 48" preserveAspectRatio="none" style={{ width: '100%', flex: 1 }}>
          <polyline
            points={linePoints}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 200,
              strokeDashoffset: active ? 0 : 200,
              transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1) 0.2s',
            }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 5,
          height: 40,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '6px 8px',
        }}
      >
        {bars.map((h, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              borderRadius: 3,
              background: 'linear-gradient(180deg, #38bdf8, #7c3aed)',
              height: active ? `${h}%` : '2%',
              transition: `height 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.06}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Before/After Slider ────────────────────────────────────────────────────

interface SliderProps {
  before: React.ReactNode
  after: React.ReactNode
  label: string
  tag: string
  defaultPos?: number
  onEnterView?: () => void
}

function BeforeAfterSlider({ before, after, label, tag, defaultPos = 50, onEnterView }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const inView = useInView(cardRef, { once: true, margin: '-10% 0px' })

  const pos = useMotionValue(defaultPos)
  const smoothPos = useSpring(pos, { stiffness: 260, damping: 32, mass: 0.6 })
  const [display, setDisplay] = useState(defaultPos)
  const [dragging, setDragging] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    const unsub = smoothPos.on('change', (v) => setDisplay(v))
    return unsub
  }, [smoothPos])

  useEffect(() => {
    if (inView) onEnterView?.()
  }, [inView, onEnterView])

  useEffect(() => {
    if (!inView || hasInteracted) return
    const controls = animate(pos, [defaultPos, defaultPos - 18, defaultPos + 14, defaultPos], {
      duration: 2.2,
      delay: 1.2,
      ease: 'easeInOut',
      times: [0, 0.35, 0.7, 1],
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  const updatePos = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
      pos.jump(pct)
    },
    [pos]
  )

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    setDragging(true)
    setHasInteracted(true)
    updatePos(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return
    updatePos(e.clientX)
  }
  const onPointerUp = () => setDragging(false)

  return (
    <motion.div
      ref={cardRef}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Labels row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              padding: '2px 8px',
              borderRadius: 4,
              background: 'rgba(139,92,246,0.15)',
              color: '#a78bfa',
            }}
          >
            {tag}
          </span>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
        </div>
        <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>
          drag to compare
        </span>
      </div>

      {/* 3D stage — perspective wrapper for a tilted, premium dashboard feel */}
      <div style={{ width: '100%', perspective: 1400 }}>
        <div
          style={{
            width: '100%',
            padding: 2,
            borderRadius: 22,
            background: 'linear-gradient(135deg, rgba(56,189,248,0.5), rgba(139,92,246,0.5))',
            boxShadow: '0 30px 70px -24px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)',
            transform: 'rotateX(6deg) rotateY(-4deg)',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.4s ease',
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLDivElement).style.transform = 'rotateX(6deg) rotateY(-4deg)'
          }}
          onMouseMove={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width - 0.5
            const py = (e.clientY - rect.top) / rect.height - 0.5
            ;(e.currentTarget as HTMLDivElement).style.transform = `rotateX(${6 - py * 10}deg) rotateY(${-4 + px * 10}deg)`
          }}
        >
          {/* Slider container */}
          <div
            ref={containerRef}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
              borderRadius: 20,
              background: '#0a0a12',
              cursor: dragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              transition: 'box-shadow 0.25s ease',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* BEFORE layer */}
            <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{before}</div>

            {/* AFTER layer, clipped */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                clipPath: `inset(0 0 0 ${display}%)`,
              }}
            >
              {after}
            </div>

            {/* Divider line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: 2,
                left: `${display}%`,
                pointerEvents: 'none',
                background: 'linear-gradient(180deg, #38bdf8, #8b5cf6)',
                boxShadow: '0 0 16px rgba(139,92,246,0.6)',
              }}
            />

            {/* Drag handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${display}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #38bdf8, #7c3aed)',
                boxShadow: dragging
                  ? '0 0 0 6px rgba(139,92,246,0.22), 0 4px 20px rgba(0,0,0,0.6)'
                  : '0 0 0 3px rgba(139,92,246,0.16), 0 4px 16px rgba(0,0,0,0.5)',
                transition: 'box-shadow 0.2s ease',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M4 7H1M10 7H13M1 7L4 4M1 7L4 10M13 7L10 4M13 7L10 10"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Before / After badges */}
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
                fontSize: 10,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '4px 8px',
                borderRadius: 6,
                pointerEvents: 'none',
                background: 'rgba(0,0,0,0.65)',
                color: 'rgba(255,255,255,0.6)',
                opacity: display > 8 ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
            >
              Before
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                fontSize: 10,
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '4px 8px',
                borderRadius: 6,
                pointerEvents: 'none',
                background: 'rgba(139,92,246,0.25)',
                color: '#c4b5fd',
                opacity: display < 92 ? 1 : 0,
                transition: 'opacity 0.2s',
              }}
            >
              After
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Section wrapper ─────────────────────────────────────────────────────────

export default function BeforeAfterShowcase() {
  const [dashActive, setDashActive] = useState(false)

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        padding: '96px 24px',
        overflow: 'hidden',
        background: '#05050a',
      }}
    >
      {/* Ambient glow, consistent with hero */}
      <div
        style={{
          position: 'absolute',
          top: -160,
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
          width: 800,
          height: 500,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div style={{ position: 'relative', width: '100%', maxWidth: 768, margin: '0 auto' }}>
        {/* Eyebrow + headline */}
        <motion.div
          style={{ marginBottom: 56 }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span style={{ display: 'inline-block', width: 24, height: 1, background: '#38bdf8' }} />
            <span style={{ fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#38bdf8' }}>
              Proof, Not Promises
            </span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: 'white', lineHeight: 1.15, maxWidth: 640, margin: 0 }}>
            See The
            <br />
            <span style={{ background: 'linear-gradient(135deg,#38bdf8,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Transformation
            </span>
          </h2>
          <p style={{ marginTop: 16, fontSize: 15, maxWidth: 460, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
            Drag the slider to see how we turn a cluttered, dated marketing dashboard into a fast, insight-driven view of every campaign.
          </p>
        </motion.div>

        {/* Live animated dashboard comparison */}
        <BeforeAfterSlider
          tag="Dashboard"
          label="Campaign Analytics"
          before={<OldDashboard />}
          after={<NewDashboard active={dashActive} />}
          defaultPos={50}
          onEnterView={() => setDashActive(true)}
        />
      </div>
    </section>
  )
}