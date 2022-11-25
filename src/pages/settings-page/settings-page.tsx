import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { Button, Image } from "@mantine/core";
import { ProfileUser } from "../../components/profile-user/profile-user";
import "./settings-page.css";

export const SettingsPage: React.FC = () => {
  const { userData, setInitiateQuack } = useContext(QuackleContext);

  //FIRST CHECK FOR COOKIE

  return (
    <div className="settings-container">
      <ProfileUser setInitiateQuack={setInitiateQuack} loggedIn={true} />
      <section className="settings-options">
        <h5>Quack Quack, {userData.name}!</h5>
      </section>
      <section className="settings-section">
        <div className="settings-data">
          <h5>{userData.username}</h5>
          <p>Hatched on {userData.createdAt.toString().slice(0, 10)}</p>
          <p>{userData.email}</p>
          <div className="settings-quacks">
            {userData.friends ? (
              userData.friends.map((next, i) => {
                return (
                  <div key={i}>
                    <h3>Friends online:</h3>
                    {next.username}
                    {next.displayPic}
                  </div>
                );
              })
            ) : (
              <h5>You are an ugly duckling with no friends!</h5>
            )}
            <Button>Blocked Users</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
