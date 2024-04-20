import { test, expect, describe } from "bun:test";
import { getItemSource } from "../mapping/sources";
import { getIsAdeptFromName } from "../items";
import { getAmmoType, getEnergyFromDamageType, getRarityFromTierType } from "../mapping/itemProperties";

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

describe("getIsAdeptFromName", () => {
  test("returns true when Adept", () => {
    expect(getIsAdeptFromName("The Palindrome (Adept)")).toBeTrue();
    expect(getIsAdeptFromName("Fatebringer (Timelost)")).toBeTrue();
  });
  test("returns false when not Adept", () => {
    expect(getIsAdeptFromName("The Palindrome")).toBeFalse();
    expect(getIsAdeptFromName("Fatebringer")).toBeFalse();
  });
});

describe("getAmmoType", () => {
  test("gets ammo text from AmmoType", () => {
    const source = getAmmoType(1);
    expect(source).toBe("Primary");
  });
});

describe("getEnergyFromDamageType", () => {
  test("gets energy text from DamageType", () => {
    const energy = getEnergyFromDamageType(3);
    expect(energy).toBe("solar");
  });
});

describe("getRarityFromTierType", () => {
  test("gets energy text from DamageType", () => {
    const exotic = getRarityFromTierType(6);
    const legendary = getRarityFromTierType(5);

    expect(exotic).toBe("exotic");
    expect(legendary).toBe("legendary");
  });
});
