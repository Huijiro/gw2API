export type IdParams = {
  id?: number | number[];
  ids?: "all" | string[];
};

export type PagingParams = {
  page?: number;
  page_size?: number;
};

export type AuthParams = {
  access_token: string;
};

export type LanguageParams = {
  lang?: "en" | "es" | "de" | "fr" | "zh";
};

export type SchemaParams = {
  v?: Date;
};

export type APIParams = PagingParams &
  LanguageParams &
  SchemaParams &
  AuthParams &
  IdParams;
