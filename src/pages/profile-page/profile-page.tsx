import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { Button, Image } from "@mantine/core";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext(QuackleContext);

  return (
    <div className="profile-container">
      <h5>Quack Quack, {userData.name}!</h5>
      <section className="profile-section">
        <Image
          width={200}
          height={120}
          src={null}
          alt="With default placeholder"
          withPlaceholder
        />
        <div className="profile-data">
          <h5>{userData.username}</h5>
          <p>Hatched on {userData.createdAt.toString()}</p>
          <p>{userData.email}</p>
          <div className="profile-quacks">
            {userData.friends ? (
              userData.friends.map((next, i) => {
                return (
                  <div key={i}>
                    <h3>Friends online:</h3>
                    {next.username}
                    {next.displayPic}
                  </div>
                );
              })
            ) : (
              <h5>You are an ugly duckling with no friends!</h5>
            )}
            <Button>Blocked Users</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
