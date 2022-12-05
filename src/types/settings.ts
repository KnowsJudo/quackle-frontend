import { SetStateAction } from "react";

export interface IEditSettings {
  name: boolean;
  tagline: boolean;
  location: boolean;
  avatar: boolean;
  banner: boolean;
}
export interface ISettings {
  name: string;
  tagline: string;
  location: string;
  avatar?: Blob;
  banner: string;
}
export interface ISettingsOptions {
  changeSetting: (option: string) => Promise<void>;
  option: keyof ISettings;
  editOption: IEditSettings;
  setEditOption: React.Dispatch<SetStateAction<IEditSettings>>;
  setting: ISettings;
  setSetting: React.Dispatch<SetStateAction<ISettings>>;
}

export interface IImageDrop {
  imageType: keyof ISettings;
  setEditOption: React.Dispatch<SetStateAction<IEditSettings>>;
  changeSetting: (option: string) => Promise<void>;
  setSetting: React.Dispatch<SetStateAction<ISettings>>;
}
