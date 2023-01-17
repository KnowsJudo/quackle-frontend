import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Alert, Button, Input } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IProfileSideBar } from "../../types/profile-types";
import { initialUserData, QuackleContext } from "../../context/user-context";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import { apiUrl } from "../../helpers/api-url";
import { UserPreview } from "../user-preview/user-preview";
import { IUserPreview } from "../../types/user-types";
import InputIcon from "@mui/icons-material/Input";
import SearchIcon from "@mui/icons-material/Search";
import "./profile-sidebar.css";

export const ProfileSideBar: React.FC<IProfileSideBar> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectData, setSelectData] = useState<IUserPreview[]>([]);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(initialUserData);
    navigate("/");
  };

  const searchUsers = async () => {
    setSelectData([]);
    if (search.length < 3) {
      console.log("Must enter at least 3 characters");
      return;
    }
    try {
      const data = await axios.get(`${apiUrl}/user/${search}`);
      const user = data.data;
      const singleUser: IUserPreview = {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        username: user.username,
        tagline: user.tagline,
        matchesUser: user.username === userData.username,
      };
      setSelectData([singleUser]);
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
      <div className="search-container">
        <span className="profile-search">
          <Input
            placeholder="Search Quackle Users"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            style={{ flex: "1 1 auto" }}
          />
          <Button
            variant="subtle"
            color="dark"
            onClick={() => searchUsers()}
            style={{ marginLeft: "auto" }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </span>
        {selectData.length ? (
          selectData.map((next) => {
            return (
              <UserPreview
                key={next.id}
                avatar={next.avatar}
                name={next.name}
                username={next.username}
                tagline={next.tagline}
                matchesUser={next.matchesUser}
              />
            );
          })
        ) : (
          <Alert color="gray">No users found</Alert>
        )}
      </div>
    </section>
  );
};
