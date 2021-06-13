import { atom } from "recoil";
import DB from "data/db.json";

export const userAtom = atom({
  key: "userAtom",
  default: DB.sort((a, b): number => {
    return a.companyName < b.companyName
      ? -1
      : a.companyName > b.companyName
      ? 1
      : 0;
  }),
});
