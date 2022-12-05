import React, { useState } from "react";
import {
  FieldNumberOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../Components/Navbar.css";
import "./ActivateAccount.css";

const ActivateAccount: React.FC = () => {
  const [detail, setDetail] = useState({ email: "", password: "" });

  const activateAccountSubmitHandler = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    e.preventDefault();
    console.log(detail);
  };

  return (
    <section className="section-login">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 className="text-2">
            Astrol<span className="text-color-primary">o</span>
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
        <h1 className="text-2">Activate account</h1>

        <p
          style={{ fontSize: "1.6rem", marginTop: "2.4rem", lineHeight: "1.7" }}
        >
          A 6 digit code has been sent to your email address. Please Enter the
          code in the input form below and activate your account.
        </p>

        <Form
          name="Activate account form"
          className="ant-design-form"
          onFinish={activateAccountSubmitHandler}
        >
          <Form.Item
            name="Activation code"
            rules={[
              {
                required: true,
                message:
                  "Please enter 6 digit code that was sent to your email!",
              },
            ]}
          >
            <Input
              prefix={<FieldNumberOutlined className="site-form-item-icon" />}
              placeholder="Enter 6 digit code"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Activate
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default ActivateAccount;
