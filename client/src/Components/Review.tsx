import React from "react";
import "./Review.css";

const Review = () => {
  return (
    <div className="review">
      <div className="review__header">
        <img
          className="review__header-image"
          src="https://random.imagecdn.app/500/500"
        />
        <div className="review__header-name">
          <h3 className="review__header-name-text">Aashish Upadhyay</h3>
          <span className="review__header-name-rating">
            ⭐️⭐️⭐️⭐️⭐️ 3days ago
          </span>
        </div>
      </div>
      <div className="review__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        excepturi accusamus fuga odio? Vitae repudiandae voluptatum non labore
        sit unde? Lorem ipsum dolor sit amet.
      </div>
    </div>
  );
};

export default Review;
