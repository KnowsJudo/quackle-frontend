import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, Badge, Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IProfileSideBar } from "../../types/profile-types";
import { clearUser, QuackleContext } from "../../context/user-context";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { SearchUsers } from "../search-users/search-users";
import InputIcon from "@mui/icons-material/Input";
import "./profile-sidebar.css";

export const ProfileSideBar: React.FC<IProfileSideBar> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(clearUser);
    navigate("/");
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
          <span className="profile-id">
            <Link to={`/profile/${userData.username}`}>
              <Avatar
                size="sm"
                radius="xl"
                src={userData.avatar}
                style={{ margin: "0 0 3px 5px" }}
              />
            </Link>
            <Text size="xs" style={{ marginLeft: "5px" }}>
              {userData.name}
            </Text>
            <Text size="xs" style={{ marginLeft: "5px" }} color="dimmed">
              @{userData.username}
            </Text>
          </span>
          <Button onClick={() => setModal(true)} color="cyan">
            Logout&nbsp;&nbsp;
            <InputIcon />
          </Button>
        </span>
      )}
      {!props.loggedIn && (
        <section className="profile-prompt">
          <h6>Not part of the pond?</h6>
          <Link to="/signup">
            <Button color="cyan">Sign Up</Button>
          </Link>
          <h6>Existing User?</h6>
          <Link to="/login">
            <Button color="cyan">LOGIN</Button>
          </Link>
        </section>
      )}
      <SearchUsers compact={false} />
      <Badge
        size="sm"
        radius="xl"
        style={{
          margin: "auto",
          padding: "15px",
          backgroundColor: "#282c34",
          marginTop: "auto",
        }}
      >
        <a
          href="https://lachieb.dev"
          style={{ color: "white", textDecoration: "none" }}
        >
          &copy; LachieB.dev 2023
        </a>
      </Badge>
    </section>
  );
};
