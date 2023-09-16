import { getManifest, getSearchDb } from "../src/api";

async function main() {
  const defs = await getManifest();
  if (defs) {
    const results = await getSearchDb();
    return results.slice(0, 50);
  }
  return [];
}

const out = await main();
const stringOut = JSON.stringify(out);
console.log(stringOut);
// Bun.write("../out.json", stringOut);
