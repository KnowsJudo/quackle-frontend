import { IFollowerData, IFollowingData } from "./follow-types";
import { IUser } from "./user-types";

export interface IUserContext {
  userData: IUser;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  setUserInfo: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  initiateQuack: boolean;
  setInitiateQuack: React.Dispatch<React.SetStateAction<boolean>>;
  followUser: (
    followingData: IFollowingData,
    followerData: IFollowerData,
  ) => void;
}
