import React, { useContext, useEffect, useRef, useState } from "react";
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
import { getQuacks } from "../../helpers/quack-getters";
import "./profile-page.css";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const { userData, initiateQuack, setInitiateQuack, loggedIn } =
    useContext(QuackleContext);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [quackData, setQuackData] = useState<IQuackResponse[]>([]);
  const [pondData, setPondData] = useState<IQuackResponse[]>([]);
  const [likedQuacks, setLikedQuacks] = useState<IQuackResponse[]>([]);
  const [selectedTab, setSelectedTab] = useState<string | null>("quacks");
  const [loading, setLoading] = useState<ILoading>({
    profile: true,
    quacks: true,
    pond: true,
    likes: true,
  });

  const getProfileData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/${params.userId}`);
      setProfileData(res.data);
      setLoading((prev) => {
        return { ...prev, profile: false };
      });
    } catch (error) {
      console.error(error);
      setLoading({ profile: false, quacks: false, pond: false, likes: false });
      setProfileData(null);
    }
  };

  const getProfileQuacks = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user/${params.userId}/quacks`);
      setQuackData(res.data);
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
    if (!profileData) {
      return;
    }
    if (!profileData.likedQuacks.length) {
      setLoading((prev) => {
        return { ...prev, likes: false };
      });
      return;
    }
    const likes = await getQuacks(profileData.likedQuacks, true);
    if (!likes) {
      setLoading((prev) => {
        return { ...prev, likes: false };
      });
      return;
    }
    const sortedResults = likes
      .sort(
        (a: IQuackResponse, b: IQuackResponse) =>
          Date.parse(a.quackedAt) - Date.parse(b.quackedAt),
      )
      .reverse();
    setLikedQuacks(sortedResults);
    setLoading((prev) => {
      return { ...prev, likes: false };
    });
  };

  useEffect(() => {
    setLoading({
      profile: true,
      quacks: true,
      pond: true,
      likes: true,
    });
    setSelectedTab("quacks");
  }, [params.userId]);

  useEffect(() => {
    getProfileData();
    getProfileQuacks();
  }, [params.userId, userData.quacks, userData.likedQuacks]);

  const likesRef = useRef("initalLoad");

  //Initial likes fetch
  useEffect(() => {
    if (likesRef.current !== "initalLoad") {
      return;
    }
    if (selectedTab === "likes") {
      getProfileLikes();
      likesRef.current = "loaded";
    }
  }, [selectedTab]);

  useEffect(() => {
    if (likesRef.current === "initalLoad") {
      return;
    }
    getProfileLikes();
  }, [profileData?.likedQuacks, userData.likedQuacks]);

  const getPondQuacks = async () => {
    if (!profileData) {
      return;
    }
    try {
      const quacks = await axios.get(
        `${apiUrl}/focused/${profileData.username}/quacks`,
      );
      setPondData(quacks.data);
      setLoading((prev) => {
        return {
          ...prev,
          pond: false,
        };
      });
    } catch (error) {
      setLoading((prev) => {
        return {
          ...prev,
          pond: false,
        };
      });
      console.error(error);
    }
  };

  const pondRef = useRef("initalPond");

  //Initial pond fetch
  useEffect(() => {
    if (pondRef.current !== "initalPond") {
      return;
    }
    if (selectedTab === "pond") {
      getPondQuacks();
      pondRef.current = "loaded";
    }
  }, [selectedTab]);

  useEffect(() => {
    if (pondRef.current === "initalPond") {
      return;
    }
    getPondQuacks();
  }, [profileData?.quacks, userData.quacks]);

  if (loading.profile) {
    return (
      <div className="profile-container">
        <Loader sx={{ margin: "auto" }} color="cyan" />
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
          targeted={
            userData.username === profileData.username
              ? ""
              : profileData.username
          }
          // parentQuackId={}
        />
      )}
      <ProfileUser
        setInitiateQuack={setInitiateQuack}
        loggedIn={loggedIn ? true : false}
      />
      <ProfileDetails
        matchesUser={userData.username === params.userId ? true : false}
        loggedIn={loggedIn ? true : false}
        profileData={profileData}
        quackData={quackData}
        pondData={pondData}
        likesData={likedQuacks}
        paramId={params.userId}
        loading={loading}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <ProfileSideBar loggedIn={loggedIn ? true : false} />
    </div>
  );
};
