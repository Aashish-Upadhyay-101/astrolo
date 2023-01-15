import React, { useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import "./ChatBox.css";
import InboxBox from "../Components/InboxBox";
import {
  PhoneOutlined,
  SendOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState<any>([]);
  const { readyState, sendJsonMessage } = useWebSocket("ws://127.0.0.1:8000/", {
    onOpen: () => {
      console.log("Connected");
    },
    onClose: () => {
      console.log("Disconnected");
    },
    onMessage: (e: MessageEvent<any>) => {
      const data = JSON.parse(e.data);
      switch (data.type) {
        case "chat_message_echo":
          setMessageHistory((prev: any) => prev.concat(data));
          break;
        default:
          console.log("Not valid type!");
          break;
      }
    },
  });

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const messageSendHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendJsonMessage({
      type: "chat_message",
      name: "aashish-test",
      message: message,
    });
    messageHistory.map((message: any) => console.log(message.message));

    setMessage("");
  };

  return (
    <div className="chats">
      <div className="chats__right-sidebar">
        <h1 className="text-3 chats__right-sidebar-heading">Chats</h1>
        <div className="chats__inbox">
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
          <InboxBox />
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
            {messageHistory.map((message: any, index: number) => {
              <div className="message-receiver">{message.message}</div>;
            })}
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
