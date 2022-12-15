import React, { useState } from "react";
import { IQuackOutput } from "../../types/quacks";
import { Avatar, Button, Text, Tooltip } from "@mantine/core";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { useImage } from "../../api/use-image";
import DeleteIcon from "@mui/icons-material/Delete";
import "./quack-output.css";

export const QuackOutput: React.FC<IQuackOutput> = (props) => {
  const [modal, setModal] = useState<boolean>(false);
  const avatarSrc = useImage(props.avatar);

  return (
    <section className="quack-output">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title="Do you really want to delete this quack?"
        confirmFunc={() => props.deleteQuack?.(props.id)}
      />
      <span className="quack-output-avatar">
        <Avatar src={avatarSrc} alt="user avatar" radius="xl" size="lg" />
      </span>
      <div className="quack-content">
        <span className="quack-user">
          <Text size="md" weight="bold">
            {props.name}&nbsp;
          </Text>
          <Text size="md" color="dimmed">
            @{props.username}&nbsp;
          </Text>
          <Text size="md" color="dimmed">
            {props.quackedAt.slice(0, 10)}
          </Text>
          {props.deleteQuack && (
            <Tooltip label="Delete Quack">
              <Button
                color="dark"
                variant="subtle"
                size="xs"
                sx={{ marginLeft: "auto" }}
                onClick={() => setModal(true)}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            </Tooltip>
          )}
        </span>
        <span className="quack-message">
          <Text size="sm">{props.content}</Text>
        </span>
        <span className="quack-options">
          <Text size="sm">{`🐤${props.replies.length}`}</Text>
          <Text size="sm">{`🐔${props.requacks}`}</Text>
          <Text size="sm">{`♡${props.likes}`}</Text>
        </span>
      </div>
      <hr />
    </section>
  );
};
