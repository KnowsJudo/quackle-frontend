import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../../components/signup-form/signup-form";
import { QuackleContext } from "../../context/user-context";
import { Button, LoadingOverlay, Text } from "@mantine/core";
import { apiUrl } from "../../helpers/api-url";
import { initialSignUpError } from "../../helpers/error-states";
import { QuackleTitle } from "../../components/quackle-title/quackle-title";
import "./signup-page.css";

export const SignUpPage: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(initialSignUpError);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!userData.email.includes("@")) {
      setError((prev) => {
        return { ...prev, noEmail: true };
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
