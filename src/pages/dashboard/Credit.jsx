import React, { useState } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
} from "antd";

import dots from "../../assets/images/icons/dots.png";
import edit from "../../assets/images/icons/edit_outline.png";
import plus from "../../assets/images/icons/plus.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import check_green from "../../assets/images/icons/check_green.png";
import inactive from "../../assets/images/icons/inactive.png";
import no_data from "../../assets/images/icons/no_data.png";
import bin from "../../assets/images/icons/bin.png";

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

  const handleMenuClick = (e, record) => {
    if (e.key === "profile") {
      console.log("Profile", record);
      // Handle view logic here
    } else if (e.key === "deactivate") {
      console.log("Deactivate", record);
      // Handle edit logic here
    } else if (e.key === "delete") {
      console.log("Delete", record);
      // Handle delete logic here
    }
  };

  const getMenu = (record) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item
        key="view"
        icon={
          <img
            src={edit}
            alt="Profile"
            style={{ width: "16px", marginRight: "8px" }}
          />
        }
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="deactivate"
        icon={
          <img
            src={no_data}
            alt="Deactivate"
            style={{ width: "16px", marginRight: "8px" }}
          />
        }
      >
        Deactivate
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
        Block
      </Menu.Item>
    </Menu>
  );

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
      key: "operations",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: (
                  <span className="flex items-center">
                    <img
                      src={edit}
                      alt="View"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    profile
                  </span>
                ),
              },
              {
                key: "deactivate",
                label: (
                  <span className="flex items-center">
                    <img
                      src={no_data}
                      alt="Deactivate"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Deactivate
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
    // {
    //   title: "",
    //   dataIndex: "isVerified",
    //   render: () => (
    //     <span className="flex items-center">
    //       <Menu as="div" className="relative inline-block text-left ml-2">
    //         <div>
    //           <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
    //             <img
    //               src={dots}
    //               style={{ width: 3, height: 15 }}
    //               className="cursor-pointer"
    //             />
    //           </MenuButton>
    //         </div>
    //         <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
    //           <div className="py-1">
    //             <MenuItem>
    //               {({ active }) => (
    //                 <a
    //                   href="#"
    //                   className={`${
    //                     active ? "bg-gray-100 text-gray-900" : "text-gray-700"
    //                   } px-4 py-2 text-sm flex items-center`}
    //                 >
    //                   <img src={edit} alt="" className="w-4 h-4 mr-1" />
    //                   Profile
    //                 </a>
    //               )}
    //             </MenuItem>
    //           </div>
    //           <div className="py-1">
    //             <MenuItem>
    //               {({ active }) => (
    //                 <a
    //                   href="#"
    //                   className={`${
    //                     active ? "bg-gray-100 text-gray-900" : "text-gray-700"
    //                   } px-4 py-2 text-sm flex items-center`}
    //                 >
    //                   <img src={no_data} alt="" className="w-4 h-4 mr-1" />
    //                   Deactivate
    //                 </a>
    //               )}
    //             </MenuItem>
    //           </div>
    //           <div className="py-1">
    //             <MenuItem>
    //               {({ active }) => (
    //                 <a
    //                   href="#"
    //                   className={`${
    //                     active ? "bg-gray-100 text-gray-900" : "text-gray-700"
    //                   } px-4 py-2 text-sm flex items-center`}
    //                 >
    //                   <img src={bin} alt="" className="w-4 h-4 mr-1" />
    //                   Delete
    //                 </a>
    //               )}
    //             </MenuItem>
    //           </div>
    //         </MenuItems>
    //       </Menu>
    //     </span>
    //   ),
    // },
  ];

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-3 mt-8">
        <div className="flex justify-end mb-3">
          <Button
            onClick={showModal}
            className="flex border-none items-center hover:!text-black bg-[#F2C94C] hover:!bg-[#F2C94C] rounded p-2 px-3"
          >
            <img src={plus} alt="" className="w-3 mr-1" />
            Create Custom Credit
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          // className="mt-8"
          size="small"
          pagination={{ pageSize: 7, position: ["bottomCenter"] }}
          className="custom-table"
          scroll={{ x: "max-content" }}
        />

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
                  style={{ width: "300px" }}
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
