import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { UserPreview } from "../../components/user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { apiUrl } from "../../helpers/api-url";
import { Badge, Loader, Text, Tooltip } from "@mantine/core";
import { IUser, IUserPreview } from "../../types/user-types";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import "./trending-page.css";

export const TrendingPage: React.FC = () => {
  const { userData, setInitiateQuack, loggedIn } = useContext(QuackleContext);
  const [trending, setTrending] = useState<IUserPreview[]>([]);
  const [trendingNames, setTrendingNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTrendingNames = async () => {
    try {
      const data = await axios.get(`${apiUrl}/user`);
      const response = data.data
        .sort((a: IUser, b: IUser) => b.quacks - a.quacks)
        .slice(0, 9);
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
      const transformed: IUserPreview[] = results
        .filter((a) => a)
        .map((next) => {
          return {
            id: next.id,
            name: next.name,
            username: next.username,
            avatar: next.avatar,
            tagline: next.tagline,
            matchesUser: next.username === userData.username,
            quacks: next.quacks,
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

  useEffect(() => {
    if (!trending) {
      return;
    }
    setLoading(false);
  }, [trending]);

  return (
    <div className="trending-container">
      <ProfileUser
        loggedIn={loggedIn ? true : false}
        setInitiateQuack={setInitiateQuack}
      />
      <section className="trending-list">
        <span className="quacking-current">
          <Text size="xl"> Currently Quacking</Text>
          <ShowChartIcon />
        </span>
        <HorizontalRuleRoundedIcon
          preserveAspectRatio="none"
          style={{
            height: "30px",
            width: "100%",
          }}
        />
        {loading ? (
          <Loader sx={{ margin: "25vh auto auto auto" }} />
        ) : (
          trending.map((next) => {
            return (
              <span key={next.id} className="trending-stats">
                <UserPreview
                  name={next.name}
                  username={next.username}
                  avatar={next.avatar}
                  tagline={next.tagline}
                  matchesUser={next.matchesUser}
                />
                <Tooltip label={`${next.quacks} Quacks`}>
                  <Badge
                    size="lg"
                    radius="xl"
                    color="cyan"
                    style={{ margin: "auto", padding: "10px" }}
                  >
                    {next.quacks}🦆
                  </Badge>
                </Tooltip>
              </span>
            );
          })
        )}
      </section>
      <ProfileSideBar loggedIn={loggedIn ? true : false} />
    </div>
  );
};
