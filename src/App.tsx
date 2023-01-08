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
import { TrendingPage } from "./pages/trending-page/trending-page";
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
    setUserData({
      ...userData,
      [field]:
        field === "dateOfBirth"
          ? new Date(event.target.value)
          : event.target.value,
    });
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

  const deleteQuack = async (quackId: string) => {
    try {
      await axios.delete(
        `${apiUrl}/user/${userData.username}/quacks/${quackId}`,
      );
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
    } catch (error) {
      console.error(error, "Could not delete quack");
    }
  };

  const likeQuack = async (
    username: string,
    quackId: string,
    liked: boolean,
  ) => {
    console.log("initial", userData.likedQuacks);
    try {
      await axios.patch(`${apiUrl}/user/${username}/quacks/${quackId}`, {
        liked,
        likedUsername: userData.username,
      });
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      console.log("res", res.data.likedQuacks);
      console.log("user", userData);
      const newLikes = [...res.data.likedQuacks];
      setUserData((prev) => {
        return { ...prev, likedQuacks: newLikes };
      });
      console.log("after", userData.likedQuacks);
    } catch (error) {
      console.error(error, "Could not update quack status");
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
          deleteQuack,
          likeQuack,
        }}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={loggedIn ? <Navigate to="/home" /> : <LoginPage />}
              />
              <Route
                path="/signup"
                element={loggedIn ? <Navigate to="/home" /> : <SignUpPage />}
              />
              <Route
                path="/home"
                element={loggedIn ? <HomePage /> : <Navigate to="/" />}
              />
              <Route path="/profile/:userId/*" element={<ProfilePage />}>
                <Route path=":follow" element={<Outlet />} />
              </Route>
              <Route
                path="/settings"
                element={loggedIn ? <SettingsPage /> : <Navigate to="/" />}
              />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QuackleContext.Provider>
    </main>
  );
};

export default App;
