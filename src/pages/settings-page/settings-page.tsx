import React, { useContext, useState } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Button, Text } from "@mantine/core";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackInput } from "../../components/quack-input/quack-input";
import { UserPreview } from "../../components/user-preview/user-preview";
import { apiUrl } from "../../api/api-url";
import { SettingsOptions } from "../../components/settings-options/settings-options";
import "./settings-page.css";

export const SettingsPage: React.FC = () => {
  const { userData, setUserData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);
  const [editTag, setEditTag] = useState<boolean>(false);
  const [tagline, setTagline] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const changeTagline = async () => {
    if (editTag) {
      setLoading(true);
      console.log(userData.username);
      await axios
        .patch(`${apiUrl}/user/${userData.username}`, {
          tagline,
        })
        .then(() => {
          setLoading(true);
          axios
            .get(`${apiUrl}/user/${userData.username}`)
            .then((res) => setUserData(res.data))
            .catch((error) => {
              setLoading(false);
              console.error(error);
            });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.error(error);
        });
      setLoading(false);
      setEditTag(false);
      return;
    }
    setEditTag(true);
  };

  return (
    <div className="settings-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          avatar={userData.avatar}
          atUser={"everyone"}
        />
      )}
      <ProfileUser setInitiateQuack={setInitiateQuack} loggedIn={true} />
      <section className="settings-user">
        <h5>Quack Quack, {userData.name}!</h5>
        <SettingsOptions
          changeTagline={changeTagline}
          editTag={editTag}
          loading={loading}
          tagline={tagline}
          setTagline={setTagline}
        />
      </section>
      <section className="settings-data">
        <UserPreview
          avatar={userData.avatar}
          name={userData.name}
          username={userData.username}
          tagline={userData.tagline}
        />
        <br />
        <Text size="sm">
          Hatched on {userData.createdAt.toString().slice(0, 10)}
        </Text>
        <Text size="sm">
          Registered email: <b>{userData.email}</b>
        </Text>
        <div className="settings-quacks">
          <Button>Manage Blocked Users</Button>
        </div>
      </section>
    </div>
  );
};
