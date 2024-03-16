export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const params = parsedUrl.searchParams;
  const mac = params.get('PASSKEY');
  const data = context.env.TEMPDATA;

  if (context.env.ALLOWED_MAC === undefined) {
    throw new Error('ALLOWED_MAC undefined');
  }

  if (mac !== context.env.ALLOWED_MAC) {
    throw new Error('Unauthorized: ' + mac);
  }

  const date = params.get('dateutc');
  const temp = Number(params.get('tempinf'));
  const humidity = Number(params.get('humidityin'));

  console.log('[LOG] Date:' + date);
  console.log('[LOG] Temp:' + temp);
  console.log('[LOG] Humi:' + humidity);

  await data.put(date, JSON.stringify({ t: temp, h: humidity}),
    { expirationTtl: 2592000 });  // 1 month

  return new Response('OK');
}