import React from "react";
import { IUserPreview } from "../../types/user-types";
import { Avatar, Button, Text } from "@mantine/core";
import { useImage } from "../../api/use-image";
import "./user-preview.css";

export const UserPreview: React.FC<IUserPreview> = (props) => {
  const avatarSrc = useImage(props.avatar);

  return (
    <div className="user-preview">
      <span className="user-avatar">
        <Avatar src={avatarSrc} alt="user avatar" radius="xl" size="lg" />
      </span>
      <span className="user-preview-details">
        <div className="user-follow">
          <span className="user-names">
            <Text size="sm" weight="bold">
              {props.name}
            </Text>
            <Text size="sm" color="dimmed">
              @{props.username}
            </Text>
          </span>
          <Button color="dark" size="sm">
            Following
          </Button>
        </div>
        <Text size="xs">{props.tagline}</Text>
      </span>
    </div>
  );
};
