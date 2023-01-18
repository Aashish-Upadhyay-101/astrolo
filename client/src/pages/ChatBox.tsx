import React, { useEffect, useLayoutEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./ChatBox.css";
import InboxBox from "../Components/InboxBox";
import {
  PhoneOutlined,
  SendOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { getAccessToken } from "../helpers/localStorageHandler";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useGetConversationsQuery } from "../api/chatApi";
import { useGetMeQuery } from "../api/userApi";
import { MessageInterface } from "../api/types";

const ChatBox = () => {
  const userToken = useSelector<RootState>((state) => state.authState.token);
  const [message, setMessage] = useState("");

  const messageSendHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <div className="chats">
      <div className="chats__right-sidebar">
        <h1 className="text-3 chats__right-sidebar-heading">Chats</h1>
        <div className="chats__inbox">
          <InboxBox />
        </div>
      </div>
      <div className="chats__left">
        <div className="chats__left__message-box">
          <div className="message-box__header">
            <div className="message-box__header-left">
              <img
                className="message-box-img"
                src="https://picsum.photos/300/300"
                alt="pp"
              />
              <p className="inbox-box__info-name">Aashish Upadhyay</p>
            </div>
            <div className="message-box__header-right">
              <PhoneOutlined className="normal-icon primary-icon" />
              <VideoCameraOutlined className="normal-icon primary-icon" />
            </div>
          </div>
          <div className="message-box__message-area">
            {/* from here  */}
            <div className="message-sender">
              <img
                className="message-box-img"
                src="https://picsum.photos/300/300"
                alt="pp"
              />
              <p>Hello aashish how are you man !</p>
            </div>
            <div className="message-receiver">Hello world</div>

            {/* to here  */}
          </div>
          <form className="message-box__input" onSubmit={messageSendHandler}>
            <input
              type="text"
              placeholder="write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="message-send-btn">
              <SendOutlined className="normal-icon primary-icon" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
