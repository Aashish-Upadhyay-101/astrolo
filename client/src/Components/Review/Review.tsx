import React from "react";
import { Rate } from "antd";
import { AstrologerReviewProps } from "../types";
import "./Review.css";

const Review = ({ rater, rating, review_comment }: AstrologerReviewProps) => {
  return (
    <div className="review">
      <div className="review__header">
        <img
          className="review__header-image"
          src="https://random.imagecdn.app/500/500"
        />
        <div className="review__header-name">
          <h3 className="review__header-name-text">{rater}</h3>
          <span className="review__header-name-rating">
            <Rate count={5} defaultValue={rating} disabled />{" "}
            <span>3 days ago</span>
          </span>
        </div>
      </div>
      <div className="review__description">{review_comment}</div>
    </div>
  );
};

export default Review;
