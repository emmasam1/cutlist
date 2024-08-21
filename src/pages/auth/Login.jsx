import React from "react";
import { LockOutlined, UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Card } from "antd";
import woodworker from "../../assets/images/Woodworker_transparent.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div
      className="relative bg-contain bg-center bg-no-repeat w-full h-screen"
      style={{ backgroundImage: `url(${woodworker})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex justify-center items-center h-screen">
        <Card className="p-8">
          <h1 className="text-center text-3xl font-bold mb-4">
            Enter your contact details
          </h1>
          <p className="text-center text-base mb-6">
            Provide your name and phone number to sign in
          </p>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical" // This ensures labels are on top
          >
            <div className="m-auto w-60">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
                style={{ marginBottom: 8 }} // Close the gap between label and input
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your name"
                />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your Phone number!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone number" />
              </Form.Item>
            </div>

            <Form.Item className="flex items-center w-80 m-auto border-t-[.9px] border-black ">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  <span className="text-sm relative top-2">
                    By continuing you accept our Privacy Policy and Term of Use
                  </span>
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item className="mt-6 flex justify-center">
              <Link
                to="/dashboard"
                className="flex items-center bg-[#F2C94C] p-2 rounded-xl px-8 text-sm"
              >
                Next <img src={arrow} alt="arrow" className="w-4 ml-3" />
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
