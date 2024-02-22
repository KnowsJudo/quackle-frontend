import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import { Button, Menu } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { clearUser, QuackleContext } from "../../context/user-context";
import { IProfileUser } from "../../types/profile-types";
import { GiDuck } from "react-icons/gi";
import { GiNestBirds } from "react-icons/gi";
import { SiDuckduckgo } from "react-icons/si";
import { SearchUsers } from "../search-users/search-users";
import { ConfirmModal } from "../confirm-modal/confirm-modal";
import EggIcon from "@mui/icons-material/Egg";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WaterIcon from "@mui/icons-material/Water";
import LogoutIcon from "@mui/icons-material/Logout";
import "./profile-user.css";
import { CopyrightBadge } from "../copyright-badge/copyright-badge";

export const ProfileUser: React.FC<IProfileUser> = (props) => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [modal, setModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("jwtToken");
    setUserData(clearUser);
    navigate("/");
    setModal(false);
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
                <Link to="/login" style={linkStyle}>
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
            style={{ padding: "7px", fontSize: "16px" }}
            onClick={() => props.setInitiateQuack(true)}
          >
            🦆
          </Button>
        )}
      </span>

      <SearchUsers compact />

      {props.loggedIn && (
        <span className="user-logout">
          <Button
            color="cyan"
            onClick={() => {
              setModal(true);
            }}
            style={{ padding: "5px", fontSize: "14px" }}
          >
            <LogoutIcon />
          </Button>
        </span>
      )}

      <nav className="profile-user-list">
        <Link to="/" style={linkStyle}>
          <GiDuck style={{ marginRight: "7px" }} />
        </Link>
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
        {!props.loggedIn && (
          <section className="profile-prompt">
            <h6 className="prompt-headings">Not part of the pond?</h6>
            <Link to="/signup">
              <Button color="cyan">Sign Up</Button>
            </Link>
            <h6 className="prompt-headings">Existing User?</h6>
            <Link to="/login">
              <Button color="cyan">LOGIN</Button>
            </Link>
          </section>
        )}
        <CopyrightBadge compact />
      </nav>
      <a href="https://lachieb.dev" className="copyright-mobile">
        &copy;
      </a>
    </section>
  );
};
