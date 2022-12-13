import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loader, Text } from "@mantine/core";
import { UsernameInfo } from "../username-info/username-info";
import { IFollowerResponse, IProfileFollow } from "../../types/follow-types";
import { apiUrl } from "../../api/api-url";
import { IUserPreview } from "../../types/user-types";
import { UserPreview } from "../user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import "./profile-followers.css";

export const ProfileFollowers: React.FC<IProfileFollow> = (props) => {
  const params = useParams();
  const { userData } = useContext(QuackleContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [followersData, setFollowersData] = useState<IUserPreview[]>([]);

  useEffect(() => {
    setLoading(true);
    const getFollowers = async () => {
      await axios
        .get(`${apiUrl}/user/${params.userId}/followers`)
        .then((res) => {
          console.log("followers", res.data);
          const data: IUserPreview[] = res.data.map(
            (next: IFollowerResponse) => {
              return {
                id: next._id,
                avatar: next.followerAvatar,
                name: next.followerName,
                username: next.followerUsername,
                following: false,
                tagline: next.followerTagline,
                followingSince: next.followerSince,
                matchesUser: next.followerUsername === userData.username,
              };
            },
          );
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
            <UserPreview key={next.id} following={true} {...next} />
          ))
        )}
      </div>
    </section>
  );
};
