import { expect, test } from "vitest";
import { GW2API } from "../index";

test("GW2API is defined.", () => {
  const client = new GW2API();

  expect(client).toBeDefined();
  expect(client).toBeInstanceOf(GW2API);
});
