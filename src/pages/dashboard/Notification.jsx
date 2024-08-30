import React, { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Button, Table, Input, Modal, Form } from "antd";
import Notifications from "../../components/notification/Notification";
import plus from "../../assets/images/icons/plus.png";
import bell from "../../assets/images/icons/bell.png";
import check_green from "../../assets/images/icons/check_green.png";
import inactive from "../../assets/images/icons/inactive.png";
import dots from "../../assets/images/icons/dots.png";
import no_data from "../../assets/images/icons/no_data.png";
import edit from "../../assets/images/icons/edit_outline.png";
import bin from "../../assets/images/icons/bin.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";

const { TextArea } = Input;

const Notification = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isAnyChecked, setIsAnyChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAnyChecked(isChecked || isAnyChecked);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  const sections = [
    {
      title: "Create cutlist",
      description: "Create new cutlist and get active",
      options: ["None", "In-app", "Phone number"],
    },
    {
      title: "Outstanding Cutlist",
      description: "You have had outstanding tasks for a while",
      options: ["None", "In-app", "Phone number"],
    },
    {
      title: "Purchase Credits",
      description: "You have run out of credits, purchase credits",
      options: ["None", "In-app", "Phone number"],
    },
  ];

  const fullDataSource = [
    {
      key: 0,
      title: "Purchase Credits",
      status: "Active",
      sent_to: "10 Users",
      view: 5,
      last_modified: "Aug 17, 2023 4:30pm",
    },
    {
      key: 1,
      title: "Create cutlist",
      status: "Inactive",
      sent_to: "20 Users",
      view: 10,
      last_modified: "Oct 05, 2023 1:50am",
    },
    {
      key: 2,
      title: "Outstanding Cutlist",
      status: "Active",
      sent_to: "12 Users",
      view: 8,
      last_modified: "Oct 28, 2023 7:00pm",
    },
    {
      key: 3,
      title: "Verify Number",
      status: "Active",
      sent_to: "30 Users",
      view: 25,
      last_modified: "Oct 28, 2023 7:00pm",
    },
  ];

  const filteredDataSource = fullDataSource.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Notification Name",
      dataIndex: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        const isActive = status === "Active";
        const className = isActive
          ? "bg-[#5EDA79] text-[#1F7700] px-3 w-20 py-1 rounded-full flex items-center"
          : "px-3 w-20 py-1 border rounded-full bg-[#FF000042] text-[#FF3D00] flex items-center";
        const statusImage = isActive ? check_green : inactive;
        return (
          <span className={className}>
            <img
              src={statusImage}
              alt={isActive ? "Active" : "Inactive"}
              className="w-2 h-2 mr-1"
            />
            {status}
          </span>
        );
      },
    },
    {
      title: "Sent to",
      dataIndex: "sent_to",
    },
    {
      title: "Views",
      dataIndex: "view",
    },
    {
      title: "Last Modified",
      dataIndex: "last_modified",
    },
    {
      title: "",
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
                      to="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={edit} alt="Edit" className="w-4 h-4 mr-1" />
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
                      <img src={no_data} alt="No Data" className="w-4 h-4 mr-1" />
                      Deactivate
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
                      <img src={bin} alt="Delete" className="w-4 h-4 mr-1" />
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
        <div className="flex justify-between items-center">
          <Button
            onClick={showModal}
            className="flex items-center bg-[#F2C94C] hover:!bg-[#F2C94C] border-none hover:!text-black rounded p-2 px-3"
          >
            <img src={plus} alt="Plus Icon" className="w-3 mr-1" />
            Create Notification
          </Button>
          <div className="flex gap-4">
            <Input.Search
              className="w-44 mr-4"
              placeholder="Search"
              onSearch={onSearch}
            />
            <Button
              className="flex items-center bg-[#F2C94C] hover:!bg-[#F2C94C] border-none hover:!text-black rounded p-2 px-3"
              onClick={()=> setOpenModal(true)}
            >
              <img src={bell} alt="Bell Icon" className="w-3 mr-1" />
              Send Notification
            </Button>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={filteredDataSource}
          pagination={{ pageSize: 7 }}
          className="custom-table mt-4"
        />
        <Modal
          title="Create Custom Notification"
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          width={350}
        >
          <Form
            name="notificationForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="mt-6"
          >
            <div className="flex flex-col items-center">
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please enter the Notification Name!" }]}
              >
                <Input
                  placeholder="Notification Name"
                  style={{ fontSize: "14px", width: "300px" }}
                />
              </Form.Item>

              <Form.Item
                name="description"
                rules={[{ required: true, message: "Please enter the Description!" }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Description"
                  maxLength={250}
                  style={{ fontSize: "14px", width: "300px", resize: "none" }}
                />
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Form.Item>
                <Button
                  htmlType="submit"
                  className="bg-[#F2C94C] hover:!bg-[#F2C94C] hover:!text-black border-none p-3 px-3 rounded-full h-8 flex justify-center items-center text-[.7rem]"
                >
                  Save
                  <img src={arrow} alt="" className="h-4 w-4 ml-3" />
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>

        <Notifications
          open={openModal}
          handleCancel={handleCancel}
          modalTitle="Send Notifications"
          modalText="Manage notifications to send out"
          sections={sections}
          confirmLoading={confirmLoading}
          isAnyChecked={isAnyChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
};

export default Notification;
