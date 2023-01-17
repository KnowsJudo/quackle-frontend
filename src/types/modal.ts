import React, { SetStateAction } from "react";

export interface IConfirmModal {
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  confirmFunc: () => void;
  rejectFunc?: () => void;
}
