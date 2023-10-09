import React from "react";

const Messages = ({ messages, currentUser }) => {
  const renderMessage = (message) => {
    const { id, member, text } = message;
    const messageFromMe = member && member.id === currentUser.id;
    const className = messageFromMe ? "Messages currentUser" : "Messages";

    return (
      <li key={id} className={className}>
        <span
          className="icon"
          style={{ backgroundColor: member.clientData.color }}
        />
        <div className="Message-content">
          <div className="username">{member.clientData.username}</div>
          <div className="text">{text}</div>
        </div>
      </li>
    );
  };

  return (
    <ul className="Messages-list">{messages.map((m) => renderMessage(m))}</ul>
  );
};

export default Messages;
