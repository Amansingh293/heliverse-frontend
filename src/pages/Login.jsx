import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import { loginUser } from "../api/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

 
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      const token = response.data;

      const role = response.role;

      if (response.status) {
        message.success("Logged In");

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        navigate("/home");
      }
    } catch (error) {
      message.error("Something went wrong !!");
    }
    console.log("Received values of form: ", values);
  };

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-5 p-9">
      <div className="bg-gray-200 text-black border-[1px] rounded-lg shadow-lg p-4 font-bold text-[2rem]">
        Welcome To School App
      </div>
      <div className="">Please Login !!</div>
      <Form
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
        }}
        className="border-[1px] rounded-xl p-10 shadow-xl"
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or <a href="">Register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
