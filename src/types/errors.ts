export interface ILoginError {
  noUser: boolean;
  noPass: boolean;
  network: boolean;
  password: boolean;
  user: boolean;
}

export interface ISignUpError {
  noName: boolean;
  nameProfanity: boolean;
  nameLength: boolean;
  noUser: boolean;
  userProfanity: boolean;
  userLength: boolean;
  noPass: boolean;
  passLength: boolean;
  noMatch: boolean;
  noDoB: boolean;
  noEmail: boolean;
  emailLength: boolean;
  usernameDup: boolean;
  network: boolean;
}

export interface ISettingsError {
  nameLength: boolean;
  nameProfanity: boolean;
  taglineLength: boolean;
  taglineProfanity: boolean;
  locationProfanity: boolean;
  locationLength: boolean;
}
