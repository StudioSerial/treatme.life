# TreatMe.life — Claude Code Context

## Brand

Boutique retreat brand. Not yoga. Boutique travel + movement + place.
Tone: Aman / Six Senses / Casa Cook — calm, editorial, premium but human.
No wellness clichés. No "transformative journey". No exclamation marks.

## People
- **Petra** — founder, yoga teacher
- **Salem** — chef, Taghazout local
- **Ines** — co-founder

## Retreats
- **Istra Edition II** — Rabac, 21–26 Sept 2026, 8 guests, €1,500 total
- **Morocco** — Taghazout, Oct 2026, 4 guests, €1,300 total

## Payments — Istra
- Deposit: €500 (pays at booking via Stripe)
- Balance: €1,000 due 30 days before = by 22 August 2026
- Framing: "€500 now · €1,000 by 22 August · Total €1,500"
- Config: `PAYMENT_ISTRA_DEPOSIT = ''` → replace with Stripe Payment Link

## Cancellation Policy
- >45 days before: full deposit refund or transfer to another retreat
- 30–44 days: deposit retained, balance refunded
- <30 days: no refund
- TreatMe cancels: full refund guaranteed

## Brand Colors
- Night: #1a1a18
- Gold: #C2A27C
- Stone: #E8E2D8
- Moss: #4A6741
- Cream: #F5F2EC
- Muted: #8a8478
- Sand: #D4B896

## Typography
- Headings: Cormorant Garamond or Playfair Display
- Body: Inter or Arial
- Always sentence case. Never ALL CAPS.

## Tech Stack
- Static HTML on Cloudflare Pages
- Vanilla JS, no framework
- `tmEvent()` — custom analytics helper, defined in retreat-istra.html
- mailto forms temporary — Stripe + form backend TBD
- Meta Pixel: needs activation on all pages

## Pages
- `index.html` — homepage
- `retreat-istra.html` — Istra Edition II (main sales page)
- `retreat-maroko.html` — Morocco retreat
- `maroko-waitlist.html` — Morocco interest list (/maroko-waitlist)
- `yoga-sati.html` — yoga classes

## Already Implemented (do not redo)
- retreat-istra.html: hero title "Pet dana. Ljeto koje odlazi polako.",
  for/not-for section, Salem in team, pre-booking enquiry form (7 fields,
  mailto, tmEvent), 10 FAQ items, tmEvent() helper,
  PAYMENT_ISTRA_DEPOSIT config placeholder, CTA event listeners
- maroko-waitlist.html: waitlist form, early access checkbox,
  Istra bridge section at bottom
- retreat-maroko.html: sidebar + header pill → /maroko-waitlist, tmEvent
- yoga-sati.html: retreat bridge section → /retreat-istra, tmEvent

## Still To Do
1. Replace PAYMENT_ISTRA_DEPOSIT with real Stripe link (€500)
2. Update all deposit mentions: €200 → €500
3. Add cancellation policy section to retreat-istra.html
4. Add balance payment note after form submit success
5. Add Meta Pixel + fbq('track','Lead') on form submit,
   fbq('track','InitiateCheckout') on deposit CTA clicks
6. Add FAQ JSON-LD schema markup to retreat-istra.html
7. Add/update Open Graph tags on retreat-istra.html + retreat-maroko.html
8. Mobile sticky CTA bar on retreat-istra.html (Night bg, Gold text,
   "Reserve — €500" button, appears after hero scroll)
9. Verify /maroko-waitlist route doesn't 404
10. Add img alt text + placeholder styling for missing Salem/Ines images

## Routes
- /retreat-istra → retreat-istra.html
- /retreat-maroko → retreat-maroko.html
- /maroko-waitlist → maroko-waitlist.html
- /yoga-sati → yoga-sati.html

## Do Not Change Without Instruction
- Brand voice and tone
- Color palette
- Copy style (sentence case, no hype)
- Existing implemented features (see above)
