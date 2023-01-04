import React, { useContext } from "react";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import { IProfileUser } from "../../types/profile-types";
import "./profile-user.css";

export const ProfileUser: React.FC<IProfileUser> = (props) => {
  const { userData } = useContext(QuackleContext);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "24px",
  };

  return (
    <section className="profile-user">
      <Link to="/" style={linkStyle}>
        🦆
      </Link>
      {props.loggedIn && (
        <Link to="/home" style={linkStyle}>
          Home
        </Link>
      )}
      <Link to="/trending" style={linkStyle}>
        Trending Ducks
      </Link>
      {props.loggedIn && (
        <Link to="/settings" style={linkStyle}>
          Settings
        </Link>
      )}
      {props.loggedIn && (
        <Link to={`/profile/${userData.username}`} style={linkStyle}>
          View Profile
        </Link>
      )}
      {props.loggedIn && (
        <Link to={`/profile/${userData.username}/following`} style={linkStyle}>
          Following
        </Link>
      )}
      {props.loggedIn && (
        <Link to={`/profile/${userData.username}/followers`} style={linkStyle}>
          Followers
        </Link>
      )}
      <span>
        {props.loggedIn && (
          <Button color="gray" onClick={() => props.setInitiateQuack(true)}>
            Quack!
          </Button>
        )}
      </span>
    </section>
  );
};
