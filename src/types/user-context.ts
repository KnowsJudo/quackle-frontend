import { IUser } from "./user-types";

export interface IUserContext {
  userData: IUser;
  setUserData: React.Dispatch<React.SetStateAction<IUser>>;
  setUserInfo: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
}
