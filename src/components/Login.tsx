import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:3000";

const Login = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const callLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoadingLogin(true);
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "login",
        params: { password, username },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result) {
          navigate("/");
        } else if (responseJson.error) {
          console.error(responseJson.error);
        }
        setLoadingLogin(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="username">
        Username:{" "}
        <input
          id="name"
          onChange={handleChangeUsername}
          type="text"
          value={username}
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
      <button disabled={loadingLogin} onClick={callLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
