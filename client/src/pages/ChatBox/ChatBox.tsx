import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PhoneOutlined,
  SendOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import InboxBox from "../../components/InboxBox";
import { RootState } from "../../app/store";
import { useGetConversationsQuery } from "../../api/chatApi";
import { useGetMeQuery } from "../../api/userApi";
import { MessageInterface } from "../../api/types";
import { getAccessToken } from "../../utils/localStorageHandler";
import "./ChatBox.css";

const ChatBox = () => {
  const userToken = useSelector<RootState>((state) => state.authState.token);
  const [otherUser, setOtherUser] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([
    {} as MessageInterface,
  ]);
  const { data: getConversationData } = useGetConversationsQuery();
  const { data: getMeData } = useGetMeQuery();
  const params = useParams();

  // web socket
  const { readyState, sendJsonMessage } = useWebSocket(
    userToken ? `ws://127.0.0.1:8000/${params.conversationName}/` : null,
    {
      queryParams: {
        token: getAccessToken() ? getAccessToken() : "",
      },
      onOpen: () => {
        console.log("connected!");
      },
      onClose: () => {
        console.log("disconnected");
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        switch (data.type) {
          case "chat_message_echo":
            setMessageHistory((prev: any) => [...prev, data.message]);
            break;
          case "last_50_messages":
            setMessageHistory(data.messages);
            break;
          default:
            console.log("Invalid type");
            break;
        }
      },
    }
  );

  const messageSendHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sendJsonMessage({
      type: "chat_message",
      message,
      name: params.conversationName,
    });
    setMessage("");
  };

  return (
    <div className="chats">
      <div className="chats__right-sidebar">
        <h1 className="text-3 chats__right-sidebar-heading">Chats</h1>
        <div className="chats__inbox">
          {getConversationData?.map((conversation) => {
            if (conversation?.other_user?.user.username.length > 1) {
              return (
                <InboxBox
                  last_message={conversation?.last_message?.content}
                  other_user={conversation?.other_user?.user?.username}
                  me={getMeData?.user?.username || ""}
                  setOtherUser={setOtherUser}
                />
              );
            }
          })}
        </div>
      </div>
      {params.conversationName != "test" ? (
        <div className="chats__left">
          <div className="chats__left__message-box">
            <div className="message-box__header">
              <div className="message-box__header-left">
                <img
                  className="message-box-img"
                  src="https://picsum.photos/300/300"
                  alt="pp"
                />
                <p className="inbox-box__info-name">{otherUser}</p>
              </div>
              <div className="message-box__header-right">
                <PhoneOutlined className="normal-icon primary-icon" />
                <VideoCameraOutlined className="normal-icon primary-icon" />
              </div>
            </div>
            <div className="message-box__message-area">
              {/* from here  */}
              {messageHistory.map((message) => (
                <>
                  {message?.from_user?.user.username ==
                  getMeData?.user.username ? (
                    <div className="message-receiver">{message?.content}</div>
                  ) : (
                    <div className="message-sender">
                      <img
                        className="message-box-img"
                        src="https://picsum.photos/300/300"
                        alt="pp"
                      />
                      <p>{message?.content}</p>
                    </div>
                  )}
                </>
              ))}
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
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatBox;
