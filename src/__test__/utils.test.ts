import { test, expect, describe } from "bun:test";
import { getItemSource } from "src/utils";

const MISSING_SOURCE_ITEM = 4024037919; // origin story
const PROPHECY_SOURCE_HASH = 506073192;

describe("getItemSource", () => {
  test("finds missing source info from item hash", () => {
    const source = getItemSource(MISSING_SOURCE_ITEM);

    expect(source).toEqual(["strikes", "zavala"]);
  });
  test("finds source info from source hash", () => {
    const source = getItemSource(MISSING_SOURCE_ITEM, PROPHECY_SOURCE_HASH);
    expect(source).toEqual(["dungeon", "prophecy"]);
  });
});
