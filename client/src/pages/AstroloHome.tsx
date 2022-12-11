import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { requestAccessToken } from "../features/auth/authSlice";

export interface authInterface {
  accessToken: string;
  refreshToken: string;
  message: string;
  loading: boolean;
  success: boolean;
  error: boolean;
}

const AstroloHome: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(requestAccessToken(auth.refreshToken));
  };
  return (
    <h1 className="text-2">
      Hello User!
      <button onClick={handleClick}>Click me!</button>
    </h1>
  );
};

export default AstroloHome;