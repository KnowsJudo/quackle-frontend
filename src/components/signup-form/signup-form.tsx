import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";

export const SignUpForm: React.FC = () => {
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
          placeholder="Password (min. 7 characters)"
          onChange={(e) => setUserInfo(e, "password")}
          value={userData.password}
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
