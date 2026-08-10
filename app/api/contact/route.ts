import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, service, budget, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email and message are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Send notification email TO you (the agency)
    await resend.emails.send({
      from: `EasyWhere Contact Form <${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL!,
      replyTo: email,
      subject: `🚀 New Lead: ${name} — ${service || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d0d1a; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
            .card { background: #13132a; border: 1px solid rgba(124,58,237,0.3); border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 32px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 700; }
            .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px; }
            .body { padding: 32px; }
            .row { display: flex; gap: 0; margin-bottom: 0; }
            .field { padding: 14px 0; border-bottom: 1px solid rgba(124,58,237,0.1); }
            .label { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #06b6d4; margin-bottom: 4px; }
            .value { font-size: 15px; color: #f0f0ff; }
            .message-box { background: rgba(124,58,237,0.08); border: 1px solid rgba(124,58,237,0.2); border-radius: 8px; padding: 16px; margin-top: 20px; }
            .message-box .label { color: #a78bfa; }
            .message-box .value { color: #f0f0ff; line-height: 1.6; white-space: pre-wrap; }
            .footer { padding: 20px 32px; text-align: center; border-top: 1px solid rgba(124,58,237,0.1); }
            .footer p { color: rgba(240,240,255,0.35); font-size: 12px; margin: 0; }
            .badge { display: inline-block; background: rgba(6,182,212,0.15); border: 1px solid rgba(6,182,212,0.3); color: #06b6d4; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; margin-top: 8px; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <h1>⚡ New Contact Form Submission</h1>
                <p>EasyWhere Solutions — Lead Notification</p>
              </div>
              <div class="body">
                <div class="field">
                  <div class="label">Full Name</div>
                  <div class="value">${name}</div>
                </div>
                <div class="field">
                  <div class="label">Email Address</div>
                  <div class="value"><a href="mailto:${email}" style="color:#06b6d4;text-decoration:none;">${email}</a></div>
                </div>
                ${company ? `<div class="field"><div class="label">Company</div><div class="value">${company}</div></div>` : ''}
                ${phone ? `<div class="field"><div class="label">Phone</div><div class="value">${phone}</div></div>` : ''}
                ${service ? `<div class="field"><div class="label">Service Interested In</div><div class="value"><span class="badge">${service}</span></div></div>` : ''}
                ${budget ? `<div class="field"><div class="label">Monthly Budget</div><div class="value">${budget}</div></div>` : ''}
                <div class="message-box">
                  <div class="label">Message</div>
                  <div class="value">${message}</div>
                </div>
              </div>
              <div class="footer">
                <p>Received on ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <p style="margin-top:4px;">Reply directly to this email to respond to ${name}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send confirmation email TO the person who filled the form
    await resend.emails.send({
      from: `EasyWhere Solutions <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: `Thanks ${name}! We received your message ✅`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d0d1a; margin: 0; padding: 0; }
            .wrapper { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
            .card { background: #13132a; border: 1px solid rgba(124,58,237,0.3); border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 40px 32px; text-align: center; }
            .header h1 { color: white; margin: 0; font-size: 24px; font-weight: 700; }
            .header p { color: rgba(255,255,255,0.85); margin: 12px 0 0; font-size: 15px; line-height: 1.5; }
            .body { padding: 40px 32px; }
            .body p { color: rgba(240,240,255,0.75); font-size: 15px; line-height: 1.7; margin: 0 0 16px; }
            .step { margin-bottom: 20px; padding-left: 4px; }
            .step-num { color: #a78bfa; font-size: 15px; font-weight: 700; }
            .step-title { color: #f0f0ff; font-weight: 600; font-size: 14px; }
            .step-desc { color: rgba(240,240,255,0.75); font-size: 14px; line-height: 1.6; margin: 2px 0 0; }
            .cta { text-align: center; margin: 32px 0 0; }
            .cta a { display: inline-block; background: linear-gradient(135deg, #7c3aed, #06b6d4); color: white; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px; }
            .footer { padding: 20px 32px; text-align: center; border-top: 1px solid rgba(124,58,237,0.1); }
            .footer p { color: rgba(240,240,255,0.3); font-size: 12px; margin: 0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="card">
              <div class="header">
                <h1>🎉 We Got Your Message!</h1>
                <p>Hi ${name}, thank you for reaching out to EasyWhere Solutions. We're excited to learn more about your project!</p>
              </div>
              <div class="body">
                <p>Our strategy team has received your inquiry and will review it shortly. Here's what happens next:</p>
                <div class="step">
                  <div class="step-num">1. <span class="step-title">We review your inquiry</span></div>
                  <div class="step-desc">Within 24 hours, our team will carefully review your project details and goals.</div>
                </div>
                <div class="step">
                  <div class="step-num">2. <span class="step-title">Free strategy call</span></div>
                  <div class="step-desc">We'll reach out to schedule a free 30-minute strategy session tailored to your needs.</div>
                </div>
                <div class="step">
                  <div class="step-num">3. <span class="step-title">Custom proposal</span></div>
                  <div class="step-desc">You'll receive a detailed marketing proposal with clear goals and pricing within 48 hours.</div>
                </div>
                <div class="cta">
                  <a href="https://easywhere-solutions.com">Visit Our Website</a>
                </div>
              </div>
              <div class="footer">
                <p>EasyWhere Solutions · hello@easywhere.com · New York, NY</p>
                <p style="margin-top:4px;">You received this because you submitted a form on our website.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 });
  }
}
