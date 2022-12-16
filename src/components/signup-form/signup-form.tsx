import { Group, TextInput } from "@mantine/core";
import React, { useContext } from "react";
import { QuackleContext } from "../../context/user-context";
import { ISignUp } from "../../types/signup-types";
import "./signup-form.css";

export const SignUpForm: React.FC<ISignUp> = (props) => {
  const { userData, setUserInfo } = useContext(QuackleContext);

  return (
    <form className="signup-form">
      <TextInput
        label="Name"
        placeholder="Name"
        onChange={(e) => setUserInfo(e, "name")}
        value={userData.name}
        withAsterisk
        sx={{ "mantine-ittua2": { color: "white" } }}
      ></TextInput>
      <TextInput
        label="Username"
        placeholder="Username"
        onChange={(e) => setUserInfo(e, "username")}
        value={userData.username}
        withAsterisk
      ></TextInput>
      <Group>
        <TextInput
          label="Enter Password"
          autoComplete="off"
          type="password"
          placeholder="Minimum 7 characters"
          onChange={(e) => props.handleConfirm(e, "pass")}
          value={props.pass}
          withAsterisk
        ></TextInput>

        <TextInput
          label="Confirm Password"
          autoComplete="off"
          type="password"
          placeholder="Minimum 7 characters"
          onChange={(e) => props.handleConfirm(e, "confirm")}
          value={props.confirmPass}
          withAsterisk
        ></TextInput>
      </Group>
      <TextInput
        label="Date of birth"
        // type="date"
        placeholder="D.O.B."
        // onChange={(e) => setUserInfo(e, "dateOfBirth")}
        // value={new Date()}
        withAsterisk
      ></TextInput>
      <TextInput
        label="Email Address"
        type="email"
        placeholder="Email"
        onChange={(e) => setUserInfo(e, "email")}
        value={userData.email}
        withAsterisk
      ></TextInput>
    </form>
  );
};
