import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { IProfileSideBar } from "../../types/profile-types";
import "./profile-sidebar.css";

export const ProfileSideBar: React.FC<IProfileSideBar> = (props) => {
  return (
    <section className="profile-sidebar">
      <h5>Search Quackle</h5>
      {!props.loggedIn && (
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
  );
};
