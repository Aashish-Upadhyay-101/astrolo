import { axiosPrivate } from "../axios/axios";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";
import axios from "axios";

const useAxiosPrivate = () => {
  const auth = useSelector((state) => state.auth);
  const refresh = useRefreshToken({ refresh: Cookies.get("refresh") });

  useEffect(() => {
    // request interceptor
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // response interceptor
    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;