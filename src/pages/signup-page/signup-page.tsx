import React, { useContext, useState } from "react";
import axios from "axios";
import { SignUpForm } from "../../components/signup-form/signup-form";
import { QuackleContext } from "../../context/user-context";
import { Button } from "@mantine/core";
import "./signup-page.css";

export const SignUpPage: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [confirmPass, setConfirmPass] = useState("");

  const handleConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setConfirmPass(event.target.value);
  };

  const signUp = async () => {
    if (confirmPass !== userData.password) {
      console.log("Password doesnt match");
      return;
    }
    if (!userData.email.includes("@")) {
      console.log("Invalid email");
      return;
    }
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
      .catch((e) => console.error(e.response.data.message));
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
        <h2>Quackle</h2>
        <h3>Join the avian world&apos;s largest social network</h3>
        <SignUpForm handleConfirm={handleConfirm} confirmPass={confirmPass} />
        <Button onClick={() => signUp()}>Sign up</Button>
        <h5>Existing user?</h5>
        <Button onClick={() => login()}>LOGIN</Button>
      </section>
    </div>
  );
};
