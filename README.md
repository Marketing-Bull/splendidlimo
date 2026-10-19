# splendidlimo.com

Static site (no build step). Source lives in `public/`.

## Deploy

**Cloudflare Pages** — connect this repo; build command: *(none)*; output directory: `public`.
`functions/api/quote.js` is picked up automatically.

**Vercel** — import this repo; framework preset: *Other*; no build command. `vercel.json` sets the output
directory and `api/quote.js` is the function.

## Quote form

`POST /api/quote` emails the visitor's phone number via [Resend](https://resend.com). Set these env vars on the host:

- `RESEND_API_KEY`
- `QUOTE_FROM` — a sender on a Resend-verified domain (default `Splendid Limo <quotes@splendidlimo.com>`)
- `QUOTE_TO` — recipient (default `reservations@splendidlimo.com`)

## Local preview

`python3 -m http.server -d public 8000`
