import { IQuackResponse } from "./quacks";
import { IUser } from "./user-types";

export interface IProfileProps {
  matchesUser: boolean;
  profileData: IUser;
  paramId?: string;
  quackData: IQuackResponse[];
}
