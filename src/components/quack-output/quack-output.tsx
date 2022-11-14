import React from "react";
import { IQuackOutput } from "../../types/quacks";
import { Button, Text, Tooltip } from "@mantine/core";
import DeleteIcon from "@mui/icons-material/Delete";
import "./quack-output.css";

export const QuackOutput: React.FC<IQuackOutput> = (props) => {
  return (
    <section className="quack-content">
      <span className="quack-user">
        <Text size="xl">{props.name}&nbsp;</Text>
        <Text size="xl" color="dimmed">
          {`@${props.username}`}&nbsp;
        </Text>
        <Text size="xl" color="dimmed">
          {props.quackedAt.slice(0, 10)}
        </Text>
        <Tooltip label="Delete Quack">
          <Button
            color="dark"
            variant="subtle"
            sx={{ marginLeft: "auto" }}
            onClick={() => props.deleteQuack?.(props.id)}
          >
            <DeleteIcon />
          </Button>
        </Tooltip>
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
