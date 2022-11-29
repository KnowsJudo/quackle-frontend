import React, { useContext } from "react";
import { HomeDetails } from "../../components/home-details/home-details";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackInput } from "../../components/quack-input/quack-input";
import { QuackleContext } from "../../context/user-context";
import { NotFoundPage } from "../not-found-page/not-found-page";
import "./home-page.css";

export const HomePage: React.FC = () => {
  const { userData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);

  return !userData.username ? (
    <NotFoundPage />
  ) : (
    <div className="home-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          avatar={userData.avatar}
          atUser="everyone"
        />
      )}
      <ProfileUser setInitiateQuack={setInitiateQuack} loggedIn={true} />
      <HomeDetails />
      <ProfileSideBar loggedIn={true} />
    </div>
  );
};
