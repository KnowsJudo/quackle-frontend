import { createContext } from "react";
import { IUser } from "../types/user-types";

export const initialUserData: IUser = {
  name: "",
  username: "",
  password: "",
  email: "",
  quacks: 0,
  reQuacks: 0,
  userFriends: [],
  userBlocked: [],
};

export const QuackleContext = createContext({
  userData: initialUserData,
  //eslint-disable-next-line
  setUserInfo: (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    null;
  },
});
