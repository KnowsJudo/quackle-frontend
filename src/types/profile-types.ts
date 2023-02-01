import { IQuackResponse } from "./quacks";
import { IUser } from "./user-types";

export interface IProfileCard {
  loggedIn: boolean;
  matchesUser: boolean;
  avatar?: string;
  banner?: string;
  name: string;
  username: string;
  tagline: string;
  location: string;
  following?: string[];
  followers?: string[];
  stats: {
    title: string;
    value: number | string;
  }[];
}

export interface IProfileDetails {
  matchesUser: boolean;
  loggedIn: boolean;
  profileData: IUser;
  quackData: IQuackResponse[];
  pondData: IQuackResponse[];
  likesData: IQuackResponse[];
  paramId?: string;
  deleteQuack?: (quackId: string) => Promise<void>;
  loading: ILoading;
  selectedTab: string | null;
  setSelectedTab: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface ILoading {
  profile: boolean;
  quacks: boolean;
  pond: boolean;
  likes: boolean;
}

export interface IProfileSideBar {
  loggedIn: boolean;
}

export interface IProfileUser {
  loggedIn: boolean;
  setInitiateQuack: React.Dispatch<React.SetStateAction<boolean>>;
}
