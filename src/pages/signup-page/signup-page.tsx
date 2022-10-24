import React, { useState } from "react";
import axios from "axios";
import { IUserDetails } from "../../types/user-types";
import "./signup-page.css";

export const SignUpPage: React.FC = () => {
  const [userDetails, setUserDetails] = useState<IUserDetails>({
    name: "",
    username: "",
    password: "",
    email: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    event.preventDefault();
    setUserDetails({ ...userDetails, [field]: event.target.value });
  };

  const signUp = () => {
    axios
      .post(
        "//localhost:3001/api/user",
        {
          name: userDetails.name,
          username: userDetails.username,
          password: userDetails.password,
          email: userDetails.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => console.log(res.data, "users"))
      .catch((e) => console.error(e));
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
        <form className="signup-form">
          <label>
            Name
            <input
              placeholder="Name"
              onChange={(e) => handleChange(e, "name")}
              value={userDetails.name}
            ></input>
          </label>
          <label>
            Username
            <input
              placeholder="Username"
              onChange={(e) => handleChange(e, "username")}
              value={userDetails.username}
            ></input>
          </label>
          <label>
            Password
            <input
              placeholder="Password (min. 7 characters)"
              onChange={(e) => handleChange(e, "password")}
              value={userDetails.password}
            ></input>
          </label>
          <label>
            Email
            <input
              placeholder="Email address"
              onChange={(e) => handleChange(e, "email")}
              value={userDetails.email}
            ></input>
          </label>
        </form>
        <button onClick={() => signUp()}>Sign up</button>
        <h5>Existing user?</h5>
        <button onClick={() => login()}>LOGIN</button>
      </section>
    </div>
  );
};
