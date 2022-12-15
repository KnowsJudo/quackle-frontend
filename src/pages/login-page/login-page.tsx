import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { QuackleContext } from "../../context/user-context";
import { Alert, Button, Loader } from "@mantine/core";
import { stdHeader } from "../../api/api-header";
import { Link, useNavigate } from "react-router-dom";
import { IError } from "../../types/signup-types";
import { apiUrl } from "../../api/api-url";
import "./login-page.css";

export const LoginPage: React.FC = () => {
  const { userData, setUserData, setUserInfo } = useContext(QuackleContext);
  const [error, setError] = useState<IError>({
    noUser: false,
    noPass: false,
    network: false,
    password: false,
    user: false,
  });
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setError({
      noUser: false,
      noPass: false,
      network: false,
      password: false,
      user: false,
    });
  }, [userData, pass]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      login();
    }
  };

  const login = () => {
    setError({
      noUser: false,
      noPass: false,
      network: false,
      password: false,
      user: false,
    });
    if (!userData.username) {
      setError({
        noUser: true,
        noPass: false,
        network: false,
        password: false,
        user: false,
      });
      return;
    }
    if (!pass) {
      setError({
        noUser: false,
        noPass: true,
        network: false,
        password: false,
        user: false,
      });
      return;
    }
    setLoading(true);

    // const checkCookie = Cookies.get('jwtToken"')

    axios
      .post(
        `${apiUrl}/user/login`,
        {
          username: userData.username,
          password: pass,
        },
        stdHeader(),
      )
      .then((res) => {
        if (res.data.success) {
          Cookies.set("jwtToken", res.data.token);
          axios
            .get(`${apiUrl}/user/${userData.username}`)
            .then((res) => {
              setUserData(res.data);
              setLoading(false);
              navigate("/home");
            })
            .catch((e) => console.error(e));
        }
      })
      .catch((e) => {
        if (!e.response) {
          console.error(e.message);
          setLoading(false);
          setError((prev) => {
            return { ...prev, network: true };
          });
          return;
        }
        if (e.response.status === 404) {
          console.error(e.response.data.message);
          setLoading(false);
          setError((prev) => {
            return { ...prev, user: true };
          });
          return;
        }
        console.error(e.response.data.message);
        setLoading(false);
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
        <Button onClick={() => login()} onKeyDown={onKeyDown}>
          LOGIN
        </Button>
      </section>
      <br />
      {loading && <Loader sx={{ margin: "auto" }} />}
      {error.noUser && <Alert color="red">Enter your username</Alert>}
      {error.noPass && <Alert color="red">Enter your password</Alert>}
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
