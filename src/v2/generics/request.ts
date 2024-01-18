import { Endpoints, EndpointsWithoutAuth } from "./endpoints.js";
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
import { APIParams } from "./params.js";

type fetchOpts =
  | {
      endpoint: Endpoints;
      params: Required<APIParams, "access_token">;
    }
  | {
      endpoint: EndpointsWithoutAuth;
      params: APIParams;
    };

async function fetchAPI<T>({ endpoint, params }: fetchOpts) {
  const init: RequestInit = {
    headers: {
      Authorization: "Bearer " + params.access_token,
    },
  };

  const queryParams: URLSearchParams = new URLSearchParams({});

  if (params.id) {
    if (typeof params.id == "number") {
      queryParams.append("id", params.id.toString());
    } else {
      queryParams.append("id", params.id.join(","));
    }
  }

  if (params.ids) {
    if (params.ids == "all") {
      queryParams.append("ids", "all");
    } else {
      queryParams.append("ids", params.ids.join(","));
    }
  }

  if (params.page) {
    queryParams.append("page", params.page.toString());
  }

  if (params.page_size) {
    queryParams.append("page_size", params.page_size.toString());
  }

  if (params.lang) {
    queryParams.append("lang", params.lang);
  }

  if (params.v) {
    queryParams.append("v", params.v.toISOString());
  }

  const url = new URL(
    "https://api.guildwars2.com/v2" + endpoint + "?" + queryParams.toString(),
  );

  const response = (await fetch(url, init)) as APIResponse<T>;

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
