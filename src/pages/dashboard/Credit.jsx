import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  Modal,
  Form,
  Input,
  Select,
  Button,
  Dropdown,
  Menu,
  message,
} from "antd";

import dots from "../../assets/images/icons/dots.png";
import edit from "../../assets/images/icons/edit_outline.png";
import plus from "../../assets/images/icons/plus.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import check_green from "../../assets/images/icons/check_green.png";
import inactive from "../../assets/images/icons/inactive.png";
import no_data from "../../assets/images/icons/no_data.png";
import bin from "../../assets/images/icons/bin.png";

import { Context } from "../../context/Context";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";

const Credit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { baseUrl, accessToken } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  const createCredit = async (values) => {
    const creditUrl = `${baseUrl}/credit-package/create`;
    setLoading(true); 
  
    try {
      console.log("Submitting values:", values);
  
      const response = await axios.post(creditUrl, values, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("Response data:", response.data); 
      form.resetFields(); 
      setIsModalOpen(false)
      message.success("Package created successfully");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to create";
      console.error("Error:", error);
      message.error(errorMessage);
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    const getCredit = async () => {
      const packageUrl = `${baseUrl}/credit/credit-packages`;
      setLoading(true);
      try {
        const response = await axios.get(packageUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data.data.map((credit) => ({
          key: credit._id,
          duration: credit.duration,
          price: credit.price,
          status: credit.status
        }))
        console.log(data)
        setDataSource(data)
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
    getCredit();
  }, [baseUrl, accessToken]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "view") {
      console.log("Profile", record);
      // Handle view logic here
    } else if (e.key === "deactivate") {
      console.log("Deactivate", record);
      // Handle deactivate logic here
    } else if (e.key === "delete") {
      console.log("Delete", record);
      // Handle delete logic here
    }
  };

  const getMenu = (record) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item
        key="view"
        icon={<img src={edit} alt="Profile" style={{ width: "16px", marginRight: "8px" }} />}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="deactivate"
        icon={<img src={no_data} alt="Deactivate" style={{ width: "16px", marginRight: "8px" }} />}
      >
        Deactivate
      </Menu.Item>
      <Menu.Item
        key="delete"
        icon={<img src={bin} alt="Delete" style={{ width: "16px", marginRight: "8px" }} />}
      >
        Block
      </Menu.Item>
    </Menu>
  );

  const tableData = [
    // Sample data for the table
    {
      key: "1",
      credit: "10 Credit",
      price: "N155,000",
      status: "Active",
      total_sales: 10,
      total_revenue: "15,000 NGN",
      create_at: "Aug 17, 2023 4:30pm",
    },
    // Other rows...
  ];

  const columns = [
    {
      title: "SN",
      render: (_, __, index) => index + 1,
      width: 70,
    },
    {
      title: "Credit Package",
      dataIndex: "duration",
      key: "duration",
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
        const isActive = status; // This is a boolean now
        const className = isActive
          ? "bg-[#5EDA79] text-[#1F7700] px-3 w-20 rounded-full flex items-center"
          : "px-3 w-20 border rounded-full bg-[#FF000042] text-[#FF3D00] flex items-center";
        const statusImage = isActive ? check_green : inactive;
    
        return (
          <span className={className}>
            <img src={statusImage} alt={isActive ? "Active" : "Inactive"} className="w-2 h-2 mr-1" />
            {isActive ? "Active" : "Inactive"}
          </span>
        );
      },
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
                    <img src={edit} alt="View" style={{ width: "17px", height: "17px", marginRight: "8px" }} />
                    Update
                  </span>
                ),
              },
              {
                key: "deactivate",
                label: (
                  <span className="flex items-center">
                    <img src={no_data} alt="Deactivate" style={{ width: "17px", height: "17px", marginRight: "8px" }} />
                    Deactivate
                  </span>
                ),
              },
              {
                key: "delete",
                label: (
                  <span className="flex items-center">
                    <img src={bin} alt="Delete" style={{ width: "17px", height: "17px", marginRight: "8px" }} />
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
            <img src={dots} alt="Actions" className="flex items-center justify-center w-1" />
          </Button>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-3 mt-8">
        <div className="flex justify-end mb-3">
          <Button
            onClick={showModal}
            className="flex border-none items-center hover:!text-black bg-[#F2C94C] rounded p-2 px-3"
          >
            <img src={plus} alt="" className="w-3 mr-1" />
            Add Credit Package
          </Button>
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
          columns={columns}
          dataSource={dataSource}
          size="small"
          pagination={{ pageSize: 7, position: ["bottomCenter"] }}
          className="custom-table"
          scroll={{ x: "max-content" }}
        />
        )}
        

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
            onFinish={createCredit}
            form={form} // Link the form instance
            className="mt-6"
          >
            <div className="flex flex-col items-center">
              <Form.Item
                name="amount"
                rules={[{ required: true, message: "Input credit package amount!" }]}
              >
                <Input
                  placeholder="Input credit package amount"
                  type="number"
                  name="amount"
                  style={{ fontSize: "14px", width: "300px" }} // Increase input size
                />
              </Form.Item>
              <Form.Item
                name="price"
                rules={[{ required: true, message: "Input Price!" }]}
              >
                <Input
                  type="number"
                  name="price"
                  placeholder="Input Price"
                  style={{ fontSize: "14px", width: "300px" }} // Increase input size
                />
              </Form.Item>

              <Form.Item
                name="duration"
                rules={[{ required: true, message: "Select an option!" }]}
              >
                <Select
                  defaultValue="Select an option"
                  name="duration"
                  style={{ width: "300px" }}
                  options={[
                    { value: "1 day", label: "1 Day" },
                    { value: "1 week", label: "1 Week" },
                    { value: "1 month", label: "1 Month" },
                    { value: "3 months", label: "3 Months" },
                    { value: "6 months", label: "6 Months" },
                    { value: "1 year", label: "1 Year" },
                    { value: "custom", label: "Custom" },
                  ]}
                />
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Form.Item>
                <Button
                  className="bg-[#F2C94C] hover:!bg-[#F2C94C] hover:!text-black border-none p-3 rounded-full h-8 flex justify-center items-center text-[.7rem]"
                  loading={loading} // Set loading state for the button
                  htmlType="submit"
                >
                  {loading ? "Please wait..." : "Create"}
                  <img src={arrow} alt="" className="h-4 w-4 ml-3" />
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Credit;
