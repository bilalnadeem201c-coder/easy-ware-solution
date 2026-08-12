'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronDown, Megaphone, Wrench } from 'lucide-react';

const servicesDropdown = [
  { href: '/services', label: 'Digital Marketing', icon: Megaphone, desc: 'SEO, PPC, Social & more' },
  { href: '/website-fixation', label: 'Website Fixation', icon: Wrench, desc: 'Speed, bugs & redesigns' },
];

const links = [
  { href: '/', label: 'Home' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isServicesActive = pathname === '/services' || pathname === '/website-fixation';

  return (
    <>
      {/* Animated Glow Border Layer */}
      <div
        className="nav-glow-wrapper"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          height: scrolled ? '61px' : '81px',
          transition: 'height 0.4s ease',
          pointerEvents: 'none',
        }}
      >
        <div className="nav-glow-rotate" />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '14px 0' : '24px 0',
          background: scrolled ? 'rgba(13,13,26,0.96)' : 'rgba(13,13,26,0.4)',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.2)' : 'blur(8px)',
          borderBottom: scrolled 
            ? '1px solid rgba(6,182,212,0.25)' 
            : '1px solid rgba(6,182,212,0.08)',
          boxShadow: scrolled
            ? '0 0 20px rgba(6,182,212,0.15), 0 0 60px rgba(59,130,246,0.08), inset 0 1px 0 rgba(255,255,255,0.05)'
            : '0 0 0 transparent',
          transition: 'all 0.4s ease',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img 
              src="/ewslogo.png" 
              alt="EasyWhere Solutions" 
              style={{ width: 34, height: 34, borderRadius: 6, objectFit: 'contain' }} 
            />
            <div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: 'var(--white)', letterSpacing: '0.02em' }}>
                EasyWhere
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 16, color: 'var(--cyan)', marginLeft: 4 }}>
                Solutions
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <div style={{ display: 'flex', gap: 40, alignItems: 'center' }} className="hidden-mobile">

            {/* Home */}
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>

            {/* Services Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setServicesOpen(o => !o)}
                className={`nav-link ${isServicesActive ? 'active' : ''}`}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 4, padding: 0,
                  fontFamily: 'inherit',
                }}
              >
                Services
                <ChevronDown
                  size={14}
                  style={{ transition: 'transform 0.25s', transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: 'absolute', top: 'calc(100% + 16px)', left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(13,13,26,0.97)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(124,58,237,0.25)',
                      borderRadius: 12,
                      padding: '8px',
                      minWidth: 240,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    }}
                  >
                    {servicesDropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setServicesOpen(false)}
                        style={{ textDecoration: 'none' }}
                      >
                        <div
                          style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            padding: '12px 14px', borderRadius: 8,
                            background: pathname === item.href ? 'rgba(124,58,237,0.12)' : 'transparent',
                            transition: 'background 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.1)')}
                          onMouseLeave={e => (e.currentTarget.style.background = pathname === item.href ? 'rgba(124,58,237,0.12)' : 'transparent')}
                        >
                          <div style={{
                            width: 34, height: 34, borderRadius: 8,
                            background: 'rgba(124,58,237,0.15)',
                            border: '1px solid rgba(124,58,237,0.25)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <item.icon size={16} color="#7c3aed" />
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)', lineHeight: 1.2 }}>{item.label}</div>
                            <div style={{ fontSize: 12, color: 'var(--white-muted)', marginTop: 2 }}>{item.desc}</div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Contact */}
            <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>

            <Link href="/contact">
              <button className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>
                <span>Get Started</span>
              </button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-only"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', padding: 4 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 72, left: 0, right: 0, zIndex: 999,
              background: 'rgba(13,13,26,0.97)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(124,58,237,0.2)',
              padding: '24px 32px 32px',
            }}
          >
            {/* Home */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }} style={{ marginBottom: 20 }}>
              <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`} style={{ fontSize: 18 }} onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </motion.div>

            {/* Services accordion */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.07 }} style={{ marginBottom: 20 }}>
              <button
                onClick={() => setMobileServicesOpen(o => !o)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 18, color: isServicesActive ? '#7c3aed' : 'var(--white-dim)',
                  fontFamily: 'inherit', padding: 0,
                }}
              >
                Services
                <ChevronDown size={16} style={{ transition: 'transform 0.25s', transform: mobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden', marginTop: 12, paddingLeft: 16, borderLeft: '2px solid rgba(124,58,237,0.3)' }}
                  >
                    {servicesDropdown.map((item, i) => (
                      <motion.div key={item.href} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} style={{ marginBottom: 16 }}>
                        <Link
                          href={item.href}
                          onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                          style={{ textDecoration: 'none' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <item.icon size={15} color="#7c3aed" />
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 600, color: pathname === item.href ? '#7c3aed' : 'var(--white)' }}>{item.label}</div>
                              <div style={{ fontSize: 12, color: 'var(--white-muted)' }}>{item.desc}</div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.14 }} style={{ marginBottom: 20 }}>
              <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`} style={{ fontSize: 18 }} onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </motion.div>

            <Link href="/contact" onClick={() => setMobileOpen(false)}>
              <button className="btn-primary" style={{ width: '100%', marginTop: 8 }}>
                <span>Get Started</span>
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }

        /* Animated crystal glow border */
        .nav-glow-wrapper {
          overflow: hidden;
        }
        .nav-glow-rotate {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(6, 182, 212, 0.4) 60deg,
            rgba(59, 130, 246, 0.6) 120deg,
            rgba(124, 58, 237, 0.4) 180deg,
            rgba(6, 182, 212, 0.4) 240deg,
            rgba(59, 130, 246, 0.6) 300deg,
            transparent 360deg
          );
          animation: navGlowSpin 4s linear infinite;
          filter: blur(8px);
        }
        .nav-glow-wrapper::after {
          content: '';
          position: absolute;
          inset: 1.5px;
          background: rgba(13, 13, 26, 0.98);
          z-index: 1;
        }
        @keyframes navGlowSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Subtle shimmer on the navbar bottom border */
        @keyframes borderShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}