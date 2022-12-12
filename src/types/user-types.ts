import { Dispatch, SetStateAction } from "react";

export interface IImage {
  name: string;
  data: Buffer;
  contentType: string;
}
export interface IUser {
  id: string;
  avatar?: IImage;
  name: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  createdAt: Date;
  tagline: string;
  banner?: IImage;
  location: string;
  quacks: [];
  reQuacks: number;
  following?: IUser[];
  followers?: IUser[];
  usersBlocked?: IUser[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}

export interface IUserPreview {
  avatar?: IImage;
  name: string;
  username: string;
  following?: boolean;
  tagline?: string;
  followingSince?: Date;
  matchesUser?: boolean;
  id?: string;
}

export interface IUsernameInfo {
  name: string;
}
