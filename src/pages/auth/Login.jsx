import React from "react";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { Checkbox, Form, Input, Card } from "antd";
import woodworker from "../../assets/images/Woodworker_transparent.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import { Link } from "react-router-dom";

const Login = () => {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center px-4"
      style={{
        backgroundImage: `url(${woodworker})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for dark effect, visible only on larger screens */}
      <div className="absolute inset-0 bg-black opacity-50 hidden sm:block"></div>

      {/* Content */}
      <div className="relative z-10 w-full sm:w-auto max-w-sm">
        <Card className="w-full">
          <h1 className="text-center text-2xl md:text-2xl font-bold mb-4">
            Enter your contact details
          </h1>
          <p className="text-center md:text-sm text-sm mb-6">
            Provide your name and phone number to sign in
          </p>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className="m-auto w-full">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[
                  { required: true, message: "Please input your full name!" },
                ]}
                style={{ marginBottom: 8 }}
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
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Phone number"
                />
              </Form.Item>
            </div>

            <Form.Item className="flex items-center w-full border-t-[.9px] border-black mt-4">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>
                  <span className="text-xs md:text-sm">
                    By continuing you accept our Privacy Policy and Term of Use
                  </span>
                </Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item className="mt-6 flex justify-center">
              <Link
                to="/dashboard"
                className="flex items-center bg-[#F2C94C] hover:!text-black p-2 rounded-xl px-6 md:px-8 text-xs md:text-sm"
              >
                Next <img src={arrow} alt="arrow" className="w-4 ml-3" />
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* Responsive background and overlay removal */}
      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="background-image"] {
            background-image: none !important;
          }
          .sm\\:block {
            display: none !important; /* Hide overlay on mobile */
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
