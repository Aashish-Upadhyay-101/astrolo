import axios from "../../axios/axios";
import { ReturnedData } from "./authSlice";

type EndPoint = string;

const REGISTER: EndPoint = "auth/register/";
const LOGIN: EndPoint = "auth/login/";

const login = async (userDetail: object): Promise<ReturnedData> => {
  const response = await axios.post(LOGIN, userDetail);
  localStorage.setItem("userToken", JSON.stringify(response.data));
  return response.data;
};

const signup = async (userDetail: object): Promise<ReturnedData> => {
  const response = await axios.post(REGISTER, userDetail);
  localStorage.setItem("userToken", JSON.stringify(response.data));
  return response.data;
};

const authService = { login, signup };

export default authService;
