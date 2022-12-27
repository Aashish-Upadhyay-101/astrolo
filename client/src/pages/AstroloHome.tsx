import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { useGetAllAstrologersQuery } from "../api/userApi";
import { getAccessToken } from "../helpers/localStorageHandler";
import AstrologerItem from "../Components/AstrologerItem";
import "./AstroloHome.css";

const AstroloHome = () => {
  const { data, error, isError, isLoading, isSuccess } =
    useGetAllAstrologersQuery(getAccessToken());

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Navbar />
      {/* {data?.map((astrologer) => (
        <AstrologerItem key={astrologer.user.id} />
        ))} */}
      <div className="container">
        <div className="astrologer__container">
          <AstrologerItem
            profile_picture="https://random.imagecdn.app/500/500"
            city="Hetauda"
            country="Nepal"
            first_name="Aashish"
            last_name="Upadhyay"
            num_of_reviews={12}
            rating={3}
            price={19.99}
          />
        </div>
      </div>
    </>
  );
};

export default AstroloHome;
