import React, { useState } from "react";
import { Table, Modal, Form, Input, Select } from "antd";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import no_data from "../../assets/images/icons/no_data.png";
import dots from "../../assets/images/icons/dots.png";
import bin from "../../assets/images/icons/bin.png";
import edit from "../../assets/images/icons/edit_outline.png";
import plus from "../../assets/images/icons/plus.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";

const Credit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const tableData = [
    {
      key: "1",
      credit: "10 Credit",
      price: "N155,000",
      status: "Active",
      total_sales: 10,
      total_revenue: "15,000 NGN",
      create_at: "Aug 17, 2023 4:30pm",
    },
    {
      key: "2",
      credit: "20 Credit",
      price: "N30,000",
      status: "Inactive",
      total_sales: "",
      total_revenue: "",
      create_at: "Aug 17, 2023 4:30pm",
    },
    {
      key: "3",
      credit: "30 Credit",
      price: "N15,000",
      status: "Active",
      total_sales: 15,
      total_revenue: "675,000 NGN",
      create_at: "Aug 17, 2023 4:30pm",
    },
    {
      key: "4",
      credit: "55 Credit",
      price: "N82,000",
      status: "Active",
      total_sales: 15,
      total_revenue: "1,675,000 NGN",
      create_at: "Aug 17, 2023 4:30pm",
    },
    {
      key: "5",
      credit: "155 Credit",
      price: "N82,000",
      status: "Active",
      total_sales: 10,
      total_revenue: "1,675,000 NGN",
      create_at: "Aug 17, 2023 4:30pm",
    },
  ];

  const columns = [
    {
      title: "Credit Package",
      dataIndex: "credit",
      key: "credit_package",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color = "";
        let bgColor = "";

        switch (text) {
          case "Active":
            color = "#1F7700";
            bgColor = "#5EDA79";
            break;
          case "Inactive":
            color = "#FF3D00";
            bgColor = "rgb(255 61 0 / 32%)";
            break;
          default:
            break;
        }
        return (
          <span
            style={{
              color,
              backgroundColor: bgColor,
              padding: "2px 8px",
              borderRadius: "7px",
            }}
          >
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </span>
        );
      },
    },
    {
      title: "Total Sales",
      dataIndex: "total_sales",
      key: "total_sales",
    },
    {
      title: "Total Revenue",
      dataIndex: "total_revenue",
      key: "total_revenue",
    },
    {
      title: "Created At",
      dataIndex: "create_at",
      key: "created_at",
    },
    {
      title: "",
      dataIndex: "isVerified",
      render: () => (
        <span className="flex items-center">
          <Menu as="div" className="relative inline-block text-left ml-2">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
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
                    <a
                      href="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={edit} alt="" className="w-4 h-4 mr-1" />
                      Profile
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={no_data} alt="" className="w-4 h-4 mr-1" />
                      Deactivate
                    </a>
                  )}
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  {({ active }) => (
                    <a
                      href="#"
                      className={`${
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                      } px-4 py-2 text-sm flex items-center`}
                    >
                      <img src={bin} alt="" className="w-4 h-4 mr-1" />
                      Delete
                    </a>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </span>
      ),
    },
  ];

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-3 mt-8">
        <Table
          columns={columns}
          dataSource={tableData}
          // className="mt-8"
          style={{ fontSize: "11px" }}
        />

        <div className="flex justify-end">
          <button
            onClick={showModal}
            className="flex items-center bg-[#F2C94C] rounded p-2 px-3"
          >
            <img src={plus} alt="" className="w-4 mr-1" />
            Create Custom Credit
          </button>
        </div>
        <Modal
          title="Create Custom Credit"
          open={isModalOpen}
          footer={null} // Disable default footer buttons
          onCancel={handleCancel}
          width={350}
        >
          <Form
            name="creditForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            className="mt-6"
          >
            <div className="flex flex-col items-center">
              <Form.Item
                name="credit"
                rules={[
                  { required: true, message: "Input credit package amount!" },
                ]}
              >
                <Input
                  placeholder="Input credit package amount"
                  style={{ fontSize: "14px", width: "300px" }} // Increase input size
                />
              </Form.Item>
              <Form.Item
                name="price"
                rules={[{ required: true, message: "Input Price!" }]}
              >
                <Input
                  type="text"
                  placeholder="Input Price"
                  style={{ fontSize: "14px", width: "300px" }} // Increase input size
                />
              </Form.Item>

              <Form.Item
                name="package"
                rules={[{ required: true, message: "Select an option!" }]}
              >
                <Select
                  defaultValue="Select an option"
                  style={{ width: '300px' }}
                  onChange={handleChange}
                  options={[
                    { value: "1_day", label: "1 Day" },
                    { value: "1_week", label: "1 Week" },
                    { value: "1_month", label: "1 Month" },
                    { value: "3_months", label: "3 Months" },
                    { value: "6_months", label: "6 Months" },
                    { value: "1_year", label: "1 Year" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Form.Item>
                <button className="bg-[#F2C94C] p-3 rounded-full h-8 flex justify-center items-center text-[.7rem]">
                  Save
                  <img src={arrow} alt="" className="h-4 w-4 ml-3" />
                </button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Credit;
