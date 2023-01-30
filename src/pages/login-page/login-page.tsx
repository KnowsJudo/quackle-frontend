import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { QuackleContext } from "../../context/user-context";
import { Button, LoadingOverlay, Notification, Text } from "@mantine/core";
import { stdHeader } from "../../helpers/api-header";
import { Link, useNavigate } from "react-router-dom";
import { ILoginError } from "../../types/errors";
import { apiUrl } from "../../helpers/api-url";
import { initialLoginError } from "../../helpers/error-states";
import { LoginForm } from "../../components/login-form/login-form";
import { QuackleTitle } from "../../components/quackle-title/quackle-title";
import { QuackleFooter } from "../../components/footer/footer";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import "./login-page.css";

export const LoginPage: React.FC = () => {
  const { userData, setUserData } = useContext(QuackleContext);
  const [error, setError] = useState<ILoginError>(initialLoginError);
  const [pass, setPass] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setError(initialLoginError);
  }, [userData, pass]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      login();
    }
  };

  const login = async () => {
    setError(initialLoginError);
    if (!userData.username) {
      setError((prev) => {
        return { ...prev, noUser: true };
      });
      return;
    }
    if (!pass) {
      setError((prev) => {
        return { ...prev, noPass: true };
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/user/login`,
        {
          username: userData.username,
          password: pass,
        },
        stdHeader(),
      );
      if (res.data.success) {
        Cookies.set("jwtToken", res.data.token);
        const getData = await axios.get(`${apiUrl}/user/${userData.username}`);
        setUserData(getData.data);
        setLoading(false);
        navigate("/home");
      }
    } catch (err) {
      const error = err as AxiosError;
      if (!error.response) {
        console.error(error.message);
        setLoading(false);
        setError((prev) => {
          return { ...prev, network: true };
        });
        return;
      }
      if (error.response.status === 404) {
        console.error(error.response.data);
        setLoading(false);
        setError((prev) => {
          return { ...prev, user: true };
        });
        return;
      }
      console.error(error.response.data);
      setLoading(false);
      setError((prev) => {
        return { ...prev, password: true };
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-background" />
      <LoadingOverlay
        visible={loading}
        overlayBlur={3}
        overlayOpacity={0.05}
        loaderProps={{ color: "cyan" }}
      />
      <section className="login-section">
        <QuackleTitle />
        <LoginForm
          setPass={setPass}
          pass={pass}
          noUser={error.noUser}
          noPass={error.noPass}
        />
        <span>
          <Button onClick={() => login()} onKeyDown={onKeyDown} color="cyan">
            LOGIN
          </Button>
        </span>
        <br />
        {error.password && (
          <Notification
            color="red"
            icon={<PriorityHighIcon />}
            disallowClose
            sx={{ marginRight: "6%" }}
          >
            Incorrect Password
          </Notification>
        )}
        {error.network && (
          <Notification
            color="red"
            icon={<PriorityHighIcon />}
            disallowClose
            sx={{ marginRight: "7%" }}
          >
            Network Error
          </Notification>
        )}
        {error.user && (
          <Notification
            color="red"
            icon={<PriorityHighIcon />}
            disallowClose
            sx={{ marginRight: "7%" }}
          >
            User does not exist
          </Notification>
        )}
        <span className="login-signup">
          <Text size="md">New to Quackle?&nbsp;</Text>
          <Link to="/signup">
            <Button color="cyan">Sign Up</Button>
          </Link>
        </span>
        <QuackleFooter />
      </section>
    </div>
  );
};
