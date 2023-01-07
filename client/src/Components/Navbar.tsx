import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Avatar, Dropdown, MenuProps, Badge, Tooltip, Input } from "antd";
import { useGetMeQuery } from "../api/userApi";
import {
  BellOutlined,
  HeartOutlined,
  MessageOutlined,
  SearchOutlined,
  SnippetsOutlined,
  UserOutlined,
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
        <Input
          className="navbar__search"
          suffix={
            <SearchOutlined className="site-form-item-icon normal-icon" />
          }
          placeholder="Search Astrologers"
        />
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
            <Tooltip title="dashboard" color="var(--primary-color-1)">
              <a href="/dashboard" className="navbar__right-link">
                <SnippetsOutlined className="normal-icon" />
              </a>
            </Tooltip>
            <li className="navbar__right-link">
              <Badge count={4} size="small">
                <MessageOutlined className="normal-icon" />
              </Badge>
            </li>
            <li className="navbar__right-link">
              <Badge count={4} size="small">
                <BellOutlined className="normal-icon" />
              </Badge>
            </li>
            <li className="navbar__right-link">
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <Avatar size={32} className="avatar" shape="square">
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
