import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { apiUrl } from "../../helpers/api-url";
import { Avatar, Button, Text } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IProfileSideBar } from "../../types/profile-types";
import { clearUser, QuackleContext } from "../../context/user-context";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { SearchUsers } from "../search-users/search-users";
import { NewUsersList } from "../new-users-list/new-users-list";
import { IUserPreview } from "../../types/user-types";
import LogoutIcon from "@mui/icons-material/Logout";
import "./profile-sidebar.css";

export const ProfileSideBar: React.FC<IProfileSideBar> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [newUserData, setNewUserData] = useState<IUserPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(clearUser);
    navigate("/");
    setModal(false);
  };

  const getNewUserData = async () => {
    try {
      const data = await axios.get(`${apiUrl}/new`);
      setNewUserData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getNewUserData();
  // }, []);

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
            <LogoutIcon />
          </Button>
        </span>
      )}
      <SearchUsers compact={false} />
      <NewUsersList loading={loading} newUserData={newUserData} />
    </section>
  );
};
