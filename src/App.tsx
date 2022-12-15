import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { initialUserData, QuackleContext } from "./context/user-context";
import { SignUpPage } from "./pages/signup-page";
import { IUser } from "./types/user-types";
import { MantineProvider } from "@mantine/core";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { SettingsPage } from "./pages/settings-page/settings-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { ProfilePage } from "./pages/profile-page/profile-page";
import { LoginPage } from "./pages/login-page/login-page";
import { HomePage } from "./pages/home-page/home-page";
import { IFollowerData, IFollowingData } from "./types/follow-types";
import { apiUrl } from "./helpers/api-url";
import "./App.css";

const App: () => JSX.Element = () => {
  const [userData, setUserData] = useState<IUser>(initialUserData);
  const [initiateQuack, setInitiateQuack] = useState<boolean>(false);
  const loggedIn = Cookies.get("jwtToken");

  const setUserInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    event.preventDefault();
    setUserData({ ...userData, [field]: event.target.value });
  };

  const followUser = async (
    followingData: IFollowingData,
    followerData: IFollowerData,
  ) => {
    const { username, followingUsername } = followingData;
    try {
      await axios.post(`${apiUrl}/user/${username}/following`, followingData);
      await axios.post(
        `${apiUrl}/user/${followingUsername}/followers`,
        {
          username: followingUsername,
          ...followerData,
        },
        {
          maxContentLength: 10485760,
        },
      );
      console.log("Followed user!");
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const unFollowUser = async (followingUser: string) => {
    try {
      await axios.delete(
        `${apiUrl}/user/${userData.username}/following/${followingUser}`,
      );
      await axios.delete(
        `${apiUrl}/user/${followingUser}/followers/${userData.username}`,
      );
      console.log("UnFollowed user!");
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
    } catch (error) {
      console.error(error, "Could not unfollow user");
    }
  };

  return (
    <main className="App">
      <QuackleContext.Provider
        value={{
          userData,
          setUserData,
          setUserInfo,
          initiateQuack,
          setInitiateQuack,
          followUser,
          unFollowUser,
        }}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={loggedIn ? <Navigate to="/home" /> : <SignUpPage />}
              ></Route>
              <Route
                path="/login"
                element={loggedIn ? <Navigate to="/home" /> : <LoginPage />}
              ></Route>
              <Route
                path="/home"
                element={loggedIn ? <HomePage /> : <Navigate to="/" />}
              ></Route>
              <Route path="/profile/:userId/*" element={<ProfilePage />}>
                <Route path=":follow" element={<Outlet />} />
              </Route>
              <Route
                path="/settings"
                element={loggedIn ? <SettingsPage /> : <Navigate to="/login" />}
              ></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QuackleContext.Provider>
    </main>
  );
};

export default App;
