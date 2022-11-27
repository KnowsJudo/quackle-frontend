import React from "react";
import { IUserPreview } from "../../types/user-types";
import { Avatar, Button, Text } from "@mantine/core";
import "./user-preview.css";

export const UserPreview: React.FC<IUserPreview> = (props) => {
  return (
    <div>
      <span className="user-preview">
        <Avatar src={props.avatar} alt="user avatar" />
        <span className="user-names">
          <Text>{props.name}</Text>
          <Text>@{props.username}</Text>
        </span>
        {props.following && <Button>Following</Button>}
      </span>
      <Text>{props.tagline}</Text>
    </div>
  );
};
