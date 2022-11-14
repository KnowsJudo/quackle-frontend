import { IQuackResponse } from "./quacks";
import { IUser } from "./user-types";

export interface IProfileProps {
  matchesUser: boolean;
  profileData: IUser;
  paramId?: string;
  quackData: IQuackResponse[];
  deleteQuack: (quackId: string) => void;
  loading: boolean;
}

export interface ILoading {
  profile: boolean;
  quacks: boolean;
}
