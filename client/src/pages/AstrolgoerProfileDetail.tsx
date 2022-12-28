import React from "react";
import "./AstrolgoerProfileDetail.css";
import Navbar from "../Components/Navbar";

const AstrolgoerProfileDetail = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="profile__detail">
          <div className="profile__detail-left">
            <h4 className="text-2">Astrologer</h4>
            <div className="profile__detail-left-info">
              <h5 className="profile__detail-left-info-username">
                Aashish Upadhyay | Certified Astrologer | NASA
              </h5>
              <p className="profile__info-short-description">
                Professional Astrologer | Professor @Harvard
              </p>
              <div className="profile__info-main">
                <img
                  className="profile__info-main-image"
                  src="https://random.imagecdn.app/500/500"
                />
                <div className="profile__info-main-description">
                  <p>⭐️ 4.7 Astrolo Rating</p>
                  <p>⭐️ 4.7 Astrolo Rating</p>
                  <p>⭐️ 4.7 Astrolo Rating</p>
                  <p>⭐️ 4.7 Astrolo Rating</p>
                </div>
              </div>
              <div className="profile__detail-left-description">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
                  consequatur sit quod eos dignissimos repellat sequi deleniti,
                  minima, esse repellendus sint at sunt. Odit, quia beatae
                  architecto quos modi harum. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Quasi saepe rerum repellat
                  possimus facere tenetur
                  <br />
                  incidunt laudantium veniam perferendis odio! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Mollitia totam in
                  recusandae neque distinctio porro, Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Ad, ut!
                  <br /> necessitatibus provident exercitationem natus debitis,
                  nobis, eius libero assumenda perferendis? Ab ad reiciendis
                  recusandae nesciunt. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Animi, dolore.
                </p>
              </div>
            </div>
          </div>
          <div className="profile__detail-right">
            <h2>right</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default AstrolgoerProfileDetail;
