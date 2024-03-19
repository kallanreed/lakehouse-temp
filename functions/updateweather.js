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
  const tempIn = Number(params.get('tempinf'));
  const humidityIn = Number(params.get('humidityin'));
  const tempOut = Number(params.get('tempf'));
  const humidityOut = Number(params.get('humidity'));

  console.log('[LOG] Date:' + date);
  console.log('[LOG] TempIn:' + tempIn);
  console.log('[LOG] HumiIn:' + humidityIn);
  console.log('[LOG] TempOut:' + tempOut);
  console.log('[LOG] HumiOut:' + humidityOut);

  await data.put(date, "", {
      metadata: { t: tempIn, h: humidityIn, to: tempOut, ho: humidityOut },
      expirationTtl: 2592000  // 1 month
    });

  return new Response('OK');
}