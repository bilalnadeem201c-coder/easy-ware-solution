'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomeCTA() {
  return (
    <section aria-labelledby="cta-heading" style={{ padding: '80px 32px 120px', background: 'var(--navy-2)' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
          style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.1))', border: '1px solid rgba(124,58,237,0.3)', borderRadius: 16, padding: 'clamp(40px, 6vw, 80px)', position: 'relative', overflow: 'hidden' }}>
          <div className="orb" style={{ width: 300, height: 300, background: 'rgba(124,58,237,0.12)', top: '-20%', right: '-10%' }} />
          <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 20 }}>Ready to Scale?</p>
          <h2 id="cta-heading" style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 800, marginBottom: 16 }}>
            Let's Build Something <span className="grad-text">Extraordinary</span>
          </h2>
          <p style={{ color: 'var(--white-dim)', fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>
            Join 500+ brands that trust EasyWhere Solutions to drive their digital growth. Your transformation starts with one conversation.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact">
              <button className="btn-primary" style={{ fontSize: 15, padding: '16px 40px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Book a Free Strategy Call</span><ArrowRight size={18} aria-hidden="true" />
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
