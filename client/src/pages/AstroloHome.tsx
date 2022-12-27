import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useGetAllAstrologersMutation } from "../api/userApi";
import { getAccessToken } from "../helpers/localStorageHandler";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const AstroloHome = () => {
  const [GetAllAstrolgoer] = useGetAllAstrologersMutation();
  const profiles = useSelector<RootState>((state) => state.userApi.mutations);

  useEffect(() => {
    GetAllAstrolgoer(getAccessToken());
    console.log(profiles);
  }, []);

  return (
    <>
      <Navbar />
      <p>List of astrologer profiles</p>
    </>
  );
};

export default AstroloHome;
