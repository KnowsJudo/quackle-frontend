import { createContext } from "react";
import { IUser } from "../types/user-types";

export const initialUserData: IUser = {
  displayPic: "",
  name: "",
  username: "",
  password: "",
  email: "",
  dateOfBirth: new Date(),
  createdAt: new Date(),
  quacks: 0,
  reQuacks: 0,
  friends: [],
  usersBlocked: [],
};

export const QuackleContext = createContext({
  userData: initialUserData,
  //eslint-disable-next-line
  setUserInfo: (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    null;
  },
});
