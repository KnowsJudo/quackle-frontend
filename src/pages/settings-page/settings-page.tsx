import React, { useContext, useState } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Button, Loader, Text } from "@mantine/core";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackInput } from "../../components/quack-input/quack-input";
import { UserPreview } from "../../components/user-preview/user-preview";
import { apiUrl } from "../../helpers/api-url";
import { SettingsOptions } from "../../components/settings-options/settings-options";
import { IEditSettings, ISettings } from "../../types/settings";
import "./settings-page.css";

export const SettingsPage: React.FC = () => {
  const { userData, setUserData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);
  const [editOption, setEditOption] = useState<IEditSettings>({
    name: false,
    tagline: false,
    location: false,
    avatar: false,
    banner: false,
  });
  const [setting, setSetting] = useState<ISettings>({
    name: "",
    tagline: "",
    location: "",
    avatar: undefined,
    banner: undefined,
  });
  const [loading, setLoading] = useState<boolean>(false);

  const settingsOptions = Object.keys(setting);

  const changeSetting = async (option: keyof ISettings) => {
    if (!editOption[option]) {
      setEditOption((prev) => {
        return { ...prev, [option]: true };
      });
      return;
    }
    setLoading(true);
    try {
      if (option === "avatar" || option === "banner") {
        await axios.patch(
          `${apiUrl}/user/${userData.username}`,
          setting[option],
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
      } else {
        await axios.patch(`${apiUrl}/user/${userData.username}`, {
          option,
          setting: setting[option],
        });
      }
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setEditOption((prev) => {
        return { ...prev, [option]: false };
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(`Could not update ${option}`, error);
    }
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
        {loading ? (
          <Loader sx={{ margin: "auto" }} />
        ) : (
          settingsOptions.map((next) => {
            return (
              <SettingsOptions
                key={next}
                changeSetting={() => changeSetting(next as keyof ISettings)}
                option={next as keyof ISettings}
                setEditOption={setEditOption}
                editOption={editOption}
                setting={setting}
                setSetting={setSetting}
              />
            );
          })
        )}
      </section>
      <section className="settings-data">
        <UserPreview
          avatar={userData.avatar}
          name={userData.name}
          username={userData.username}
          tagline={userData.tagline}
          matchesUser={true}
        />
        <br />
        <Text size="sm">
          Hatched on {userData.createdAt.toString().slice(0, 10)}
        </Text>
        <Text size="sm">
          Registered email: <b>{userData.email}</b>
        </Text>
        <div className="settings-quacks">
          <Button color="gray">Manage Blocked Users</Button>
        </div>
      </section>
    </div>
  );
};
