// import axios from "axios";
import axios from "../../axios/axios";
import { ReturnedData } from "./authSlice";

type EndPoint = string;

const REGISTER: EndPoint = "auth/register/";
const LOGIN: EndPoint = "auth/login/";
const ACCESSTOKENURL: EndPoint = "token/refresh/";

const login = async (userDetail: object): Promise<ReturnedData> => {
  const response = await axios.post(LOGIN, userDetail);
  localStorage.setItem("userToken", JSON.stringify(response.data));
  return response.data as ReturnedData;
};

const signup = async (userDetail: object): Promise<ReturnedData> => {
  const response = await axios.post(REGISTER, userDetail);
  localStorage.setItem("userToken", JSON.stringify(response.data));
  return response.data as ReturnedData;
};

const requestAccessToken = async (refresh: string): Promise<ReturnedData> => {
  const response = await axios.post(ACCESSTOKENURL, { refresh });
  const userToken = {
    accessToken: response.data.access,
    refreshToken: refresh,
  };
  localStorage.setItem("userToken", JSON.stringify(userToken));
  return response.data;
};

const authService = { login, signup, requestAccessToken };

export default authService;
