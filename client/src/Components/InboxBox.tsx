import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface PropType {
  other_user: string;
  last_message: string;
  me: string;
}

const InboxBox = ({ last_message, other_user, me }: PropType) => {
  const [conversationName, setConversationName] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    const conversation = [other_user, me].sort();
    navigate(`/dashboard/chats/${conversation[0]}__${conversation[1]}`);
    setConversationName(conversation[0] + "__" + conversation[1]);
  };

  return (
    <div className="inbox-box" onClick={handleClick}>
      <img
        className="inbox-box-img"
        src="https://picsum.photos/300/300"
        alt="pp"
      />
      <div className="inbox-box__info">
        <p className="inbox-box__info-name">{other_user}</p>
        <p className="inbox-box__info-message">{last_message}</p>
      </div>
    </div>
  );
};

export default InboxBox;
