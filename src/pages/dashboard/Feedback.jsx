import React, { useState } from 'react';
import { Table, Button, Input } from "antd";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import dots from "../../assets/images/icons/dots.png";
import user_2 from '../../assets/images/user_2.png';
import user_3 from '../../assets/images/user_3.png';
import user_1 from '../../assets/images/user_1.png';
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
    time: "01:00pm"
  },
  {
    key: 1,
    id: "FBK003-14-24AUG",
    user_name: "Manuel Ugate",
    user_img: user_3,
    email: "emanuelUgate@utd.org",
    time: "Yesterday"
  },
  {
    key: 2,
    id: "FBK002-10-24AUG",
    user_name: "Alxis Sanchez",
    user_img: user_1,
    email: "alexisanchez09@gmail.com",
    time: "Tuesday"
  },
  {
    key: 3,
    id: "FBK001-02-24AUG",
    user_name: "Micah Richards",
    user_img: user_2,
    email: "micrichards1995@gmail.com",
    time: "Tuesday"
  },
];

const Feedback = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const filteredDataSource = fullDataSource.filter((item) =>
    item.user_name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Feedbacks",
      dataIndex: "id",
    },
    {
      title: "User Profile",
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={record.user_img} 
            alt="User" 
            style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} 
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
      title: (
        <div className="flex items-center justify-between w-full">
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
      ),
      render: (text, record) => (
        <span className="flex items-center justify-center">
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
                      <img src={edit} alt="" className="w-4 h-4 mr-1" />
                      Reply
                    </Link>
                  )}
                </MenuItem>
              </div>
  
              <div className='py-1'>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      to="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={archive} alt="" className="w-4 h-4 mr-1" />
                      Archive
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
      colSpan: 5,
    },
  ];


  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
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
