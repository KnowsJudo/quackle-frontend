import React, { useContext, useState } from "react";
import { IUserPreview } from "../../types/user-types";
import { Avatar, Button, Text } from "@mantine/core";
import { useImage } from "../../api/use-image";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { followUser } from "../../api/follow-user";
import "./user-preview.css";
import { QuackleContext } from "../../context/user-context";

export const UserPreview: React.FC<IUserPreview> = (props) => {
  const { userData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const avatarSrc = useImage(props.avatar);

  const changeFollowing = () => {
    if (props.following) {
      setModal(true);
      return;
    }

    // const followingData = {
    //   username: userData.username,
    //   followingName: props.name,
    //   followingUsername: props.username,
    //   followingAvatar: props.avatar?.data,
    //   followingTagline: props.description,
    // };

    // const followerData = {
    //   followerName: userData.name,
    //   followerUsername: userData.username,
    //   followerAvatar: userData?.avatar?.data,
    //   followerTagline: userData?.tagline,
    // };
    // followUser()
  };

  return (
    <div className="user-preview">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title={`Do you really want to unfollow ${props.name}?`}
        confirmFunc={() => console.log("allo")}
      />
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
          {!props.matchesUser && (
            <Button color="dark" size="sm" onClick={() => setModal(true)}>
              Following
            </Button>
          )}
        </div>
        <Text size="xs">{props.tagline}</Text>
      </span>
    </div>
  );
};
