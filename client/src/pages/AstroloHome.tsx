import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export interface authInterface {
  accessToken: string;
  refreshToken: string;
  message: string;
  loading: boolean;
  success: boolean;
  error: boolean;
}

const AstroloHome: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const handleClick = async () => {
    console.log("clicked");
    // profile/me/

    const response = await axiosPrivate.get("profile/me/");
    console.log(response.data);
  };
  return (
    <h1 className="text-2">
      Hello User!
      <button onClick={handleClick}>Click me!</button>
    </h1>
  );
};

export default AstroloHome;
