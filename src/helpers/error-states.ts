import { ISignUpError } from "../types/errors";

export const initialLoginError = {
  noUser: false,
  noPass: false,
  network: false,
  password: false,
  user: false,
};

export const initialSignUpError: ISignUpError = {
  noName: false,
  noUser: false,
  shortUser: false,
  noPass: false,
  noMatch: false,
  noEmail: false,
  noDoB: false,
  usernameDup: false,
  network: false,
};
