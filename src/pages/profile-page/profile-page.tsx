import React, { useContext } from "react";
import { CardWithStats } from "../../components/profile-card/profile-card";
import { QuackleContext } from "../../context/user-context";
// import { useParams } from "react-router-dom";
import "./profile-page.css";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext(QuackleContext);

  // const params = useParams();

  return (
    <div className="profile-container">
      <section className="profile-details">
        <div className="top-info">
          <h3>{userData.username} on Quackle</h3>
          {CardWithStats({
            image: userData.displayPic,
            title: userData.username,
            description: userData.tagline,
            stats: [
              {
                title: "Quacks",
                value: userData.quacks,
              },
              {
                title: "Flock members",
                value: userData.friends.length,
              },
              {
                title: "Joined",
                value: Number(userData.createdAt),
              },
            ],
          })}
        </div>
      </section>
    </div>
  );
};
