import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { useParams } from "react-router-dom";

export const ProfilePage: React.FC = () => {
  const { userData } = useContext(QuackleContext);

  const params = useParams();

  return params.username ? (
    <div>
      <h1>{userData.username} on Quackle</h1>
    </div>
  ) : (
    <div>NO PROFILE</div>
  );
};
