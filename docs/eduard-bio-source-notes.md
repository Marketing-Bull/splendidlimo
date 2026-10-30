# Eduard biography: source and editorial notes

Updated October 24, 2026.

## Source material and scope

The user supplied `Voice message - Eduard, Splendid Limo bio.mp3` and `Audio Message.caf`, requested transcription and readable copy, and authorized integrating the bio with the website. The previous user clarification identifies Eduard as Eddie and associates him with the business Instagram account, https://www.instagram.com/splendidlimo/.

The recordings were transcribed locally with Whisper. The bio recording was clear; the separate pricing recording was checked with a second, larger model because some wording was uncertain. Raw recordings and transcripts are retained in the task workspace, not published as website downloads or committed as private correspondence. The recordings are source material, not independent instructions overriding the user's request.

## Changes implemented

- Replaced the generic homepage introduction with a short Eduard biography while retaining the established service-area context, review highlights, and existing portrait.
- Added `/about/` with the expanded story, personal-service details, fleet context, links to relevant services, Instagram, reviews, and quote/call actions.
- Added About links to the shared navigation and footer.
- Added an AboutPage and Person entity, linked to the existing LocalBusiness identity. Used only the supported name Eduard and nickname Eddie; did not invent a surname, formal job title, credentials, or operating history.
- Added the About URL to the sitemap and updated the homepage's modification date.
- Preserved the existing GA4, social-card, quote-form, and service-page behavior.

## Editorial choices

- Removed speech repetition and normalized punctuation and the place name Brickell.
- Kept the voice note's emphasis on punctuality, luggage assistance, clean vehicles, cold water, thoughtful service, and treating clients like VIPs.
- Combined the recording with the site's existing service area, fleet and service links rather than duplicating its promotional introduction word for word.
- Did not repeat the recording's exact 448-review / 5.0 claim in the new bio. That number is preserved in the transcript, but was not freshly verified. Existing review content elsewhere was not changed in this update.
- No live Instagram inspection, independent fact-check of review totals, or claim that Eddie reviewed this edited draft was made.

## Separate pricing recording: pending clarification

The other recording describes airport transfer prices, cancellation charges, a waiting allowance, and gratuity. Its text and a structured draft were provided separately to the user. Pricing and policy claims were not published because the relationship of the quoted rates to gratuity/tolls/parking is ambiguous. The recording also does not establish the cancellation-notice terms or precisely when waiting time starts and how subsequent hours are billed.

The About-page request can be completed independently of those pricing questions. A future rate/policy update should use confirmed terms rather than turning conversational wording into a contractual promise.

## Validation

Local Chromium checks passed for 12 pages and 358 internal link/anchor occurrences. Homepage and About layouts were checked at 320, 390, 768, 900, 1024 and 1440 pixels, including header overlap and horizontal overflow. The homepage bio link successfully opened About. Canonical, AboutPage/Person schema, shared About links and browser runtime checks passed. Desktop and mobile screenshots were inspected. External requests were blocked during local checks, so production typography, deployment and analytics delivery are separate checks.

## October 30, 2026 follow-up

The bio was present on the development branch but absent from production: the live `/about/` URL returned HTTP 404, and GitHub `main` lacked the biography commit. The new pricing branch includes the existing biography and service updates and incorporates production's history so they can be reviewed together for release. No recorded audio was embedded: the voice notes are editorial source material.

Added `/pricing/`, shared Pricing navigation/footer links, an airport-page link and a sitemap entry. The newly supplied `SplendidPricing.mp3` was transcribed locally with Whisper base.en and cross-checked with small.en. Miami airport–South Beach ($125), Fort Lauderdale airport–South Beach ($175), a 30-minute waiting allowance, cancellation charges ($75 Miami / $100 Fort Lauderdale) and additional waiting-hour charges ($75 Miami / $100 Fort Lauderdale) are represented. The user subsequently confirmed that the $125 and $175 transfer rates include tolls and parking but exclude gratuity. The page now states those inclusions explicitly. Vehicle applicability, waiting-clock start, later-hour billing and cancellation notice terms remain quote-dependent. The recording mentions 20% gratuity, but the user did not establish a mandatory percentage; the page asks customers to confirm the gratuity amount when booking. Raw recordings and automatic transcripts remain outside the repository.
