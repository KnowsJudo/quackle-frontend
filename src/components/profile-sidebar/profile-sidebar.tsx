import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Button, Input } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IProfileSideBar } from "../../types/profile-types";
import { initialUserData, QuackleContext } from "../../context/user-context";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import InputIcon from "@mui/icons-material/Input";
import SearchIcon from "@mui/icons-material/Search";
import "./profile-sidebar.css";

export const ProfileSideBar: React.FC<IProfileSideBar> = (props) => {
  const { setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(initialUserData);
    navigate("/");
  };

  return (
    <section className="profile-sidebar">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title="Do you wish to sign out?"
        confirmFunc={() => logout()}
      />
      {props.loggedIn && (
        <span className="profile-logout">
          <Button onClick={() => setModal(true)}>
            Logout&nbsp;&nbsp;
            <InputIcon />
          </Button>
        </span>
      )}
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
      <span className="profile-search">
        <SearchIcon />
        &nbsp;
        <Input placeholder="Search Quackle"></Input>
      </span>
    </section>
  );
};
