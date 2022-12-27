import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Avatar, Dropdown, MenuProps, Badge, Tooltip } from "antd";
import { useGetMeMutation } from "../api/userApi";
import {
  BellOutlined,
  HeartOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./Navbar.css";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <a>Profile</a>,
  },
  {
    key: "2",
    label: <a>Settings</a>,
  },
  {
    key: "3",
    label: <a>Logout</a>,
  },
];

const Navbar: React.FC = () => {
  const token = useSelector<RootState>(
    (state) => state.authState.token?.access
  );

  const [] = useGetMeMutation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1 className="text-2">
          <Link to="/">
            Astrol<span className="text-color-primary">o</span>
          </Link>
        </h1>
      </div>

      {token !== "" && (
        <div className="navbar__search">
          <input
            className="navbar__search-input"
            placeholder="search astrologers"
          />
          <SearchOutlined className="normal-icon" />
        </div>
      )}

      <ul className="navbar__right text-1">
        {token === "" ? (
          <>
            <li className="navbar__right-link">
              <Link to="/login">Login</Link>
            </li>
            <li className="navbar__right-link">
              <Link to="/signup">Sign up</Link>
            </li>
          </>
        ) : (
          <>
            <Tooltip title="favorites" color="var(--primary-color-1)">
              <li className="navbar__right-link">
                <HeartOutlined className="normal-icon" />
              </li>
            </Tooltip>
            <li className="navbar__right-link">
              <Badge count={4}>
                <MessageOutlined className="normal-icon" />
              </Badge>
            </li>
            <li className="navbar__right-link">
              <Badge count={4}>
                <BellOutlined className="normal-icon" />
              </Badge>
            </li>
            <li className="navbar__right-link">
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Avatar size={36} className="avatar" shape="square">
                  AU
                </Avatar>
              </Dropdown>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
