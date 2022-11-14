import React, { useState } from "react";
import { initialUserData, QuackleContext } from "./context/user-context";
import { SignUpPage } from "./pages/signup-page";
import { IUser } from "./types/user-types";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SettingsPage } from "./pages/settings-page/settings-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { ProfilePage } from "./pages/profile-page/profile-page";
import { LoginPage } from "./pages/login-page/login-page";
import "./App.css";

const App: () => JSX.Element = () => {
  const [userData, setUserData] = useState<IUser>(initialUserData);

  const setUserInfo = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    event.preventDefault();
    setUserData({ ...userData, [field]: event.target.value });
  };

  return (
    <main className="App">
      <QuackleContext.Provider value={{ userData, setUserData, setUserInfo }}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<SignUpPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/profile/:userId" element={<ProfilePage />}></Route>
              <Route path="/settings" element={<SettingsPage />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </QuackleContext.Provider>
    </main>
  );
};

export default App;
