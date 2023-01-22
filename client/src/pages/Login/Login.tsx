import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useLoginUserMutation } from "../../api/authApi";
import "../components/Navbar.css";
import "./Login.css";

// signup page just like this

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [detail, setDetail] = useState({
    email: "",
    password: "",
  });

  const [LoginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const [messageApi, contextHolder] = message.useMessage();

  const loginError = () => {
    console.log(error);

    messageApi.open({
      type: "error",
      content: "Invalid email or password",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/astrolo");
    }
    if (isError) {
      console.log(error);
      loginError();
    }
  }, [isLoading, isError, isSuccess]);

  const loginSubmitHandler = (e: React.FormEvent<HTMLInputElement>) => {
    LoginUser(detail);
  };

  return (
    <section className="section-login">
      {contextHolder}
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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className="text-color-primary" to="/forget-password">
              Forgot password?
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-primary"
              loading={isLoading}
            >
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
