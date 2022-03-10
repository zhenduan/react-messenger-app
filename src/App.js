import { Button, TextField } from "@material-ui/core";
import { useState, useEffect, useRef } from "react";
import Message from "./components/Message";
import firebase from "firebase/app";
import db from "./firebase.js";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import logo from "./appLogo.png";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("Guest");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
          }))
        );
      });

    // set username
    var promptInput = prompt("Input name");
    if (promptInput === null || promptInput === "") {
      setName("Guest");
    } else {
      setName(promptInput.toLocaleLowerCase());
    }
  }, []);
  useEffect(scrollToBottom, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      name: name,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1 align="center">Messenger App</h1>
      <h3 align="center">{`Hello ${capitalize(name)}`}</h3>
      <img src={logo} alt="Logo" className="logo" />
      <form
        noValidate
        autoComplete="off"
        onSubmit={sendMessage}
        className="app__input_container"
      >
        <TextField
          id="standard-basic"
          placeholder="Type..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyPress={(event) => {
            if (event.keyCode === "13") sendMessage();
          }}
          className="app__inputField"
        />
        <Button
          type="submit"
          className="app__sendBtn"
          disabled={!input.length > 0 || input.trim().length === 0}
        >
          <SendIcon />
        </Button>
      </form>
      <hr />
      <div className="app__messages_container">
        <FlipMove>
          {messages.map((message) => {
            // return <p>{message.message}</p>;
            return <Message message={message} name={name} key={message.id} />;
          })}
        </FlipMove>
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
}

export default App;
