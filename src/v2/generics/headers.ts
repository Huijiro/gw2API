export type PagingHeaders = {
  // The size of a page (like the page_size query parameter).
  "X-Page-Size": number;
  // The total number of pages.
  "X-Page-Total": number;
  // The number of resources on the current page (lower or equal to the page size).
  "X-Result-Count": number;
  // The total number of resources.
  "X-Result-Total": number;
};

export type AuthenticationHeader = {
  /**
   * All of the endpoints which fetch account data require the use of an API
   * key.
   *
   * You can get a new API key by accessing:
   * https://account.arena.net/login?redirect_uri=%2Fapplications
   */
  Authorization: string;
};

export type LocalisationHeaders = {
  // All of the endpoints which are locale-aware accept a language parameter.
  "Accept-Language": "en" | "es" | "de" | "fr" | "zh";
};

export type SchemaHeaders = {
  /**
   * Selected endpoints support different Schema versions. The request needs to
   * be in ISO-8601 format.
   */
  "X-Schema-Version": string;
};

export type APIHeaders = Partial<
  PagingHeaders & AuthenticationHeader & LocalisationHeaders & SchemaHeaders
>;
