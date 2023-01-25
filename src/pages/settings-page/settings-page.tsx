import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Button, Loader, Text } from "@mantine/core";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { QuackInput } from "../../components/quack-input/quack-input";
import { UserPreview } from "../../components/user-preview/user-preview";
import { apiUrl } from "../../helpers/api-url";
import { SettingsOptions } from "../../components/settings-options/settings-options";
import { IEditSettings, ISettings, ISettingsError } from "../../types/settings";
import "./settings-page.css";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import { initialSettingsError } from "../../helpers/error-states";

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
  const [settingsError, setSettingsError] =
    useState<ISettingsError>(initialSettingsError);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setSettingsError(initialSettingsError);
  }, [setting]);

  const settingsOptions = Object.keys(setting);
  const maxTaglineLength = 65;
  const maxDataLength = 25;

  const changeSetting = async (option: keyof ISettings) => {
    if (!editOption[option]) {
      setEditOption((prev) => {
        return { ...prev, [option]: true };
      });
      return;
    }
    //Check length of text option input
    setSettingsError(initialSettingsError);
    if (option === "name" && setting.name.length > maxDataLength) {
      setSettingsError((prev) => {
        return { ...prev, name: true };
      });
      return;
    }
    if (option === "tagline" && setting.tagline.length > maxTaglineLength) {
      setSettingsError((prev) => {
        return { ...prev, tagline: true };
      });
      return;
    }
    if (option === "location" && setting.location.length > maxDataLength) {
      setSettingsError((prev) => {
        return { ...prev, location: true };
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
      <section className="settings-details">
        <section className="settings-data">
          <UserPreview
            avatar={userData.avatar}
            name={userData.name}
            username={userData.username}
            tagline={userData.tagline}
            matchesUser={true}
          />
          <br />
          <span className="settings-stats">
            <Text size="sm">
              Hatched on {userData.createdAt.toString().slice(0, 10)}
            </Text>
            <Text size="sm">
              Registered email: <b>{userData.email}</b>
            </Text>
            <br />
            <Text size="xs">Total Quacks: {userData.quacks}</Text>
            <Text size="xs">Total Re-Quacks: {userData.reQuacks}</Text>
            <Text size="xs">Liked Quacks: {userData.likedQuacks.length}</Text>
            <Text size="xs">Following: {userData.following.length}</Text>
            <Text size="xs">Followers: {userData.followers.length}</Text>
          </span>
          <br />
        </section>
        <section className="settings-user">
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
                  settingsError={settingsError}
                />
              );
            })
          )}
        </section>
        <span className="settings-blocked">
          <Button disabled>Manage Blocked Users</Button>
        </span>
      </section>
      <ProfileSideBar loggedIn={true} />
    </div>
  );
};
