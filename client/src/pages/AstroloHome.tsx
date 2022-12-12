import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";

export interface authInterface {
  accessToken: string;
  refreshToken: string;
  message: string;
  loading: boolean;
  success: boolean;
  error: boolean;
}

const AstroloHome: React.FC = () => {
  const handleClick = async () => {
    console.log("clicked");
  };
  return (
    <h1 className="text-2">
      Hello User!
      <button onClick={handleClick}>Click me!</button>
    </h1>
  );
};

export default AstroloHome;
