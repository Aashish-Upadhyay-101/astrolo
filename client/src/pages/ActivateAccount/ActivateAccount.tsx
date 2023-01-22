import React from "react";
import { Link } from "react-router-dom";
import "./ActivateAccount.css";

const ActivateAccount: React.FC = () => {
  return (
    <section className="section-login">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 className="text-2">
            <Link to="/">
              Astrol<span className="text-color-primary">o</span>
            </Link>
          </h1>
        </div>
      </nav>

      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.1",
          boxShadow: "0 10px 10px rgba(0, 0, 0, 0.05)",
          borderRadius: "12px",
          padding: "2.4rem",
        }}
        className="activate"
      >
        <h1 className="text-2">Activate Activation</h1>

        <p
          style={{ fontSize: "1.6rem", marginTop: "2.4rem", lineHeight: "1.7" }}
        >
          A activation link has been sent to your email address. Please click
          the link and activate your account.
        </p>
      </div>
    </section>
  );
};

export default ActivateAccount;
