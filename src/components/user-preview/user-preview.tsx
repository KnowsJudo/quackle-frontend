import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IUserPreview } from "../../types/user-types";
import { Avatar, Text } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { FollowButton } from "../follow-button/follow-button";
import "./user-preview.css";

export const UserPreview: React.FC<IUserPreview> = (props) => {
  const { userData, loggedIn } = useContext(QuackleContext);
  const navigate = useNavigate();

  const followingData = {
    username: userData.username,
    followingName: props.name,
    followingUsername: props.username,
    followingAvatar: props.avatar,
    followingTagline: props.tagline,
  };

  const followerData = {
    followerName: userData.name,
    followerUsername: userData.username,
    followerAvatar: userData?.avatar,
    followerTagline: userData?.tagline,
  };

  const isUserFollowing = userData.following.find(
    (next) => next === props.username,
  );

  return (
    <div
      className="user-preview"
      onClick={() => navigate(`/profile/${props.username}`)}
    >
      <span className="user-avatar">
        <Avatar src={props.avatar} alt="user avatar" radius="xl" size="lg" />
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
            <FollowButton
              buttonOwner={props.username}
              disabled={!loggedIn}
              isUserFollowing={isUserFollowing}
              followingData={followingData}
              followerData={followerData}
            />
          )}
        </div>
        <Text style={{ fontSize: "10px" }}>{props.tagline}</Text>
      </span>
    </div>
  );
};
