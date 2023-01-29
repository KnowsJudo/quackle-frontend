import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader, Text } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import { IFollowingResponse, IProfileFollow } from "../../types/follow-types";
import { apiUrl } from "../../helpers/api-url";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import "./profile-following.css";

export const ProfileFollowing: React.FC<IProfileFollow> = (props) => {
  const params = useParams();
  const { userData } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [followingData, setFollowingData] = useState<IUserPreview[]>([]);

  const getFollowing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/user/${params.userId}/following`);
      const data: IUserPreview[] = res.data.map((next: IFollowingResponse) => {
        return {
          id: next._id,
          avatar: next.followingAvatar,
          name: next.followingName,
          username: next.followingUsername,
          following: true,
          tagline: next.followingTagline,
          followingSince: next.followingSince,
          matchesUser: next.followingUsername === userData.username,
        };
      });
      setFollowingData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollowing();
  }, [params.userId, userData.following]);

  return (
    <section className="profile-following">
      <UsernameInfo name={props.name} username={props.username} />
      <Text size="xl">Following:</Text>
      <div className="following-list">
        {loading ? (
          <Loader sx={{ margin: " 20% auto" }} />
        ) : (
          followingData.map((next) => (
            <UserPreview key={next.id} following={true} {...next} />
          ))
        )}
      </div>
    </section>
  );
};
