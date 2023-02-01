import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader, Text } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import { IFollowerResponse, IProfileFollow } from "../../types/follow-types";
import { apiUrl } from "../../helpers/api-url";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import "./profile-followers.css";
import { TrendingBadge } from "../trending-badge/trending-badge";

export const ProfileFollowers: React.FC<IProfileFollow> = (props) => {
  const params = useParams();
  const { userData } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [followersData, setFollowersData] = useState<IUserPreview[]>([]);

  const getFollowers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/user/${params.userId}/followers`);
      const data: IUserPreview[] = res.data.map((next: IFollowerResponse) => {
        return {
          _id: next._id,
          avatar: next.followerAvatar,
          name: next.followerName,
          username: next.followerUsername,
          following: false,
          tagline: next.followerTagline,
          followingSince: next.followerSince,
          matchesUser: next.followerUsername === userData.username,
        };
      });
      setFollowersData(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFollowers();
  }, [params.userId, userData.followers]);

  return (
    <section className="profile-followers">
      <UsernameInfo name={props.name} username={props.username} />
      <Text size="xl">Followers:</Text>
      <div className="followers-list">
        {loading ? (
          <Loader color="cyan" sx={{ margin: "18vh auto" }} />
        ) : !followersData.length ? (
          <TrendingBadge />
        ) : (
          followersData.map((next) => (
            <UserPreview key={next._id} following={true} {...next} />
          ))
        )}
      </div>
    </section>
  );
};
