import React, { useEffect, useState } from "react";
import Greeting from "./Greeting";
import { v4 } from "uuid";

const SERVER_URL = process.env.REACT_APP_SERVER_URL ?? "http://localhost:3000";

type GreetingType = {
  id: string;
  message: string;
  name: string;
};

const SayingHello: React.FC = () => {
  const [greetings, setGreetings] = useState<GreetingType[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("Hello, world!");

  useEffect(() => {
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "get_all_greetings",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.result) {
          const result = responseJson.result;
          setGreetings(result.greetings);
        } else if (responseJson.error) {
          console.error(responseJson.error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [message]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const callSayHello = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: v4(),
        jsonrpc: "2.0",
        method: "new_greeting",
        params: { name },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const result = responseJson.result;
        setMessage(result.message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Saying Hello</h2>
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={callSayHello}>Say Hello</button>
      <div>{message}</div>
      <p>Previous Greetings</p>
      <ul>
        {greetings.map((greeting) => (
          <li key={greeting.id}>
            <Greeting
              id={greeting.id}
              message={greeting.message}
              name={greeting.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SayingHello;
