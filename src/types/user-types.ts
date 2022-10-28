import { Dispatch, SetStateAction } from "react";
export interface IUser {
  displayPic: string;
  name: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: Date;
  createdAt: Date;
  quacks: number;
  reQuacks: number;
  friends: IUser[];
  usersBlocked: IUser[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}
