import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../app/store";
import { setAccessToken } from "../features/auth/authSlice";

const useRefreshToken = (refreshToken: object) => {
  const dispatch = useDispatch<AppDispatch>();

  const refresh = async () => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      refreshToken
    );

    const accessToken = response.data.access;
    dispatch(setAccessToken({ accessToken }));
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
