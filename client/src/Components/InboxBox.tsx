import React from "react";

const InboxBox = () => {
  return (
    <div className="inbox-box">
      <img
        className="inbox-box-img"
        src="https://picsum.photos/300/300"
        alt="pp"
      />
      <div className="inbox-box__info">
        <p className="inbox-box__info-name">Aashish Upadhyay</p>
        <p className="inbox-box__info-message">Hello Test how are you?</p>
      </div>
    </div>
  );
};

export default InboxBox;
