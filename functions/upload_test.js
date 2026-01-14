export async function onRequest(context) {
  const start = Date.now();

  const reader = context.request.body?.getReader();
  let read = 0;

  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      read += value.byteLength;
    }
  }

  const elapsed = Date.now() - start;

  return new Response(
    JSON.stringify({
      elapsed,
      read,
    }),
    {
      status: 204, // or 200 if you prefer
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}