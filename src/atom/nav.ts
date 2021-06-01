import { atom } from "recoil";

export const navAtom = atom({
  key: "navAtom",
  default: false,
});

export const selectComapnyName = atom({
  key: "selectComapnyName",
  default: "",
});
