import React, { useContext } from "react";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackleContext } from "../../context/user-context";
import "./trending-page.css";

export const TrendingPage: React.FC = () => {
  const { userData, setInitiateQuack } = useContext(QuackleContext);

  return (
    <div className="trending-container">
      <ProfileUser
        loggedIn={userData.username ? true : false}
        setInitiateQuack={setInitiateQuack}
      />
      <ProfileSideBar loggedIn={userData.username ? true : false} />
    </div>
  );
};
