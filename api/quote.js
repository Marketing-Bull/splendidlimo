// Vercel Function: POST /api/quote  ->  emails the lead to the business via Resend.
// Env vars: RESEND_API_KEY (required), QUOTE_TO (default splendidlimoboca@gmail.com),
//           QUOTE_FROM (default "Splendid Limo Leads <leads@getmarketingbull.com>")
const SERVICES = {
  airport: 'Airport / jet transfer',
  nightlife: 'Night out / party bus',
  business: 'Business / executive',
  event: 'Wedding / event / birthday',
  other: 'Something else',
};
const hits = new Map();

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const dec = (s) => { try { return decodeURIComponent(s || ''); } catch { return s || ''; } };

function touch(t) {
  if (!t || typeof t !== 'object') return null;
  const utm = {};
  for (const [k, v] of Object.entries(t.utm || {}).slice(0, 12)) utm[clean(k, 30)] = clean(v, 120);
  return { at: clean(t.at, 40), landing: clean(t.landing, 300), referrer: clean(t.referrer, 300), utm };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'method not allowed' });
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  if (b.company) return res.status(200).json({ ok: true }); // honeypot
  const elapsed = Number(b.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < 1500) return res.status(200).json({ ok: true }); // bots post instantly

  const ip = clean((req.headers['x-forwarded-for'] || '').split(',')[0] || req.socket?.remoteAddress, 60);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ error: 'too many requests' });
  hits.set(ip, [...recent, now]);

  const phone = clean(b.phone, 30);
  if (!/^[+\d\s().-]+$/.test(phone) || phone.replace(/\D/g, '').length < 10) return res.status(400).json({ error: 'invalid phone' });
  if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'not configured' });

  const lead = {
    name: clean(b.name, 80),
    phone,
    service: SERVICES[b.service] || '',
    date: clean(b.date, 20),
    passengers: clean(b.passengers, 4),
    details: clean(b.details, 1500),
    page: clean(b.page, 200),
  };
  const ctx = b.ctx && typeof b.ctx === 'object' ? b.ctx : {};
  const attr = b.attr && typeof b.attr === 'object' ? b.attr : {};
  const first = touch(attr.first), last = touch(attr.last);
  const pages = Array.isArray(attr.pages) ? attr.pages.slice(0, 20).map((p) => clean(p, 120)) : [];
  const geo = [dec(req.headers['x-vercel-ip-city']), clean(req.headers['x-vercel-ip-country-region'], 20), clean(req.headers['x-vercel-ip-country'], 4)].filter(Boolean).join(', ');
  const device = {
    ip, location: geo, userAgent: clean(req.headers['user-agent'], 300), language: clean(ctx.lang, 40), timezone: clean(ctx.tz, 60),
    screen: clean(ctx.screen, 30), viewport: clean(ctx.viewport, 30), touch: ctx.touch ? 'yes' : 'no', connection: clean(ctx.conn, 20),
    referrerHeader: clean(req.headers.referer, 300), visits: clean(attr.visits, 6), submittedAfter: Math.round(elapsed / 1000) + 's on page',
  };

  const rows = (obj) => Object.entries(obj).filter(([, v]) => v !== '' && v != null);
  const tRows = (t) => (t ? rows({ time: t.at, 'landing page': t.landing, referrer: t.referrer || '(direct)', ...Object.fromEntries(Object.entries(t.utm).map(([k, v]) => ['utm ' + k, v])) }) : []);
  const sections = [
    ['Lead', rows({ name: lead.name, phone: lead.phone, service: lead.service, 'pickup date': lead.date, passengers: lead.passengers, details: lead.details, 'submitted from': lead.page })],
    ['First visit (how they found you)', tRows(first)],
    ['This visit', tRows(last)],
    ['Pages viewed', pages.length ? [['pages', pages.join('  →  ')]] : []],
    ['Device & location', rows({ 'IP / approx. location': [device.ip, device.location].filter(Boolean).join(' — '), browser: device.userAgent, language: device.language, timezone: device.timezone, screen: device.screen, viewport: device.viewport, touch: device.touch, connection: device.connection, 'total visits': device.visits, 'time on page before submit': device.submittedAfter })],
  ].filter(([, r]) => r.length);

  const text = sections.map(([h, r]) => `${h.toUpperCase()}\n` + r.map(([k, v]) => `  ${k}: ${v}`).join('\n')).join('\n\n');
  const html = `<div style="font:15px/1.5 -apple-system,Segoe UI,sans-serif;color:#1b1814;max-width:640px">` +
    sections.map(([h, r], i) => `<h3 style="margin:${i ? 22 : 0}px 0 6px;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8a6a24">${esc(h)}</h3><table style="border-collapse:collapse;width:100%">` +
      r.map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;vertical-align:top;color:#6b6358;white-space:nowrap">${esc(k)}</td><td style="padding:4px 0;word-break:break-word">${k === 'phone' ? `<a href="tel:${esc(v.replace(/[^\d+]/g, ''))}" style="font-weight:700;font-size:17px">${esc(v)}</a>` : esc(v)}</td></tr>`).join('') + '</table>').join('') + '</div>';

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.QUOTE_FROM || 'Splendid Limo Leads <leads@getmarketingbull.com>',
      to: (process.env.QUOTE_TO || 'splendidlimoboca@gmail.com').split(',').map((s) => s.trim()).filter(Boolean),
      subject: `New lead: ${lead.name || lead.phone}${lead.service ? ' — ' + lead.service : ''}`,
      text, html,
      headers: { 'X-Entity-Ref-ID': String(now) },
    }),
  });
  if (!r.ok) { console.error('resend failed', r.status); return res.status(502).json({ error: 'send failed' }); }
  // Distinguish delivered-to-provider leads from the silent bot responses above.
  return res.status(200).json({ ok: true, leadAccepted: true });
}
