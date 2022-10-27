import { Dispatch, SetStateAction } from "react";
export interface IUser {
  displayPic: string;
  name: string;
  username: string;
  password: string;
  email: string;
  quacks: number;
  reQuacks: number;
  dateOfBirth: Date;
  createdAt: Date;
  userFriends: IUser[];
  userBlocked: IUser[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}
