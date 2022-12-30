import React, { useContext } from "react";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { UserPreview } from "../../components/user-preview/user-preview";
import { QuackleContext } from "../../context/user-context";
import { Text } from "@mantine/core";
import "./trending-page.css";

export const TrendingPage: React.FC = () => {
  const { userData, setInitiateQuack } = useContext(QuackleContext);
  const trendingProfiles = ["Legolas", "Aragorn", "Gimli"];

  return (
    <div className="trending-container">
      <ProfileUser
        loggedIn={userData.username ? true : false}
        setInitiateQuack={setInitiateQuack}
      />
      <section className="trending-list">
        <Text>Most popular Ducks</Text>
        {trendingProfiles.map((next) => {
          return <UserPreview key={next} name={next} username={next} />;
        })}
      </section>
      <ProfileSideBar loggedIn={userData.username ? true : false} />
    </div>
  );
};
