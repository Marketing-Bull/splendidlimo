# SEO and social preview release

The static site now includes airport-transfer, executive-car-service, and wedding/event service pages. The existing three guides were rewritten with distinct trip-planning purposes and contextual service links. Shared navigation, canonicals, the sitemap, visible breadcrumbs, and JSON-LD cover all 11 pages.

Business markup uses `LocalBusiness` with a stable `#organization` ID and the existing city/region address only. Service and article entities reference that business. No street address, additional prices, specific seating capacities, or new operating policies were invented. Quote, availability, fee, and cancellation questions are explicitly left for confirmation with the business.

## Social card

- Asset: `public/images/splendid-business-card.png`.
- Format: PNG, 1731 × 909 pixels, approximately 1.9:1. This is the actual generated export size, not a claimed 1200 × 630 export.
- Produced with ImageGen using the existing `Splendidlimo-Trans-Rect.png` logo as its visual reference. The result was inspected for the business name, phone number, website, service area, contrast, and cropping.
- Design: flat business-card face, near-black background, ivory brand and phone number, restrained gold details; no car photograph or QR code.
- All pages provide absolute Open Graph and Twitter/X image URLs, image descriptions, and page-specific titles and descriptions. Open Graph dimensions and MIME type match the asset. A new filename avoids reusing the previous social-image cache key.
- Keep future social exports within platform image limits, update dimensions if the file changes, and use a new image URL for a new design. After deployment, request a refresh through the relevant platform's sharing debugger when an existing share still shows a cached image.

## Quote and contact events

- `generate_lead` is queued only when `/api/quote/` returns `ok: true` and `leadAccepted: true`. The API sets that flag only after a successful Resend response. This means the email provider accepted the request; it does not guarantee inbox delivery or a booking.
- Bot responses retain the existing silent-success behavior but omit the acceptance flag. Rejected requests, provider failures, and missing configuration do not count as leads.
- Lead event fields are a fixed method (`quote_form`) and a whitelisted service value. Name, phone, trip notes, and attribution payloads are not copied into custom analytics events.
- `contact_click` records `contact_method: phone` or `contact_method: sms`; clicks are not represented as completed calls or confirmed leads.
- The form guards repeated submissions while a request is pending, validates phone formatting, and associates validation errors with the input.
- The privacy page now describes GA4 separately from the first-party quote attribution. Consent settings and retention choices should match the deployed analytics configuration and audiences; this release does not claim to provide a consent-management platform.

## Validation

Run `node --test tests/quote.test.js` for API acceptance and failure checks. Tests mock the email provider and never send a real email. This static site has no install or build step. Start local preview with `python3 -m http.server -d public 8000`.

CSS and JavaScript references use content-hash query versions because the host config caches these assets as immutable. After changing either asset, update its `?v=` value in every HTML file to the first 12 hexadecimal characters of its SHA-256 digest.

## After deployment

1. Verify the canonical domain, HTTPS and www redirects, real 404 responses, new service URLs, robots.txt, sitemap, and social-image URL on the deployed host.
2. Validate structured data with Schema.org Validator and Google's Rich Results Test. Valid markup does not guarantee a rich result; do not expect self-serving business reviews to generate review stars.
3. In Search Console, submit `/sitemap.xml`, inspect the new canonical URLs, and monitor impressions, queries, landing pages and mobile Core Web Vitals. Do not assume immediate indexing or ranking gains.
4. In GA4, verify the measurement ID and event receipt, then mark `generate_lead` as a key event if appropriate. Keep contact clicks separate. Test live email delivery only with an authorized test request.
5. Verify Google Business Profile name, phone, hours, category, genuine service area, website, and reviews against the business's current records. No profile or Search Console account settings were changed by this branch.
6. Measure deployed performance. The party-bus hero now loads its poster; the former background video remains available as a click-to-play tour with `preload="none"`. No production Core Web Vitals pass is claimed from local testing.
