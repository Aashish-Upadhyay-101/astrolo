import axios from "axios";

type EndPoint = string;

const REGISTER: EndPoint = "auth/register/";
const LOGIN: EndPoint = "auth/login";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const login = async (userDetail: any) => {
  const response = await axios.post(LOGIN, userDetail, config);
  localStorage.setItem("user", JSON.stringify(response.data));
  console.log(typeof response.data); // for testing
  return response.data;
};

const authService = { login };

export default authService;
