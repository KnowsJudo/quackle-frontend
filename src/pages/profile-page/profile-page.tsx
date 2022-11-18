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
          displayPic: res.data.displayPic,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          dateOfBirth: res.data.dateOfBirth,
          createdAt: res.data.createdAt,
          tagline: res.data.tagline,
          quacks: res.data.quacks,
          reQuacks: res.data.reQuacks,
          friends: [],
          usersBlocked: [],
        });
        setLoading((prev) => {
          return { ...prev, profile: false };
        });
      })
      .catch((e) => {
        console.error(e);
        setLoading({ profile: false, quacks: false });
      });

    axios
      .get(`${apiUrl}/user/${params.userId}/quacks`)
      .then((res) => {
        console.log(res.data);
        setQuackData(res.data);
        setLoading((prev) => {
          return { ...prev, quacks: false };
        });
      })
      .catch((e) => console.error(e));
  }, [params]);

  // const addFriend = async (friendUsername: string) => {
  //   await axios
  //     .post(`${apiUrl}/user/${userData.username}/friends`, {
  //       friendUsername,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((e) => console.error(e));
  // };

  const deleteQuack = async (quackId: string) => {
    await axios
      .delete(
        //TESTING PURPOSES
        `${apiUrl}/user/${params.userId}/quacks/${quackId}`,
      )
      .then((res) => {
        console.log(res.data);
        setLoading((prev) => {
          return { ...prev, quacks: true };
        });
        axios
          .get(`${apiUrl}/user/${params.userId}/quacks`)
          .then((res) => {
            console.log(res.data);
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
      .catch((e) => console.error(e, "could not delete quack"));
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
          displayPic={userData.displayPic}
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
