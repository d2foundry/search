import { compress, decompress } from "lz-string";

// compress using LZ on server
export function compressJson(json: string) {
  return compress(json);
}

// decompress on client
export function decompressJson(compressed: string) {
  return decompress(compressed);
}
