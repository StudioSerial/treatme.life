# Kampanja: Edition II Istra — 8 mjesta u 3 dana

Cilj: 8 pologa × €500 na treatme.life/retreat-istra unutar 3 dana.
Trenutno stanje: 0/8 rezervirano, retreat 19.–24. rujna 2026.

---

## 1. Tehnički preduvjeti — MORA prije paljenja oglasa

Kampanja optimizirana za "polog plaćen" ne može raditi dok ovo nije gotovo:

### 1a. Stripe — redirect nakon plaćanja
U Stripe Dashboardu → Payment Links → otvori Istra link → "After payment" → "Redirect customers to your website":

```
https://treatme.life/hvala-polog?retreat=istra&session_id={CHECKOUT_SESSION_ID}
```

Isto za Maroko link (kad krene):
```
https://treatme.life/hvala-polog?retreat=maroko&session_id={CHECKOUT_SESSION_ID}
```

Stranica `/hvala-polog` je izgrađena i šalje GA4 `purchase` event (€500, EUR) i Meta `Purchase` event čim netko stigne na nju nakon uplate. Bez ovog redirecta, ništa se ne mjeri.

### 1b. GA4 — označi konverziju
GA4 Admin → Events → provjeri da se `purchase` event pojavljuje (test-transakcija) → toggle "Mark as conversion" ako već nije automatski uključen (purchase je standardni GA4 e-commerce event, obično se automatski označi).

### 1c. Google Ads — konverzija
Google Ads → Goals → Conversions → Import iz Google Analytics (GA4) property → importaj `purchase` kao novu conversion action → postavi kao **primary** conversion. Trenutna Search kampanja optimizirala je prema `generate_lead` — to sad postaje sekundarna signal, `purchase` postaje glavni cilj kampanje. Napomena: Google Ads treba minimalno par konverzija da "nauči" pa se u prva 2-3 dana ne oslanjaj previše na automatsko optimiziranje, prati ručno.

### 1d. Meta Pixel — TRENUTNO NIJE INSTALIRAN
Provjerio sam kod: `fbq()` pozivi (Lead, InitiateCheckout, sad i Purchase) postoje u kodu ali **Meta Pixel base script nikad nije ubačen na stranicu** — svi ti pozivi trenutno ne rade ništa. Ovo mora biti riješeno prije nego Meta oglasi imaju ikakav signal za optimizaciju.

Trebam tvoj **Pixel ID** iz Meta Events Manager (Business Settings → Data Sources → Pixels). Kad mi ga pošalješ, ubacujem base kod na retreat-istra.html, retreat-maroko.html, hvala-polog.html i homepage — traje par minuta.

U Meta Ads Manager-u kampanja treba optimizirati prema **Purchase** eventu (ne Lead) čim pixel bude aktivan i skuplja podatke.

---

## 2. Budžet — preporuka

Nemam pristup postojećim Google Ads/Meta brojkama (impressions, CPL, CTR) pa ne mogu računati na stvarnim podacima — ovo je procjena za premium proizvod (€1.500, uska ciljna skupina, financijski neovisne žene 35-50).

**Realno očekivanje:** 8 pologa iz hladnog prometa za 3 dana je agresivno. Najbrže konvertira topla publika (postojeći leadovi, newsletter, ljudi koji su već posjetili stranicu, IG engageri) — njih prioritiziraj.

| Kanal | Dnevni budžet | Fokus |
|---|---|---|
| Meta (Instagram/FB) | €70–90/dan | Retargeting: website visitors 90d, IG/FB engageri, email lista kao Custom Audience, + malo lookalike |
| Google Search | €30–60/dan | Nastavak postojeće kampanje (FR/CH/UK/JP/HR), pojačan budžet na branded + high-intent termine |
| **Ukupno** | **€100–150/dan · €300–450 za 3 dana** | |

Ako prva dva dana pokažu jeftine konverzije (razumna CPA za €500 polog bila bi realno €30-80), scaliraj Meta budžet trećeg dana. Ako do kraja drugog dana nema nijedne konverzije s razumnim spendom, zaustavi i preispitaj prije nego potrošiš cijeli budžet — ne guraj slijepo.

---

## 3. Targeting

**Prioritet 1 — topla publika (Meta):**
- Website visitors zadnjih 90 dana (svi + posebno oni koji su posjetili /retreat-istra)
- Ljudi koji su engageirali s Instagram/Facebook profilom zadnjih 180 dana
- Email lista (newsletter + prijašnji upiti) uploadana kao Custom Audience
- 1% lookalike na temelju website visitors ili email liste (ako publika ima min. 100+ ljudi za kvalitetan lookalike)

**Prioritet 2 — hladna publika (Google Search, nastavak postojećeg):**
- Geo: FR, CH, UK, JP, HR (kao i sad)
- Ključne riječi: zadrži postojeće high-intent search termine, izbjegavaj široke/generic upite (AI Max expansion je već isključen zbog trošenja budžeta bez konverzija — ostani na tome)

---

## 4. Ad copy

Ton: miran, editorial, bez uskličnika, bez "transformative journey" fraza. Direktnost dolazi iz konkretnosti (€500, 8 mjesta), ne iz hypea.

### Google Search — Responsive Search Ad

**Headlines (≤30 znakova):**
1. Retreat u Istri, rujan 2026
2. 8 mjesta. GreenTree Villa.
3. Šest dana uz Jadran
4. Yoga, hrana, tišina
5. Rezerviraj uz €500 polog
6. Rabac, Istra · Edition II
7. Small-group retreat, Istria
8. Six days by the Adriatic

**Descriptions (≤90 znakova):**
1. Šest dana u Istri, jutarnja yoga, Salemova kuhinja. Max 8 gostiju. Od €1.500.
2. Sigurno mjesto uz polog od €500. Ostatak dospijeva 22. kolovoza.
3. Intimno okupljanje uz more. Nema programa od minute do minute. Ima prostora.
4. 19–24 rujna, Rabac. Petra vodi praksu, Salem kuha. Rezervacije otvorene.

### Meta (Instagram/Facebook) — Feed/Story

**Varijanta A — mjesto (place-led):**
Primary text (HR):
"Osam mjesta iznad Rabca. Vila s pogledom na Jadran, jutarnja praksa s Petrom, večeri za dugim stolom uz Salemovu kuhinju. Rujan, kad turisti odu i more ostane samo za nas. Rezervacija se potvrđuje pologom od €500."
Headline: Edition II · Istra · 19–24 rujna
CTA button: Book Now / Rezerviraj

Primary text (EN):
"Eight spots above Rabac. A villa with Adriatic views, morning practice with Petra, long dinners from Salem's kitchen. September, when the tourists leave and the sea is quiet again. A €500 deposit secures your place."
Headline: Edition II · Istria · 19–24 Sep
CTA button: Book Now

**Varijanta B — retargeting (za one koji su već bili na stranici):**
Primary text (HR):
"Još razmišljaš o Istri u rujnu? Osam mjesta, mala grupa, GreenTree Villa. Polog od €500 rezervira tvoje mjesto u par minuta — ostatak dospijeva tek 22. kolovoza."
Headline: Dovrši rezervaciju →
CTA button: Book Now

Primary text (EN):
"Still thinking about Istria in September? Eight spots, a small group, GreenTree Villa. A €500 deposit holds your place in a few minutes — the balance isn't due until 22 August."
Headline: Complete your booking →
CTA button: Book Now

**Varijanta C — kratka, za Stories:**
HR: "8 mjesta. Rabac, rujan. €500 rezervira tvoje." → Rezerviraj →
EN: "8 spots. Rabac, September. €500 holds yours." → Reserve →

---

## 5. Napomena o "urgency" elementima na stranici

Nisam dodao countdown timer na retreat-istra.html. Razlog: nema stvarnog roka koji bi opravdao countdown (retreat se ne zatvara za rezervacije za 3 dana, samo je oglasna kampanja 3-dnevna) — lažni countdown je dark pattern i sudara se s vašim vlastitim brand pravilom "no hype, no exclamation marks". Stranica već ima iskrenu oskudicu ugrađenu (8 mjesta ukupno, mala grupa naglašena kroz cijeli copy).

Ako želiš pravi razlog za 3-dnevni pritisak, dvije opcije:
1. **Stvarni bonus s rokom** (npr. besplatan airport pickup ako rezerviraš do petka) — reci mi detalje pa ubacujem na stranicu i u oglase.
2. **Bez posebnog bonusa** — oglasi nose urgency kroz copy ("8 mjesta, mala grupa"), stranica ostaje kakva je.

---

## 6. Checklist prije paljenja

- [ ] Stripe redirect URL postavljen (1a)
- [ ] Meta Pixel ID poslan Claudeu → pixel ubačen na stranicu
- [ ] Test transakcija provedena (mala uplata ili Stripe test mode) → provjeri da `/hvala-polog` firea GA4 purchase i Meta Purchase
- [ ] GA4 purchase event potvrđen kao conversion
- [ ] Google Ads: purchase conversion importana i postavljena kao primarna
- [ ] Meta Ads: kampanja/ad set cilja Purchase event (ne Lead)
- [ ] Custom Audience u Metau: email lista + website visitors uploadani
- [ ] Ad copy iz sekcije 4 ubačen u oglase
- [ ] Odluka o urgency bonusu (sekcija 5)
