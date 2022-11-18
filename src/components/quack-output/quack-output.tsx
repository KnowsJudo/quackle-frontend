import React, { useState } from "react";
import { IQuackOutput } from "../../types/quacks";
import { Button, Modal, Text, Tooltip } from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import "./quack-output.css";

export const QuackOutput: React.FC<IQuackOutput> = (props) => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <section className="quack-content">
      <Modal
        centered
        opened={modal}
        onClose={() => setModal(false)}
        title="Do you really want to delete this quack?"
      >
        <span className="confirm-delete">
          <Button
            variant="outline"
            color="dark"
            onClick={() => props.deleteQuack?.(props.id)}
          >
            Yes
          </Button>
          <Button
            variant="outline"
            color="dark"
            onClick={() => setModal(false)}
          >
            No
          </Button>
        </span>
      </Modal>
      <span className="quack-user">
        <Text size="xl">{props.name}&nbsp;</Text>
        <Text size="xl" color="dimmed">
          {`@${props.username}`}&nbsp;
        </Text>
        <Text size="xl" color="dimmed">
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
        <Text size="xl" sx={{ margin: "auto" }}>
          {props.content}
        </Text>
      </span>
      <span className="quack-options">
        <Text size="xl">{`🐤${props.replies.length}`}</Text>
        <Text size="xl">{`🐔${props.requacks}`}</Text>
        <Text size="xl">{`♡${props.likes}`}</Text>
      </span>
    </section>
  );
};
