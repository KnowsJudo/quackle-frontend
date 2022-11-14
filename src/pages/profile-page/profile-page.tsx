import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { Button, Loader } from "@mantine/core";
import { IUser } from "../../types/user-types";
import { QuackleContext } from "../../context/user-context";
import { QuackInput } from "../../components/quack-input/quack-input";
import { ProfileDetails } from "../../components/profile-details/profile-details";
import { IQuackResponse } from "../../types/quacks";
import "./profile-page.css";
import { ILoading } from "../../types/profile-details";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const { userData } = useContext(QuackleContext);
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [initiateQuack, setInitiateQuack] = useState<boolean>(false);
  const [quackData, setQuackData] = useState<IQuackResponse[]>([]);
  const [loading, setLoading] = useState<ILoading>({
    profile: true,
    quacks: true,
  });

  useEffect(() => {
    axios
      .get(`//localhost:3001/api/user/${params.userId}`)
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
      .get(`//localhost:3001/api/user/${params.userId}/quacks`)
      .then((res) => {
        console.log(res.data);
        setQuackData(res.data);
        setLoading((prev) => {
          return { ...prev, quacks: false };
        });
      })
      .catch((e) => console.error(e));
  }, [params]);

  const deleteQuack = async (quackId: string) => {
    await axios
      .delete(
        //TESTING PURPOSES
        `//localhost:3001/api/user/${params.userId}/quacks/${quackId}`,
      )
      .then((res) => {
        console.log(res.data);
        setLoading((prev) => {
          return { ...prev, quacks: true };
        });
        axios
          .get(`//localhost:3001/api/user/${params.userId}/quacks`)
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
      <section className="profile-user">
        <Link to={`/`} style={{ color: "white", textDecoration: "none" }}>
          🦆
        </Link>
        {userData.username && (
          <Link
            to={`/profile/${userData.username}`}
            style={{ color: "white", textDecoration: "none" }}
          >
            Home
          </Link>
        )}
        <Link
          to={`/settings`}
          style={{ color: "white", textDecoration: "none" }}
        >
          Settings
        </Link>
        <Link to={"/profile/Chom"}>Test</Link>
        <span>
          {userData.username && (
            <Button onClick={() => setInitiateQuack(true)}>Quack!</Button>
          )}
        </span>
      </section>
      <ProfileDetails
        matchesUser={userData.username === params.userId ? true : false}
        quackData={quackData}
        profileData={profileData}
        paramId={params.userId}
        deleteQuack={deleteQuack}
        loading={loading.quacks}
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
