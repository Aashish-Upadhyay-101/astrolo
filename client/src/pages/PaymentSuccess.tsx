import React, { useEffect } from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";
import { useTriggerPaymentSuccessWebhookQuery } from "../api/astroloApi";

const PaymentSuccess = () => {
  // const { data, isError, error } = useTriggerPaymentSuccessWebhookQuery();

  // useEffect(() => {
  //   if (isError) {
  //     console.log(error);
  //   }

  //   if (data) {
  //     console.log(data);
  //   }
  // }, [isError, error, data]);

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
