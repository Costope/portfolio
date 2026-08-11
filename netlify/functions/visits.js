import { getStore } from '@netlify/blobs';

export default async (req) => {
  // Verbinde mit dem Netlify Blob-Speicher für Analytics
  const store = getStore('analytics');

  // Hole den aktuellen Wert (falls vorhanden, sonst 0)
  const currentViewsRaw = await store.get('views');
  let views = currentViewsRaw ? parseInt(currentViewsRaw, 10) : 0;

  // Nur hochzählen, wenn die Anfrage NICHT von localhost kommt (Live Server Ignorieren)
  const host = req.headers.get('host') || '';
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

  if (!isLocalhost) {
    views += 1;
    console.log('Views updated to: ${views}');
    await store.set('views', views.toString());
  }

  // Rückgabe mit perfekten CORS-Headern (damit dein Frontend nie blockiert wird)
  return new Response(JSON.stringify({ views }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Erlaubt den Zugriff von deiner Domain
    },
  });
};