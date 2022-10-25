import React, { useContext } from "react";
import axios from "axios";
import { SignUpForm } from "../../components/signup-form/signup-form";
import { QuackleContext } from "../../context/user-context";
import { Button } from "@mantine/core";
import "./signup-page.css";

export const SignUpPage: React.FC = () => {
  const { userData } = useContext(QuackleContext);

  const signUp = async () => {
    await axios
      .post(
        "//localhost:3001/api/user",
        {
          name: userData.name,
          username: userData.username,
          password: userData.password,
          email: userData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => console.log(res.data, "users"))
      .catch((e) => console.error(e.response.data));
  };

  const login = () => {
    axios
      .get("//localhost:3001/api/user", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res.data, "users"))
      .catch((e) => console.error(e));
  };

  return (
    <div className="signup-container">
      <section className="signup-section">
        <h1>Quackle</h1>
        <h3>Join the avian world&apos;s largest social network</h3>
        <SignUpForm />
        <Button onClick={() => signUp()}>Sign up</Button>
        <h5>Existing user?</h5>
        <Button onClick={() => login()}>LOGIN</Button>
      </section>
    </div>
  );
};
