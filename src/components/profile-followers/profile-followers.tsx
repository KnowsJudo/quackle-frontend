import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader, Text } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import { IFollowerResponse, IProfileFollowers } from "../../types/follow-types";
import { apiUrl } from "../../api/api-url";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import "./profile-followers.css";

export const ProfileFollowers: React.FC<IProfileFollowers> = (props) => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [followersData, setFollowersData] = useState<IUserPreview[]>([]);

  useEffect(() => {
    setLoading(true);
    const getFollowers = async () => {
      await axios
        .get(`${apiUrl}/user/${params.userId}/followers`)
        .then((res) => {
          console.log("followers", res.data);
          const data = res.data.map((next: IFollowerResponse) => {
            return {
              avatar: next.followerAvatar,
              name: next.followerName,
              username: next.followerUsername,
              following: true,
              tagline: next.followerTagline,
              followingSince: next.followerSince,
            };
          });
          setFollowersData(data);
          setLoading(false);
        })

        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    getFollowers();
  }, [params.userId]);

  return (
    <section className="profile-followers">
      <UsernameInfo name={props.name} />
      <Text size="xl">Followers:</Text>
      <div className="followers-list">
        {loading ? (
          <Loader sx={{ margin: " 20% auto" }} />
        ) : (
          followersData.map((next) => (
            <UserPreview key={next.name} following={true} {...next} />
          ))
        )}
      </div>
    </section>
  );
};
