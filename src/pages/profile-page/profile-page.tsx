import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Button, Loader } from "@mantine/core";
import { IUser } from "../../types/user-types";
import { QuackleContext } from "../../context/user-context";
import { QuackInput } from "../../components/quack-input/quack-input";
import { ProfileDetails } from "../../components/profile-details/profile-details";
import "./profile-page.css";
import { IQuackResponse } from "../../types/quacks";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const { userData } = useContext(QuackleContext);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [initiateQuack, setInitiateQuack] = useState<boolean>(false);
  const [quackData, setQuackData] = useState<IQuackResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // if (userData.username === params.userId) {
    //   setProfileData({
    //     displayPic: userData.displayPic,
    //     name: userData.name,
    //     username: userData.username,
    //     email: userData.email,
    //     dateOfBirth: userData.dateOfBirth,
    //     createdAt: userData.createdAt,
    //     tagline: userData.tagline,
    //     quacks: userData.quacks,
    //     reQuacks: userData.reQuacks,
    //     friends: [],
    //     usersBlocked: [],
    //   });
    //   setLoading(false);
    //   return;
    // }
    axios
      .get(`//localhost:3001/api/user/${params.userId}`)
      .then((res) => {
        console.log(res.data);
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
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });

    axios
      .get(`//localhost:3001/api/user/${params.userId}/quacks`)
      .then((res) => {
        console.log("quacks", res.data);
        setQuackData(res.data);
      })
      .catch((e) => console.error(e));
    console.log(quackData);
  }, [params.userid]);

  if (loading) {
    return (
      <div className="profile-container">
        <Loader />
      </div>
    );
  }

  return profileData === null ? (
    <NotFoundPage />
  ) : (
    <div className="profile-container">
      {initiateQuack && (
        <QuackInput
          fixed={true}
          displayPic={userData.displayPic}
          atUser={
            userData.username === params.userId ? "everyone" : params.userId
          }
        />
      )}
      <section className="profile-user">
        <h5>🦆</h5>
        <h5>Settings</h5>
        {userData.username && (
          <Button onClick={() => setInitiateQuack(true)}>Quack!</Button>
        )}
      </section>
      <ProfileDetails
        matchesUser={userData.username === params.userId ? true : false}
        quackData={quackData}
        profileData={profileData}
        paramId={params.userId}
      />
      <section className="profile-sidebar">
        <h5>Search Quackle</h5>
        {!userData.username && (
          <section className="profile-prompt">
            <h5>Not part of the pond?</h5>
            <Link to="/">
              <Button>Sign Up</Button>
            </Link>
            <h5>Existing User?</h5>
            <Link to="/login">
              <Button>LOGIN</Button>
            </Link>
          </section>
        )}
      </section>
    </div>
  );
};
