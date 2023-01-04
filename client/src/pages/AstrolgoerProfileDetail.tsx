import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Rate } from "antd";
import {
  useGetAstrologerDetailsQuery,
  useGetAstrologerReviewsQuery,
} from "../api/userApi";
import Navbar from "../Components/Navbar";
import BookAppointmentBox from "../Components/BookAppointmentBox";
import "./AstrolgoerProfileDetail.css";
import Review from "../Components/Review";

const AstrolgoerProfileDetail = () => {
  const [showMore, setShowMore] = useState(false);

  const { username } = useParams();
  const navigate = useNavigate();

  const {
    data: profile,
    isError: profileIsError,
    error: profileError,
  } = useGetAstrologerDetailsQuery(username || "");

  const { data: reviews } = useGetAstrologerReviewsQuery(profile?.id || "");

  useEffect(() => {
    if (profileIsError) {
      console.log(profileError);
      navigate("/page-not-found");
    }

    console.log(reviews);
  }, [profileIsError, profileError, reviews]);

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
              <div
                className={`profile__detail-left-description ${
                  !showMore && "show-less"
                } `}
              >
                <p>{profile?.about_me}</p>
              </div>
              <div
                onClick={() => setShowMore(!showMore)}
                className="show-more-less"
              >
                {showMore ? <>Show less &uarr;</> : <>Show more &darr;</>}
              </div>
            </div>
            <h1 className="review__starting-heading">
              ⭐️ {profile?.rating} profile rating • {profile?.num_of_reviews}{" "}
              reviews
            </h1>

            <div className="reviews">
              {reviews?.map((review) => (
                <Review
                  key={review.id}
                  rater={review.rater}
                  rating={review.rating}
                  review_date={review.created_at}
                  review_comment={review.review_comment}
                />
              ))}
            </div>
          </div>
          <div className="profile__detail-right">
            <BookAppointmentBox price={profile?.price || 0} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AstrolgoerProfileDetail;
