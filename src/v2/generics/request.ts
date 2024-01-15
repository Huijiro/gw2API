import { Endpoints, EndpointsWithoutAuth } from "./endpoints.js";
import { APIHeaders } from "./headers.js";
import { Required } from "utility-types";
import { APIErrorResponse } from "./responses.js";

type fetchOpts =
  | {
      endpoint: Endpoints;
      headers: Required<APIHeaders, "Authorization">;
    }
  | {
      endpoint: EndpointsWithoutAuth;
      headers: APIHeaders;
    };

async function fetchAPI<T>({ endpoint, headers }: fetchOpts) {
  const init: RequestInit = {
    headers: Object.entries(headers).map(([key, value]) => {
      return [key, value.toString()];
    }),
  };

  const response = await fetch(
    "https://api.guildwars2.com/v2" + endpoint,
    init,
  );

  if (!response.ok) {
    return (await response.json()) as APIErrorResponse;
  }

  return (await response.json()) as T;
}

export { fetchAPI };
