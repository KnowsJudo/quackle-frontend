import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Input } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IProfileSideBar } from "../../types/profile-types";
import { initialUserData, QuackleContext } from "../../context/user-context";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import InputIcon from "@mui/icons-material/Input";
import SearchIcon from "@mui/icons-material/Search";
import "./profile-sidebar.css";
import { apiUrl } from "../../helpers/api-url";

export const ProfileSideBar: React.FC<IProfileSideBar> = (props) => {
  const { setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(initialUserData);
    navigate("/");
  };

  const searchUsers = async () => {
    if (search.length < 3) {
      console.log("Must enter at least 3 characters");
      return;
    }
    try {
      const user = await axios.get(`${apiUrl}/user/${search}`);
      console.log(user.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="profile-sidebar">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title="Do you wish to logout?"
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
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
          <h5>Existing User?</h5>
          <Link to="/">
            <Button>LOGIN</Button>
          </Link>
        </section>
      )}
      <span className="profile-search">
        <Input
          placeholder="Search Quackle Users"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <Button variant="subtle" color="dark" onClick={() => searchUsers()}>
          <SearchIcon fontSize="large" />
        </Button>
      </span>
    </section>
  );
};
