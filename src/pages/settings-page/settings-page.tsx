import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { Button, Text } from "@mantine/core";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackInput } from "../../components/quack-input/quack-input";
import { UserPreview } from "../../components/user-preview/user-preview";
import EditIcon from "@mui/icons-material/Edit";
import "./settings-page.css";

export const SettingsPage: React.FC = () => {
  const { userData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);

  //FIRST CHECK FOR COOKIE

  return (
    <div className="settings-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          displayPic={userData.displayPic}
          atUser={"everyone"}
        />
      )}
      <ProfileUser setInitiateQuack={setInitiateQuack} loggedIn={true} />
      <section className="settings-options">
        <h5>Quack Quack, {userData.name}!</h5>
        <span className="user-tagline">
          <h5> Tagline:</h5>
          <Text>{userData.tagline}</Text>
          <Button variant="outline" color="dark">
            <EditIcon />
          </Button>
        </span>
      </section>
      <section className="settings-data">
        <UserPreview
          avatar={userData.displayPic}
          name={userData.name}
          username={userData.username}
          tagline={userData.tagline}
        />
        <Text size="sm">
          Hatched on {userData.createdAt.toString().slice(0, 10)}
        </Text>
        <Text size="sm">{userData.email}</Text>
        <div className="settings-quacks">
          <Button>Blocked Users</Button>
        </div>
      </section>
    </div>
  );
};
