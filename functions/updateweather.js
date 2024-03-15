export function onRequest(context) {
  console.log("[LOG] " + context.request.url);
  return new Response("OK");
}