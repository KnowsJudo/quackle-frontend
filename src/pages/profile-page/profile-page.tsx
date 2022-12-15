import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Loader } from "@mantine/core";
import { IUser } from "../../types/user-types";
import { QuackleContext } from "../../context/user-context";
import { QuackInput } from "../../components/quack-input/quack-input";
import { ProfileDetails } from "../../components/profile-details/profile-details";
import { IQuackResponse } from "../../types/quacks";
import { ILoading } from "../../types/profile-types";
import { apiUrl } from "../../api/api-url";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import "./profile-page.css";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const { userData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [quackData, setQuackData] = useState<IQuackResponse[]>([]);
  const [loading, setLoading] = useState<ILoading>({
    profile: true,
    quacks: true,
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/user/${params.userId}`)
      .then((res) => {
        setProfileData({
          id: "",
          ...res.data,
        });
        setLoading((prev) => {
          return { ...prev, profile: false };
        });
      })
      .catch((e) => {
        console.error(e);
        setLoading({ profile: false, quacks: false });
        setProfileData(null);
      });

    axios
      .get(`${apiUrl}/user/${params.userId}/quacks`)
      .then((res) => {
        setQuackData(res.data);
        setLoading((prev) => {
          return { ...prev, quacks: false };
        });
      })
      .catch((e) => console.error(e));
  }, [params, userData]);

  const deleteQuack = async (quackId: string) => {
    await axios
      .delete(`${apiUrl}/user/${params.userId}/quacks/${quackId}`)
      .then(() => {
        setLoading((prev) => {
          return { ...prev, quacks: true };
        });
        axios
          .get(`${apiUrl}/user/${params.userId}/quacks`)
          .then((res) => {
            setQuackData(res.data);
            setLoading((prev) => {
              return { ...prev, quacks: false };
            });
          })
          .catch((e) => {
            console.error(e);
            setLoading({ profile: false, quacks: false });
          });
      })
      .catch((e) => console.error(e, "Could not delete quack"));
  };

  if (loading.profile) {
    return (
      <div className="profile-container">
        <Loader sx={{ margin: "auto" }} />
      </div>
    );
  }

  return profileData === null ? (
    <NotFoundPage />
  ) : (
    <div className="profile-container">
      {initiateQuack && (
        <QuackInput
          setInitiateQuack={setInitiateQuack}
          fixed={true}
          avatar={userData.avatar}
          atUser={
            userData.username === params.userId ? "everyone" : params.userId
          }
        />
      )}
      <ProfileUser
        setInitiateQuack={setInitiateQuack}
        loggedIn={userData.username ? true : false}
      />
      <ProfileDetails
        matchesUser={userData.username === params.userId ? true : false}
        loggedIn={userData.username ? true : false}
        quackData={quackData}
        profileData={profileData}
        paramId={params.userId}
        deleteQuack={deleteQuack}
        loading={loading.quacks}
      />
      <ProfileSideBar loggedIn={userData.username ? true : false} />
    </div>
  );
};
