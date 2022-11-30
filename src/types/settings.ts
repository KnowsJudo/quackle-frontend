import { SetStateAction } from "react";

export interface ISettingsOptions {
  changeTagline: () => Promise<void>;
  editTag: boolean;
  loading: boolean;
  tagline: string;
  setTagline: React.Dispatch<SetStateAction<string>>;
}
