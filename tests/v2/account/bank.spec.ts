import { describe, expect, test, beforeEach, expectTypeOf } from "vitest";
import { GW2API } from "../../../src/index.ts";
import { API_KEY } from "../../utils.ts";

describe("account/bank", () => {
  let client: GW2API;
  let bank: Awaited<ReturnType<typeof client.V2.account.bank>>;
  beforeEach(async () => {
    client = new GW2API();
    bank = await client.V2.account.bank(API_KEY);
  });
  test("Request works", () => {
    expect(bank).toBeDefined();
  });

  describe("Test required types", () => {
    test("should be an array", () => {
      expect(bank).instanceOf(Array);
    });

    test("id should be a number", () => {
      expectTypeOf(bank[0].id).toBeNumber();
    });

    test("count should be a number", () => {
      expectTypeOf(bank[0].count).toBeNumber();
    });
  });
});
