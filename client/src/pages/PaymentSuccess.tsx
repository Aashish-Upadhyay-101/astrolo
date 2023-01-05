import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <Result
      style={{ marginTop: "8.2rem" }}
      status="success"
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Link to="/dashboard" className="btn btn-primary">
          Goto Dashboard
        </Link>,
      ]}
    />
  );
};

export default PaymentSuccess;
