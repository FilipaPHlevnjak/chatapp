import React, { useState, useRef } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Messages from "./components/Messages";
import Input from "./components/Input";
import randomName from "./components/User";
import randomColor from "./components/Color";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({
    username: randomName(),
    color: randomColor(),
  });

  const droneRef = useRef(
    new window.Scaledrone("BBrmvkskczuIbFRq", {
      data: user,
    })
  );

  const drone = droneRef.current;

  drone.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    setUser((prevUser) => ({ ...prevUser, id: drone.clientId }));
  });

  const room = drone.subscribe("observable-room");
  room.on("data", (data, member) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Math.random(), member, text: data },
    ]);
  });

  const sendMessage = (message) => {
    droneRef.current.publish({
      room: "observable-room",
      message,
    });
  };

  return (
    <div className="App">
      <div className="Header">
        <h1>Happy chatting... </h1>
      </div>
      <Messages messages={messages} currentUser={user} />
      <Input sendMessage={sendMessage} />
    </div>
  );
};

export default App;
