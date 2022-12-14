import React, { useContext, useState } from "react";
import { Button } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { IFollowerData, IFollowingData } from "../../types/follow-types";
import { ConfirmModal } from "../confirm-modal/confirm-modal";

interface IFollowButton {
  buttonOwner: string;
  disabled: boolean;
  isUserFollowing?: string;
  followingData: IFollowingData;
  followerData: IFollowerData;
}

export const FollowButton: React.FC<IFollowButton> = (props) => {
  const { followUser, unFollowUser } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);

  return props.isUserFollowing ? (
    <>
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title={`Do you really want to unfollow ${props.buttonOwner}?`}
        confirmFunc={() => unFollowUser(props.buttonOwner)}
      />
      <Button disabled={props.disabled} onClick={() => setModal(true)}>
        UnFollow
      </Button>
    </>
  ) : (
    <Button
      disabled={props.disabled}
      onClick={() => followUser(props.followingData, props.followerData)}
    >
      Follow
    </Button>
  );
};
