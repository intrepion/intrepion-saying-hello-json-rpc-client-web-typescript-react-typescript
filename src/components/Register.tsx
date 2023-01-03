import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:3000";

const Register = () => {
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const callRegister = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoadingRegister(true);
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "register",
        params: { confirm, email, password, username },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result) {
          navigate("/Login");
        } else if (responseJson.error) {
          console.error(responseJson.error);
        }
        setLoadingRegister(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangeConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirm(event.target.value);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Register</h1>
      <label htmlFor="username">
        Username:{" "}
        <input
          id="username"
          onChange={handleChangeUsername}
          type="text"
          value={username}
        />
      </label>
      <label htmlFor="email">
        Email:{" "}
        <input
          id="email"
          onChange={handleChangeEmail}
          type="email"
          value={email}
        />
      </label>
      <label htmlFor="password">
        Password:{" "}
        <input
          id="password"
          onChange={handleChangePassword}
          type="password"
          value={password}
        />
      </label>
      <label htmlFor="confirm">
        Confirm:{" "}
        <input
          id="confirm"
          onChange={handleChangeConfirm}
          type="password"
          value={confirm}
        />
      </label>
      <button disabled={loadingRegister} onClick={callRegister}>
        Register
      </button>
    </div>
  );
};

export default Register;
