import React, { useEffect, useState } from "react";
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
import { NotificationsProvider } from "@mantine/notifications";
import { showNotification } from "@mantine/notifications";
import { GiPlasticDuck, GiNestBirds } from "react-icons/gi";
import { stdHeader } from "./helpers/api-header";
import DoneIcon from "@mui/icons-material/Done";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import "./App.css";

const App: () => JSX.Element = () => {
  const [userData, setUserData] = useState<IUser>(() => initialUserData());
  const [initiateQuack, setInitiateQuack] = useState<boolean>(false);
  const [reqLoad, setReqLoad] = useState<boolean>(false);
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

  useEffect(() => {
    sessionStorage.setItem("User Context", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    //Check username against cookie to make sure user is still logged in
    if (userData.username) {
      return;
    }
    loggedIn && Cookies.remove("jwtToken");
  }, [userData.username]);

  const followUser = async (
    followingData: IFollowingData,
    followerData: IFollowerData,
  ) => {
    if (!loggedIn) {
      return;
    }
    const { username, followingUsername } = followingData;
    setReqLoad(true);
    try {
      await axios.post(
        `${apiUrl}/user/${username}/following`,
        followingData,
        stdHeader(),
      );
      await axios.post(
        `${apiUrl}/user/${followingUsername}/followers`,
        {
          username: followingUsername,
          ...followerData,
        },
        { ...stdHeader(), maxContentLength: 3000000 },
      );
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setReqLoad(false);
      showNotification({
        title: `Followed ${followingUsername}!`,
        message: "Your pond is expanding. QUACK!",
        icon: <GiPlasticDuck />,
        color: "cyan",
        styles: () => ({
          root: { backgroundColor: "#282c34", borderColor: "#282c34" },
          title: { color: "white" },
          closeButton: {
            color: "white",
          },
        }),
      });
    } catch (error) {
      setReqLoad(false);
      showNotification({
        message: `Failed to follow ${followingUsername}. Try logging in again.`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(error);
    }
  };

  const unFollowUser = async (followingUser: string) => {
    if (!loggedIn) {
      return;
    }
    setReqLoad(true);
    try {
      await axios.delete(
        `${apiUrl}/user/${userData.username}/following/${followingUser}`,
      );
      await axios.delete(
        `${apiUrl}/user/${followingUser}/followers/${userData.username}`,
      );
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setReqLoad(false);
      showNotification({
        title: `Un-followed ${followingUser}`,
        message: "Removed from your pecking order",
        icon: <GiNestBirds />,
        color: "cyan",
        styles: () => ({
          root: { backgroundColor: "#282c34", borderColor: "#282c34" },
          title: { color: "white" },
          closeButton: {
            color: "white",
          },
        }),
      });
    } catch (error) {
      setReqLoad(false);
      showNotification({
        message: `Failed to Un-follow ${followingUser}. Try logging in again.`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(error, "Could not unfollow user");
    }
  };

  const deleteQuack = async (quackId: string) => {
    setReqLoad(true);
    try {
      await axios.delete(
        `${apiUrl}/user/${userData.username}/quacks/${quackId}`,
      );
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setReqLoad(false);
      showNotification({
        message: `Quack deleted`,
        icon: <DoneIcon />,
        color: "cyan",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
    } catch (error) {
      setReqLoad(false);
      showNotification({
        message: `Failed to delete Quack. Try logging in again.`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(error, "Could not delete quack");
    }
  };

  const likeQuack = async (
    username: string,
    quackId: string,
    likesUsers: string[],
  ) => {
    if (!loggedIn) {
      return;
    }
    const liked = !likesUsers.includes(userData.username);
    setReqLoad(true);
    try {
      await axios.patch(
        `${apiUrl}/user/${username}/quacks/${quackId}`,
        {
          liked,
          likedUsername: userData.username,
        },
        stdHeader(),
      );
      const res = await axios.get(`${apiUrl}/user/${userData.username}`);
      setUserData(res.data);
      setReqLoad(false);
      showNotification({
        title: `Quack ${!liked ? "un-" : ""}liked!`,
        message: liked
          ? "It can be viewed under your profile likes"
          : "Removed from your profile likes",
        icon: liked ? <FavoriteIcon /> : <HeartBrokenIcon />,
        color: "cyan",
        styles: () => ({
          root: { backgroundColor: "#282c34", borderColor: "#282c34" },
          title: { color: "white" },
          closeButton: {
            color: "white",
          },
        }),
      });
    } catch (error) {
      setReqLoad(false);
      showNotification({
        message: `Failed to ${
          !liked ? "un-" : ""
        }like Quack. Try logging in again.`,
        icon: <PriorityHighIcon />,
        color: "red",
        styles: () => ({
          root: {
            borderColor: "#282c34",
          },
        }),
      });
      console.error(error, "Could not update quack status");
    }
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="bottom-center">
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
              loggedIn,
              reqLoad,
            }}
          >
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={
                    loggedIn ? <Navigate to="/home" /> : <TrendingPage />
                  }
                />
                <Route
                  path="/login"
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
                  <Route
                    path=":follow"
                    element={loggedIn ? <Outlet /> : <Navigate to="/" />}
                  />
                </Route>
                <Route
                  path="/settings"
                  element={loggedIn ? <SettingsPage /> : <Navigate to="/" />}
                />
                <Route path="/trending" element={<TrendingPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </BrowserRouter>
          </QuackleContext.Provider>
        </main>
      </NotificationsProvider>
    </MantineProvider>
  );
};

export default App;
