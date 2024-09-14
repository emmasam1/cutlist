import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Input,
  Table,
  Button,
  Dropdown,
  Menu,
  Modal,
  Form,
  Upload,
  message,
} from "antd";
import { PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import check from "../../assets/images/icons/check.png";
import no_data from "../../assets/images/icons/no_data.png";
import dots from "../../assets/images/icons/dots.png";
import notification from "../../assets/images/icons/notification.png";
import bin from "../../assets/images/icons/bin.png";
import edit from "../../assets/images/icons/edit_outline.png";
import user from "../../assets/images/icons/user_outline.png";
import plus from "../../assets/images/icons/plus.png";
import bell from "../../assets/images/icons/bell.png";
import Notification from "../../components/notification/Notification";
import { Context } from "../../context/Context";
import { ThreeDots } from "react-loader-spinner"; 

const User = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); 
  const [dataSource, setDataSource] = useState([]);
  
  const { baseUrl, accessToken } = useContext(Context);

  const onFinish = async (values) => {
    setLoading(true);
    const userRegUrl = `${baseUrl}/account/admin/register-user`;

    try {
      const response = await axios.post(userRegUrl, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Access Token:", accessToken); 
      console.log("User registered:", response.data);
      message.success("User created successfully");
      setIsOpen(false);
      getUsers()
      form.resetFields();
      console.log(values);
    } catch (error) {
      // Log full error response
      console.error(
        "Error registering user:",
        error.response || error.message || error
      );

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }

      message.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };


  // const getUsers = async () => {
  //   const allUsers = `${baseUrl}/user/all`;

  //   setLoading(true);
  //   try {
  //     const response = await axios.get(allUsers, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // console.log(response.data.data)
  //     console.log(accessToken)
  //     const sourcedData = response.data.data.map((user) => ({
  //       key: user.id, 
  //       fullName: user.fullName,
  //       phoneNumber: user.phoneNumber,
  //       status: user.status,
  //       isVerified: user.isVerified,
  //     }));
  //     setDataSource(sourcedData);
  //   } catch (error) {
  //     console.error("Error while getting records:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!accessToken) return; 

    const getUsers = async () => {
      const allUsers = `${baseUrl}/user/all`;

      setLoading(true);
      try {
        const response = await axios.get(allUsers, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const sourcedData = response.data.data.map((user) => ({
          key: user.id,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          status: user.status,
          isVerified: user.isVerified,
        }));
        setDataSource(sourcedData);
      } catch (error) {
        console.error("Error while getting records:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [accessToken]);

  // useEffect(() => {
  //   getUsers();
  // }, [baseUrl, accessToken]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setIsAnyChecked(newSelectedRowKeys.length > 0);
  };

  const handleUser = () => {
    setIsOpen(true);
  };

  const handleCancelUserModal = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const columns = [
    { title: "SN", render: (_, __, index) => index + 1, width: 70 },
    { title: "All User", dataIndex: "fullName", width: 200 },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const isActive = status === "Active";
        const className = isActive
          ? "bg-black text-white px-3 rounded-full"
          : "px-3 border rounded-full";
        return <span className={className}>{status}</span>;
      },
      width: 200,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: 200,
      render: (phoneNumber) => `+234${phoneNumber}`,
    },
    {
      title: "",
      dataIndex: "isVerified",
      render: (isVerified) => (
        <span className="flex items-center">
          <img
            src={isVerified === false ? no_data : check}
            alt={isVerified ? "Verified" : "Unverified"}
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          {isVerified ? "Verified Phone number" : "Unverified Phone number"}
        </span>
      ),
    },
    {
      title: "",
      key: "operations",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <Link
                    to={`/user/${record.key}`}
                    state={{ record }}
                    className="flex items-center"
                  >
                    <img
                      src={user}
                      alt="View"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    View profile
                  </Link>
                ),
              },
              {
                key: "edit",
                label: (
                  <span className="flex items-center">
                    <img
                      src={edit}
                      alt="Edit"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Update
                  </span>
                ),
              },
              {
                key: "block",
                label: (
                  <span className="flex items-center">
                    <img
                      src={no_data}
                      alt="Block"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Block
                  </span>
                ),
              },
              {
                key: "notification",
                label: (
                  <span className="flex items-center">
                    <img
                      src={notification}
                      alt="Notification"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Send Notification
                  </span>
                ),
              },
              {
                key: "delete",
                label: (
                  <span className="flex items-center">
                    <img
                      src={bin}
                      alt="Delete"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Delete
                  </span>
                ),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button>
            <img
              src={dots}
              alt="Actions"
              className="flex items-center justify-center w-1"
            />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const sections = [
    {
      title: "Create cutlist",
      description: "Create new cutlist and get active",
      options: ["None", "In-app", "Phone number"],
    },
    {
      title: "Outstanding Cutlist",
      description: "You have had outstanding task for",
      options: ["None", "In-app", "Phone number"],
    },
    {
      title: "Purchase Credits",
      description: "You have run out of credits, purchase credits",
      options: ["None", "In-app", "Phone number"],
    },
  ];

  const props = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: { authorization: "authorization-text" },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4 overflow-x-auto">
        <div className="flex items-center justify-end mb-4">
          <Input.Search
            className="w-44 mr-4"
            placeholder="Search"
            onSearch={onSearch}
          />
          {selectedRowKeys.length > 0 ? (
            <button
              className="rounded px-2 h-8 font-semibold bg-[#F1B31C] flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={bell} alt="" className="mr-2 w-3" />
              Send Notification
            </button>
          ) : (
            <Button
              className="rounded px-2 h-8 font-semibold bg-[#F1B31C] hover:!bg-[#F1B31C] hover:!text-black border-none flex items-center"
              onClick={handleUser}
            >
              <img src={plus} alt="" className="mr-2 w-3" />
              Add User
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#F1B31C"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass="three-dots-loading"
            />
          </div>
        ) : (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={dataSource}
            size="small"
            pagination={{ pageSize: 7, position: ["bottomCenter"] }}
            className="custom-table"
            scroll={{ x: "max-content" }}
          />
        )}
      </div>
      <Notification
        open={isModalOpen}
        handleCancel={handleCancel}
        modalTitle="Send Notifications"
        modalText="Manage notifications to send out"
        sections={sections}
        handleSendClick={() => {
          /* Handle send button click logic */
        }}
        confirmLoading={confirmLoading}
        isAnyChecked={isAnyChecked}
        handleCheckboxChange={() => {
          /* Handle checkbox change logic */
        }}
      />

      <Modal
        title="Add User"
        open={isOpen}
        onCancel={() => handleCancelUserModal()}
        footer={null}
        width={400}
      >
        <Form form={form} name="user" layout="vertical" onFinish={onFinish}>
          <div className="m-auto w-full">
            <Form.Item
              label="Full Name"
              name="fullName"
              className="mb-2"
              rules={[{ required: true, message: "Please input full name!" }]}
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              className="mb-2"
              rules={[
                { required: true, message: "Please input email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              className="mb-2"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid phone number",
                },
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
              className="mb-2"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item label="Image" name="avatar" className="mb-2">
              <Upload {...props}>
                <Button icon={<UploadOutlined />} className="w-[351px]">
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="bg-[#F2C94C] hover:!bg-[#F2C94C] hover:!text-black border-none p-3 px-3 rounded-full h-8 flex justify-center items-center text-[.7rem]"
              >
                Create User
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
