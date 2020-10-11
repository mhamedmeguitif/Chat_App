import React, { useState, useEffect } from "react";
import queryString from "query-string"; //Retriving Data fom Url
import io from "socket.io-client";
//Components
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
import "./Chat.css";

let socket;

export const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const ENDPOINT = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    setName(name);
    setRoom(room);
    socket = io(ENDPOINT); // pass end point to the server (ip addr & nbr port)
    socket.emit("join", { name, room }, () => {}); // handal event

    console.log(socket);
    return () => {
      socket.emit("disconnect"); // when user disconnect
      socket.off(); //delete soket
    };
  }, [ENDPOINT, location.search]);

  //handel Messages
  useEffect(() => {
    //lesen for messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);
  // Function For sending messages
  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };
  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        
      </div>
      <TextContainer users = {users}/>
    </div>
  );
};
export default Chat;
