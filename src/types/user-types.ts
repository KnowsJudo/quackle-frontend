import { Dispatch, SetStateAction } from "react";
export interface IUser {
  id: string;
  displayPic: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: string;
  quacks: [];
  reQuacks: number;
  friends?: IUser[];
  usersBlocked?: IUser[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}

export interface IUserPreview {
  avatar: string;
  name: string;
  username: string;
  following?: boolean;
  tagline: string;
}
