import "../Message.css";
import React, { forwardRef } from "react";

const Message = forwardRef(({ message, name }, ref) => {
  const isUser = name === message.name;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      {!isUser && <div className="user_name">{capitalize(message.name)}</div>}

      <div className="message_body"> {message.message}</div>
    </div>
  );
});

export default Message;
