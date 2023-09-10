import sourceInfo from "./d2-additional-info/source-info";
import missingSourceInfo from "./d2-additional-info/missing-source-info";

// DIM's sources lack spaces and it annoys me. sorry
const formatter: { [key: string]: string } = {
  blackarmory: "black armory",
  lastwish: "last wish",
  kingsfall: "kings fall",
  cayde6: "cayde-6",
  crownofsorrow: "crown of sorrow",
  deepstonecrypt: "deep stone crypt",
  evidenceboard: "evidence board",
  gambitprime: "gambit prime",
  gardenofsalvation: "garden of salvation",
  ironbanner: "iron banner",
  legendaryengram: "legendary engram",
  wartable: "war table",
  lostsectors: "lost sectors",
  "pinnacle-weapon": "pinnacle weapon",
  "ritual-weapon": "ritual weapon",
  rootofnightmares: "root of nightmares",
  saint14: "saint-14",
  scourgeofthepast: "scourge of the past",
  seasonpass: "season pass",
  shatteredthrone: "shattered throne",
  spireofstars: "spire of the stars",
  spireofthewatcher: "spire of the watcher",
  throneworld: "throne world",
  vaultofglass: "vault of glass",
  redwar: "red war",
  vexoffensive: "vex offensive",
  vowofthedisciple: "vow of the disciple",
};
const generateSources = () => {
  const res: { [key: number]: string[] } = {};
  for (const [key, value] of [...Object.entries(sourceInfo)]) {
    const formattedKey = formatter[key];
    const fullKeywords = [formattedKey || key];
    const missingHashes = missingSourceInfo[key] || [];
    for (const itemHash of [...value.itemHashes, ...missingHashes]) {
      if (res[itemHash]) {
        res[itemHash] = [...res[itemHash], ...fullKeywords];
      } else {
        res[itemHash] = [...fullKeywords];
      }
    }

    for (const sourceHash of value.sourceHashes) {
      if (res[sourceHash]) {
        res[sourceHash] = [...res[sourceHash], ...fullKeywords];
      } else {
        res[sourceHash] = [...fullKeywords];
      }
    }
  }
  return res;
};

export const sourceLookup = generateSources();
