# Splendid Limo SEO / GEO research and page plan

Prepared October 24, 2026. GEO here means visibility in generative search and AI answers.

## Evidence and limits

Reviewed the current 11-page repository at commit b3ef6ba, its sitemap, robots.txt, visible content, and JSON-LD. Retrieved the official Schema.org vocabulary from https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/schema.ttl and checked the types and properties below against that source.

The environment proxy returned 403 for the live site, Google Search documentation, OpenAI crawler documentation, and official MIA/FLL/PBI websites. These responses do not show that the public sites are unavailable. This is a repository-based opportunity assessment with verified schema vocabulary, not a live SERP, competitor, keyword-volume, or ranking study. Priority reflects relevance to the business and gaps in current content, not measured demand. Search Console and booking data should refine the order.

## What already exists

The site has airport, executive, wedding/event, and party-bus service pages; corporate partnerships; three planning guides; a privacy page; and the homepage and guide index. It already uses LocalBusiness, WebSite, Service, BreadcrumbList, and BlogPosting. It also has canonicals, a sitemap, static HTML content, and an allow-all robots.txt.

Do not duplicate those improvements. The next work should provide more detailed and verifiable answers.

## Recommended page roadmap

| Priority | Page or improvement | Distinct purpose and necessary content | Structured data |
| --- | --- | --- | --- |
| First | `/airport-transfers/mia/` | Miami International Airport service: actual pickup procedure, how the chauffeur contacts the passenger, baggage/international-arrival considerations, delay/waiting policy, destination coverage, vehicle choice, and quote inclusions. Confirm every operating detail; link current airport guidance once checked. | Service, BreadcrumbList; identify MIA as Airport with iataCode in the served places where appropriate. |
| First | `/airport-transfers/fll/` | FLL-specific instructions, arrangements for Boca Raton/Fort Lauderdale destinations, luggage suitability, communication, and delay policies. Must differ substantively from the MIA page. | Service, BreadcrumbList. |
| First | `/fleet/` | Comparison of the actual bookable vehicles: verified passenger capacity, luggage fit, vehicle photos, amenities, accessibility limitations, suitable trips, and how availability is confirmed. Link the homepage fleet section here. | CollectionPage and ItemList; optional Vehicle entities for vehicles actually described. |
| First | `/rates-and-booking/` | Explain how quotes are calculated and what is included. Publish confirmed waiting, parking, toll, gratuity, extra-stop, cancellation, deposit/payment, and itinerary-change policies. Clearly separate per-person packages from private transfers and hourly services. Do not invent sample prices. | WebPage; Offer and UnitPriceSpecification only for real, visible, currently available offers. |
| Next | `/about/` and `/contact/` | Real operator identity and story, service area, booking process, contact channels, verified credentials if available, genuine team/vehicle photography. No fabricated awards, certifications, offices, or ownership claims. | AboutPage / ContactPage, linked to the existing business ID; ContactPoint for reservations. |
| Next | `/airport-transfers/pbi/` | PBI-specific service and pickup details. Promote earlier if booking and search data show stronger demand than MIA or FLL. | Service, BreadcrumbList. |
| Next | Improve existing Boca Raton guide | Add first-hand local trip examples, useful nearby-airport comparisons, and links to airport and fleet pages. Do not immediately launch another page targeting the same broad query. | Retain BlogPosting and BreadcrumbList while it remains a guide. |
| Conditional | `/fleet/mercedes-sprinter/`, `/fleet/cadillac-escalade/`, etc. | Individual vehicle detail pages only when the business can provide sufficient distinct photos, specifications, and availability context. Start with the vehicles customers ask about most. | WebPage, Vehicle, BreadcrumbList; VideoObject for a genuine featured tour. |
| Conditional | Specific routes such as Boca Raton–FLL | Launch only for demonstrated demand and actual service. Include route-specific pickup/drop-off guidance and realistic factors affecting trip duration or pricing. | Service, BreadcrumbList. |
| Conditional | Cruise-port, hourly chauffeur, or dedicated FBO pages | First confirm the service is actually offered. The current repository is not enough evidence to advertise every adjacent transportation service. | Service plus BreadcrumbList once supported. |

Suggested first batch: MIA, FLL, fleet, and rates/booking. If verified pickup and policy information is unavailable, collect it first; publishing another generic “luxury and comfort” page adds little value.

Keep `/airport-transfers/` as the broad hub with links to its airport children. Give each detailed page a self-referencing canonical rather than canonicalizing all children to the hub. Link the guides to relevant services and the services to fleet and booking information. Add only published, indexable URLs to the sitemap, with truthful lastmod dates.

## Structured-data recommendations

### 1. Keep one consistent business identity

Reuse `https://splendidlimo.com/#organization` for the same entity across all pages. LocalBusiness is already a subclass of Organization; adding redundant entity nodes with different names or IDs does not add credibility. Keep name, telephone, hours, URLs, and legitimate social profiles consistent with actual business records.

Add a reservations ContactPoint and connect AboutPage and ContactPage to that business. Do not create a LocalBusiness for each city served. Keep city-only location information unless a real public business address is appropriate. Google feature eligibility may require more than a syntactically valid schema object; never fabricate an address to pass a test.

### 2. Make each service entity specific

Use Service with `name`, `serviceType`, `description`, `url`, `provider`, and `areaServed`. Add `availableChannel` with ServiceChannel when describing how to access the service. The existing provider ID should be reused.

`TaxiService` is a valid subtype of Service, not a subtype to use as a local business location. Its definition describes chauffeured local hire, usually with distance-based fares. Do not change to it merely because it appears more specific; ordinary Service is suitable for accurately described limo offerings. `LimousineService` is not a recognized core type.

An airport can be identified as an Airport entity with its real name and iataCode. That does not mean the business has an office inside the airport. Represent airports as served places, not invented business addresses or branches.

### 3. Link actual offers, with units

An OfferCatalog can organize the company's visible services/offers, but is optional. It is useful when the website presents an actual service catalogue; it is not a special ranking feature.

The party-bus page currently lists $250 and $300 per person, with a minimum of 10 people. Reconfirm those terms before publishing offer markup. If valid, model the currency, per-person unit, inclusions, and minimum quantity correctly. A bare `price: 250` could be misunderstood as the entire booking price. UnitPriceSpecification and eligibleQuantity can describe the units and ordering limits. Do not put zero-dollar offers on quote-only services.

### 4. Describe fleet facts truthfully

A fleet hub can use ItemList. An individual vehicle can use Vehicle with verified model/manufacturer details, images, and `vehicleSeatingCapacity`—the actual schema property, not `seatingCapacity`. Confirm the capacity of the specific conversion/vehicle, not just the factory model.

Vehicle is a Product subtype in Schema.org, but a limo operator is generally selling a transportation service, not the pictured vehicle. Do not fabricate a vehicle-for-sale Offer or expect Google shopping results from fleet markup. Use visible tables for passenger/luggage comparisons even when no appropriate structured field exists for the exact detail.

### 5. Add VideoObject where a video is substantive

The site already has original-looking vehicle-tour files and posters. Verify ownership/provenance and actual publication dates, then add appropriate VideoObject metadata to a page where the tour is visible and useful: name, description, thumbnailUrl, uploadDate, contentUrl, and duration when known. The upload date must be real; do not substitute today's date merely to satisfy a validator. Include a useful text summary or transcript.

Click-to-play can remain. There is no need to restore autoplay. Whether Google grants video indexing or presentation depends on the page and its current requirements, not simply on a schema object.

### 6. Use FAQs for answers, not promised search decoration

Add a small set of answered questions to the relevant service pages: how pickup works, how luggage changes vehicle choice, whether fees are included, how flight delays are handled, and how a reservation is confirmed. Answers must state the actual policy; “call us to ask” is not a strong answer for extraction.

FAQPage is valid vocabulary for a page presenting answered FAQs, but Google has restricted FAQ rich results primarily to authoritative health and government sites. Do not sell FAQ markup as a rich-result opportunity for a limo business. Verify current Google policy before implementation. `QAPage` is not the substitute for company-written FAQs; it is intended for a question-and-answer page model rather than a company FAQ list.

Do not add self-serving AggregateRating markup to pursue review stars. Keep real customer testimonials and provenance visible, but Google review eligibility is separate from Schema.org validity.

## GEO: how to make the pages useful to AI answers

There is no verified special “GEO schema” that guarantees a citation. Make useful, crawlable evidence available:

1. Put a direct two- or three-sentence answer below each question or descriptive heading. Use conditions and precise scope instead of promotional superlatives.
2. Put real specifications and policy comparisons in HTML tables, not only in images, PDFs, or videos. Preserve the static HTML delivery already used by this site.
3. Show original supporting evidence: actual vehicle photos, confirmed passenger/luggage configurations, accurately described trips, and operational knowledge supplied by the business. Use customers' information only with appropriate permission.
4. Attribute informational content to a real, accountable organization or knowledgeable person. Show meaningful update dates when content changes. Link official airport sources for airport rules, and distinguish those rules from the company's own policies.
5. Keep the same business identity across the site, Google Business Profile, relevant legitimate directories, and partner mentions. Genuine independent mentions may help systems corroborate an entity, but citation outcomes are not guaranteed.
6. Check Googlebot, Bingbot, and relevant AI-search crawler access at both robots.txt and the CDN/WAF. The repository currently allows all crawlers; it does not need extra allow rules just for appearances. CDN behavior was not verified.
7. Separate search discovery from model-training preferences. OpenAI documents OAI-SearchBot and GPTBot for different purposes; verify its current documentation before changing rules. Allowing training is not an established requirement for search visibility.
8. Do not prioritize llms.txt over service facts, crawlability, indexing, and clear content. No requirement for llms.txt or a special AI markup format was verified in this research.

## Eddie and the brand

On October 24, 2026, the user identified Eddie with [the @splendidlimo Instagram account](https://www.instagram.com/splendidlimo/). Treat this as the user-designated brand reference and a starting point for first-hand material from Eddie. The account already appears in the website’s business schema and social links. Instagram content was not inspected during this research. Do not infer Eddie’s full legal name, formal title, credentials, ownership of every pictured vehicle, or publication permissions from that association. Only label content as reviewed by Eddie after he actually reviews it.

## Business facts needed before publication

- Most requested airports/routes, from actual bookings and Search Console where available.
- Pickup and passenger-contact procedures for each airport/FBO the company serves.
- Waiting, delay, cancellation, payment, extra-stop, toll, parking, and gratuity policies.
- Bookable vehicle list with passenger capacity, practical luggage guidance, and photos.
- Confirmation of the published party-bus rates and package conditions.
- Real operator history and any credentials the business wishes to substantiate publicly.

## Validation and measurement

Before publication, validate schema vocabulary and object relationships, match every marked-up fact to visible content, and check links, canonicals, sitemap coverage, and mobile usability. Use Google's Rich Results Test only for the features it supports; a Service entity lacking a dedicated Google rich result is not automatically invalid schema.

After publication, inspect the URLs in Search Console, monitor impressions/clicks and query intent by landing page, and measure successful quote requests using the existing generate_lead event. Keep phone/SMS clicks separate from confirmed leads. Track known AI referrals as a partial measure, recognizing that some visits lose referrer attribution. If manually checking AI citations, use a stable set of real customer questions and record engine/date; a small prompt sample is not a reliable market-share estimate.

## Sources

Read during this run:

- Official Schema.org vocabulary: https://raw.githubusercontent.com/schemaorg/schemaorg/main/data/schema.ttl
- Local site files: [sitemap](../public/sitemap.xml), [robots.txt](../public/robots.txt), all 11 HTML pages, and [release notes](seo-release.md).

Official references for implementation; live access was blocked during this run, so policy details could not be freshly revalidated:

- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google FAQPage policy: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Google video markup: https://developers.google.com/search/docs/appearance/structured-data/video
- OpenAI crawlers: https://platform.openai.com/docs/bots
- MIA transportation: https://www.miami-airport.com/parking-transportation.asp
- FLL transportation: https://www.broward.org/Airport/passengers/Transportation/Pages/default.aspx
- PBI transportation: https://www.pbia.org/ground-transportation/

This roadmap is research, not an implemented release. Source retrieval logs and the downloaded vocabulary were retained in the research workspace; they are not repository artifacts. The official vocabulary URL above is the source reference.
