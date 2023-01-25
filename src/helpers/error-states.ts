import { ISettingsError, ISignUpError } from "../types/errors";

export const initialLoginError = {
  noUser: false,
  noPass: false,
  network: false,
  password: false,
  user: false,
};

export const initialSignUpError: ISignUpError = {
  noName: false,
  nameProfanity: false,
  nameLength: false,
  noUser: false,
  userProfanity: false,
  userLength: false,
  noPass: false,
  passLength: false,
  noMatch: false,
  noDoB: false,
  noEmail: false,
  emailLength: false,
  usernameDup: false,
  network: false,
};

export const initialSettingsError: ISettingsError = {
  nameLength: false,
  nameProfanity: false,
  taglineLength: false,
  taglineProfanity: false,
  locationLength: false,
  locationProfanity: false,
};
