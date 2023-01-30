import { createContext } from "react";
import { IUserContext } from "../types/user-context";
import { IUser } from "../types/user-types";

export const clearUser = {
  id: "",
  avatar: "",
  name: "",
  username: "",
  email: "",
  dateOfBirth: new Date(),
  createdAt: new Date(),
  tagline: "",
  banner: "",
  location: "",
  biography: "",
  quacks: 0,
  reQuacks: 0,
  likedQuacks: [],
  following: [],
  followers: [],
  usersBlocked: [],
};

export const initialUserData: () => IUser = () => {
  const stored = JSON.parse(sessionStorage.getItem("User Context") as string);
  return stored ? stored : clearUser;
};

export const QuackleContext = createContext<IUserContext>({
  userData: initialUserData(),
  setUserData: () => initialUserData,
  setUserInfo: () => null,
  initiateQuack: false,
  setInitiateQuack: () => null,
  followUser: () => null,
  unFollowUser: () => null,
  deleteQuack: () => null,
  likeQuack: () => null,
  loggedIn: "",
  reqLoad: false,
});
