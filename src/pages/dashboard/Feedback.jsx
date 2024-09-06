import React, { useState } from "react";
import { Table, Button, Input, Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";

import dots from "../../assets/images/icons/dots.png";
import user_2 from "../../assets/images/user_2.png";
import user_3 from "../../assets/images/user_3.png";
import user_1 from "../../assets/images/user_1.png";
import edit from "../../assets/images/icons/edit_outline.png";
import bin from "../../assets/images/icons/bin.png";
import archive from "../../assets/images/icons/archive.png";
import archive_btn from "../../assets/images/icons/archive_btn.png";

const fullDataSource = [
  {
    key: 0,
    id: "FBK004-17-24AUG",
    user_name: "Rory Mcllroy",
    user_img: user_2,
    email: "rorymcllrory24@gmail.com",
    time: "01:00pm",
  },
  {
    key: 1,
    id: "FBK003-14-24AUG",
    user_name: "Manuel Ugate",
    user_img: user_3,
    email: "emanuelUgate@utd.org",
    time: "Yesterday",
  },
  {
    key: 2,
    id: "FBK002-10-24AUG",
    user_name: "Alxis Sanchez",
    user_img: user_1,
    email: "alexisanchez09@gmail.com",
    time: "Tuesday",
  },
  {
    key: 3,
    id: "FBK001-02-24AUG",
    user_name: "Micah Richards",
    user_img: user_2,
    email: "micrichards1995@gmail.com",
    time: "Tuesday",
  },
];

const handleMenuClick = (e, record) => {
  if (e.key === "reply") {
    console.log("Reply", record);
    // Handle view logic here
  } else if (e.key === "archive") {
    console.log("Archive", record);
    // Handle edit logic here
  } else if (e.key === "delete") {
    console.log("Delete", record);
    // Handle delete logic here
  }
};

const getMenu = (record) => (
  <Menu onClick={(e) => handleMenuClick(e, record)}>
    <Menu.Item
      key="reply"
      icon={
        <img
          src={edit}
          alt="Reply"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      Reply
    </Menu.Item>
    <Menu.Item
      key="archive"
      icon={
        <img
          src={archive}
          alt="Archive"
          style={{ width: "16px", marginRight: "8px" }}
        />
      }
    >
      Archive
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

const Feedback = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredDataSource = fullDataSource.filter(
    (item) =>
      item.user_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "SN",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Feedbacks",
      dataIndex: "id",
    },
    {
      title: "User Profile",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={record.user_img}
            alt="User"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          <span>{record.user_name}</span>
        </div>
      ),
      dataIndex: "user_name",
    },
    {
      title: "Phone Number",
      dataIndex: "email",
    },
    {
      title: "",
      dataIndex: "time",
    },

    {
      title: "",
      key: "operations",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "reply",
                label: (
                  <span className="flex items-center">
                    <img
                      src={edit}
                      alt="Reply"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Reply
                  </span>
                ),
              },
              {
                key: "archive",
                label: (
                  <span className="flex items-center">
                    <img
                      src={archive}
                      alt="Deactivate"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Archive
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
      <div className="bg-white rounded p-4">
        <div className="flex items-center w-full mb-3 justify-end">
          <Input.Search
            className="w-44 mr-4"
            placeholder="Search"
            onSearch={onSearch}
          />
          <Button className="rounded px-2 h-8 font-semibold bg-[#F1B31C] hover:!bg-[#F1B31C] hover:!text-black border-none flex items-center">
            <img src={archive_btn} alt="" className="mr-2 w-5" />
            Archived
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredDataSource}
          size="small"
          pagination={{ pageSize: 7, position: ["bottomCenter"] }}
          className="custom-table"
          scroll={{ x: "max-content" }}
          rowSelection={{
            onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
          }}
        />
      </div>
    </div>
  );
};

export default Feedback;
