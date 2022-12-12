import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader, Text } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import {
  IFollowingResponse,
  IProfileFollowing,
} from "../../types/follow-types";
import { apiUrl } from "../../api/api-url";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import "./profile-following.css";

export const ProfileFollowing: React.FC<IProfileFollowing> = (props) => {
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [followingData, setFollowingData] = useState<IUserPreview[]>([]);

  useEffect(() => {
    setLoading(true);
    const getFollowing = async () => {
      await axios
        .get(`${apiUrl}/user/${params.userId}/following`)
        .then((res) => {
          console.log("following", res.data);
          const data = res.data.map((next: IFollowingResponse) => {
            return {
              avatar: next.followingAvatar,
              name: next.followingName,
              username: next.followingUsername,
              following: true,
              tagline: next.followingTagline,
              followingSince: next.followingSince,
            };
          });
          setFollowingData(data);
          setLoading(false);
        })

        .catch((e) => {
          console.error(e);
          setLoading(false);
        });
    };
    getFollowing();
  }, [params.userId]);

  return (
    <section className="profile-following">
      <UsernameInfo name={props.name} />
      <Text size="xl">Following:</Text>
      <div className="following-list">
        {loading ? (
          <Loader sx={{ margin: " 20% auto" }} />
        ) : (
          followingData.map((next) => (
            <UserPreview key={next.name} following={true} {...next} />
          ))
        )}
      </div>
    </section>
  );
};
