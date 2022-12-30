import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image } from "antd";
import { useGetAstrologerDetailsQuery } from "../api/userApi";
import Navbar from "../Components/Navbar";
import BookAppointmentBox from "../Components/BookAppointmentBox";
import "./AstrolgoerProfileDetail.css";

const AstrolgoerProfileDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const {
    data: profile,
    isError,
    error,
  } = useGetAstrologerDetailsQuery(username || "");

  useEffect(() => {
    if (isError) {
      console.log(error);
      navigate("/page-not-found");
    }
  }, [isError, error]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="profile__detail">
          <div className="profile__detail-left">
            <h4 className="text-2">Astrologer</h4>
            <div className="profile__detail-left-info">
              <h5 className="profile__detail-left-info-username">
                {profile?.user.first_name} {profile?.user.last_name} | Certified
                Astrologer | NASA
              </h5>
              <p className="profile__info-short-description">
                Professional Astrologer | Professor @Harvard
              </p>
              <div className="profile__info-main">
                <Image
                  className="profile__info-main-image"
                  width="12rem"
                  src="https://random.imagecdn.app/500/500"
                />
                <div className="profile__info-main-description">
                  <p>⭐️ {profile?.rating} Astrolo Rating</p>
                  <p>✨ city: {profile?.city}</p>
                  <p>🔝 country: {profile?.country}</p>
                  <p>👍 total reviews: {profile?.num_of_reviews}</p>
                </div>
              </div>
              <div className="profile__detail-left-description">
                <p>{profile?.about_me}</p>
              </div>
            </div>
            <h1>
              ⭐️ {profile?.rating} profile rating • {profile?.num_of_reviews}{" "}
              reviews
            </h1>
          </div>
          <div className="profile__detail-right">
            <BookAppointmentBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default AstrolgoerProfileDetail;
