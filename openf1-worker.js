/* ============================================================
   PARC FERMÉ · OpenF1-tussenstukje (Cloudflare Worker)
   ------------------------------------------------------------
   Waarom dit bestaat:
   OpenF1 geeft een token dat na een uur verloopt. Dit stukje houdt
   jouw inloggegevens vast, haalt zelf steeds een vers token op en
   geeft de data door aan de site. Gevolg:
     · niemand hoeft op zijn telefoon nog iets in te vullen
     · je wachtwoord staat NIET in de openbare broncode
     · het staat alleen hier, versleuteld, bij Cloudflare
   Kosten: niets (gratis abonnement is ruim voldoende).
   ------------------------------------------------------------
   Twee geheimen instellen (Settings -> Variables -> Add secret):
     OPENF1_USER  = je OpenF1 e-mailadres
     OPENF1_PASS  = je OpenF1 wachtwoord
   Die typ je zelf in bij Cloudflare; ze zijn daarna niet meer
   leesbaar, ook niet voor jou.
   ============================================================ */

const OPENF1 = 'https://api.openf1.org';

// wie mag dit tussenstukje gebruiken? (anders kan iedereen je abonnement opmaken)
const TOEGESTAAN = [
  'https://jrwaku.github.io',
  'http://localhost:8000',
];

let token = null;          // { waarde, verloopt }  — blijft in het geheugen

async function haalToken(env, force) {
  if (!force && token && Date.now() < token.verloopt - 60_000) return token.waarde;
  const r = await fetch(`${OPENF1}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      username: env.OPENF1_USER,
      password: env.OPENF1_PASS,
    }).toString(),
  });
  if (!r.ok) throw new Error(`token ophalen mislukt (${r.status})`);
  const j = await r.json();
  token = {
    waarde: j.access_token,
    verloopt: Date.now() + (parseInt(j.expires_in, 10) || 3600) * 1000,
  };
  return token.waarde;
}

function corsKop(origin) {
  const toegestaan = TOEGESTAAN.includes(origin) ? origin : TOEGESTAAN[0];
  return {
    'Access-Control-Allow-Origin': toegestaan,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const cors = corsKop(origin);

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'GET')
      return new Response('alleen GET', { status: 405, headers: cors });

    const url = new URL(request.url);
    if (!url.pathname.startsWith('/v1/'))
      return new Response('gebruik /v1/...', { status: 404, headers: cors });

    const doel = OPENF1 + url.pathname + url.search;

    try {
      let t = await haalToken(env, false);
      let r = await fetch(doel, { headers: { Authorization: `Bearer ${t}` } });

      if (r.status === 401 || r.status === 403) {      // token verlopen -> nieuw halen
        t = await haalToken(env, true);
        r = await fetch(doel, { headers: { Authorization: `Bearer ${t}` } });
      }

      return new Response(r.body, {
        status: r.status,
        headers: {
          ...cors,
          'Content-Type': r.headers.get('Content-Type') || 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    } catch (e) {
      return new Response(JSON.stringify({ detail: String(e.message || e) }), {
        status: 502,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }
  },
};
