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
          type="password"
          placeholder="Password"
          onChange={(e) => setUserInfo(e, "password")}
          value={userData.password}
        />
      </label>
      <label>
        Confirm Password*
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => props.handleConfirm(e)}
          value={props.confirmPass}
        />
      </label>
      <label>
        Email*
        <input
          placeholder="Email address"
          onChange={(e) => setUserInfo(e, "email")}
          value={userData.email}
        />
      </label>
    </form>
  );
};
