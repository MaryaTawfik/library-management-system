# Backend - Email configuration

This file explains how to configure email for the backend on Render (or locally).

Preferred providers (in order):
1. Resend (if you have an account and API key)
2. SendGrid (recommended for production)
3. SMTP (Gmail App Password or Mailtrap for testing)

Environment variables
- RESEND_API_KEY - (optional) Resend API key. If set and `resend` package installed, Resend is used.
- SENDGRID_API_KEY - (optional) SendGrid API key. If set, SendGrid API is used.
- EMAIL_FROM - (optional) the "from" email address (e.g. no-reply@yourdomain.com).
- EMAIL_USER - SMTP user (fallback)
- EMAIL_PASS - SMTP password (fallback)
- SMTP_HOST - SMTP host (fallback)
- SMTP_PORT - SMTP port (fallback)
- SMTP_SECURE - set to 'true' if using port 465
- BACKEND_URL - public URL of your backend (used for building verification links)
- BASE_URL - frontend URL (used for redirect after verification)

Install dependencies
Run from the `backend` folder:

```
npm install
```

(We added `@sendgrid/mail` as a dependency; install will fetch it.)

Testing on Render
1. Set `SENDGRID_API_KEY` in Render environment (or `RESEND_API_KEY`).
2. (Optional) Set `EMAIL_FROM` to your verified sender address.
3. Redeploy the service.
4. Make a registration request to `/auth/register` and check Render logs for `OTP email sent to` or SendGrid/Resend logs.

Local testing
- Create a `.env` in backend with the same keys.
- Run `npm run dev`.
- Use Postman to POST to `http://localhost:5000/auth/register`.

Troubleshooting
- If you see SMTP connection timeouts on Render, switch to SendGrid or Resend (API-based) as SMTP outbound is often blocked.
- If using Gmail, create a Google App Password (16 characters) and set `EMAIL_PASS` to that.

If you want I can add an example `.env.example` or further automate provider selection.
