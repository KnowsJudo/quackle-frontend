import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Button } from "@mantine/core";
import Cookies from "js-cookie";
import { stdHeader } from "../../api/api-header";
import "./login-page.css";
import { Link } from "react-router-dom";

export const LoginPage: React.FC = () => {
  const { userData, setUserInfo } = useContext(QuackleContext);
  const [error, setError] = useState({ password: false });

  useEffect(() => {
    setError((prev) => {
      return { ...prev, password: false };
    });
  }, [userData]);

  const login = () => {
    axios
      .post(
        "//localhost:3001/api/user/login",
        {
          username: userData.username,
          password: userData.password,
        },
        stdHeader(),
      )
      .then((res) => {
        console.log(res.data, "backend response");
        if (res.data.success) {
          Cookies.set("jwtToken", res.data.token);
        }
      })
      .catch((e) => {
        console.error(e.response.data.message);
        setError((prev) => {
          return { ...prev, password: true };
        });
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
              onChange={(e) => setUserInfo(e, "password")}
              type="password"
              placeholder="Password"
              value={userData.password}
            />
          </label>
        </form>
        <Button onClick={() => login()}>LOGIN</Button>
      </section>
      {error.password && <h5>Incorrect Password</h5>}
      <h6>
        New to Quackle?&nbsp;
        <Link to="/">
          <Button>Sign Up</Button>
        </Link>
      </h6>
    </div>
  );
};
