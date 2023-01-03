import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { UserPreview } from "../../components/user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { apiUrl } from "../../helpers/api-url";
import { Text } from "@mantine/core";
import { IImage, IUser } from "../../types/user-types";
import "./trending-page.css";

interface ITrending {
  name: string;
  username: string;
  avatar?: IImage;
}

export const TrendingPage: React.FC = () => {
  const { userData, setInitiateQuack } = useContext(QuackleContext);
  const [trending, setTrending] = useState<ITrending[]>([]);
  const [trendingNames, setTrendingNames] = useState<string[]>([]);

  const getTrendingNames = async () => {
    try {
      const data = await axios.get(`${apiUrl}/user`);
      const response = data.data
        .sort((a: IUser, b: IUser) => b.quacks - a.quacks)
        .slice(0, 10);
      setTrendingNames(response.map((next: IUser) => next.username));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrendingNames();
  }, []);

  const getTrendingAvatars = async () => {
    try {
      const promises = trendingNames.map(async (next) => {
        const res = await axios.get(`${apiUrl}/user/${next}`);
        return res.data;
      });
      const results = await Promise.all(promises);
      const transformed = results.map((next) => {
        return {
          name: next.name,
          username: next.username,
          avatar: next.avatar,
        };
      });
      setTrending(transformed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!trendingNames) {
      return;
    }
    getTrendingAvatars();
  }, [trendingNames]);

  return (
    <div className="trending-container">
      <ProfileUser
        loggedIn={userData.username ? true : false}
        setInitiateQuack={setInitiateQuack}
      />
      <section className="trending-list">
        <Text>Most popular Ducks</Text>
        {trending.map((next) => {
          return (
            <UserPreview
              key={next.username}
              name={next.name}
              username={next.username}
              avatar={next.avatar}
            />
          );
        })}
      </section>
      <ProfileSideBar loggedIn={userData.username ? true : false} />
    </div>
  );
};
