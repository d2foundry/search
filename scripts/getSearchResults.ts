import { getSearchDbFromDestinyApi } from "@/";

async function main() {
  const res = await getSearchDbFromDestinyApi();
  return res.slice(0, 4);
}

const out = await main();
const stringOut = JSON.stringify(out);
console.log(stringOut);
