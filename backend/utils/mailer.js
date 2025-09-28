const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Nodemailer transporter (fallback)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: { rejectUnauthorized: false },
  connectionTimeout: 10 * 1000,
  greetingTimeout: 10 * 1000,
});

let sgMail = null;
if (process.env.SENDGRID_API_KEY) {
  try {
    sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  } catch (e) {
    console.warn('SendGrid module not installed. To use SendGrid set SENDGRID_API_KEY and install @sendgrid/mail');
    sgMail = null;
  }
}

let ResendClient = null;
if (process.env.RESEND_API_KEY) {
  try {
    const { Resend } = require('resend');
    ResendClient = new Resend(process.env.RESEND_API_KEY);
  } catch (e) {
    console.warn('Resend module not installed or failed to init. To use Resend set RESEND_API_KEY and install resend');
    ResendClient = null;
  }
}

const sendEmail = async (to, subject, text, html) => {
  if (ResendClient) {
    try {
      return await ResendClient.emails.send({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'onboarding@resend.dev',
        to,
        subject,
        html: html || `<pre>${text || ''}</pre>`,
      });
    } catch (err) {
      console.error('Resend send error:', err && (err.stack || err.message || err));
    }
  }

  if (process.env.SENDGRID_API_KEY && sgMail) {
    try {
      const msg = {
        to,
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        subject,
        text: text || undefined,
        html: html || undefined,
      };
      return await sgMail.send(msg);
    } catch (err) {
      console.error('SendGrid send error:', err && (err.stack || err.message || err));
      throw err;
    }
  }

  try {
    return await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('Nodemailer send error:', err && (err.stack || err.message || err));
    throw err;
  }
};

module.exports = {
  sendEmail,
  generateOTP: () => crypto.randomInt(0, 1000000).toString().padStart(6, '0'),
};
