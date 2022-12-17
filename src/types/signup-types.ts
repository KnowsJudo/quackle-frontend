import { ISignUpError } from "./errors";

export interface ISignUp {
  handleConfirm: (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => void;
  confirmPass: string;
  pass: string;
  error: ISignUpError;
}
