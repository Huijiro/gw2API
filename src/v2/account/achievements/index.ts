export type AccountAchievements = {
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

export function getAccountAchievements(authorization: string) {
  const requestInit: RequestInit = {
    headers: {
      Authorization: authorization,
    },
  };

  return fetch(
    "https://api.guildwars2.com/v2/account/achievements",
    requestInit,
  );
}
