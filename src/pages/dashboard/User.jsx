import React, { useState } from "react";
import { Input, Table, Button } from "antd";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
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

const fullDataSource = [
  {
    key: 0,
    user: "Edward King 0",
    status: "Active",
    phone_number: "555-1234-0",
    isVerified: "Verified Phone number",
  },
  {
    key: 1,
    user: "Edward King 1",
    status: "Offline",
    phone_number: "555-1234-1",
    isVerified: "Unverified Phone number",
  },
  {
    key: 2,
    user: "Edward King 2",
    status: "Active",
    phone_number: "555-1234-2",
    isVerified: "Verified Phone number",
  },
  {
    key: 3,
    user: "Edward King 3",
    status: "Offline",
    phone_number: "555-1234-3",
    isVerified: "Verified Phone number",
  },
  {
    key: 4,
    user: "Edward King 4",
    status: "Active",
    phone_number: "555-1234-4",
    isVerified: "Verified Phone number",
  },
  {
    key: 5,
    user: "Edward King 5",
    status: "Offline",
    phone_number: "555-1234-5",
    isVerified: "Unverified Phone number",
  },
  {
    key: 6,
    user: "Edward King 6",
    status: "Active",
    phone_number: "555-1234-6",
    isVerified: "Verified Phone number",
  },
];

const count = fullDataSource.length;

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

const User = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleOk = () => {
  //   setModalText("The modal will be closed after two seconds");
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredDataSource = fullDataSource.filter((item) =>
    item.user.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handler for checkbox change
  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    // Update state based on whether any checkbox is checked or not
    setIsAnyChecked(isChecked || isAnyChecked);
  };

  // Handler for send button click
  const handleSendClick = () => {
    // Handle send button click logic
    if (isAnyChecked) {
      // Perform action if any checkbox is checked
    }
  };

  const columns = [
    {
      title: `All Users (${count})`,
      dataIndex: "user",
    },
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
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: (
        <div className="flex items-center justify-end">
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
            <Button className="rounded px-2 h-8 font-semibold bg-[#F1B31C] hover:!bg-[#F1B31C] hover:!text-black border-none flex items-center">
              <img src={plus} alt="" className="mr-2 w-3" />
              Add User
            </Button>
          )}
        </div>
      ),
      dataIndex: "isVerified",
      render: (isVerified) => (
        <span className="flex items-center justify-center">
          <img
            src={isVerified === "Unverified Phone number" ? no_data : check}
            alt={isVerified}
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          {isVerified}
        </span>
      ),
      colSpan: 2,
    },
    {
      title: "",
      render: () => null,
      colSpan: 0,
    },
    {
      render: (text, record) => (
        <span className="flex items-center">
          <Menu as="div" className="relative inline-block text-left ml-2">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                <img
                  src={dots}
                  style={{ width: 3, height: 15 }}
                  className="cursor-pointer"
                />
              </MenuButton>
            </div>
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to={`/user/${record.key}`}
                      state={{ record }}
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={user} alt="" className="w-4 h-4 mr-1" />
                      View profile
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={edit} alt="" className="w-4 h-4 mr-1" />
                      Update
                    </Link>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={no_data} alt="" className="w-4 h-4 mr-1" />
                      Block
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={notification} alt="" className="w-4 h-4 mr-1" />
                      Send notification
                    </Link>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={bin} alt="" className="w-4 h-4 mr-1" />
                      Delete
                    </Link>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </span>
      ),
    },
  ];

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredDataSource}
          pagination={{ pageSize: 7 }}
          className="custom-table"
        />
      </div>

      <Notification
        open={isModalOpen}
        handleCancel={handleCancel}
        modalTitle="Send Notifications"
        modalText="Manage notifications to send out"
        sections={sections}
        handleSendClick={handleSendClick}
        confirmLoading={confirmLoading}
        isAnyChecked={isAnyChecked}
        handleCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
};

export default User;
