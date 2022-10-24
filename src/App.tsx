import React, { useState } from "react";
import { initialUserData, QuackleContext } from "./context/user-context";
import { SignUpPage } from "./pages/signup-page/signup-page";
import { IUser } from "./types/user-types";
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
    <QuackleContext.Provider value={{ userData, setUserInfo }}>
      <main className="App">
        <SignUpPage />
      </main>
    </QuackleContext.Provider>
  );
};

export default App;
