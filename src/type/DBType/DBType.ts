import { JobType } from "type/JobType/JobType";

export type DBType = {
  name: string;
  explanation: string;
  companyName: string;
  companyLocation: string;
  profileImg: string;
  generation: number;
  tagImg: string;
  position: JobType | string;
};
