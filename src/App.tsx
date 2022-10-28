import React, { useState } from "react";
import { initialUserData, QuackleContext } from "./context/user-context";
import { SignUpPage } from "./pages/signup-page";
import { IUser } from "./types/user-types";
import { MantineProvider } from "@mantine/core";
import { HashRouter, Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/profile-page/profile-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
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
      <QuackleContext.Provider value={{ userData, setUserInfo }}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <HashRouter>
            <Routes>
              <Route path="/" element={<SignUpPage />}></Route>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="*" element={<NotFoundPage />}></Route>
            </Routes>
          </HashRouter>
        </MantineProvider>
      </QuackleContext.Provider>
    </main>
  );
};

export default App;
