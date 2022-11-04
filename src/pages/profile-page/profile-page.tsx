import React, { useEffect, useState } from "react";
import { CardWithStats } from "../../components/profile-card/profile-card";
import { useParams } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import axios from "axios";
import { Loader } from "@mantine/core";
import { IUser } from "../../types/user-types";
import "./profile-page.css";

export const ProfilePage: React.FC = () => {
  const params = useParams();
  const [profileData, setProfileData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        });
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
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
      <section className="profile-details">
        <div className="top-info">
          <h3>{profileData.username} on Quackle</h3>
          <CardWithStats
            image={profileData.displayPic}
            title={profileData.username}
            description={profileData.tagline}
            stats={[
              {
                title: "Quacks",
                value: profileData.quacks,
              },
              {
                title: "Flock members",
                value: profileData.friends?.length
                  ? profileData.friends?.length
                  : 0,
              },
              {
                title: "Joined",
                value: String(profileData.createdAt),
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
};
