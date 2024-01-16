export class APIError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "APIError";
  }
}

export class APIUnauthorizedError extends APIError {
  constructor(text: string) {
    super(
      "GuildWars2 API returned a 401 status code with the message: " + text,
    );
  }
}

export class APIForbiddenError extends APIError {
  constructor(text: string) {
    super(
      "GuildWars2 API returned a 403 status code with the message: " + text,
    );
  }
}

export class APINotFoundError extends APIError {
  constructor(text: string) {
    super(
      "GuildWars2 API returned a 404 status code with the message: " + text,
    );
  }
}

export class APIBadGatewayError extends APIError {
  constructor(text: string) {
    super(
      "GuildWars2 API returned a 502 status code with the message: " + text,
    );
  }
}

export class APIUnavailableError extends APIError {
  constructor(text: string) {
    super(
      "GuildWars2 API returned a 503 status code with the message: " + text,
    );
  }
}

export class APIGatewayTimeoutError extends APIError {
  constructor(text: string) {
    super(
      "GuildWars2 API returned a 504 status code with the message: " + text,
    );
  }
}

export class APIUnknownError extends APIError {
  body: unknown;
  constructor(body: unknown) {
    super(
      "GuildWars2 API returned an unknown status code, this error contais a unknown body",
    );
    this.body = body;
  }
}
