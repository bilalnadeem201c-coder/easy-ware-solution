'use client';
import { motion } from 'framer-motion';

const items = ['SEO', 'Social Media', 'PPC', 'Content', 'Analytics', 'Email', 'Automation', 'Branding', 'Growth Hacking', 'Conversion'];

export default function MarqueeTicker() {
  return (
    <div aria-hidden="true" style={{ background: 'var(--navy-3)', borderTop: '1px solid rgba(124,58,237,0.1)', borderBottom: '1px solid rgba(124,58,237,0.1)', padding: '18px 0', overflow: 'hidden' }}>
      <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{ display: 'flex', whiteSpace: 'nowrap' }}>
        {[...Array(2)].map((_, a) => (
          <div key={a} style={{ display: 'flex' }}>
            {items.map((item, i) => (
              <span key={i} style={{ padding: '0 32px', color: 'var(--white-muted)', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 16 }}>
                {item}<span style={{ color: 'var(--purple)', fontSize: 18 }}>✦</span>
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
