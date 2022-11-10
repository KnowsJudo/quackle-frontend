export interface ISignUp {
  handleConfirm: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  confirmPass: string;
  pass: string;
}

export interface IError {
  noUser: boolean;
  noPass: boolean;
  network: boolean;
  password: boolean;
  user: boolean;
}
