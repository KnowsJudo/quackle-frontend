import React, { useState } from "react";
import Cookies from "js-cookie";
import { initialUserData, QuackleContext } from "./context/user-context";
import { SignUpPage } from "./pages/signup-page";
import { IUser } from "./types/user-types";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SettingsPage } from "./pages/settings-page/settings-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { ProfilePage } from "./pages/profile-page/profile-page";
import { LoginPage } from "./pages/login-page/login-page";
import { HomePage } from "./pages/home-page/home-page";
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

  return (
    <main className="App">
      <QuackleContext.Provider
        value={{
          userData,
          setUserData,
          setUserInfo,
          initiateQuack,
          setInitiateQuack,
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
                <Route path=":follow" />
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
