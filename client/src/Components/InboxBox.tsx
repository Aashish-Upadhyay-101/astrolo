import React from "react";

interface PropType {
  other_user: string;
  last_message: string;
}

const InboxBox = () => {
  return (
    <div className="inbox-box">
      <img
        className="inbox-box-img"
        src="https://picsum.photos/300/300"
        alt="pp"
      />
      <div className="inbox-box__info">
        <p className="inbox-box__info-name">Aashish101</p>
        <p className="inbox-box__info-message">whats up?</p>
      </div>
    </div>
  );
};

export default InboxBox;
