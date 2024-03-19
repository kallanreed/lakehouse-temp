export async function onRequest(context) {
  const data = context.env.TEMPDATA;
  const lookbackDays = 4;

  let date = new Date();
  let responseData = new Array();

  for (let i = 0; i < lookbackDays; i++) {
    let prefix = date.toISOString().slice(0, 10);
    console.log('[LOG] Querying for ' + prefix);
    const result = await data.list({ prefix: prefix });
    const items = result.keys;
    console.log('[LOG] Found items ' + items.length);

    for (let i of items) {
      if (i.metadata === undefined) {
        continue;
      }

      responseData.push({
        d: i.name,
        t: i.metadata.t,
        h: i.metadata.h,
        to: i.metadata.to,
        ho: i.metadata.ho,
      });
    }

    date.setDate(date.getDate() - 1);
  }

  return new Response(JSON.stringify(responseData));
}