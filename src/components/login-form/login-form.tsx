import React, { SetStateAction, useContext, useRef } from "react";
import { Button, TextInput } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import "./login-form.css";

interface ILoginForm {
  setPass: React.Dispatch<SetStateAction<string>>;
  pass: string;
  noUser: boolean;
  noPass: boolean;
  login: () => void;
}

export const LoginForm: React.FC<ILoginForm> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 0 && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      props.login();
    }
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
        onBlur={(e) => handleBlur(e)}
        onChange={(e) => props.setPass(e.target.value)}
        type="password"
        value={props.pass}
        style={{ marginBottom: "15px" }}
        error={props.noPass && "Enter password"}
      />
      <Button
        ref={buttonRef}
        onClick={() => props.login()}
        onKeyDown={onKeyDown}
        color="cyan"
      >
        LOGIN
      </Button>
    </form>
  );
};
