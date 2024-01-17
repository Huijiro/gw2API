import { Endpoints, EndpointsWithoutAuth } from "./endpoints.js";
import { APIHeaders } from "./headers.js";
import { Required } from "utility-types";
import { APIResponse } from "./responses.js";
import {
  APIBadGatewayError,
  APIForbiddenError,
  APIGatewayTimeoutError,
  APINotFoundError,
  APIUnauthorizedError,
  APIUnavailableError,
  APIUnknownError,
} from "./errors.js";

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
      if (key == "Authorization") {
        return [key, "Bearer " + value.toString()];
      }

      return [key, value.toString()];
    }),
  };

  const response = (await fetch(
    "https://api.guildwars2.com/v2" + endpoint,
    init,
  )) as APIResponse<T>;

  if (!response.ok) {
    const body = await response.json();

    switch (response.status) {
      case 401:
        throw new APIUnauthorizedError(body.text);
      case 403:
        throw new APIForbiddenError(body.text);
      case 404:
        throw new APINotFoundError(body.text);
      case 502:
        throw new APIBadGatewayError(body.text);
      case 503:
        throw new APIUnavailableError(body.text);
      case 504:
        throw new APIGatewayTimeoutError(body.text);
      default:
        throw new APIUnknownError(body);
    }
  }

  return (await response.json()) as T;
}

export { fetchAPI };
