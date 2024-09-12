import React, { useContext, useState } from 'react';
import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Checkbox, Card, message } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { Context } from '../../context/Context';
import woodworker from "../../assets/images/Woodworker_transparent.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";

const Login = () => {
  const { baseUrl, setLoggedInUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    const loginUrl = `${baseUrl}/account/login`;
    const fullPhoneNumber = `+234${values.phoneNumber}`;
    
    // Log form values for debugging
    console.log("Form Values:", values);
    console.log("Full Phone Number:", fullPhoneNumber);
    
    try {
      // Make the API request
      const response = await axios.post(loginUrl, {
        phoneNumber: fullPhoneNumber,
        password: values.password,
      });

      const user = response.data.data.user
      setLoggedInUser(user)
      console.log(response)

      // Check if OTP is required
      if (response === "User not verified") {
        console.log("Navigating to OTP verification page...");
        navigate('/otp-verification', { state: { phoneNumber: fullPhoneNumber } });
      } else {
        console.log("Navigating to dashboard...");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Please fill out the form correctly.');
  };

  return (
    <div
      className="relative w-full h-screen flex justify-center items-center px-4"
      style={{
        backgroundImage: `url(${woodworker})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for dark effect, visible only on larger screens */}
      <div className="absolute inset-0 bg-black opacity-50 hidden sm:block"></div>

      {/* Content */}
      <div className="relative z-10 w-full sm:w-auto max-w-sm">
        <Card className="w-full">
          <h1 className="text-center text-2xl md:text-2xl font-bold mb-4">
            Enter Login Credentials
          </h1>
          <p className="text-center md:text-sm text-sm mb-6">
            Provide your phone number and password to sign in
          </p>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <div className="m-auto w-full">
              {/* Phone Number Input with +234 as default prefix */}
              <Form.Item
                label="Phone Number"
                name="phoneNumber" // Updated field name
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { pattern: /^[0-9]{10}$/, message: 'Please enter a valid phone number' },
                ]}
              >
                <Input
                  prefix={<PhoneOutlined />}
                  addonBefore="+234"
                  placeholder="8012345678"
                />
              </Form.Item>

              {/* Password Input */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder="Enter your password" />
              </Form.Item>
            </div>

            <Form.Item className="flex items-center w-full border-t-[.9px] border-black mt-4">
              <Checkbox>
                <span className="text-xs md:text-sm">
                  By continuing you accept our Privacy Policy and Terms of Use
                </span>
              </Checkbox>
            </Form.Item>

            <Form.Item className="mt-6 flex justify-center">
              <button
                type="submit"
                className="flex items-center bg-[#F2C94C] hover:!text-black p-2 rounded-xl px-6 md:px-8 text-xs md:text-sm"
                disabled={loading}
              >
                {loading ? 'Logging in...' : (
                  <>
                    Next <img src={arrow} alt="arrow" className="w-4 ml-3" />
                  </>
                )}
              </button>
            </Form.Item>

            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p>
                Don't have an account?{" "}
                <Link
                  to="/admin-registration"
                  style={{ fontWeight: "bold", color: "#1890ff" }}
                >
                  Proceed to Register
                </Link>
              </p>
            </div>
          </Form>
        </Card>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*='background-image'] {
            background-image: none !important;
          }
          .sm\\:block {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
