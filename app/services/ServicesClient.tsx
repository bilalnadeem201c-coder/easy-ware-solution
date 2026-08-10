'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Users, Target, BarChart2, Globe, Mail, Video, ShoppingCart, ArrowRight } from 'lucide-react';

const mainServices = [
  { icon: Search,       title: 'SEO & Organic Growth',          color: '#7c3aed', tag: 'Foundation',  desc: 'We engineer search dominance through technical excellence, content authority, and advanced link-building ecosystems. Our SEO strategies are built for longevity — not quick wins that disappear with algorithm updates.', features: ['Technical SEO Audits', 'Keyword Architecture', 'Content Optimization', 'Link Building', 'Core Web Vitals', 'Local SEO'] },
  { icon: Users,        title: 'Social Media Marketing',         color: '#06b6d4', tag: 'Engagement',  desc: 'Transform your social channels into community powerhouses. We craft platform-specific strategies that build genuine audiences, drive meaningful engagement, and convert followers into loyal customers.', features: ['Platform Strategy', 'Content Creation', 'Community Management', 'Influencer Partnerships', 'Social Commerce', 'Paid Social'] },
  { icon: Target,       title: 'PPC & Paid Advertising',         color: '#a78bfa', tag: 'Performance', desc: 'Precision-targeted campaigns engineered for maximum ROI. From Google Search to programmatic display, we deploy advanced bidding strategies and creative optimization to make every dollar work harder.', features: ['Google Ads', 'Meta Advertising', 'Programmatic Display', 'Shopping Campaigns', 'Retargeting', 'YouTube Ads'] },
  { icon: BarChart2,    title: 'Analytics & Data Intelligence',  color: '#67e8f9', tag: 'Insights',    desc: 'Turn raw data into competitive advantage. Our analytics team builds comprehensive measurement frameworks, attribution models, and real-time dashboards that reveal exactly what drives your growth.', features: ['GA4 Implementation', 'Custom Dashboards', 'Attribution Modeling', 'Conversion Optimization', 'A/B Testing', 'Predictive Analytics'] },
  { icon: Globe,        title: 'Content Marketing',              color: '#7c3aed', tag: 'Authority',   desc: 'Build thought leadership and organic reach through strategic content production. From editorial strategy to multimedia creation, we produce content ecosystems that educate, engage, and convert.', features: ['Content Strategy', 'Blog & Editorial', 'Video Production', 'Infographics', 'Whitepapers', 'Podcast Strategy'] },
  { icon: Mail,         title: 'Email & Marketing Automation',   color: '#06b6d4', tag: 'Retention',   desc: 'Deploy intelligent automation that nurtures leads through every funnel stage. Our email programs generate industry-leading open rates by combining behavioral triggers with personalized messaging.', features: ['Email Design', 'Automation Flows', 'List Segmentation', 'Drip Campaigns', 'CRM Integration', 'Performance Testing'] },
  { icon: ShoppingCart, title: 'E-Commerce Marketing',           color: '#a78bfa', tag: 'Revenue',     desc: 'End-to-end e-commerce growth strategies that increase product visibility, optimize the purchase journey, and maximize customer lifetime value across all digital channels.', features: ['Product Feed Optimization', 'Shopping Ads', 'Cart Abandonment', 'Review Strategy', 'Loyalty Programs', 'ROAS Optimization'] },
  { icon: Video,        title: 'Video & Creative Production',    color: '#67e8f9', tag: 'Creative',    desc: 'Cinematic brand storytelling that stops the scroll. From concept to delivery, our creative team produces video content that captures attention and drives action across every platform.', features: ['Brand Films', 'Social Video', 'Ad Creative', 'Motion Graphics', 'Product Videos', 'Live Streaming'] },
];

const process = [
  { num: '01', title: 'Discovery', desc: 'Deep dive into your brand, audience, competitors, and goals to uncover untapped opportunities.' },
  { num: '02', title: 'Strategy',  desc: 'Custom marketing blueprint aligned to your KPIs with clear milestones and accountability metrics.' },
  { num: '03', title: 'Execution', desc: 'Rapid deployment of campaigns, content, and systems by our specialized marketing teams.' },
  { num: '04', title: 'Optimize',  desc: 'Continuous testing, analysis, and iteration to compound results and maximize every budget dollar.' },
];

export default function ServicesClient() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="services-hero-heading" style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 32px 80px', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="orb" style={{ width: 500, height: 500, background: 'rgba(124,58,237,0.12)', top: '-20%', left: '-10%' }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(6,182,212,0.08)', bottom: '-10%', right: '-5%' }} />
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 20 }}>Our Services</p>
            <h1 id="services-hero-heading" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: 20 }}>
              Every Channel.<br /><span className="grad-text">Every Strategy.</span>
            </h1>
            <p style={{ color: 'var(--white-dim)', fontSize: 18, lineHeight: 1.7 }}>
              A full-service digital marketing powerhouse built to accelerate brands at every stage of growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section aria-label="Our digital marketing services" style={{ padding: '80px 32px', background: 'var(--navy-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
          {mainServices.map((service, i) => (
            <motion.article key={i} className="cyber-card"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 10, background: `${service.color}18`, border: `1px solid ${service.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
                    <service.icon size={24} color={service.color} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', color: service.color, textTransform: 'uppercase', background: `${service.color}15`, padding: '4px 10px', borderRadius: 4 }}>{service.tag}</span>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>{service.title}</h2>
                <p style={{ color: 'var(--white-muted)', lineHeight: 1.75, fontSize: 15 }}>{service.desc}</p>
                <Link href="/contact" style={{ marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 6, color: service.color, fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em' }}>
                  Get Started <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
              <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, listStyle: 'none', padding: 0 }}>
                {service.features.map((f, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.03)', borderRadius: 6, padding: '10px 14px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: service.color, flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: 13, color: 'var(--white-dim)' }}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" style={{ padding: '100px 32px', background: 'var(--navy)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 64 }}>
            <p className="section-tag" style={{ justifyContent: 'center', marginBottom: 16 }}>How We Work</p>
            <h2 id="process-heading" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700 }}>
              Our <span className="grad-text">Process</span>
            </h2>
          </motion.div>
          <ol style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2, listStyle: 'none', padding: 0 }}>
            {process.map((step, i) => (
              <motion.li key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '40px 32px', background: 'var(--navy-3)', borderTop: '2px solid transparent', borderImage: 'linear-gradient(90deg, #7c3aed, #06b6d4) 1' }}>
                <div style={{ fontSize: 'clamp(3rem, 5vw, 4rem)', fontWeight: 800, color: 'rgba(124,58,237,0.15)', lineHeight: 1, marginBottom: 16, fontFamily: 'var(--font-display)' }} aria-hidden="true">{step.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>{step.title}</h3>
                <p style={{ color: 'var(--white-muted)', fontSize: 14, lineHeight: 1.7 }}>{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 32px 120px', background: 'var(--navy-2)', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: 20 }}>
            Ready to <span className="grad-text">Get Started?</span>
          </h2>
          <p style={{ color: 'var(--white-dim)', marginBottom: 36, fontSize: 16 }}>Let's build your custom marketing strategy today.</p>
          <Link href="/contact">
            <button className="btn-primary" style={{ fontSize: 15, padding: '16px 40px', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span>Book Free Consultation</span><ArrowRight size={18} aria-hidden="true" />
            </button>
          </Link>
        </motion.div>
      </section>

      <style>{`@media (max-width: 768px) { article.cyber-card { grid-template-columns: 1fr !important; gap: 24px !important; padding: 28px !important; } }`}</style>
    </>
  );
}
