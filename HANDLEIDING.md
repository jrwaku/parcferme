# 🏁 PARC FERMÉ — handleiding

## ✅ Jullie site staat LIVE

**https://jrwaku.github.io/parcferme/**

Alles is opgezet en getest. Wat er nu draait:

| Onderdeel | Waar |
|---|---|
| De site | https://jrwaku.github.io/parcferme/ |
| Broncode | https://github.com/jrwaku/parcferme |
| Database (voorspellingen + codes) | https://supabase.com/dashboard/project/wpzvbudaexzqdghcesiy |

Kosten: **€0** per maand. Onderhoud: **geen** — de site pakt elk seizoen automatisch de nieuwe kalender op.

---

## Wat jullie nu moeten doen

1. **App de link** naar Rick, Euge en Maup: https://jrwaku.github.io/parcferme/
2. **Iedereen kiest z'n eigen code.** Tik op je naam → kies een 4-cijferige code → herhalen. Die staat daarna voorgoed vast, ook op andere toestellen. Niemand kan bij andermans profiel. 🔒
3. **Zet 'm op je beginscherm** (dan is het net een app):
   - *iPhone:* open de link in Safari → deel-knop (vierkantje met pijltje) → **Zet op beginscherm**
   - *Android:* open in Chrome → menu (⋮) → **Toevoegen aan startscherm**
4. **Voorspellen maar.** De kwali-voorspelling voor Zandvoort sluit **zaterdag 22 augustus om 16:00**, de race-voorspelling opent daarna en sluit **zondag 23 augustus om 15:00**.

---

## Iets aanpassen

Ga naar https://github.com/jrwaku/parcferme, klik op `index.html`, dan op het **potlood-icoon** ✏️, wijzig, en klik **Commit changes**. Binnen een minuutje staat de wijziging live.

Bovenin het bestand staat het blok `CONFIG`:

- **Namen en emoji's** van jullie vier (`players`) — Jay, Rick, Euge en Maup staan er al in. ⚠️ De `id`'s moeten hetzelfde blijven zodra jullie beginnen met voorspellen.
- **Inlogcodes** hoef je nergens in te stellen: iedereen kiest bij z'n éérste bezoek zelf een geheime 4-cijferige code (kiezen + herhalen) en die staat daarna voorgoed vast — ook op andere toestellen, via de gedeelde opslag. Niemand kan andermans code wijzigen of zomaar in andermans profiel. **Code vergeten?** Alleen jij als beheerder kunt resetten: Supabase → Table Editor → tabel `pins` → verwijder de rij van die persoon; daarna kan hij/zij een nieuwe code aanmaken. (De site bewaart geen leesbare codes, alleen een versleutelde vorm.)
- **De naam van het klassement** (`cupName`) — nu 'De Anti-Russell Cup' 😄.
- **Jokers per seizoen** (`jokersPerSeason`, standaard 2).

Iets wijzigen nadat de site online staat? Bewerk het bestand gewoon opnieuw in GitHub (potlood-icoon) en commit.

## Het spel: De Anti-Russell Cup 🏆

Elk raceweekend voorspel je in twee stappen. **Vóór de kwalificatie** vul je de kwali-top-3 in (Q1/Q2/Q3). **Ná de kwalificatie** — als je de grid kent — opent de race-voorspelling: de race-top-3 plus wie de snelste raceronde rijdt. Alles is geheim voor elkaar tot de betreffende sessie begint.

| 🕐 Kwalificatie | Punten |
|---|---|
| Q1 (pole) exact goed | **12** |
| Q2 exact goed | **9** |
| Q3 exact goed | **7** |
| Wel top 3, verkeerde plek | **4** |
| Alle drie exact | **+18 bonus** |

| 🏁 Race | Punten |
|---|---|
| P1 exact goed | **25** |
| P2 exact goed | **18** |
| P3 exact goed | **15** |
| Wel podium, verkeerde plek | **8** |
| Perfect podium (alle drie exact) | **+35 bonus** 🎉 |
| ⚡ Snelste raceronde goed | **+10 bonus** |
| Joker 🃏 | **racepunten ×2** (2× per seizoen, telt niet voor kwalipunten) |

Met de kwali valt dus ongeveer de helft te verdienen van wat de race waard is. Punten en klassement rekent de site automatisch uit — de kwalipunten staan er al zaterdag na de kwali in, de racepunten zondag zodra de officiële uitslag binnen is.

## Live timing tijdens de race 🔴

Vanaf een half uur voor elke training, kwalificatie, sprint of race verschijnt er vanzelf een **LIVE**-tabblad. Niemand hoeft daar iets voor in te stellen — geen inloggen, geen wachtwoord, geen instellingen. Je ziet:

- de **timingtoren** met posities, gaten en intervallen
- **welke band** iedereen op dit moment heeft en hoe oud die is
- tik op een naam → **z'n hele bandenstrategie**: elke stint met band en aantal ronden, de pitstops met de echte stilstandtijd, laatste en snelste ronde, en hoeveel plekken hij gewonnen of verloren heeft
- **De Anti-Russell Cup zoals het er nu voor staat** — wie zou er winnen als het zo eindigt
- de meldingen van de wedstrijdleiding (vlaggen, safety car, onderzoeken)

De data komt van OpenF1 via een eigen tussenpost bij Cloudflare, die het abonnement en de sleutel voor iedereen afhandelt. Kosten blijven €9,90 per maand voor het OpenF1-abonnement; de tussenpost zelf is gratis.

**Werkt live bij jou niet?** Ga naar het LIVE-tabblad (als er geen sessie loopt staat er een knop **"Werkt live bij mij? Even testen"**) en tik daarop. Je krijgt in gewone taal te zien of de verbinding werkt en of je de nieuwste versie draait.

## Optioneel: eigen domein (± €10 per jaar)

Wil je bijvoorbeeld `parcferme.nl` in plaats van het github.io-adres?

1. Koop het domein (TransIP, Versio, Cloudflare — maakt niet uit).
2. Bij je domeinaanbieder: maak een **CNAME**-record dat `www` naar `jrwaku.github.io` wijst. (Voor het kale domein zonder `www`: vier A-records naar 185.199.108.153, 185.199.109.153, 185.199.110.153 en 185.199.111.153.)
3. In GitHub: **Settings → Pages → Custom domain** → vul je domein in → **Save**.
4. Zet daarna **Enforce HTTPS** aan zodra dat kan (kan een uurtje duren).

## Punten uitgesplitst

- **Stand → Cup → tik op een naam:** het seizoensrapport. Hoe vaak je exact goed zat, hoe vaak wel-op-het-podium-maar-verkeerde-plek, hoe vaak perfect podium, hoe vaak de snelste ronde — met de punten per categorie. De kolom telt precies op tot je totaal.
- **Stand → Per race → tik op een getal:** waar die punten van die ene race vandaan komen, regel voor regel: wat je invulde, wat het werd, en wat het opleverde.

## Altijd de nieuwste versie

De app kijkt zelf of er een nieuwere versie klaarstaat en ververst zich dan. Zie je onderin een gele balk *"Er staat een nieuwere versie klaar"*, tik dan op **Vernieuwen**. Onder in het LIVE-tabblad staat welke versie je draait.

## Onderhoud

Geen. De site pakt elk nieuw seizoen automatisch de nieuwe kalender, coureurs en teams op — ook in 2027 en daarna. Het enige eventuele terugkerende is de verlenging van een eigen domeinnaam (gaat vanzelf via je aanbieder).

Veel plezier met z'n vieren! 🏎️🏁
