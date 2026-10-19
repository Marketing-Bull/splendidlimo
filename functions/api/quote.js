// Cloudflare Pages Function: POST /api/quote
// Env vars: RESEND_API_KEY, QUOTE_TO (default reservations@splendidlimo.com), QUOTE_FROM (verified Resend sender)
export async function onRequestPost({ request, env }) {
  const json = (o, status = 200) =>
    new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json' } });
  let body;
  try { body = await request.json(); } catch { return json({ error: 'bad request' }, 400); }
  if (body.company) return json({ ok: true }); // honeypot
  const phone = String(body.phone || '').trim();
  if (!/^[+\d\s().-]{7,20}$/.test(phone)) return json({ error: 'invalid phone' }, 400);
  if (!env.RESEND_API_KEY) return json({ error: 'not configured' }, 500);
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.QUOTE_FROM || 'Splendid Limo <quotes@splendidlimo.com>',
      to: [env.QUOTE_TO || 'reservations@splendidlimo.com'],
      subject: 'New quote request',
      text: `Phone: ${phone}\nPage: ${String(body.page || '/').slice(0, 200)}`,
    }),
  });
  return r.ok ? json({ ok: true }) : json({ error: 'send failed' }, 502);
}
