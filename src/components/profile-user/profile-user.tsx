import React, { useContext } from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import { IProfileUser } from "../../types/profile-types";
import "./profile-user.css";

export const ProfileUser: React.FC<IProfileUser> = (props) => {
  const { userData } = useContext(QuackleContext);

  return (
    <section className="profile-user">
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        🦆
      </Link>
      {props.loggedIn && (
        <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
      )}
      <Link to="/settings" style={{ color: "white", textDecoration: "none" }}>
        Settings
      </Link>
      {props.loggedIn && (
        <Link
          to={`/profile/${userData.username}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          Profile
        </Link>
      )}
      <Link to="/profile/Chom">Test</Link>
      <span>
        {props.loggedIn && (
          <Button onClick={() => props.setInitiateQuack(true)}>Quack!</Button>
        )}
      </span>
    </section>
  );
};
