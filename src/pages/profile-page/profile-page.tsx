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
import { apiUrl } from "../../helpers/api-url";
import { ProfileUser } from "../../components/profile-user/profile-user";
import { ProfileSideBar } from "../../components/profile-sidebar/profile-sidebar";
import "./profile-page.css";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const { userData, initiateQuack, setInitiateQuack } =
    useContext(QuackleContext);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [quackData, setQuackData] = useState<IQuackResponse[]>([]);
  const [likesData, setLikesData] = useState<IQuackResponse[]>([]);
  const [loading, setLoading] = useState<ILoading>({
    profile: true,
    quacks: true,
    likes: true,
  });

  const getProfileData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/${params.userId}`);
      setProfileData({
        id: "",
        ...res.data,
      });
      setLoading((prev) => {
        return { ...prev, profile: false };
      });
    } catch (error) {
      console.error(error);
      setLoading({ profile: false, quacks: false, likes: false });
      setProfileData(null);
    }
  };

  const getProfileQuacks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/${params.userId}/quacks`);
      const sortedResults = res.data
        .sort(
          (a: IQuackResponse, b: IQuackResponse) =>
            Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
        )
        .reverse();
      setQuackData(sortedResults);
      setLoading((prev) => {
        return { ...prev, quacks: false };
      });
    } catch (error) {
      console.error(error);
      setLoading((prev) => {
        return { ...prev, quacks: false };
      });
    }
  };

  const getProfileLikes = async () => {
    if (!userData.likedQuacks.length) {
      setLoading((prev) => {
        return { ...prev, likes: false };
      });
      return;
    }
    try {
      const promises = userData.likedQuacks.map(async (next) => {
        const res = await axios.get(`${apiUrl}/user/users/quacks/${next}`);
        return res.data;
      });
      const results = await Promise.all(promises);
      const responses = results
        .flat()
        .sort(
          (a: IQuackResponse, b: IQuackResponse) =>
            Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
        )
        .reverse();
      setLikesData(responses);
    } catch (err) {
      console.error(err);
      setLoading((prev) => {
        return { ...prev, likes: false };
      });
    }
  };

  useEffect(() => {
    getProfileData();
    getProfileQuacks();
    getProfileLikes();
  }, [params.userId, userData.quacks, userData.likedQuacks]);

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
        profileData={profileData}
        quackData={quackData}
        likesData={likesData}
        paramId={params.userId}
        loading={loading.quacks}
      />
      <ProfileSideBar loggedIn={userData.username ? true : false} />
    </div>
  );
};
