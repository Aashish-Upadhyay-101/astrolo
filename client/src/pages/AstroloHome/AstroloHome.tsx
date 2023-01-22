import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useGetAllAstrologersQuery } from "../../api/userApi";
import { getAccessToken } from "../../utils/localStorageHandler";
import AstrologerItem from "../../components/AstrologerItem/AstrologerItem";
import "./AstroloHome.css";

const AstroloHome = () => {
  const { data } = useGetAllAstrologersQuery(getAccessToken());

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="astrologer__container">
          {data?.map((astrologer) => (
            <AstrologerItem
              key={astrologer.user.id}
              username={astrologer.user.username}
              profile_picture="https://random.imagecdn.app/500/500"
              city={astrologer.city}
              country={astrologer.country}
              first_name={astrologer.user.first_name}
              last_name={astrologer.user.last_name}
              num_of_reviews={astrologer.num_of_reviews || 0}
              rating={astrologer.rating || 0}
              price={astrologer.price}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AstroloHome;
