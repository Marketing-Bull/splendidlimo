// Vercel Function: POST /api/quote
// Env vars: RESEND_API_KEY, QUOTE_TO (default reservations@splendidlimo.com), QUOTE_FROM (verified Resend sender)
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const body = req.body && typeof req.body === 'object' ? req.body : {};
  if (body.company) return res.status(200).json({ ok: true }); // honeypot
  const phone = String(body.phone || '').trim();
  if (!/^[+\d\s().-]{7,20}$/.test(phone)) return res.status(400).json({ error: 'invalid phone' });
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'not configured' });
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM || 'Splendid Limo <quotes@splendidlimo.com>',
      to: [process.env.QUOTE_TO || 'reservations@splendidlimo.com'],
      subject: 'New quote request',
      text: `Phone: ${phone}\nPage: ${String(body.page || '/').slice(0, 200)}`,
    }),
  });
  return r.ok ? res.status(200).json({ ok: true }) : res.status(502).json({ error: 'send failed' });
}
