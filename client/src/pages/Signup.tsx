import React from "react";
import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../Components/Navbar.css";
import "./Signup.css";

const Signup: React.FC = () => {
  const signupSubmitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    console.log("submitted");
  };

  return (
    <section className="section-signup">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 className="text-2">
            <Link to="/">
              Astrol<span className="text-color-primary">o</span>
            </Link>
          </h1>
        </div>
      </nav>

      <div className="signup">
        <h1 className="text-2">Signup</h1>
        <Form
          name="login form"
          className="ant-design-form"
          onFinish={signupSubmitHandler}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please enter your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="username"
            />
          </Form.Item>
          <Form.Item
            name="firstname"
            rules={[
              { required: true, message: "Please enter your First name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First name"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[
              { required: true, message: "Please enter your Last name!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last name"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
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
          <Form.Item
            name="confirm-password"
            rules={[
              { required: true, message: "Please re-enter your Password!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-primary">
              Sign up
            </Button>
            <div className="m-2">
              <span>Already have an account? </span>
              <Link className="text-color-primary" to="/login">
                Login now!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Signup;
