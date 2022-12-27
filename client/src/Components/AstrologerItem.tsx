import React from "react";
import "./AstrologerItem.css";
import { Button, Rate } from "antd";
import { AstrologerItemProps } from "./types";
import { Link } from "react-router-dom";

const AstrologerItem = ({
  profile_picture,
  first_name,
  last_name,
  rating,
  num_of_reviews,
  city,
  country,
  price,
}: AstrologerItemProps) => {
  return (
    <div className="astrologerItem">
      <div className="astrologerItem__upper">
        <img className="astrologerItem__upper-image" src={profile_picture} />
        <div>
          <p className="text-1 bold astrologerItem__upper-name">
            {first_name} {last_name}
          </p>
          <div className="rating-box">
            <Rate
              disabled
              defaultValue={rating}
              className="astrologerItem__upper-rate"
            />
            <span>({num_of_reviews})</span>
          </div>
        </div>
      </div>
      <div className="astrologerItem__lower">
        <p className="astrologerItem__lower-detail">
          {city}, {country}
        </p>
        <div className="astroloterItem__lower-detail-bottom">
          <p className="astrologerItem__lower-detail-bottom-fortunes">
            500 fortunes
          </p>
          <h2>${price}</h2>
        </div>
      </div>
    </div>
  );
};

export default AstrologerItem;
