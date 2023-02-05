import React, { useContext, useRef, SetStateAction } from "react";
import { Button, TextInput } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import "./login-form.css";

interface ILoginForm {
  setPass: React.Dispatch<SetStateAction<string>>;
  pass: string;
  noUser: boolean;
  noPass: boolean;
  login: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export const LoginForm: React.FC<ILoginForm> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);
  const buttonRef = useRef(null);

  const handlePass = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setPass(event.target.value);
  };

  return (
    <form className="login-form">
      <TextInput
        label="Username"
        placeholder="Username"
        onChange={(e) => setUserInfo(e, "username")}
        value={userData.username}
        error={props.noUser && "Enter username"}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        autoComplete="off"
        onChange={(e) => handlePass(e)}
        type="password"
        value={props.pass}
        style={{ marginBottom: "15px" }}
        error={props.noPass && "Enter password"}
      />
      <Button
        autoFocus
        ref={buttonRef}
        onClick={() => props.login()}
        onKeyDown={props.onKeyDown}
        color="cyan"
      >
        LOGIN
      </Button>
    </form>
  );
};
