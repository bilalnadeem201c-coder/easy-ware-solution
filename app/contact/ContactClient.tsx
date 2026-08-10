'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare, CalendarDays, AlertCircle } from 'lucide-react';

const services = ['SEO & Organic Growth', 'Social Media Marketing', 'PPC & Paid Advertising', 'Content Marketing', 'Email Marketing', 'Analytics & Reporting', 'E-Commerce Marketing', 'Full-Service Package'];
const budgets = ['Under $1,000/mo', '$1,000 – $2,500/mo', '$2,500 – $5,000/mo', '$5,000 – $10,000/mo', '$10,000+/mo'];

export default function ContactClient() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '140px 32px 80px', textAlign: 'center', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(124,58,237,0.1)', top: '-10%', left: '0%' }} />
        <div className="orb" style={{ width: 350, height: 350, background: 'rgba(6,182,212,0.08)', bottom: '-5%', right: '5%' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 600, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="section-tag" style={{ justifyContent: 'center', marginBottom: 20 }}>Get In Touch</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 20 }}>
              Let's Start Your <span className="grad-text">Growth Journey</span>
            </h1>
            <p style={{ color: 'var(--white-dim)', fontSize: 17, lineHeight: 1.7 }}>
              Fill out the form below and our strategy team will reach out within 24 hours to schedule your free consultation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section style={{ padding: '40px 32px 120px', background: 'var(--navy-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>

          {/* Info panel */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {[
              { icon: Mail,  label: 'Email Us',       value: 'hello@easywhere.com',    sub: 'We reply within 2 hours' },
              { icon: Phone, label: 'Call Us',        value: '+1 (555) 000-1234',      sub: 'Mon–Fri, 9am–6pm EST' },
              { icon: MapPin,label: 'Our Office',     value: '123 Digital Ave, NY',    sub: 'New York, USA' },
              { icon: Clock, label: 'Response Time',  value: 'Under 24 hours',         sub: 'Guaranteed reply' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="cyber-card" style={{ padding: '20px 24px', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={20} color="var(--purple-light)" />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--white-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>{item.value}</div>
                  <div style={{ fontSize: 12, color: 'var(--white-muted)' }}>{item.sub}</div>
                </div>
              </motion.div>
            ))}

            <div className="cyber-card" style={{ padding: 28, marginTop: 24 }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, marginBottom: 16 }}>What Happens Next?</h4>
              {[
                { icon: MessageSquare, text: 'We review your inquiry within 24 hours' },
                { icon: CalendarDays,  text: 'Schedule a free 30-min strategy call' },
                { icon: CheckCircle,   text: 'Receive a custom proposal in 48 hours' },
              ].map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <step.icon size={15} color="var(--cyan)" />
                  </div>
                  <p style={{ color: 'var(--white-dim)', fontSize: 14, lineHeight: 1.5, paddingTop: 6 }}>{step.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="cyber-card" style={{ padding: 64, textAlign: 'center' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle size={36} color="var(--cyan)" />
                  </div>
                </motion.div>
                <h3 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>Message Sent! 🎉</h3>
                <p style={{ color: 'var(--white-dim)', fontSize: 16, lineHeight: 1.7, maxWidth: 400, margin: '0 auto 24px' }}>
                  Thank you for reaching out! Our team will review your inquiry and get back to you within 24 hours.
                </p>
                <div style={{ padding: '20px 24px', background: 'rgba(124,58,237,0.1)', borderRadius: 8, border: '1px solid rgba(124,58,237,0.2)' }}>
                  <p style={{ color: 'var(--purple-light)', fontSize: 14, margin: 0 }}>
                    📧 Confirmation email sent to <strong>{form.email}</strong>
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="cyber-card" style={{ padding: 40 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Send Us a Message</h2>
                <p style={{ color: 'var(--white-muted)', fontSize: 14, marginBottom: 32 }}>Tell us about your project and goals — the more detail, the better!</p>

                {/* Error banner */}
                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '14px 18px', marginBottom: 24 }}>
                    <AlertCircle size={18} color="#f87171" />
                    <p style={{ color: '#f87171', fontSize: 14, margin: 0 }}>{error}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    {[
                      { field: 'name',    label: 'Full Name',     placeholder: 'John Smith',         type: 'text',  required: true },
                      { field: 'email',   label: 'Email Address', placeholder: 'john@company.com',   type: 'email', required: true },
                      { field: 'company', label: 'Company Name',  placeholder: 'Acme Inc.',          type: 'text',  required: false },
                      { field: 'phone',   label: 'Phone Number',  placeholder: '+1 (555) 000-0000',  type: 'tel',   required: false },
                    ].map(({ field, label, placeholder, type, required }) => (
                      <div key={field}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--white-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                          {label} {required && <span style={{ color: 'var(--cyan)' }}>*</span>}
                        </label>
                        <input type={type} className="cyber-input" placeholder={placeholder}
                          value={form[field as keyof typeof form]}
                          onChange={e => setForm({ ...form, [field]: e.target.value })}
                          required={required} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--white-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Service Needed</label>
                      <select className="cyber-input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                        <option value="">Select a service...</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--white-muted)', textTransform: 'uppercase', marginBottom: 8 }}>Monthly Budget</label>
                      <select className="cyber-input" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                        <option value="">Select budget range...</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', color: 'var(--white-muted)', textTransform: 'uppercase', marginBottom: 8 }}>
                      Tell Us About Your Project <span style={{ color: 'var(--cyan)' }}>*</span>
                    </label>
                    <textarea className="cyber-input" placeholder="Describe your goals, current challenges, and what success looks like for you..."
                      rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{ resize: 'vertical' }} required />
                  </div>

                  <button type="submit" className="btn-primary" disabled={loading}
                    style={{ width: '100%', fontSize: 15, padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: loading ? 0.8 : 1 }}>
                    <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    {loading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                        <Send size={18} />
                      </motion.div>
                    ) : <Send size={18} />}
                  </button>

                  <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--white-muted)', marginTop: 16 }}>
                    🔒 Your information is private and will never be shared.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <style>{`@media (max-width: 768px) { section > div { grid-template-columns: 1fr !important; } }`}</style>
    </>
  );
}
