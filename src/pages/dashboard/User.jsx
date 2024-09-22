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
  notification,
  Switch,
  Select,
} from "antd";
import { PhoneOutlined, UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import check from "../../assets/images/icons/check.png";
import no_data from "../../assets/images/icons/no_data.png";
import dots from "../../assets/images/icons/dots.png";
import notificationImg from "../../assets/images/icons/notification.png"; // Renamed to avoid conflict with antd notification
import bin from "../../assets/images/icons/bin.png";
import edit from "../../assets/images/icons/edit_outline.png";
import userIcon from "../../assets/images/icons/user_outline.png";
import plus from "../../assets/images/icons/plus.png";
import bell from "../../assets/images/icons/bell.png";
import Notification from "../../components/notification/Notification";
import { Context } from "../../context/Context";
import { ThreeDots } from "react-loader-spinner";
import debounce from "lodash.debounce";

const User = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [userStatus, setUserStatus] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { baseUrl, accessToken, loggedInUser, setUserBlockedStatus, logout } =
    useContext(Context);
  const navigate = useNavigate();

  const [form] = Form.useForm(); // Form instance for Add User
  const [updateForm] = Form.useForm(); // Form instance for Update User

  useEffect(() => {
    if (!accessToken) return;

    // const getUsers = async () => {
    //   const allUsers = `${baseUrl}/user/all`;

    //   setLoading(true);
    //   try {
    //     const response = await axios.get(allUsers, {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     });
    //     const sourcedData = response.data.data.map((user) => ({
    //       key: user._id,
    //       fullName: user.fullName,
    //       phoneNumber: user.phoneNumber,
    //       status: user.status,
    //       isVerified: user.isVerified,
    //       email: user.email,
    //       // Add other fields as needed
    //     }));
    //     setDataSource(sourcedData);
    //   } catch (error) {
    //     console.error("Error while getting records:", error);
    //     message.error("Failed to fetch users.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    getUsers();
  }, [baseUrl, accessToken]);

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
      // getUsers(); // Refresh the user list
      form.resetFields();
    } catch (error) {
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

  const blockUser = async (record) => {
    const userId = record.key;
    const currentStatus = record.status;
    const action = currentStatus === "active" ? "block" : "unblock";

    console.log(`Attempting to ${action} user with ID: ${userId}`);

    if (!userId) {
      console.error("No user ID available to block/unblock.");
      return;
    }

    const blkUserUrl = `${baseUrl}/account/user-status/${userId}`;
    setLoading(true);
    try {
      const response = await axios.put(
        blkUserUrl,
        { action },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("Response from blocking user:", response);

      const newStatus = response.data.user.status;
      setUserStatus(newStatus);
      setUserBlockedStatus(newStatus);
      setDataSource((prevData) =>
        prevData.map((user) =>
          user.key === userId ? { ...user, status: newStatus } : user
        )
      );

      notification.success({
        message: `User ${action === "block" ? "Blocked" : "Unblocked"}`,
        description: `The user has been ${
          action === "block" ? "blocked" : "unblocked"
        }.`,
      });

      if (loggedInUser && userId === loggedInUser._id) {
        setUserBlockedStatus(newStatus);
        if (newStatus === "blocked") {
          logout();
          notification.error({
            message: "Account Blocked",
            description:
              "Your account has been blocked. Please contact support.",
          });
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(
        "Error while blocking user:",
        error.response || error.message
      );
      notification.error({
        message: "Error",
        description:
          "An error occurred while trying to change the user status.",
      });
    } finally {
      setLoading(false);
    }
  };

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
        key: user._id,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        status: user.status,
        isVerified: user.isVerified,
        email: user.email,
        // Add other fields as needed
      }));
      setDataSource(sourcedData);
    } catch (error) {
      console.error("Error while getting records:", error);
      message.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpdate = () => {
    setIsUpdateOpen(false);
    setSelectedUser(null);
    updateForm.resetFields();
  };

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

  // Debounced search to improve performance
  const debouncedSearch = debounce((value) => {
    setSearchText(value);
  }, 300);

  const onSearch = (value) => {
    debouncedSearch(value);
  };

  const columns = [
    {
      title: "SN",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "All User",
      dataIndex: "fullName",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const isActive = status === "active";
        const className = isActive
          ? "bg-[#5EDA79] text-[#1F7700] px-3 py-1 rounded-full"
          : "bg-[#FF000042] text-[#FF3D00] px-3 py-1 rounded-full";
        return (
          <span className={className}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        );
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
      title: "Verification",
      dataIndex: "isVerified",
      render: (isVerified) => (
        <span className="flex items-center">
          <img
            src={isVerified ? check : no_data}
            alt={isVerified ? "Verified" : "Unverified"}
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          {isVerified ? "Verified Phone Number" : "Unverified Phone Number"}
        </span>
      ),
      width: 200,
    },
    {
      title: "Actions",
      key: "operations",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="view">
                <Link
                  to={`/user/${record.key}`}
                  state={{ record }}
                  className="flex items-center"
                >
                  <img
                    src={userIcon}
                    alt="View"
                    style={{
                      width: "17px",
                      height: "17px",
                      marginRight: "8px",
                    }}
                  />
                  View Profile
                </Link>
              </Menu.Item>
              <Menu.Item key="edit">
                <span
                  className="flex items-center"
                  onClick={() => updateUser(record)}
                >
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
              </Menu.Item>
              <Menu.Item key="block">
                <span
                  className="flex items-center cursor-pointer"
                  onClick={() => blockUser(record)}
                >
                  <img
                    src={no_data}
                    alt="Block/Unblock"
                    style={{
                      width: "17px",
                      height: "17px",
                      marginRight: "8px",
                    }}
                  />
                  {record.status === "active" ? "Block" : "Unblock"}
                </span>
              </Menu.Item>
              <Menu.Item key="notification">
                <span className="flex items-center">
                  <img
                    src={notificationImg}
                    alt="Notification"
                    style={{
                      width: "17px",
                      height: "17px",
                      marginRight: "8px",
                    }}
                  />
                  Send Notification
                </span>
              </Menu.Item>
              <Menu.Item key="delete">
                <span className="flex items-center" onClick={()=> deleteUser(record)}>
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
              </Menu.Item>
            </Menu>
          }
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
      width: 100,
    },
  ];

  const sections = [
    {
      title: "Create Cutlist",
      description: "Create new cutlist and get active",
      options: ["None", "In-app", "Phone number"],
    },
    {
      title: "Outstanding Cutlist",
      description: "You have outstanding tasks for",
      options: ["None", "In-app", "Phone number"],
    },
    {
      title: "Purchase Credits",
      description: "You have run out of credits, purchase credits",
      options: ["None", "In-app", "Phone number"],
    },
  ];

  const uploadProps = {
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

  const updateUser = (record) => {
    console.log("Selected user for update:", record);
    setSelectedUser(record);
    // Populate the update form with the selected user's data
    updateForm.setFieldsValue({
      email: record.email,
      fullName: record.fullName,
      phoneNumber: record.phoneNumber,
      isVerified: record.isVerified,
      status: record.status,
    });
    setIsUpdateOpen(true);
  };

  const onUpdateFinish = async (values) => {
    if (!selectedUser) {
      message.error("No user selected for update.");
      return;
    }

    setConfirmLoading(true);
    const updateUserUrl = `${baseUrl}/user/admin-update-user/${selectedUser.key}`; // Adjust the endpoint as per your API
    console.log(updateUserUrl);
    try {
      const response = await axios.put(updateUserUrl, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("User updated:", response.data);
      message.success("User updated successfully");
      setIsUpdateOpen(false);
      setSelectedUser(null);
      updateForm.resetFields();
      getUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error updating user:", error);
      message.error("Failed to update user");
    } finally {
      setConfirmLoading(false);
    }
  };

  const deleteUser = (record) => {
    setIsModalVisible(true)
    console.log(record)
  }

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4 overflow-x-auto">
        <div className="flex items-center justify-end mb-4">
          <Input.Search
            className="w-44 mr-4"
            placeholder="Search"
            onSearch={onSearch}
            allowClear
          />
          {selectedRowKeys.length > 0 ? (
            <Button
              className="rounded px-2 h-8 font-semibold bg-[#F1B31C] flex items-center"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={bell} alt="Send Notification" className="mr-2 w-3" />
              Send Notification
            </Button>
          ) : (
            <Button
              className="rounded px-2 h-8 font-semibold bg-[#F1B31C] hover:!bg-[#F1B31C] hover:!text-black border-none flex items-center"
              onClick={handleUser}
            >
              <img src={plus} alt="Add User" className="mr-2 w-3" />
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
            dataSource={dataSource.filter(
              (user) =>
                user.fullName
                  .toLowerCase()
                  .includes(searchText.toLowerCase()) ||
                user.email.toLowerCase().includes(searchText.toLowerCase()) ||
                user.phoneNumber.includes(searchText)
            )}
            size="small"
            pagination={{ pageSize: 7, position: ["bottomCenter"] }}
            className="custom-table"
            scroll={{ x: "max-content" }}
          />
        )}
      </div>

      {/* Notification Modal */}
      <Notification
        open={isModalOpen}
        handleCancel={handleCancel}
        modalTitle="Send Notifications"
        modalText="Manage notifications to send out"
        sections={sections}
        handleSendClick={() => {
          /* Handle send button click logic */
          message.success("Notifications sent successfully!");
          setIsModalOpen(false);
        }}
        confirmLoading={confirmLoading}
        isAnyChecked={isAnyChecked}
        handleCheckboxChange={() => {
          /* Handle checkbox change logic */
        }}
      />

      {/* Add User Modal */}
      <Modal
        title="Add User"
        open={isOpen}
        onCancel={handleCancelUserModal}
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
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item label="Image" name="avatar" className="mb-2">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />} className="w-full">
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
                {loading ? "Please wait..." : "Create User"}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>

      {/* Update User Modal */}
      <Modal
        title="Update User"
        open={isUpdateOpen}
        onCancel={handleCancelUpdate}
        footer={null}
        width={400}
      >
        <Form
          form={updateForm}
          name="updateUser"
          layout="vertical"
          onFinish={onUpdateFinish}
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            className="mb-2"
            rules={[{ required: true, message: "Please input full name!" }]}
          >
            <Input placeholder="Enter full name" />
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
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            className="mb-2"
            rules={[
              { required: true, message: "Please input phone number!" },
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
            label="Verified"
            name="isVerified"
            valuePropName="checked"
            className="mb-2"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            className="mb-2"
            rules={[{ required: true, message: "Please select status!" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <div className="flex justify-end mt-4">
            <Button
              type="primary"
              htmlType="submit"
              loading={confirmLoading}
              className="bg-[#F2C94C] hover:!bg-[#F2C94C] text-black hover:!text-black border-none p-3 px-3 rounded-full h-8 flex justify-center items-center text-[.7rem]"
            >
              {confirmLoading ? "Updating..." : "Update User"}
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Confirm Delete"
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete the user</p>
      </Modal>
    </div>
  );
};

export default User;
