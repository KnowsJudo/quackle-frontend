import { Dispatch, SetStateAction } from "react";
export interface IUser {
  displayPic: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: string;
  quacks: number;
  reQuacks: number;
  friends: IUser[];
  usersBlocked: IUser[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}
