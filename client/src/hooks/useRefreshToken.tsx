import React from "react";
import Cookies from "universal-cookie";
import axios from "../axios/axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { requestAccessToken } from "../features/auth/authSlice";

const cookies = new Cookies();

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const refreshToken = cookies.get("refresh");

  const refresh = async () => {
    dispatch(requestAccessToken(refreshToken));
  };

  return refresh;
};

export default useRefreshToken;
