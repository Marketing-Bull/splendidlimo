import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/quote.js';

let sequence = 0;
async function request(body, method = 'POST') {
  const response = {
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
  await handler({ method, body, headers: {}, socket: { remoteAddress: `test-${++sequence}` } }, response);
  return response;
}
const lead = { phone: '2025550100', elapsed: 3000, service: 'airport' };

test('bot and invalid requests never count as accepted leads or send email', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected email'); });
  for (const body of [{ ...lead, company: 'bot' }, { ...lead, elapsed: 0 }, { ...lead, elapsed: undefined }]) {
    const response = await request(body);
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.body, { ok: true });
  }
  assert.equal((await request({ ...lead, phone: 'invalid' })).statusCode, 400);
  assert.equal((await request({}, 'GET')).statusCode, 405);
  assert.equal(fetch.mock.callCount(), 0);
});

test('only a successful email-provider response accepts a lead', async (t) => {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'test-only-not-a-credential';
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  });
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    assert.equal(options.method, 'POST');
    assert.match(JSON.parse(options.body).text, /2025550100/);
    return { ok: true };
  });
  const response = await request(lead);
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { ok: true, leadAccepted: true });
  assert.equal(fetch.mock.callCount(), 1);
});

test('provider failure never accepts a lead', async (t) => {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'test-only-not-a-credential';
  t.after(() => {
    if (previous === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = previous;
  });
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, status: 503 }));
  t.mock.method(console, 'error', () => {});
  const response = await request(lead);
  assert.equal(response.statusCode, 502);
  assert.equal(response.body.leadAccepted, undefined);
});

test('missing email configuration never accepts a lead', async (t) => {
  const previous = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  t.after(() => { if (previous !== undefined) process.env.RESEND_API_KEY = previous; });
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected email'); });
  const response = await request(lead);
  assert.equal(response.statusCode, 500);
  assert.equal(response.body.leadAccepted, undefined);
});
