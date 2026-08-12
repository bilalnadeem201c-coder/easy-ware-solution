'use client';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ParticleField from '@/components/ParticleField';
import CountUp from '@/components/home/CountUp';

// Stage 1 (first zoom) finishes ~1.4s — heading + all content reveal together.
// Stage 2 (full zoom) finishes ~2.7s — heading crossfades to the second line.
const STAGE1_MS = 1400;
const STAGE2_MS = 2700;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  // 0 = nothing yet, 1 = first-zoom content revealed, 2 = full-zoom heading swap
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), STAGE1_MS);
    const t2 = setTimeout(() => setPhase(2), STAGE2_MS);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section
      ref={heroRef}
      aria-label="Hero — EasyWhere Solutions digital marketing agency"
      className="noise"
      style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--navy)' }}
    >
      {/* Particle cube background — two-stage zoom, then interactive (drag/scroll) */}
      <iframe
        src="/particle-cube.html"
        title="Particle cube background"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          zIndex: 0,
          pointerEvents: 'auto',
        }}
      />

      <ParticleField />
      <div className="orb" style={{ width: 600, height: 600, background: 'rgba(124,58,237,0.15)', top: '-10%', left: '-15%', pointerEvents: 'none' }} />
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(6,182,212,0.1)', bottom: '-5%', right: '-10%', pointerEvents: 'none' }} />
      <motion.div style={{ y: smoothY, opacity, position: 'absolute', inset: 0, pointerEvents: 'none' }} className="grid-bg" />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900, padding: '0 32px', paddingTop: 100, pointerEvents: 'none' }}>
        {phase >= 1 && (
          <>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 24 }}>
                Premium Digital Marketing Agency
              </p>
            </motion.div>

            {/* Heading crossfades from line 1 to line 2 when the full zoom finishes */}
            <div style={{ marginBottom: 24, minHeight: '2.1em' }}>
              <AnimatePresence mode="wait">
                <motion.h1
                  key={phase >= 2 ? 'line2' : 'line1'}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {phase >= 2 ? 'Your growth, our digital drive' : 'Turning clicks into clients'}
                </motion.h1>
              </AnimatePresence>
            </div>

            <motion.p
              variants={fadeUp} initial="hidden" animate="visible" custom={1}
              style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--white-dim)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}
            >
              EasyWhere Solutions engineers data-driven marketing ecosystems that transform your digital presence into a growth machine — measurable, scalable, and relentless.
            </motion.p>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}
              style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', pointerEvents: 'auto' }}
            >
              <Link href="/contact">
                <button className="btn-primary" style={{ fontSize: 15, padding: '16px 36px', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>Start Growing</span><ArrowRight size={18} aria-hidden="true" />
                </button>
              </Link>
              <Link href="/services">
                <button className="btn-outline" style={{ fontSize: 15 }}>Explore Services</button>
              </Link>
            </motion.div>   
          </>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: STAGE2_MS / 1000 + 0.6 }}
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--white-muted)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--purple-light), transparent)' }} />
      </motion.div>
    </section>
  );
}