'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, Users, Target, BarChart2, Globe, Zap, ChevronRight } from 'lucide-react';

const services = [
  { icon: TrendingUp, title: 'SEO Mastery', desc: 'Dominate search rankings with technical SEO, content optimization, and authority building strategies.', color: '#7c3aed' },
  { icon: Users,      title: 'Social Media', desc: 'Build communities and drive engagement across every platform with data-driven social strategies.', color: '#06b6d4' },
  { icon: Target,     title: 'PPC Advertising', desc: 'Maximize ROI with precision-targeted campaigns across Google, Meta, and programmatic networks.', color: '#a78bfa' },
  { icon: BarChart2,  title: 'Analytics & Growth', desc: 'Turn data into decisions with advanced analytics, attribution modeling, and growth frameworks.', color: '#67e8f9' },
  { icon: Globe,      title: 'Content Strategy', desc: 'Create content that converts — from editorial calendars to multimedia production pipelines.', color: '#7c3aed' },
  { icon: Zap,        title: 'Marketing Automation', desc: 'Deploy intelligent automation workflows that nurture leads and scale your growth 24/7.', color: '#06b6d4' },
];

export default function ServicesPreview() {
  return (
    <section aria-labelledby="services-heading" style={{ padding: '120px 32px', background: 'var(--navy-2)', position: 'relative', overflow: 'hidden' }}>
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(124,58,237,0.06)', top: 0, right: '-5%' }} />
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 64 }}>
          <p className="section-tag" style={{ marginBottom: 16 }}>What We Do</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <h2 id="services-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, lineHeight: 1.1, maxWidth: 500 }}>
              Full-Spectrum Digital <span className="grad-text">Marketing Services</span>
            </h2>
            <Link href="/services">
              <button className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                All Services <ChevronRight size={16} aria-hidden="true" />
              </button>
            </Link>
          </div>
        </motion.div>

        <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, listStyle: 'none', padding: 0 }}>
          {services.map((service, i) => (
            <motion.li key={i} className="cyber-card"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              style={{ padding: 32 }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 8, background: `${service.color}18`, border: `1px solid ${service.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }} aria-hidden="true">
                <service.icon size={22} color={service.color} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{service.title}</h3>
              <p style={{ color: 'var(--white-muted)', fontSize: 14, lineHeight: 1.7 }}>{service.desc}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
