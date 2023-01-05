import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <Result
      style={{ marginTop: "8.2rem" }}
      status="error"
      title="Submission Failed"
      subTitle="Please check and modify the following information before resubmitting."
      extra={[
        <Link to="/astrolo" className="btn btn-primary">
          Retry
        </Link>,
      ]}
    />
  );
};

export default PaymentCancel;
