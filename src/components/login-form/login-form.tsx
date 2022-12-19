import { TextInput } from "@mantine/core";
import React, { SetStateAction, useContext } from "react";
import { QuackleContext } from "../../context/user-context";

interface ILoginForm {
  setPass: React.Dispatch<SetStateAction<string>>;
  pass: string;
}

export const LoginForm: React.FC<ILoginForm> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);

  return (
    <form>
      <TextInput
        label="Username"
        placeholder="Username"
        onChange={(e) => setUserInfo(e, "username")}
        value={userData.username}
      />
      <TextInput
        label="Password"
        placeholder="Password"
        onChange={(e) => props.setPass(e.target.value)}
        type="password"
        value={props.pass}
      />
    </form>
  );
};
