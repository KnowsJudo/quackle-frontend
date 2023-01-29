import { IFriendQuacks, IQuackResponse } from "./quacks";
import { IImage, IUser } from "./user-types";

export interface IProfileCard {
  loggedIn: boolean;
  matchesUser: boolean;
  avatar?: IImage;
  banner?: IImage;
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
  likesData: IFriendQuacks[];
  paramId?: string;
  deleteQuack?: (quackId: string) => Promise<void>;
  loading: ILoading;
}

export interface ILoading {
  profile: boolean;
  quacks: boolean;
  likes: boolean;
}

export interface IProfileSideBar {
  loggedIn: boolean;
}

export interface IProfileUser {
  loggedIn: boolean;
  setInitiateQuack: React.Dispatch<React.SetStateAction<boolean>>;
}
