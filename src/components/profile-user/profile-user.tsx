import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Button, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { initialUserData, QuackleContext } from "../../context/user-context";
import { IProfileUser } from "../../types/profile-types";
import { GiDuck } from "react-icons/gi";
import { GiNestBirds } from "react-icons/gi";
import { SiDuckduckgo } from "react-icons/si";
import { SearchUsers } from "../search-users/search-users";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import EggIcon from "@mui/icons-material/Egg";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WaterIcon from "@mui/icons-material/Water";
import InputIcon from "@mui/icons-material/Input";
import "./profile-user.css";

export const ProfileUser: React.FC<IProfileUser> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(initialUserData);
    navigate("/");
  };

  const linkStyle = {
    display: "flex",
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    alignItems: "center",
  };

  return (
    <section className="profile-user">
      <ConfirmModal
        modal={modal}
        setModal={setModal}
        title="Do you wish to logout?"
        confirmFunc={() => logout()}
      />
      <Menu shadow="sm" width={300}>
        <Menu.Target>
          <Button color="dark" className="hamburger" />
        </Menu.Target>
        <Menu.Dropdown
          style={{ backgroundColor: "#282c34" }}
          className="hamburger-menu"
        >
          {props.loggedIn && (
            <Menu.Item color="dark">
              <Link to="/home" style={linkStyle}>
                <WaterIcon style={{ marginRight: "7px" }} /> Home
              </Link>
            </Menu.Item>
          )}
          <Menu.Item color="dark">
            <Link to="/trending" style={linkStyle}>
              <ShowChartIcon style={{ marginRight: "7px" }} /> Trending Ducks
            </Link>
          </Menu.Item>
          {!props.loggedIn && (
            <>
              <Menu.Divider />
              <Menu.Label>Browsing as guest</Menu.Label>
              <Menu.Item color="dark">
                <Link to="/signup" style={linkStyle}>
                  Sign up to Quackle
                </Link>
              </Menu.Item>
              <Menu.Item color="dark">
                <Link to="/" style={linkStyle}>
                  Login
                </Link>
              </Menu.Item>
            </>
          )}
          {props.loggedIn && (
            <>
              <Menu.Item color="dark">
                <Link to="/settings" style={linkStyle}>
                  <EggIcon style={{ marginRight: "7px" }} /> Settings
                </Link>
              </Menu.Item>
              <Menu.Item color="dark">
                <Link to={`/profile/${userData.username}`} style={linkStyle}>
                  <SiDuckduckgo style={{ marginRight: "7px" }} /> View Profile
                </Link>
              </Menu.Item>
              <Menu.Item color="dark">
                <Link
                  to={`/profile/${userData.username}/following`}
                  style={linkStyle}
                >
                  <GiDuck style={{ marginRight: "7px" }} /> Following
                </Link>
              </Menu.Item>
              <Menu.Item color="dark">
                <Link
                  to={`/profile/${userData.username}/followers`}
                  style={linkStyle}
                >
                  <GiNestBirds style={{ marginRight: "7px" }} /> Followers
                </Link>
              </Menu.Item>
            </>
          )}
        </Menu.Dropdown>
      </Menu>

      <span className="user-quack">
        {props.loggedIn && (
          <Button
            color="teal"
            size="xs"
            onClick={() => props.setInitiateQuack(true)}
          >
            🦆
          </Button>
        )}
      </span>

      <SearchUsers compact={true} />

      {props.loggedIn && (
        <span className="user-logout">
          <Button
            size="xs"
            onClick={() => {
              setModal(true);
            }}
            color="cyan"
          >
            <InputIcon sx={{ fontSize: "16px" }} />
          </Button>
        </span>
      )}

      <span className="profile-user-list">
        {props.loggedIn && (
          <Link to="/home" style={linkStyle}>
            <WaterIcon style={{ marginRight: "7px" }} /> Home
          </Link>
        )}
        <Link to="/trending" style={linkStyle}>
          <ShowChartIcon style={{ marginRight: "7px" }} /> Trending Ducks
        </Link>
        {props.loggedIn && (
          <>
            <Link to="/settings" style={linkStyle}>
              <EggIcon style={{ marginRight: "7px" }} /> Settings
            </Link>
            <Link to={`/profile/${userData.username}`} style={linkStyle}>
              <SiDuckduckgo style={{ marginRight: "7px" }} /> View Profile
            </Link>
            <Link
              to={`/profile/${userData.username}/following`}
              style={linkStyle}
            >
              <GiDuck style={{ marginRight: "7px" }} /> Following
            </Link>
            <Link
              to={`/profile/${userData.username}/followers`}
              style={linkStyle}
            >
              <GiNestBirds style={{ marginRight: "7px" }} /> Followers
            </Link>
          </>
        )}
        <span>
          {props.loggedIn && (
            <Button color="teal" onClick={() => props.setInitiateQuack(true)}>
              Quack!
            </Button>
          )}
        </span>
      </span>
    </section>
  );
};
