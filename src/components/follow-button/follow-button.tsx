import React, { useContext } from "react";
import { Button } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { IFollowerData, IFollowingData } from "../../types/follow-types";

interface IFollowButton {
  buttonOwner: string;
  disabled: boolean;
  isUserFollowing?: string;
  followingData: IFollowingData;
  followerData: IFollowerData;
}

export const FollowButton: React.FC<IFollowButton> = (props) => {
  const { followUser, unFollowUser } = useContext(QuackleContext);

  return props.isUserFollowing ? (
    <Button
      disabled={props.disabled}
      onClick={() => unFollowUser(props.buttonOwner)}
    >
      UnFollow
    </Button>
  ) : (
    <Button
      disabled={props.disabled}
      onClick={() => followUser(props.followingData, props.followerData)}
    >
      Follow
    </Button>
  );
};
