import { atom } from "recoil";
import DB from "data/db.json";

export const userAtom = atom({
  key: "userAtom",
  default: DB,
});
