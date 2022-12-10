import axios from "axios";
import { ReturnedData } from "./authSlice";

type EndPoint = string;

const REGISTER: EndPoint = "auth/register/";
const LOGIN: EndPoint = "auth/login/";
const ACCESSTOKENURL: EndPoint = "token/refresh/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const login = async (userDetail: object): Promise<ReturnedData> => {
  const response = await axios.post(LOGIN, userDetail, config);
  localStorage.setItem("userToken", JSON.stringify(response.data));
  return response.data as ReturnedData;
};

const signup = async (userDetail: object): Promise<ReturnedData> => {
  const response = await axios.post(REGISTER, userDetail, config);
  localStorage.setItem("userToken", JSON.stringify(response.data));
  return response.data as ReturnedData;
};

const requestAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await axios.post(ACCESSTOKENURL, { refreshToken }, config);
  const userToken = {
    accessToken: response.data,
    refreshToken: refreshToken,
  };
  localStorage.setItem("userToken", JSON.stringify(userToken));
  return response.data;
};

const authService = { login, signup, requestAccessToken };

export default authService;
