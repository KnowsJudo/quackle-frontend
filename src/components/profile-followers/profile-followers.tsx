import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Text } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import { IFollowerResponse, IProfileFollowers } from "../../types/follow-types";
import { apiUrl } from "../../api/api-url";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import "./profile-followers.css";

export const ProfileFollowers: React.FC<IProfileFollowers> = (props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [followingData, setFollowingData] = useState<IUserPreview[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${apiUrl}/user/${props.username}/followers`)
      .then((res) => {
        console.log(res.data);
        setFollowingData(
          res.data.map((next: IFollowerResponse) => {
            return {
              avatar: next.followerAvatar,
              name: next.followerName,
              username: next.followerUsername,
              following: true,
              tagline: next.followerTagline,
              followingSince: next.followerSince,
            };
          }),
        );
        setLoading(false);
      })

      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  return (
    <section className="profile-followers">
      <UsernameInfo name={props.name} />
      <Text size="xl">Followers:</Text>
      <div className="followers-list">
        {loading ? (
          <Loader sx={{ margin: " 20% auto" }} />
        ) : (
          followingData.map((next) => {
            return (
              <UserPreview
                key={next.name}
                avatar={next.avatar}
                name={next.name}
                username={next.username}
                following={true}
                tagline={next.tagline}
              />
            );
          })
        )}
      </div>
    </section>
  );
};
