import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { ISignUp } from "../../types/signup-types";

export const SignUpForm: React.FC<ISignUp> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);

  return (
    <form className="signup-form">
      <label>
        Name*
        <input
          placeholder="Name"
          autoComplete=""
          onChange={(e) => setUserInfo(e, "name")}
          value={userData.name}
        />
      </label>
      <label>
        Username*
        <input
          placeholder="Username"
          onChange={(e) => setUserInfo(e, "username")}
          value={userData.username}
        />
      </label>
      <label>
        Password*
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          onChange={(e) => props.handleConfirm(e, "pass")}
          value={props.pass}
        />
      </label>
      <label>
        Confirm Password*
        <input
          autoComplete="off"
          type="password"
          placeholder="Password"
          onChange={(e) => props.handleConfirm(e, "confirm")}
          value={props.confirmPass}
        />
      </label>
      <label>
        Email*
        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setUserInfo(e, "email")}
          value={userData.email}
        />
      </label>
    </form>
  );
};
