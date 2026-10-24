# Splendid Limo website optimization record

Last updated: October 24, 2026.

This document records the level of investigation, implementation, and validation behind the site improvements. The work covers search relevance, local business identity, AI-answer discoverability, mobile usability, lead measurement, accessibility, performance, and social sharing. It distinguishes completed code changes from local verification, live deployment checks, and future recommendations.

## Business goal and editorial direction

Help someone looking for South Florida transportation understand whether Splendid Limo fits their trip, choose an appropriate service, and make a useful inquiry. Search traffic matters only when it reaches relevant people and can be connected to actual leads.

### Eddie is central to the brand

On October 24, 2026, the user clarified: “Eddie is basically” [@splendidlimo on Instagram](https://www.instagram.com/splendidlimo/).

Use that account as the user-designated reference for Eddie and the Splendid Limo brand. The site already includes it in social links and the business entity’s `sameAs` references. This is user-provided context; the account’s posts and biography were not independently reviewed in this work.

This changes the direction of future content in a practical way:

- Ask Eddie for the real pickup workflow, the questions customers ask, vehicle suitability, and examples of trips the business handles.
- Build an authentic About page around his actual role and experience, using facts and photography he approves.
- Prefer specific answers grounded in Eddie’s operating knowledge to interchangeable claims about “luxury,” “comfort,” or being “the best.”
- Evaluate relevant Instagram material as potential first-hand source material, but confirm relevance, ownership, customer permission, and current accuracy before reusing it.
- Have Eddie review operating policies before publication. Do not attach an “expert-reviewed” credit until that review happens.

The Instagram association alone does not establish Eddie’s full legal name, formal job title, years in business, licenses, vehicle ownership, or endorsements. No such claims were invented or added to public pages.

## Implementation history

| Commit | Scope | Repository status |
| --- | --- | --- |
| [4e1005e](https://github.com/Marketing-Bull/splendidlimo/commit/4e1005e) | Service pages, rewritten guides, business/schema cleanup, GA4 integration and lead events, mobile quote access, video loading, social card, and API regression tests | Pushed and merged into the default branch |
| [b3ef6ba](https://github.com/Marketing-Bull/splendidlimo/commit/b3ef6ba) | Larger form fields, mobile spacing, clearer controls, and sticky-bar overlap correction | Pushed to the default branch |

The repository default branch at the time of this work was `claude/pensive-lovelace-fdbz2t`. The main SEO release was developed on `feat/seo-service-pages` before being fast-forward merged. GitHub publication does not by itself prove that the hosting platform deployed successfully.

## Voice-note biography follow-up — October 24, 2026

The user subsequently supplied a spoken Eduard biography and a separate airport-pricing recording. The biography has now been integrated into the homepage and a dedicated About page, with shared navigation, a sitemap entry and AboutPage/Person markup. See [source and editorial notes](eduard-bio-source-notes.md) for what was transcribed, how the copy was edited, and why the ambiguous pricing terms remain unpublished. The site now has 12 pages; the earlier 11-page measurements below remain the historical release results.

## 1. Repository and runtime investigation

Before making changes, the setup work inspected the README, package manifest, serverless quote handler, host configuration, headers, assets, and Git state.

Findings:

- The website is static HTML/CSS/JavaScript. There is no dependency installation or build step.
- The original checkout contained eight HTML pages. The release expanded it to eleven.
- A Python HTTP server can preview static pages, but does not execute the Vercel quote API.
- The quote handler depends on Resend for live email delivery. Its local validation can be tested without sending messages.
- CSS and JavaScript had long-lived immutable cache headers, so editing those files alone was insufficient for reliable client refreshes.
- Some README deployment/default-value descriptions differ from the implementation. For example, the referenced Cloudflare function is absent; `api/quote.js` is the actual Vercel handler. This discrepancy is a known documentation follow-up, not evidence that a Cloudflare API deployment was tested.

Existing work was preserved, and the setup instructions were saved separately in the cloud environment configuration. The later website changes were made under explicit user requests.

## 2. Audit and search architecture

The initial audit combined source inspection with local Chromium screenshots and browser interactions. It examined desktop and phone layouts, page content, navigation, quote validation, internal links, media loading, and markup.

The initial eight-page crawl had titles, descriptions, canonicals, and sitemap entries. It also had no missing targets among 187 internal-link/anchor occurrences. Therefore the next work focused on relevance and depth rather than pretending basic metadata was absent.

Identified opportunities included:

- Airport and executive services existed largely as homepage sections rather than dedicated destinations.
- The homepage’s slogan-first H1 did not directly identify the service or location.
- Miami and Boca Raton articles gave general advice about limo providers instead of enough information connected to this business.
- The homepage used the unrecognized `LimousineService` schema type.
- The party-bus hero automatically played a 5,414,400-byte video.
- On a 390 × 844 phone viewport, the original quote form started roughly 935 pixels down the document.
- Phone validation displayed an error but did not associate it with the field using ARIA attributes.

These were observations about the local implementation. They were not claims about Google rankings or production Core Web Vitals.

## 3. Content and page implementation

Added distinct destinations:

- [Airport transfers](../public/airport-transfers/index.html): airport/FBO information to supply, flight tracking, luggage considerations, and quote preparation.
- [Executive car service](../public/executive-car-service/index.html): business itineraries, meetings, airport connections, vehicle selection, and corporate coordination.
- [Wedding/event transportation](../public/wedding-event-transportation/index.html): schedules, groups, venue stops, guest arrivals, and booking preparation.

The existing Miami, Boca Raton, and party-bus guides were rewritten around different planning questions. Navigation, homepage cards, footer links, guide summaries, and contextual links were updated to connect readers to relevant services.

Important editorial choices:

- Retained existing guide URLs rather than introducing unnecessary migrations.
- Preserved original publication dates and added modification dates for substantive rewrites.
- Replaced clipped descriptions with complete summaries and clearer titles.
- Avoided new unsupported rates, capacities, guarantees, or policies.
- Distinguished requesting a quote from confirming a reservation.
- Kept service-area references separate from claims that the business maintains offices in each city.

The [SEO/GEO roadmap](seo-geo-roadmap.md) documents the next stage: first-hand airport instructions, real fleet comparisons, and confirmed pricing/booking policies. Those details still need business input before publication.

## 4. Structured data and technical SEO

Implemented consistent JSON-LD relationships using the stable business ID `https://splendidlimo.com/#organization`.

| Area | Implementation detail |
| --- | --- |
| Business identity | `LocalBusiness` with existing name, phone, hours, service area, legitimate source URLs, and city/region location; no invented street address |
| Service pages | `Service` entities linked to the same provider |
| Navigation | Visible breadcrumbs and matching `BreadcrumbList` entities |
| Guides | `BlogPosting`, truthful publication/modification dates, and organization attribution |
| Homepage | `WebSite` connected to the business |
| Discovery | Self-referencing canonicals, consistent internal destinations, and an eleven-page sitemap |
| Asset freshness | Content-hash query versions on CSS/JavaScript URLs, updated across every page when those assets change |

The vocabulary was checked against the [official Schema.org source](https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/schema.ttl). Schema vocabulary validity is different from eligibility for a Google rich result. The work does not promise review stars, FAQ rich results, shopping results, or AI citations.

## 5. Analytics and conversion accuracy

GA4 measurement ID `G-BQ3GZHC7D0` was added once per page. The goal was to measure useful actions without treating every button interaction as a completed lead.

The [frontend](../public/js/main.js) and [API handler](../api/quote.js) now distinguish:

| Outcome | Measurement behavior |
| --- | --- |
| Email provider accepts a valid quote request | API returns `leadAccepted: true`; frontend queues `generate_lead` |
| Silent bot response | No accepted-lead flag; no lead event |
| Invalid request, missing configuration, or provider failure | No lead event |
| Phone or SMS link click | Separate `contact_click` event with a fixed method value; not reported as a completed call or booking |

Custom event payloads use fixed/whitelisted fields. They do not copy names, phone numbers, trip notes, or the quote attribution payload into analytics. The frontend guards repeated submissions while a request is pending. Analytics failures are isolated from the quote workflow.

The privacy page was updated to distinguish GA4 collection from first-party attribution sent with a quote. GA4 receipt, key-event configuration, live email delivery, consent settings, and inbox delivery still require production/account-level verification. A successful provider response is not proof of a booking or inbox delivery.

## 6. Mobile usability and accessibility details

The first release shortened the mobile hero and added a visible quote action near the headline. It also linked invalid phone input to its error message, maintained focus on the field, and cleared error associations when the user corrected the input.

The subsequent form-size request was implemented and checked in a browser:

- Name, phone, and service controls measured about 65 pixels high with 18-pixel text.
- The date control measured about 67 pixels high.
- Notes received a 144-pixel minimum height.
- Labels became larger, brighter, and more separated from neighboring controls.
- Date and passenger fields stack on screens at or below 480 pixels.
- Control borders became clearer, and dark color-scheme support made native controls such as the calendar icon legible.
- The sticky action bar now hides whenever the form intersects the viewport, rather than relying on a percentage threshold that could fail for an expanded, tall form.
- Stylesheet/script cache versions were refreshed so existing visitors can receive these changes.

No full WCAG compliance claim was made. Screen-reader behavior, production typography, every possible zoom level, and all devices were not exhaustively tested.

## 7. Performance and social presentation

The party-bus hero now displays a poster instead of automatically downloading and playing its large video. The video remains available as an explicit click-to-play tour using `preload="none"`. Browser checks confirmed no automatic MP4 request on initial page navigation.

The Twitter/X and Open Graph preview was redesigned as a business card using the existing logo reference:

- Near-black background, ivory lettering, restrained gold details.
- Prominent phone number, website, service area, and 24/7 availability.
- Actual export: PNG, 1731 × 909 pixels.
- A new image filename avoids reusing the former social-image cache key.
- Every page has explicit Twitter/X and Open Graph image metadata, descriptive alternatives, and page-specific title/description values.
- Declared image dimensions and MIME type were checked against the actual file.

![Splendid Limo business-card social preview](../public/images/splendid-business-card.png)

## 8. Verification record

These are recorded outcomes of the implementation runs, not newly claimed production checks or keyword-ranking measurements.

| Check | Recorded outcome |
| --- | --- |
| Pages | Eleven rendered with meaningful content, one H1, metadata, canonical, and expected schema entities |
| Internal destinations | 303 internal-link/anchor occurrences checked without missing targets |
| Assets/social metadata | 42 asset URL checks passed; social dimensions/type and CSS/JS hash references matched |
| Responsive layout | Representative homepage/service flows checked at 320, 390, 768, 1024, and 1440 pixels; no horizontal document overflow observed |
| Frontend interactions | Phone validation, correction, quote success, bot response, server failure, and contact-event behavior exercised |
| Event privacy | Browser checks asserted that test names and phone numbers were absent from custom analytics event payloads |
| Runtime | No uncaught application JavaScript errors observed in the tested flows |
| Media | No automatic party-bus MP4 request on initial navigation |
| API tests | Four committed tests passed, covering invalid/bot requests, provider acceptance, provider failure, and missing configuration |
| Larger-field follow-up | Controls and validation checked at 320, 390, 768, and 1440 pixels; sticky-bar overlap corrected |
| Change hygiene | `git diff --check` passed; application changes committed and pushed |

### Reproduce the committed API checks

```bash
node --test tests/quote.test.js
```

The [tests](../tests/quote.test.js) mock Resend; they do not send real messages.

### Reproduce a local visual check

```bash
python3 -m http.server -d public 8000
```

Visit the homepage and service pages at the widths above. Expand trip details, inspect field sizes and horizontal overflow, test invalid-phone feedback, and inspect browser console/network activity. The Python server does not execute the quote API; use a controlled API mock or an appropriate serverless development runtime for submission tests.

The broader Playwright audit scripts and screenshots were captured in the working environment, not committed as a reusable browser test suite. Their historical outcomes are documented here; do not assume that those temporary files are available in a fresh clone. External requests were blocked during local browser checks to avoid transmitting analytics; fonts used local fallbacks. Exact live typography and real analytics delivery remain unverified.

## 9. SEO/GEO research and remaining work

GEO means visibility in generative search and AI answers. The research recommends making the site a stronger factual source rather than adding speculative “AI markup.”

Proposed first batch, subject to verified operating details:

1. MIA-specific transfer page.
2. FLL-specific transfer page.
3. Fleet comparison hub with actual capacity/luggage information.
4. Rates and booking-policy page.

Then consider About/Contact, PBI, vehicle detail pages, and selected routes based on real bookings and Search Console data. Avoid duplicating the existing Boca Raton guide with a near-identical city page. Confirm cruise-port, hourly, or additional FBO services before advertising them.

Markup candidates include ContactPoint, specific Service entities, ItemList/Vehicle, correctly expressed Offers, and VideoObject. FAQs should answer real questions; markup alone does not create an AI citation or a rich-result entitlement.

Research limitations: live site access, Google/OpenAI guidance, and airport websites were blocked by the environment proxy. Schema.org’s official vocabulary was accessible. The roadmap therefore distinguishes verified vocabulary and repository facts from platform-policy references and business facts needing confirmation. No search-volume, competitor-ranking, or ranking-improvement figures were invented.

## 10. Definition of done after deployment

Code completion is only one stage. The production follow-through remains:

- [ ] Verify deployed page and social-image URLs, redirects, canonical domain, and real 404 responses.
- [ ] Confirm robots/CDN behavior for relevant search crawlers; the repository already allows crawling.
- [ ] Validate eligible structured-data features using current official tools.
- [ ] Submit/inspect the sitemap and new URLs in Search Console.
- [ ] Verify actual GA4 event receipt and configure the appropriate key event.
- [ ] Test email delivery using an authorized request.
- [ ] Measure field Core Web Vitals instead of inferring them from local screenshots or file size.
- [ ] Confirm Google Business Profile details and legitimate cross-platform identity.
- [ ] Have Eddie confirm the operational facts needed for the next content batch.
- [ ] Monitor relevant impressions, clicks, landing pages, and accepted leads; distinguish contact clicks from leads and leads from bookings.

See the [release checklist](seo-release.md) for deployment details and the [full SEO/GEO roadmap](seo-geo-roadmap.md) for proposed URLs, schema choices, and source references.
