import { ISignUpError } from "../types/errors";
import { ISettingsError } from "../types/settings";

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

export const initialSettingsError: ISettingsError = {
  name: false,
  tagline: false,
  location: false,
};
