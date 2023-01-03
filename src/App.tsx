import React from "react";
import { Link } from "react-router-dom";
import Main from "./Main";

function App() {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/Logout">Logout</Link>
          </li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
        </ul>
        <hr />
        <Main />
      </div>
    </>
  );
}

export default App;
