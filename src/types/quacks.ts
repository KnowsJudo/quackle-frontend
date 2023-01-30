import { ILoading } from "./profile-types";
import { IUser } from "./user-types";

export interface IQuacksMenu {
  paramId?: string;
  profileData: IUser;
  quackdata: IQuackResponse[];
  likesData: IQuackResponse[];
  deleteQuack?: (quackId: string) => void;
  loading: ILoading;
  loggedIn: boolean;
}

export interface IQuackInput {
  fixed: boolean;
  setInitiateQuack?: React.Dispatch<React.SetStateAction<boolean>> | null;
  atUsers?: string[];
  avatar?: string;
}

export interface IQuackResponse {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
  content: string;
  quackedAt: string;
  atUsers: string[];
  likes: string[];
  replies: IQuackOutput[];
}
export interface IQuackOutput {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  content: string;
  quackedAt: string;
  atUsers: string[];
  replies: IQuackOutput[];
  requacks: number;
  likes: string[];
  deleteQuack?: (quackId: string) => void;
  loading: boolean;
  loggedIn: boolean;
}

export interface IEmptyQuackMenu {
  quack?: boolean;
  requack?: boolean;
  likes?: boolean;
  bio?: boolean;
}
