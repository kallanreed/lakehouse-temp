export async function onRequest(context) {
  const start = Date.now();
  const data = await context.request.json();
  const result = {
    id: data.id,
    elapsed: Date.now() - start,
    read: data.payload.length
  };

  return Response.json(result);
}