import React, { useContext } from "react";
import { CardWithStats } from "../../components/profile-card/profile-card";

import { QuackleContext } from "../../context/user-context";
// import { useParams } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext(QuackleContext);

  // const params = useParams();

  return (
    <div className="profile-container">
      <section className="profile-details">
        <h1>{userData.username} on Quackle</h1>
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
      </section>
    </div>
  );
};
