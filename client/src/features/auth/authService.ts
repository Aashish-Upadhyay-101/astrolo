import axios from "axios";

type EndPoint = string;

const REGISTER: EndPoint = "auth/register/";
const LOGIN: EndPoint = "auth/login/";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const login = async (userDetail: object): Promise<object> => {
  const response = await axios.post(LOGIN, userDetail, config);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const signup = async (userDetail: object): Promise<object> => {
  const response = await axios.post(REGISTER, userDetail, config);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const authService = { login, signup };

export default authService;
