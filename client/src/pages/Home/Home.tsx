import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <section className="section-hero">
        <div className="hero">
          <div className="hero__header">
            <h1 className="text-4">
              <span className="text-color-primary">Astrology</span> is just a
              finger pointing at reality.
            </h1>
          </div>
          <div className="hero__header-description">
            Find Astrologers near your place, book an appointment and discuss
            your queries and furtunes. Astrol
            <span className="text-color-primary">
              <strong>o </strong>
            </span>
            makes it easier for people to connect with your favourite astrologer
            at anytime and everywhere around the world through this platform.
          </div>

          <div className="btn-action-wrapper">
            <Link to="/signup" className="btn-action">
              Lets go
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
