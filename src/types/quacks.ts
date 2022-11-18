import { IUser } from "./user-types";

export interface IQuacksMenu {
  paramId?: string;
  profileData: IUser;
  quackdata: IQuackResponse[];
  deleteQuack?: (quackId: string) => void;
  loading: boolean;
}

export interface IQuackInput {
  fixed: boolean;
  setInitiateQuack?: React.Dispatch<React.SetStateAction<boolean>> | null;
  atUser?: string;
  displayPic: string;
}

export interface IQuackResponse {
  _id: string;
  name: string;
  username: string;
  quackedAt: string;
  message: string;
}
export interface IQuackOutput {
  id: string;
  name: string;
  username: string;
  quackedAt: string;
  content: string;
  replies: [];
  requacks: number;
  likes: number;
  deleteQuack?: (quackId: string) => void;
  loading: boolean;
}

export interface IEmptyQuackMenu {
  quack?: boolean;
  requack?: boolean;
  likes?: boolean;
}
