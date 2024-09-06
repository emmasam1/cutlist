import React, { useState } from "react";
import { Input, Table, Button, Dropdown, Menu } from "antd";
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

const fullDataSource = [
  { key: 0, user: "Edward King 0", status: "Active", phone_number: "555-1234-0", isVerified: "Verified Phone number" },
  { key: 1, user: "Edward King 1", status: "Offline", phone_number: "555-1234-1", isVerified: "Unverified Phone number" },
  { key: 2, user: "Edward King 2", status: "Active", phone_number: "555-1234-2", isVerified: "Verified Phone number" },
  { key: 3, user: "Edward King 3", status: "Offline", phone_number: "555-1234-3", isVerified: "Verified Phone number" },
  { key: 4, user: "Edward King 4", status: "Active", phone_number: "555-1234-4", isVerified: "Verified Phone number" },
  { key: 5, user: "Edward King 5", status: "Offline", phone_number: "555-1234-5", isVerified: "Unverified Phone number" },
  { key: 6, user: "Edward King 6", status: "Active", phone_number: "555-1234-6", isVerified: "Verified Phone number" },
];

const handleMenuClick = (e, record) => {
  if (e.key === "view") {
    console.log("View", record);
    // Handle view logic here
  } else if (e.key === "edit") {
    console.log("Edit", record);
    // Handle edit logic here
  } else if (e.key === "delete") {
    console.log("Delete", record);
    // Handle delete logic here
  } else if (e.key === "block") {
    console.log("Block", record);
    // Handle block logic here
  } else if (e.key === "notification") {
    console.log("Send Notification", record);
    // Handle send notification logic here
  }
};

const getMenu = (record) => (
  <Menu onClick={(e) => handleMenuClick(e, record)}>
    <Menu.Item
      key="view"
      icon={
        <img
          src={user}
          alt="View Profile"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      View Profile
    </Menu.Item>
    <Menu.Item
      key="edit"
      icon={
        <img
          src={edit}
          alt="Update"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      Update
    </Menu.Item>
    <Menu.Item
      key="block"
      icon={
        <img
          src={no_data}
          alt="Block"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      Block
    </Menu.Item>
    <Menu.Item
      key="notification"
      icon={
        <img
          src={notification}
          alt="Send Notification"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      Send Notification
    </Menu.Item>
    <Menu.Item
      key="delete"
      icon={
        <img
          src={bin}
          alt="Delete"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      Delete
    </Menu.Item>
  </Menu>
);

const count = fullDataSource.length;

const sections = [
  { title: "Create cutlist", description: "Create new cutlist and get active", options: ["None", "In-app", "Phone number"] },
  { title: "Outstanding Cutlist", description: "You have had outstanding task for", options: ["None", "In-app", "Phone number"] },
  { title: "Purchase Credits", description: "You have run out of credits, purchase credits", options: ["None", "In-app", "Phone number"] },
];

const User = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setIsAnyChecked(newSelectedRowKeys.length > 0);
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

  const columns = [
    {
      title: "SN",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: `All Users (${count})`,
      dataIndex: "user",
      width: 200,
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
      width: 200,
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      width: 200,
    },
    {
      title: "",
      dataIndex: "isVerified",
      render: (isVerified) => (
        <span className="flex items-center">
          <img
            src={isVerified === "Unverified Phone number" ? no_data : check}
            alt={isVerified}
            style={{ width: 18, height: 18, marginRight: 8 }}
          />
          {isVerified}
        </span>
      ),
      // colSpan: 2,
      // width: 220,
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
                  <Link to={`/user/${record.key}`} className="flex items-center">
                    <img
                      src={user}
                      alt="View"
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
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
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
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
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
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
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
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
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
                    />
                    Delete
                  </span>
                ),
              },
            ],
            onClick: (e) => handleMenuClick(e, record),
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
            <Button className="rounded px-2 h-8 font-semibold bg-[#F1B31C] hover:!bg-[#F1B31C] hover:!text-black border-none flex items-center">
              <img src={plus} alt="" className="mr-2 w-3" />
              Add User
            </Button>
          )}
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredDataSource}
          size="small"
          pagination={{ pageSize: 7, position: ['bottomCenter'] }}
          className="custom-table"
          scroll={{ x: 'max-content' }}
        />
      </div>

      <Notification
        open={isModalOpen}
        handleCancel={handleCancel}
        modalTitle="Send Notifications"
        modalText="Manage notifications to send out"
        sections={sections}
        handleSendClick={() => { /* Handle send button click logic */ }}
        confirmLoading={confirmLoading}
        isAnyChecked={isAnyChecked}
        handleCheckboxChange={() => { /* Handle checkbox change logic */ }}
      />
    </div>
  );
};

export default User;
