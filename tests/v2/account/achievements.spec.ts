import { describe, expect, test } from "vitest";
import { GW2API } from "../../../src/index.ts";
import { API_KEY } from "../../utils.ts";

describe("account/achievements", () => {
  test("Request works", async () => {
    const client = new GW2API();
    const achievements = await client.V2.account.achievements({
      access_token: API_KEY,
    });

    expect(achievements).instanceOf(Array);
  });
});
