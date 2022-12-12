import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosPrivate = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("refresh")}`,
  },
});

export default axiosInstance;
