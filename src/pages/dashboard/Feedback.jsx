import React, { useState, useContext, useEffect } from "react";
import { Table, Button, Input, Dropdown, Menu, message } from "antd";
import { Context } from "../../context/Context";
import Cookies from 'js-cookie';

import dots from "../../assets/images/icons/dots.png";
import user_2 from "../../assets/images/user_2.png";
import user_3 from "../../assets/images/user_3.png";
import user_1 from "../../assets/images/user_1.png";
import edit from "../../assets/images/icons/edit_outline.png";
import bin from "../../assets/images/icons/bin.png";
import archive from "../../assets/images/icons/archive.png";
import archive_btn from "../../assets/images/icons/archive_btn.png";
import axios from "axios";

import user from "../../assets/user.png";

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
  const [loading, setLoading] = useState(false);
  const [sourcedData, setSourcedData] = useState([])

  const { baseUrl, accessToken } = useContext(Context);

  const onSearch = (value) => {
    setSearchText(value);
  };


  const getFeedBack = async () => {
    setLoading(true);
    const feedBackUrl = `${baseUrl}/feedback/all-feedback`;

    try {
      const response = await axios.get(feedBackUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      message.success('Got all feedbacks');
      console.log('Response Data:', response.data);

      const feedbackArray = response.data.feedback;

      if (!Array.isArray(feedbackArray)) {
        throw new Error('Feedback data is not an array');
      }

      const sourcedData = feedbackArray.map((feedback) => {
        const createdAt = new Date(feedback.createdAt);
        const dateTime = `${createdAt.toLocaleDateString()} ${createdAt.toLocaleTimeString()}`;

        return {
          key: feedback._id,
          message: feedback.message,
          fullName: feedback.sender.fullName,
          createdAt: feedback.createdAt,
          avatar: feedback.sender.avatar || user,
          phoneNumber: feedback.sender.phoneNumber,
          dateTime, 
        };
      });

      console.log('Sourced Data:', sourcedData);
      setSourcedData(sourcedData);

    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.msg || 'An error occurred';

      if (errorMessage === 'Login credentials not authentic') {
        console.log('Clearing cookies:', {
          accessToken: Cookies.get('accessToken'),
          loggedInUser: Cookies.get('loggedInUser'),
        });

        Cookies.remove('accessToken');
        Cookies.remove('loggedInUser');

        window.location.href = '/admin-login';
      }

      message.error(errorMessage);

    } finally {
      setLoading(false);
    }
  };

  
  
  
  

  useEffect(() => {
    getFeedBack();
  }, []);

  // const filteredDataSource = fullDataSource.filter(
  //   (item) =>
  //     item.user_name.toLowerCase().includes(searchText.toLowerCase()) ||
  //     item.email.toLowerCase().includes(searchText.toLowerCase())
  // );

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
            src={record.avatar || user}
            alt="User"
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          <span>{record.fullName}</span>
        </div>
      ),
    }, 
    
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "",
      dataIndex: "dateTime",
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
          dataSource={sourcedData}
          size="small"
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
            className: "custom-pagination",
          }}
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
