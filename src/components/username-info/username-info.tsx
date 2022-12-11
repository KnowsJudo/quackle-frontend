import React from "react";
import { Text } from "@mantine/core";
import { IUsernameInfo } from "../../types/user-types";

export const UsernameInfo: React.FC<IUsernameInfo> = (props) => {
  return (
    <span className="username-info">
      <Text sx={{ fontSize: "28px" }}>
        <b>{props.name}</b>
      </Text>
      <Text size="sm" color="dimmed">
        Quackle member
      </Text>
    </span>
  );
};
