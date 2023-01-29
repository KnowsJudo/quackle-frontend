import React, { useContext, useState } from "react";
import { Button } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { IFollowerData, IFollowingData } from "../../types/follow-types";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import "./follow-button.css";

interface IFollowButton {
  buttonOwner: string;
  disabled: boolean;
  isUserFollowing?: string;
  followingData: IFollowingData;
  followerData: IFollowerData;
}

export const FollowButton: React.FC<IFollowButton> = (props) => {
  const { followUser, unFollowUser, reqLoad } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);

  return props.isUserFollowing ? (
    <>
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title={`Do you really want to unfollow ${props.buttonOwner}?`}
        confirmFunc={() => unFollowUser(props.buttonOwner)}
      />
      <Button
        color="cyan"
        className="follow-button"
        disabled={props.disabled}
        loading={reqLoad}
        styles={{ leftIcon: { margin: "auto" } }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          setModal(true);
        }}
      >
        {!reqLoad && "UnFollow"}
      </Button>
    </>
  ) : (
    <Button
      color="cyan"
      className="follow-button"
      disabled={props.disabled}
      loading={reqLoad}
      styles={{ leftIcon: { margin: "auto" } }}
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        followUser(props.followingData, props.followerData);
      }}
    >
      {!reqLoad && "Follow"}
    </Button>
  );
};
