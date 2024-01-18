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

const buildstorage = async (params: {
  access_token: string;
  page?: number;
  page_size?: number;
  v?: Date;
}) => {
  return await fetchAPI<AccountBuildStorage[]>({
    endpoint: "/account/bank",
    params,
  });
};

export { buildstorage };
