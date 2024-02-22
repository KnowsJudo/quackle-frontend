import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { UserPreview } from "../../components/user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { QuackInput } from "../../components/quack-input/quack-input";
import { apiUrl } from "../../helpers/api-url";
import { Loader, Text } from "@mantine/core";
import { IUserPreview } from "../../types/user-types";
import HorizontalRuleRoundedIcon from "@mui/icons-material/HorizontalRuleRounded";
import "./trending-page.css";
import { QuackleTitle } from "../../components/quackle-title/quackle-title";

export const TrendingPage: React.FC = () => {
  const { userData, initiateQuack, setInitiateQuack, loggedIn } =
    useContext(QuackleContext);
  const [trendingData, setTrendingData] = useState<IUserPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getTrendingData = async () => {
    try {
      const data = await axios.get(`${apiUrl}/trending`);
      setTrendingData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getTrendingData();
  }, []);

  return (
    <div className="trending-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          avatar={userData.avatar}
        />
      )}
      <ProfileUser
        loggedIn={loggedIn ? true : false}
        setInitiateQuack={setInitiateQuack}
      />
      <section className="trending-list">
        <span className="quacking-current">
          <QuackleTitle />
          <Text sx={{ fontSize: "12px" }}>
            A premier social duck network (for ducks)
          </Text>
        </span>
        <Text sx={{ fontSize: "10px" }}>#Trending Ducks</Text>
        <HorizontalRuleRoundedIcon
          preserveAspectRatio="none"
          style={{
            height: "30px",
            width: "100%",
            color: "#100c47",
          }}
        />
        <div className="trending-info">
          {loading ? (
            <Loader color="cyan" sx={{ margin: "auto auto 50vh" }} />
          ) : (
            trendingData.map((next) => {
              return (
                <div key={next._id} className="trending-stats">
                  <UserPreview
                    name={next.name}
                    username={next.username}
                    avatar={next.avatar}
                    tagline={next.tagline}
                    matchesUser={next.username === userData.username}
                  />
                  <p className="trending-numbers">{`${next.quacks} Quack${
                    next.quacks === 1 ? "" : "s"
                  }`}</p>
                </div>
              );
            })
          )}
        </div>
      </section>
      <ProfileSideBar loggedIn={loggedIn ? true : false} />
    </div>
  );
};
