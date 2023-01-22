import React from "react";
import { Link, useParams } from "react-router-dom";
import { HeartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import "./BookAppointmentBox.css";

const BookAppointmentBox = ({ price }: { price: number | 0 }) => {
  const { username } = useParams();
  return (
    <div className="bookappointmentbox">
      <iframe
        className="intro-video-iframe"
        width="100%"
        height="200"
        src="https://www.youtube.com/embed/eGE-tFalwpA"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
      <div className="bookappointmentbox-infowrapper">
        <h2 className="text-2">${price}</h2>
        <div className="bookappointmentbox-cta">
          <Link
            to={`/astrologer/${username}/book-an-appointment`}
            className="appointment-btn"
            type="primary"
          >
            <strong>Book Appoinment</strong>
          </Link>
          <Tooltip title="Add to favorites" color="var(--primary-color-1)">
            <HeartOutlined className="normal-icon cta-fav" />
          </Tooltip>
        </div>
        <div className="bookappointmentbox-offers">
          <p className="offers-heading">This appointment includes:</p>
          <ul className="offers-list">
            <li>📙 2 books</li>
            <li>⏰ 7 hours video content</li>
            <li>👩🏻‍🦯 1 to 1 guidence</li>
            <li>✨ daily furtunes</li>
            <li>💯 1 to 1 guidence</li>
            <li>🏠 daily furtunes</li>
          </ul>
        </div>
      </div>
      <h3 className="text-1 share">Share</h3>
    </div>
  );
};

export default BookAppointmentBox;
