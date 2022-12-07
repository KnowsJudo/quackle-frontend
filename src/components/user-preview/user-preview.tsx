import React from "react";
import { IUserPreview } from "../../types/user-types";
import { Avatar, Button, Text } from "@mantine/core";
import { useImage } from "../../api/use-image";
import "./user-preview.css";

export const UserPreview: React.FC<IUserPreview> = (props) => {
  const avatarSrc = useImage(props.avatar);

  return (
    <div>
      <span className="user-preview">
        <Avatar src={avatarSrc} alt="user avatar" radius="xl" size="lg" />
        <span className="user-names">
          <Text>{props.name}</Text>
          <Text>@{props.username}</Text>
        </span>
        {props.following && <Button>Following</Button>}
      </span>
      <Text size="sm">{props.tagline}</Text>
    </div>
  );
};
