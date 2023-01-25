import React, { useContext } from "react";
import { Alert, Group, Notification, TextInput } from "@mantine/core";
import { QuackleContext } from "../../context/user-context";
import { ISignUp } from "../../types/signup-types";
import { DatePicker } from "@mantine/dates";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import "./signup-form.css";

export const SignUpForm: React.FC<ISignUp> = (props) => {
  const { userData, setUserData, setUserInfo } = useContext(QuackleContext);

  const calcError = (field: string) => {
    if (field === "name" && props.error.noName) {
      return "Enter your name";
    }
    if (field === "name" && props.error.nameProfanity) {
      return "Real ducks dont use such words";
    }
    if (field === "name" && props.error.nameLength) {
      return "Maximum name length is 30 characters";
    }
    if (field === "username" && props.error.noUser) {
      return "Choose a username";
    }
    if (field === "username" && props.error.userLength) {
      return "Username must be at between 3 and 20 characters long";
    }
    if (field === "username" && props.error.userProfanity) {
      return "Real ducks dont use such words";
    }
    if (field === "password" && props.error.noPass) {
      return "Password must be at least 7 characters";
    }
    if (field === "password" && props.error.passLength) {
      return "Invalid Password";
    }
    if (field === "email" && props.error.noEmail) {
      return "Enter a valid email address";
    }
    if (field === "email" && props.error.emailLength) {
      return "Invalid Email";
    }
  };

  return (
    <form className="signup-form">
      <TextInput
        label="Name"
        placeholder="Name"
        onChange={(e) => setUserInfo(e, "name")}
        value={userData.name}
        withAsterisk
        error={calcError("name")}
      />
      <TextInput
        label="Username"
        placeholder="Username"
        onChange={(e) => setUserInfo(e, "username")}
        value={userData.username}
        withAsterisk
        error={calcError("username")}
      />
      <Group>
        <TextInput
          label="Enter Password"
          autoComplete="off"
          type="password"
          placeholder="Minimum 7 characters"
          onChange={(e) => props.handleConfirm(e, "pass")}
          value={props.pass}
          withAsterisk
          error={calcError("password")}
        />
        <TextInput
          label="Confirm Password"
          autoComplete="off"
          type="password"
          placeholder="Minimum 7 characters"
          onChange={(e) => props.handleConfirm(e, "confirm")}
          value={props.confirmPass}
          withAsterisk
          error={props.error.noMatch && "Must match password"}
        />
      </Group>
      <DatePicker
        label="Date of birth"
        onChange={(e) =>
          setUserData({
            ...userData,
            dateOfBirth: e,
          })
        }
        value={userData.dateOfBirth}
        withAsterisk
        error={props.error.noDoB && "Enter your date of birth"}
      />
      <TextInput
        label="Email Address"
        type="email"
        placeholder="Email"
        onChange={(e) => setUserInfo(e, "email")}
        value={userData.email}
        withAsterisk
        error={calcError("email")}
      />
      {props.error.usernameDup && (
        <Notification color="red" icon={<PriorityHighIcon />} disallowClose>
          Username is already registered.
        </Notification>
      )}
      {props.error.network && <Alert color="red">Network Error</Alert>}
    </form>
  );
};
