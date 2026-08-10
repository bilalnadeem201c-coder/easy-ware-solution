'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ParticleField from '@/components/ParticleField';
import CountUp from '@/components/home/CountUp';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

const stats = [
  { num: 500, suffix: '+', label: 'Clients Served' },
  { num: 98,  suffix: '%', label: 'Retention Rate' },
  { num: 10,  suffix: 'yrs', label: 'Experience' },
  { num: 4,   suffix: 'x', label: 'Avg. ROAS' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y       = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={heroRef}
      aria-label="Hero — EasyWhere Solutions digital marketing agency"
      className="noise"
      style={{ minHeight: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--navy)' }}
    >
      <ParticleField />
      <div className="orb" style={{ width: 600, height: 600, background: 'rgba(124,58,237,0.15)', top: '-10%', left: '-15%' }} />
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(6,182,212,0.1)', bottom: '-5%', right: '-10%' }} />
      <motion.div style={{ y: smoothY, opacity, position: 'absolute', inset: 0 }} className="grid-bg" />

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900, padding: '0 32px', paddingTop: 100 }}>
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 24 }}>
            Premium Digital Marketing Agency
          </p>
        </motion.div>

        <motion.h1
          variants={fadeUp} initial="hidden" animate="visible" custom={1}
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24, letterSpacing: '-0.02em' }}
        >
          We Grow Brands<br />
          <span className="grad-text-gold">Beyond Limits</span>
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" animate="visible" custom={2}
          style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--white-dim)', lineHeight: 1.7, maxWidth: 600, margin: '0 auto 40px' }}
        >
          EasyWhere Solutions engineers data-driven marketing ecosystems that transform your digital presence into a growth machine — measurable, scalable, and relentless.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
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

        <motion.div
          variants={fadeUp} initial="hidden" animate="visible" custom={5}
          style={{ display: 'flex', justifyContent: 'center', marginTop: 80, flexWrap: 'wrap' }}
          aria-label="Agency statistics"
        >
          {stats.map((stat, i) => (
            <div key={i} style={{ padding: '24px 40px', borderLeft: i > 0 ? '1px solid rgba(124,58,237,0.15)' : 'none', textAlign: 'center' }}>
              <div className="stat-number grad-text" aria-label={`${stat.num}${stat.suffix} ${stat.label}`}>
                <CountUp target={stat.num} suffix={stat.suffix} />
              </div>
              <div style={{ color: 'var(--white-muted)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
      >
        <span style={{ fontSize: 11, letterSpacing: '0.15em', color: 'var(--white-muted)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--purple-light), transparent)' }} />
      </motion.div>
    </section>
  );
}
