import { FileWithPath } from "@mantine/dropzone";
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
  avatar?: FormData;
  banner?: FormData;
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
  imagePreview: string;
  handleDrop: (file: FileWithPath[]) => void;
  imageType: keyof ISettings;
  setEditOption: React.Dispatch<SetStateAction<IEditSettings>>;
  changeSetting: (option: string) => Promise<void>;
  setSetting: React.Dispatch<SetStateAction<ISettings>>;
}
