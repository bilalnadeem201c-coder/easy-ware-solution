'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import {
  Zap, ShieldCheck, Smartphone, RefreshCw,
  Bug, ArrowRight, Gauge, Server, CheckCircle2,
} from 'lucide-react';
import { features } from 'process';

/* ── Services ─────────────────────────────────────────── */
const services = [
  {
    icon: Gauge, color: '#7c3aed', tag: 'Performance',
    title: 'Speed & Core Web Vitals',
    desc: 'Slow pages kill conversions. We audit and fix LCP, CLS, and FID scores, compress assets, implement lazy loading, and tune your server response so your site ranks higher and loads in under 2 seconds.',
    features: ['PageSpeed Audit', 'Image Compression', 'Lazy Loading', 'Caching Strategy', 'CDN Setup', 'Core Web Vitals'],
  },
  {
    icon: Bug, color: '#06b6d4', tag: 'Debugging',
    title: 'Bug Fixing & Error Resolution',
    desc: 'Broken layouts, JavaScript errors, form failures, 404s — we track down every bug and squash it fast. No guesswork, no temporary patches, just clean permanent fixes with full root-cause analysis.',
    features: ['JS Console Errors', 'Broken Links', 'Form Issues', 'Layout Breaks', 'API Failures', 'Cross-Browser Fixes'],
  },
  {
    icon: RefreshCw, color: '#a78bfa', tag: 'Redesign',
    title: 'Website Redesign & Modernisation',
    desc: 'Your outdated site is costing you leads. We redesign with conversion psychology, modern UI systems, and brand-aligned visuals that make visitors stay, explore, and take action.',
    features: ['UI/UX Overhaul', 'Brand Alignment', 'Conversion Design', 'Component Library', 'Mobile-First', 'A/B Testing'],
  },
  {
    icon: ShieldCheck, color: '#67e8f9', tag: 'Security',
    title: 'Security & Ongoing Maintenance',
    desc: 'Hacked sites, expired SSL certs, and outdated plugins are silent business killers. We lock down vulnerabilities, automate backups, and keep everything updated so you never worry about downtime.',
    features: ['SSL Management', 'Malware Removal', 'Plugin Updates', 'Automated Backups', 'Uptime Monitoring', 'Firewall Setup'],
  },
  {
    icon: Smartphone, color: '#7c3aed', tag: 'Responsive',
    title: 'Mobile Responsiveness Fixes',
    desc: "Over 60% of traffic is mobile. If your site looks broken on phones or tablets, you're losing business every hour. We fix every breakpoint and test across 20+ real device sizes.",
    features: ['Breakpoint Audit', 'Touch Targets', 'Viewport Fixes', 'Font Scaling', 'Navigation UX', 'Device Testing'],
  },
  {
    icon: Server, color: '#06b6d4', tag: 'Migration',
    title: 'Platform Migration & CMS Setup',
    desc: 'Moving from WordPress to Next.js, Wix to Shopify, or anything in between — we migrate your entire site without SEO loss, data corruption, or downtime. Clean handoff, zero headaches.',
    features: ['Zero Downtime Migration', 'SEO Preservation', 'Data Transfer', 'CMS Configuration', 'Redirect Mapping', 'Post-Launch QA'],
  },
];

/* ── Stats ─────────────────────────────────────────────── */
const stats = [
  { value: '200+', label: 'Websites Fixed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '<48h', label: 'Avg. Turnaround' },
  { value: '3×', label: 'Avg. Speed Improvement' },
];

/* ── Animated Orb Globe (CSS 3D) ───────────────────────── */
function Globe3D() {
  return (
    <div style={{ position: 'relative', width: 340, height: 340, margin: '0 auto' }}>
      {/* Outer glow ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: '1.5px dashed rgba(124,58,237,0.35)',
        }}
      />
      {/* Mid ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        style={{
          position: 'absolute', inset: 24,
          borderRadius: '50%',
          border: '1px solid rgba(6,182,212,0.3)',
        }}
      />
      {/* Core sphere */}
      <div style={{
        position: 'absolute', inset: 60,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, rgba(124,58,237,0.5), rgba(6,182,212,0.15) 60%, transparent)',
        boxShadow: '0 0 60px rgba(124,58,237,0.25), inset 0 0 40px rgba(124,58,237,0.1)',
        border: '1px solid rgba(124,58,237,0.4)',
      }} />
      {/* Latitude lines */}
      {[0.3, 0.5, 0.7].map((pct, i) => (
        <motion.div key={i}
          animate={{ scaleX: [1, 0.6, 1] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
          style={{
            position: 'absolute',
            left: 60, right: 60,
            top: `${pct * 100}%`,
            height: 1,
            background: `rgba(124,58,237,${0.2 - i * 0.05})`,
            borderRadius: 99,
            transformOrigin: 'center',
          }}
        />
      ))}
      {/* Orbiting dot */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 10, borderRadius: '50%' }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: 0,
          width: 10, height: 10, borderRadius: '50%',
          background: '#7c3aed',
          boxShadow: '0 0 12px #7c3aed',
          transform: 'translateY(-50%)',
        }} />
      </motion.div>
      {/* Second orbiting dot */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', inset: 30, borderRadius: '50%' }}
      >
        <div style={{
          position: 'absolute', top: 0, left: '50%',
          width: 7, height: 7, borderRadius: '50%',
          background: '#06b6d4',
          boxShadow: '0 0 10px #06b6d4',
          transform: 'translateX(-50%)',
        }} />
      </motion.div>
      {/* Pulse rings */}
      {[0, 1].map(i => (
        <motion.div key={i}
          animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: i * 1.25 }}
          style={{
            position: 'absolute', inset: 55,
            borderRadius: '50%',
            border: '1px solid rgba(124,58,237,0.4)',
          }}
        />
      ))}
      {/* Label badges */}
      <motion.div
        animate={{ y: [-4, 4, -4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: 20, right: 10,
          background: 'rgba(13,13,26,0.9)', border: '1px solid rgba(124,58,237,0.4)',
          borderRadius: 8, padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 6,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Zap size={12} color="#7c3aed" />
        <span style={{ fontSize: 11, color: '#a78bfa', fontWeight: 600 }}>Speed +180%</span>
      </motion.div>
      <motion.div
        animate={{ y: [4, -4, 4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', bottom: 30, left: 5,
          background: 'rgba(13,13,26,0.9)', border: '1px solid rgba(6,182,212,0.35)',
          borderRadius: 8, padding: '6px 10px',
          display: 'flex', alignItems: 'center', gap: 6,
          backdropFilter: 'blur(10px)',
        }}
      >
        <CheckCircle2 size={12} color="#06b6d4" />
        <span style={{ fontSize: 11, color: '#67e8f9', fontWeight: 600 }}>Bugs Fixed</span>
      </motion.div>
    </div>
  );
}

/* ── Stat card ─────────────────────────────────────────── */
function StatCard({ value, label }: { value: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        textAlign: 'center', padding: '32px 24px',
        background: 'rgba(124,58,237,0.06)',
        border: '1px solid rgba(124,58,237,0.18)',
        borderRadius: 12,
      }}
    >
      <div style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        {value}
      </div>
      <div style={{ fontSize: 13, color: 'var(--white-muted)', marginTop: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
        {label}
      </div>
    </motion.div>
  );
}

/* ── Main component ────────────────────────────────────── */
export default function WebsiteFixationClient() {
  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '140px 32px 80px', background: 'var(--navy)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className="orb" style={{ width: 600, height: 600, background: 'rgba(124,58,237,0.1)', top: '-20%', right: '-10%' }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(6,182,212,0.07)', bottom: '-10%', left: '-5%' }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          {/* Left copy */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-tag" style={{ marginBottom: 20 }}>Website Fixation</p>
            <h1 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 24 }}>
              Your Website,<br />
              <span className="grad-text">Fully Restored.</span>
            </h1>
            <p style={{ color: 'var(--white-dim)', fontSize: 17, lineHeight: 1.8, marginBottom: 36, maxWidth: 480 }}>
              Slow load times, broken layouts, security gaps, outdated design — we diagnose every problem and fix it fast. No fluff, no bloat, just a website that performs the way your business deserves.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/contact">
                <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <span>Get a Free Audit</span><ArrowRight size={16} />
                </button>
              </Link>
              <Link href="#services" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px', borderRadius: 8,
                border: '1px solid rgba(124,58,237,0.35)',
                color: 'var(--white-dim)', fontSize: 14, textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}>
                View Services
              </Link>
            </div>
          </motion.div>

          {/* Right 3D globe */}
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="hidden-mobile">
            <Globe3D />
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '64px 32px', background: 'var(--navy-2)', borderTop: '1px solid rgba(124,58,237,0.12)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 20 }}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ padding: '100px 32px', background: 'var(--navy)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>What We Fix</p>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700 }}>
              Every Problem. <span className="grad-text">Every Solution.</span>
            </h2>
            <p style={{ color: 'var(--white-muted)', marginTop: 16, fontSize: 16, maxWidth: 520, margin: '16px auto 0' }}>
              Six specialist fixation services, one team that actually understands your site.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gap: 24 }}>
            {services.map((svc, i) => (
              <motion.article key={i} className="cyber-card"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.08 }}
                style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: `${svc.color}18`, border: `1px solid ${svc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svc.icon size={24} color={svc.color} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: svc.color, textTransform: 'uppercase', background: `${svc.color}15`, padding: '4px 10px', borderRadius: 4 }}>{svc.tag}</span>
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{svc.title}</h2>
                  <p style={{ color: 'var(--white-muted)', lineHeight: 1.75, fontSize: 15 }}>{svc.desc}</p>
                  <Link href="/contact" style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 6, color: svc.color, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}>
                    Fix This Now <ArrowRight size={14} />
                  </Link>
                </div>
                <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, listStyle: 'none', padding: 0 }}>
                  {svc.features.map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: svc.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: 'var(--white-dim)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ padding: '100px 32px', background: 'var(--navy-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>How We Work</p>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700 }}>
              Fixed in <span className="grad-text">4 Steps</span>
            </h2>
          </motion.div>
          <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 2, listStyle: 'none', padding: 0 }}>
            {[
              { num: '01', title: 'Diagnose', desc: 'We run a full audit — performance, security, SEO, UX, and code quality — and send you a prioritised fix list within 24 hours.' },
              { num: '02', title: 'Quote', desc: 'You get a flat-rate quote per fix. No hourly billing surprises, no scope creep, just transparent pricing before we touch anything.' },
              { num: '03', title: 'Fix', desc: 'Our engineers fix every issue on a staging environment first, then deploy to production after your sign-off. Zero downtime guaranteed.' },
              { num: '04', title: 'Monitor', desc: 'Post-fix we monitor uptime, speed scores, and security for 30 days and resolve any regressions at no extra cost.' },
            ].map((step, i) => (
              <motion.li key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '40px 32px', background: 'var(--navy-3)', borderTop: '2px solid transparent', borderImage: 'linear-gradient(90deg,#7c3aed,#06b6d4) 1' }}>
                <div style={{ fontSize: 'clamp(3rem,5vw,4rem)', fontWeight: 800, color: 'rgba(124,58,237,0.15)', lineHeight: 1, marginBottom: 16, fontFamily: 'var(--font-display)' }}>{step.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: 'var(--white-muted)', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 32px 120px', background: 'var(--navy)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, marginBottom: 20 }}>
            Ready to <span className="grad-text">Fix Your Site?</span>
          </h2>
          <p style={{ color: 'var(--white-dim)', marginBottom: 36, fontSize: 16 }}>
            Free audit. Flat-rate pricing. No long-term contracts.
          </p>
          <Link href="/contact">
            <button className="btn-primary" style={{ fontSize: 15, padding: '16px 40px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Get Free Website Audit</span><ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          article.cyber-card { grid-template-columns: 1fr !important; gap: 24px !important; padding: 28px !important; }
          section > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}