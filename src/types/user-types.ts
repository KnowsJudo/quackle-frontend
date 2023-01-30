import { Dispatch, SetStateAction } from "react";
export interface IUser {
  id: string;
  avatar?: string;
  name: string;
  username: string;
  email: string;
  dateOfBirth: Date | null;
  createdAt: Date;
  tagline: string;
  banner?: string;
  location: string;
  biography: string;
  quacks: number;
  reQuacks: number;
  likedQuacks: string[];
  following: string[];
  followers: string[];
  usersBlocked: string[];
}
export interface IUserState {
  userData: IUser;
  setUserData: Dispatch<SetStateAction<IUser>>;
}

export interface IUserPreview {
  avatar?: string;
  name: string;
  username: string;
  following?: boolean;
  tagline?: string;
  followingSince?: Date;
  matchesUser?: boolean;
  _id?: string;
  quacks?: number;
}
