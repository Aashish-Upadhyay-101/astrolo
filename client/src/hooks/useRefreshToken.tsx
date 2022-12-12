import React from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AppDispatch, RootState } from "../app/store";
import { setAccessToken } from "../features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch<AppDispatch>();
  const refreshToken = useSelector<RootState>(
    (state) => state.auth.refreshToken
  );

  const refresh = async () => {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      {
        refresh: refreshToken,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const accessToken = response.data.access;
    dispatch(setAccessToken({ accessToken }));
    return accessToken;
  };

  return refresh;
};

export default useRefreshToken;
