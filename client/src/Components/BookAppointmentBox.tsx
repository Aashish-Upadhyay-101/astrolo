import { HeartOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import "./BookAppointmentBox.css";
import React from "react";

const BookAppointmentBox = () => {
  return (
    <div className="bookappointmentbox">
      <iframe
        className="intro-video-iframe"
        width="100%"
        height="200"
        src="https://www.youtube.com/embed/eGE-tFalwpA"
        title="YouTube video player"
        //   frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //   allowfullscreen
      ></iframe>
      <div className="bookappointmentbox-infowrapper">
        <h2 className="text-2">$12.55</h2>
        <div className="bookappointmentbox-cta">
          <Button size="large" className="btn-primary" type="primary">
            <strong>Book an Appoinment</strong>
          </Button>

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
