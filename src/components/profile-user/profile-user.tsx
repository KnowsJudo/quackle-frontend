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
      <Link to="/trending" style={{ color: "white", textDecoration: "none" }}>
        Trending Ducks
      </Link>
      <Link to="/settings" style={{ color: "white", textDecoration: "none" }}>
        Settings
      </Link>
      {props.loggedIn && (
        <Link
          to={`/profile/${userData.username}`}
          style={{ color: "white", textDecoration: "none" }}
        >
          View Profile
        </Link>
      )}
      {props.loggedIn && (
        <Link
          to={`/profile/${userData.username}/following`}
          style={{ color: "white", textDecoration: "none" }}
        >
          Following
        </Link>
      )}
      {props.loggedIn && (
        <Link
          to={`/profile/${userData.username}/followers`}
          style={{ color: "white", textDecoration: "none" }}
        >
          Followers
        </Link>
      )}
      <Link to="/profile/Legolas">Test Profile</Link>
      <span>
        {props.loggedIn && (
          <Button onClick={() => props.setInitiateQuack(true)}>Quack!</Button>
        )}
      </span>
    </section>
  );
};
