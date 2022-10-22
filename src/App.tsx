import React from 'react';
import './App.css';
import { SignUpPage } from './pages/signup-page/signup-page';

const App: () => JSX.Element = () => {
  return (
    <div className="App">
      <SignUpPage />
    </div>
  );
};

export default App;
