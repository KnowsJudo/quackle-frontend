import React, { useContext } from "react";
import { Button, Menu } from "@mantine/core";
import { Link } from "react-router-dom";
import { QuackleContext } from "../../context/user-context";
import { IProfileUser } from "../../types/profile-types";
import { GiDuck } from "react-icons/gi";
import { GiNestBirds } from "react-icons/gi";
import { SiDuckduckgo } from "react-icons/si";
import EggIcon from "@mui/icons-material/Egg";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WaterIcon from "@mui/icons-material/Water";
import "./profile-user.css";

export const ProfileUser: React.FC<IProfileUser> = (props) => {
  const { userData } = useContext(QuackleContext);

  const linkStyle = {
    display: "flex",
    color: "white",
    textDecoration: "none",
    fontSize: "20px",
    alignItems: "center",
  };

  return (
    <section className="profile-user">
      <Menu shadow="sm" width={300}>
        <Menu.Target>
          <Button color="dark" className="hamburger" />
        </Menu.Target>
        <Menu.Dropdown
          style={{ backgroundColor: "#282c34", color: "red" }}
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
