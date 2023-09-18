import { getSearchDbFromDestinyApi } from "@/";

const server = Bun.serve({
  port: 3000,
  async fetch(_) {
    const res = await getSearchDbFromDestinyApi();
    const sliced = res.slice(0, 4);
    return new Response(JSON.stringify(sliced));
  },
});

console.log(`Listening on localhost: ${server.port}`);
