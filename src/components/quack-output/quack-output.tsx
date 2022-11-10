import React from "react";
import { IQuackOutput } from "../../types/quacks";
import { Text } from "@mantine/core";
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
