import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { AppDispatch } from "../app/store";
import { signup } from "../features/auth/authSlice";
import "../Components/Navbar.css";
import "./Signup.css";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [detail, setDetail] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const signupSubmitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(signup(detail));
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetail({ ...detail, username: e.target.value })
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetail({ ...detail, first_name: e.target.value })
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetail({ ...detail, last_name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetail({ ...detail, email: e.target.value })
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetail({ ...detail, password: e.target.value })
              }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDetail({ ...detail, password2: e.target.value })
              }
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
