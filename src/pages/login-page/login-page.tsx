import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Alert, Button } from "@mantine/core";
import Cookies from "js-cookie";
import { stdHeader } from "../../api/api-header";
import { Link, useNavigate } from "react-router-dom";
import "./login-page.css";

export const LoginPage: React.FC = () => {
  const { userData, setUserInfo } = useContext(QuackleContext);
  const [error, setError] = useState({
    network: false,
    password: false,
    user: false,
  });
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo;
  }, []);

  useEffect(() => {
    setError({ network: false, password: false, user: false });
  }, [userData]);

  const login = () => {
    axios
      .post(
        "//localhost:3001/api/user/login",
        {
          username: userData.username,
          password: pass,
        },
        stdHeader(),
      )
      .then((res) => {
        console.log(res.data, "backend response");
        if (res.data.success) {
          Cookies.set("jwtToken", res.data.token);
        }
        navigate(`/profile/${userData.username}`);
      })
      .catch((e) => {
        if (!e.response) {
          console.error(e.message);
          setError((prev) => {
            return { ...prev, network: true };
          });
          return;
        }
        if (e.response.status === 404) {
          console.error(e.response.data.message);
          setError((prev) => {
            return { ...prev, user: true };
          });
          return;
        }
        console.error(e.response.data.message);
        setError((prev) => {
          return { ...prev, password: true };
        });
        return;
      });
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <form className="login-form">
          <label>
            Username*
            <input
              placeholder="Username"
              onChange={(e) => setUserInfo(e, "username")}
              value={userData.username}
            />
          </label>
          <br />
          <label>
            Password*
            <input
              autoComplete="off"
              onChange={(e) => setPass(e.target.value)}
              type="password"
              placeholder="Password"
              value={pass}
            />
          </label>
        </form>
        <Button onClick={() => login()}>LOGIN</Button>
      </section>
      <br />
      {error.password && <Alert color="red">Incorrect Password</Alert>}
      {error.network && <Alert color="red">Network Error</Alert>}
      {error.user && <Alert color="red">User does not exist</Alert>}
      <h6>
        New to Quackle?&nbsp;
        <Link to="/">
          <Button>Sign Up</Button>
        </Link>
      </h6>
    </div>
  );
};
