import { fetchAPI } from "../generics/request.js";

type IDArray = [number, number, number];

type Specialization = {
  id: number;
  traits: IDArray;
};

type Skills = {
  heal: number;
  utilities: IDArray;
  elite: number;
};

type Pets = {
  terrestrial: [number, number];
  aquatic: [number, number];
};

type AccountBuildStorage = {
  name: string;
  profession: string;
  specializations: [Specialization, Specialization, Specialization];
  skills: Skills;
  aquatic_skills: Skills;
  legends?: [number, number];
  aquatic_legends?: [number, number];
  pets?: Pets;
};

const buildstorage = async (authorization: string) => {
  return await fetchAPI<AccountBuildStorage[]>({
    endpoint: "/account/bank",
    headers: {
      Authorization: authorization,
    },
  });
};

export { buildstorage };
