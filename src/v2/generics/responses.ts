type APIGoodResponse<T, I> = {
  ok: true;
  status: I;
  json: () => Promise<T>;
} & import("undici-types").Response;

type APIBadReponse<T, I> = {
  ok: false;
  status: I;
  // Sometimes the GuildWars API can throw errors that are not JSON, if you are here it may be because of it.
  json: () => Promise<T>;
} & import("undici-types").Response;

type APIOkRespose<T> = APIGoodResponse<T, 200>;
type APIPartialReponse<T> = APIGoodResponse<T, 206>;

type APIForbiddenResponse<T> = APIBadReponse<T, 403>;
type APINotFoundResponse<T> = APIBadReponse<T, 404>;

type APIBadGatewayResponse<T> = APIBadReponse<T, 502>;
type APIUnavailableResponse<T> = APIBadReponse<T, 503>;
type APIGatewayTimeoutResponse<T> = APIBadReponse<T, 504>;

type APIErrorResponse<
  T = {
    text: string;
  },
> =
  | APIForbiddenResponse<T>
  | APINotFoundResponse<T>
  | APIBadGatewayResponse<T>
  | APIUnavailableResponse<T>
  | APIGatewayTimeoutResponse<T>;

