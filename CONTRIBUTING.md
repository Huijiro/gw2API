# Contributing to the project

If you want to contribute to this project please read the topics for a guidance on how to structure your code to follow the project already used structure.

* [Project Structure](##project-structure)
* [How to implement a endpoint](#how-to-implement-a-endpoint)
* [Testing](#testing)
* [Formatting and Linting](#code-formatting-and-linting)
* [Other](#discussions-about-other-things)

## Project Structure

The project follows how the GW2 API is structured in a sense, folders and objects follow the structure of the endpoints.

```
...
├── src
│   ├── v2
|   │   ├── routes
|   │   ├── route-with-subroutes
│   |   │   ├── subroutes   
│   ├── __test__
│   │   ├── v2
│   |   │   ├── routes
|   │   │   ├── route-with-subroutes
│   |   │   │   ├── subroutes  
...
```

**The test folder should replicate the src folder structure.**

### How to structure the routes:

Routes either have subroutes on them, or they don't.

If a route has subroutes on them it should be specified with a class structure and each of it's methods should be a arrow function, the structure is already setup in the project for those.

*Example of the Wvw route:*
```typescript
export class Wvw {
  abilities = () => {
    throw new Error("Enpoint not implemented");
  };

  matches = () => {
    throw new Error("Enpoint not implemented");
  };

  objectives = () => {
    throw new Error("Enpoint not implemented");
  };

  ranks = () => {
    throw new Error("Enpoint not implemented");
  };

  upgrades = () => {
    throw new Error("Enpoint not implemented");
  };
}
```

If the route is the final endpoint it should be implemented on it's own file with it's typing and then imported as a method for the upper route.

*Example of the account/achievements endpoint:*

**src/v2/account/achievements.ts**
```typescript
import { fetchAPI } from "../generics/request.js";

type AccountAchievements = {
  // The achievement id.
  id: number;
  // This attribute contains an array of numbers, giving more specific information on the progress for the achievement. The meaning of each value varies with each achievement. Bits start at zero. If an achievement is done, the in-progress bits are not displayed.
  bits?: number[];
  // The player's current progress towards the achievement.
  current?: number;
  // the amount needed to complete the achievement.
  max?: number;
  // Whether or not the achievement is done.
  done: boolean;
  // The number of times the achievement has been completed if the achievement is repeatable.
  repeated?: number;
  // Whether or not the achievement is unlocked. Note that if this property does not exist, the achievement is unlocked as well.
  unlocked?: boolean;
};

const achievements = async (params: {
  access_token: string;
  page?: number;
  page_size?: number;
  v?: Date;
}) => {
  return await fetchAPI<AccountAchievements[]>({
    endpoint: "/account/achievements",
    params,
  });
};

export { achievements };
```

**src/v2/account/index.ts**
```typescript
import { achievements } from "./achievements.js";

export class Account {
  achievements = achievements;

  ...
}
```

## How to implement a endpoint

To implement an endpoint you should use the fetchAPI function from the **generics** folder, it has all the typings for the endpoints already in it for completion and it has error handling.

So to implement a endpoint you should define the type of it's return on a type notation, then pass that type as a generic for the fetchAPI endpoint.

The fetchAPI function has only one parameter which is a object containing two properties, endpoint with all know GW2 endpoints already as typing and a headers object with all the properties know to be accepted by headers in the API.

The object has been typed in a way that if you want to implement a endpoint that is protected by auth it will require the Authorization header to be included in the object too.

> TODO: Maybe add a typing for the endpoints with other properties required eventually, like the endpoints that require Query Params.

> TODO: Implement query params properly.

## Testing

Testing should be done in the test folder, the project is setup at this moment to only compile the actual API and ignore the test folder for compilation usage.

The tests run using the provided API key on a enviroment variable, use your own for local tests. (Check the [example .env](./example.env))

**AT THE MOMENT THE CI WILL BE USING A API KEY FROM A ACCOUNT THAT IS NEW, SO IF IT PASSES FOR YOU USING YOUR API KEY AND NOT ON THE CI PLEASE PROVIDE THE TEST RESULTS, DISCUSSIONS WILL BE HELD**

> Required tests to be accept on a PR:
> - The endpoint cannot throw errors when used correctly.
> - The endpoint required types must be tested properly.
> - Tests cannot be skiped or failed.

## Code formatting and linting.

The project is setup with both [Prettier](https://prettier.io) and [ESLint](https://eslint.org), please follow the guidelines setup in the project already, **PRs that fail linting checks will not be accepted**.

## Making PRs.

To make a PR please create a Issue first if possible, so it can be tracked properly and discussed.

All commits need to pass the commitlint checker in the project.

The project uses convential commit semantics.

## Discussions about other things.

This project is at it's early stage, if you think something should be done differently please do say, open a [Discussion](https://github.com/Huijiro/gw2API/discussions/new/choose) or a [Issue](https://github.com/Huijiro/gw2API/issues/new) and feel free to tag the creator @Huijiro
