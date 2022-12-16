import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../../components/signup-form/signup-form";
import { QuackleContext } from "../../context/user-context";
import { Button, Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { apiUrl } from "../../helpers/api-url";
import "./signup-page.css";

export const SignUpPage: React.FC = () => {
  const { userData } = useContext(QuackleContext);
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleConfirm = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    event.preventDefault();
    if (field === "confirm") setConfirmPass(event.target.value);
    if (field === "pass") setPass(event.target.value);
  };

  const signUp = async () => {
    if (!userData.name || !userData.username || !pass || !userData.email) {
      console.log("Fields missing");
      return;
    }
    if (confirmPass !== pass) {
      console.log("Password doesnt match");
      return;
    }
    if (!userData.email.includes("@")) {
      console.log("Invalid email");
      return;
    }
    try {
      await axios.post(`${apiUrl}/user`, {
        name: userData.name,
        username: userData.username,
        password: pass,
        email: userData.email,
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <section className="signup-section">
        <Text size="xl">Quackle</Text>
        <Text size="xl">
          Join the avian world&apos;s largest social network
        </Text>
        <SignUpForm
          handleConfirm={handleConfirm}
          confirmPass={confirmPass}
          pass={pass}
        />
        <Button onClick={() => signUp()}>Get Quackin!</Button>
        <h5>Existing user?</h5>
        <Link to="/login">
          <Button>LOGIN</Button>
        </Link>
      </section>
    </div>
  );
};
