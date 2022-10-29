import React, { useContext } from "react";
import axios from "axios";
import { QuackleContext } from "../../context/user-context";
import { Button } from "@mantine/core";
import Cookies from "js-cookie";
import { stdHeader } from "../../api/api";

export const LoginPage: React.FC = () => {
  const { userData, setUserInfo } = useContext(QuackleContext);

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
      .catch((e) => console.error(e));
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
    </div>
  );
};
