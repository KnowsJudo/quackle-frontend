import { IQuackResponse } from "./quacks";
import { IImage, IUser } from "./user-types";

export interface IProfileCard {
  loggedIn: boolean;
  matchesUser: boolean;
  avatar?: IImage;
  banner?: IImage;
  title: string;
  description: string;
  location: string;
  stats: {
    title: string;
    value: number | string;
  }[];
}

export interface IProfileDetails {
  matchesUser: boolean;
  loggedIn: boolean;
  profileData: IUser;
  paramId?: string;
  quackData: IQuackResponse[];
  deleteQuack?: (quackId: string) => Promise<void>;
  loading: boolean;
}

export interface ILoading {
  profile: boolean;
  quacks: boolean;
}

export interface IProfileSideBar {
  loggedIn: boolean;
}

export interface IProfileUser {
  loggedIn: boolean;
  setInitiateQuack: React.Dispatch<React.SetStateAction<boolean>>;
}
