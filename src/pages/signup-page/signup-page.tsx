import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../../components/signup-form/signup-form";
import { QuackleContext } from "../../context/user-context";
import { Button, LoadingOverlay, Text } from "@mantine/core";
import { apiUrl } from "../../helpers/api-url";
import { initialSignUpError } from "../../helpers/error-states";
import { QuackleTitle } from "../../components/quackle-title/quackle-title";
import { ISignUpError } from "../../types/errors";
import { Filter } from "profanity-check";
import { emailRegex, regex } from "../../helpers/regex";
import "./signup-page.css";

export const SignUpPage: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [pass, setPass] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [error, setError] = useState<ISignUpError>(initialSignUpError);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const defaultFilter = new Filter();

  useEffect(() => {
    setError(initialSignUpError);
  }, [userData, pass, confirmPass]);

  const handleConfirm = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setError(initialSignUpError);
    event.preventDefault();
    if (field === "confirm") setConfirmPass(event.target.value);
    if (field === "pass") setPass(event.target.value);
  };

  const signUp = async () => {
    setError(initialSignUpError);
    if (!userData.name) {
      setError((prev) => {
        return { ...prev, noName: true };
      });
      return;
    }
    if (defaultFilter.isProfane(userData.name) || regex.test(userData.name)) {
      setError((prev) => {
        return { ...prev, nameProfanity: true };
      });
      return;
    }
    if (userData.name.length > 25) {
      setError((prev) => {
        return { ...prev, nameLength: true };
      });
      return;
    }
    if (!userData.username) {
      setError((prev) => {
        return { ...prev, noUser: true };
      });
      return;
    }
    if (userData.username.length < 3 || userData.username.length > 20) {
      setError((prev) => {
        return { ...prev, userLength: true };
      });
      return;
    }
    if (
      defaultFilter.isProfane(userData.username) ||
      regex.test(userData.username)
    ) {
      setError((prev) => {
        return { ...prev, userProfanity: true };
      });
      return;
    }
    if (pass.length < 7) {
      setError((prev) => {
        return { ...prev, noPass: true };
      });
      return;
    }
    if (pass.length > 100) {
      setError((prev) => {
        return { ...prev, passLength: true };
      });
      return;
    }
    if (confirmPass !== pass) {
      setError((prev) => {
        return { ...prev, noMatch: true };
      });
      return;
    }
    if (!userData.dateOfBirth) {
      setError((prev) => {
        return { ...prev, noDoB: true };
      });
      return;
    }
    if (!emailRegex.test(userData.email)) {
      setError((prev) => {
        return { ...prev, noEmail: true };
      });
      return;
    }
    if (userData.email.length > 100) {
      setError((prev) => {
        return { ...prev, emailLength: true };
      });
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/user`, {
        name: userData.name,
        username: userData.username,
        password: pass,
        email: userData.email,
        dateOfBirth: userData.dateOfBirth,
      });
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      const error = err as AxiosError;
      console.error(error);
      if (!error.response) {
        setError((prev) => {
          return { ...prev, network: true };
        });
      } else {
        setError((prev) => {
          return { ...prev, usernameDup: true };
        });
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-background" />
      <section className="signup-section">
        <LoadingOverlay
          visible={loading}
          overlayBlur={3}
          overlayOpacity={0.05}
          loaderProps={{ color: "cyan" }}
        />
        <QuackleTitle />
        <Text size="md">
          Join the avian world&apos;s largest social network
        </Text>
        <SignUpForm
          handleConfirm={handleConfirm}
          confirmPass={confirmPass}
          pass={pass}
          error={error}
        />
        <span>
          <Button onClick={() => signUp()} color="cyan">
            Get Quackin!
          </Button>
        </span>
      </section>
    </div>
  );
};
