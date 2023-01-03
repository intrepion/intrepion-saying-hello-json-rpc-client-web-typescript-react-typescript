import React from "react";

interface GreetingInterface {
  id: string;
  message: string;
  name: string;
}

const Greeting = (props: GreetingInterface) => {
  const { id, name, message } = props;

  return (
    <>
      {id}: {name}, {message}
    </>
  );
};

export default Greeting;
