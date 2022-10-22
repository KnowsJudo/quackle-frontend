import React from 'react';
import axios from 'axios';
import './signup-page.css';

export const SignUpPage: React.FC = () => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
  };

  const signUp = () => {
    axios
      .post(
        '//localhost:3001/api/user',
        {
          name: 'Tom',
          username: 'BKHZ',
          password: 'tom123',
          email: 'tomfjohn@hotmail.com',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((res) => console.log(res.data, 'users'))
      .catch((e) => console.error(e));
  };

  const login = () => {
    axios
      .get('//localhost:3001/api/user', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => console.log(res.data, 'users'))
      .catch((e) => console.error(e));
  };

  return (
    <div className="signup-container">
      <section className="signup-section">
        <h1>Quackle</h1>
        <h3>Join the avian world&apos;s largest social network</h3>
        <input onChange={(e) => handleChange(e)}></input>
        <button onClick={() => signUp()}>Sign up</button>
        <h5>Existing user?</h5>
        <button onClick={() => login()}>LOGIN</button>
      </section>
    </div>
  );
};
