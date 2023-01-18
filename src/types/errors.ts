export interface ILoginError {
  noUser: boolean;
  noPass: boolean;
  network: boolean;
  password: boolean;
  user: boolean;
}

export interface ISignUpError {
  noName: boolean;
  noUser: boolean;
  noPass: boolean;
  noMatch: boolean;
  noEmail: boolean;
  noDoB: boolean;
  usernameDup: boolean;
  network: boolean;
}
