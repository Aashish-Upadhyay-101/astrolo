import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../Components/Navbar.css";
import "./Login.css";

const Login: React.FC = () => {
  const [detail, setDetail] = useState({ email: "", password: "" });

  const loginSubmitHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    console.log(detail);
  };

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

      <div className="login">
        <h1 className="text-2">Login</h1>
        <Form
          name="login form"
          className="ant-design-form"
          onFinish={loginSubmitHandler}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="text-color-primary" to="/forget-password">
              Forgot password?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Log in
            </Button>
            <div className="m-2">
              <span>Don't have an account? </span>
              <Link className="text-color-primary" to="/signup">
                register now!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Login;
