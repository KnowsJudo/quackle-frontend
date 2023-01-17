import React from "react";
import { Button, Modal } from "@mantine/core";
import { IConfirmModal } from "../../types/modal";
import "./confirm-modal.css";

export const ConfirmModal: React.FC<IConfirmModal> = (props) => {
  return (
    <Modal
      centered
      opened={props.modal}
      onClick={(e) => e.stopPropagation()}
      onClose={() => {
        props.setModal(false);
      }}
      title={props.title}
    >
      <span className="confirm-modal">
        <Button
          variant="outline"
          color="dark"
          onClick={() => props.confirmFunc()}
        >
          Yes
        </Button>
        <Button
          variant="outline"
          color="dark"
          onClick={() =>
            props.rejectFunc ? props.rejectFunc() : props.setModal(false)
          }
        >
          No
        </Button>
      </span>
    </Modal>
  );
};
