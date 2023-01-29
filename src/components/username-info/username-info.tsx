import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@mantine/core";
interface IUsernameInfo {
  username: string;
  name: string;
}

export const UsernameInfo: React.FC<IUsernameInfo> = (props) => (
  <span className="username-info">
    <Link
      to={`/profile/${props.username}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Text sx={{ fontSize: "28px" }}>
        <b>{props.name}</b>
      </Text>
    </Link>
    <Text size="sm" color="dimmed">
      Quackle member
    </Text>
  </span>
);
