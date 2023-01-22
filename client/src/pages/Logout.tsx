import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    disptach(logout());
    navigate("/");
  });

  return <></>;
};

export default Logout;
