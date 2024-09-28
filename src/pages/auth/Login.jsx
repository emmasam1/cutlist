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
  const { baseUrl, login } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const onFinish = async (values) => {
    setLoading(true);
    const loginUrl = `${baseUrl}/account/login`;
    const fullPhoneNumber = `+234${values.phoneNumber}`;

    try {
      const response = await axios.post(loginUrl, {
        phoneNumber: fullPhoneNumber,
        password: values.password,
      });

      const user = response.data.data.user;
      const access_token = response.data.data.access_token;

      if (user && access_token) {
        login(user, access_token);
        // console.log("Login successful:", response);
        // Navigate to dashboard or another page
        navigate('/dashboard');
      } else {
        console.error("User or access token not found in response.");
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
      {/* Overlay for dark effect */}
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
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                className='mb-0'
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

            {/* <Form.Item className="flex items-center w-full border-t-[.9px] border-black mt-4">
              <Checkbox>
                <span className="text-xs md:text-sm">
                  By continuing you accept our Privacy Policy and Terms of Use
                </span>
              </Checkbox>
            </Form.Item> */}

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
