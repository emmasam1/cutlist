import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Table,
  Modal,
  Form,
  Dropdown,
  Menu,
  Select,
  Radio,
  message,
} from "antd";
import { Context } from "../../context/Context";

import plus from "../../assets/images/icons/plus.png";
import dots from "../../assets/images/icons/dots.png";
import bin from "../../assets/images/icons/bin.png";
import send from "../../assets/images/icons/send-light.png";
import view from "../../assets/images/icons/view.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import full_list from "../../assets/images/icons/full_list.png";
import checkbox from "../../assets/images/icons/checkbox_full.png";
import check from "../../assets/images/icons/check.png";
import no_data from "../../assets/images/icons/no_data.png";

// import CreateCutlist from "../../components/createCutlist/Cutlist";
// import ViewCutlist from "../../components/viewCutlist/Cutlist";
import Users from "../../components/allUsers/AllUsers";

const Cutlist = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSummary, setIsModalSummary] = useState(false);
  const [sideModal, setSideModal] = useState(false);
  const [previewCutlist, setPreviewCutlist] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [userModal, setUserModal] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [tabledata, setTabledata] = useState([]);
  const [loading, setLoading] = useState(false);

  const { baseUrl, accessToken } = useContext(Context);
  const [selectedRole, setSelectedRole] = useState(null);

  const [cutType, setCutType] = useState("Door Cut");
  const [projectName, setProjectName] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");

  const handleRadioChange = (key) => {
    setSelectedRole(key);
  };

  const onSearch = (value) => {
    setSearchText(value);
  };

  useEffect(() => {
    const getCutList = async () => {
      const cutList = `${baseUrl}/admin/tasks`;
      try {
        const response = await axios.get(cutList, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        setTabledata(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getCutList();
  }, [accessToken, baseUrl]);

  useEffect(() => {
    const getCategory = async () => {
      const categoryUrl = `${baseUrl}/all-cat`;
      try {
        const response = await axios.get(categoryUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const categoryData = response.data;
        // console.log(categoryData);
        // console.log("from thop", categoryData._id);
        setCategories(categoryData);
      } catch (error) {
        console.log("error", error);
      }
    };

    getCategory();
  }, [accessToken, baseUrl]);

  const createCutlit = async () => {
    const cutListUrl = `${baseUrl}/task`;
    const cutListData = {
      categoryId: selectedCategoryId,
      userId: user,
      name: projectName,
      measurement: { height, width, depth },
      material: "MDF", // Change if necessary
    };

    console.log("Cut List Data:", cutListData);
    console.log("Cut List URL:", cutListUrl);

    try {
      const response = await axios.post(cutListUrl, cutListData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Response:", response);
      message.success("Cut List Created");
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        message.error(
          `Error: ${error.response.data.message || "An error occurred"}`
        );
        console.log(error);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Error request:", error.request);
        message.error("No response received from server.");
      } else {
        // Something else caused the error
        console.error("Error message:", error.message);
        message.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    const getUsers = async () => {
      const allUsers = `${baseUrl}/user/all`;

      setLoading(true);
      try {
        const response = await axios.get(allUsers, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // console.log(response.data.data);
        const sourcedData = response.data.data.map((user) => ({
          key: user._id,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber.replace(/^(\+234)/, ""), // Remove the +234 prefix
          status: user.status,
          isVerified: user.isVerified,
          // email: user.email,
          // credits: user.credits,
          // projects: user.projects,
          // Add other fields as needed
        }));
        setDataSource(sourcedData);
      } catch (error) {
        console.error("Error while getting records:", error);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, [baseUrl, accessToken]);

  const createCutList = async (cutListData) => {
    try {
      const response = await axios.post(`${baseUrl}/task`, cutListData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log("Cut list created successfully:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error creating cut list:", error);
    }
  };

  const openUserModal = () => {
    setUserModal(false);
  };

  const handleUserModal = () => {
    console.log("Current User State:", user); // Debug log
    if (!user) {
      message.warning("Please select a user");
    } else {
      console.log("Selected User ID:", user);
      setIsModalOpen(true);
      setUserModal(false);
    }
  };

  const createCut = () => {
    createCutList();
    setPreviewCutlist(true);
  };

  const handleModal = () => {
    setIsModalOpen(false);
    setSideModal(true);
  };

  const closeSideBar = () => {
    setSideModal(false);
    setPreviewCutlist(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClose2 = () => {
    setAllUsers(true);
    setPreviewCutlist(false);
    setSideModal(false);
  };

  const handleSummaryCancel = () => {
    setIsModalSummary(false);
  };

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
    }
  };

  const getMenu = (record) => (
    <Menu onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item
        key="view"
        icon={
          <img
            src={view}
            alt="View"
            style={{ width: "16px", marginRight: "8px" }}
          />
        }
      >
        View
      </Menu.Item>
      <Menu.Item
        key="edit"
        icon={
          <img
            src={send}
            alt="Edit"
            style={{ width: "16px", marginRight: "8px" }}
          />
        }
      >
        Edit
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

  const Tablecolumns = [
    {
      title: "SN",
      key: "sn",
      render: (text, record, index) => index + 1,
      width: 50,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Cut Type",
      dataIndex: "cut_type",
    },
    {
      title: "Height",
      dataIndex: "height",
    },
    {
      title: "Width",
      dataIndex: "width",
    },
    {
      title: "Depth",
      dataIndex: "depth",
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
                      src={view}
                      alt="View"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    View
                  </span>
                ),
              },
              {
                key: "edit",
                label: (
                  <span className="flex items-center">
                    <img
                      src={send}
                      alt="Edit"
                      style={{
                        width: "17px",
                        height: "17px",
                        marginRight: "8px",
                      }}
                    />
                    Edit
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


  const data = [
    {
      key: 0,
      title: "Frame Vertical",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 1,
      title: "Frame Horizontal",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 2,
      title: "Adjustment Vertical",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 3,
      title: "Adjustment Horizontal",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 4,
      title: "Architrave",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 5,
      title: "Door Cap",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 6,
      title: "Door Frame Supports",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 7,
      title: "Door Leaf Rough Cut",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 8,
      title: "Door Leaf Final Cut",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
  ];

  const columns = [
    {
      dataIndex: "select",
      width: 50,
      render: (_, record) => (
        <Radio
          checked={selectedRole === record.key}
          onChange={() => handleRadioChange(record.key)}
          onClick={() => setUser(record.key)}
        />
      ),
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
      width: 100,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: 150,
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
  ];

  const handleCategoryChange = (value, option) => {
    setSelectedCategory(value);
    setSelectedCategoryId(option.key); // Use the key as the category ID
  };

  return (
    <div className="relative top-14">
      <div className="flex justify-end"></div>
      <div className="bg-white rounded p-4">
        <div className="flex justify-end mb-3">
          <Button
            // onClick={() => setIsModalOpen(true)}
            onClick={() => setUserModal(true)}
            className="flex items-center bg-[#F2C94C] hover:!bg-[#F2C94C] border-none hover:!text-black rounded p-2 px-3"
          >
            <img src={plus} alt="Plus Icon" className="w-3 mr-1" />
            Create Cutlist
          </Button>
        </div>
        <div className="">
          <Table
            columns={Tablecolumns}
            dataSource={tabledata.map((item) => ({
              key: item._id,
              ...item.measurement,
              name: item.name,
              cut_type: item.category.name,
            }))}
            size="small"
            pagination={{ pageSize: 7, position: ["bottomCenter"] }}
            className="custom-table"
            scroll={{ x: "max-content" }}
          />
        </div>

        <Modal
          title="Cut list Summary"
          open={isModalSummary}
          onCancel={handleSummaryCancel}
          footer={null}
          width={1000}
        >
          <div className="flex justify-end">
            <Button className="bg-[#F2C94C] hover:!bg-[#F2C94C] rounded border-none hover:!text-black px-10">
              Edit
            </Button>
          </div>
          {data.map((e) => (
            <div key={e.key} className="bg-[#FAFAFF] py-1 mb-2 rounded-sm mt-2">
              <div className="flex justify-between m-auto w-11/12">
                <div className="w-52">
                  <span className="font-bold">{e.title}</span>
                </div>
                <div>
                  <span className="font-semibold">
                    <span className="text-[#F2994A] font-semibold text-[.6rem]">
                      L -
                    </span>{" "}
                    {e.length}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">
                    <span className="text-[#F2994A] font-semibold text-[.6rem]">
                      W -
                    </span>{" "}
                    {e.width}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    <span className="text-[#F2994A] font-semibold text-[.6rem]">
                      Q -
                    </span>
                    {e.qty}
                  </span>
                  <img src={full_list} alt="" className="w-4" />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-end mt-4">
            <Button className="bg-[#F2C94C] hover:!bg-[#F2C94C] rounded-full border-none hover:!text-black px-10">
              {" "}
              Save List
              <img src={checkbox} alt="" className="w-4" />
            </Button>
          </div>
        </Modal>

        {/* selset category modal */}
        <Modal
          title="Create Cut List"
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          width={350}
        >
          <Form
            name="notificationForm"
            initialValues={{ remember: true }}
            onFinish={handleModal} // Handle form submission
            className="mt-6"
          >
            <div className="flex flex-col">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please select a category!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a category"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {categories.map((category) => (
                    <Select.Option key={category._id} value={category.name}>
                      {category.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Form.Item>
                <Button
                  htmlType="submit" // Submit the form
                  className="bg-[#F2C94C] hover:!bg-[#F2C94C] hover:!text-black border-none p-3 px-3 rounded-full h-8 flex justify-center items-center text-[.7rem]"
                >
                  Create Project
                  <img src={arrow} alt="" className="h-4 w-4 ml-3" />
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
        {/* selset category modal */}

        <Modal
          title={
            previewCutlist ? (
              <div className="flex justify-center">
                <span className="">Cut List Summary</span>
              </div>
            ) : (
              <div className="flex justify-center">
                <span className="">Create Cut List</span>
              </div>
            )
          }
          width={400}
          open={sideModal}
          onCancel={closeSideBar}
          footer={[
            <div className="flex justify-center " key="footer">
              {previewCutlist ? (
                <Button
                  className="bg-[#F2C94C] hover:!bg-[#F2C94C] rounded-full border-none hover:!text-black px-10"
                  onClick={handleClose2}
                >
                  {" "}
                  Save List
                </Button>
              ) : (
                <Button
                  className="bg-[#F2C94C] hover:!bg-[#F2C94C] rounded-full border-none hover:!text-black px-10"
                  onClick={() => createCutlit()}
                >
                  {" "}
                  Preview List
                  <img src={arrow} alt="" className="w-4" />
                </Button>
              )}
            </div>,
          ]}
          className="custom-modal"
          getContainer={false}
        >
          {/* {previewCutlist ? (
            <ViewCutlist />
          ) : (
            <CreateCutlist selectedCategoryId={selectedCategoryId} />
          )} */}
          <div>
            <div>
              <h2 className="font-semibold">Cut Type</h2>
              <div className="flex gap-6 mt-1">
                <Button className="rounded-full bg-[#F2C94C] hover:!bg-[#F2C94C] border-none hover:!text-black">
                  Door Cut
                </Button>
                <Button className="rounded-full bg-[#fcfcfca4] hover:!bg-[#fcfcfca4] hover:!text-black border-none">
                  Window Cut
                </Button>
                <Button className="rounded-full bg-[#fcfcfca4] hover:!bg-[#fcfcfca4] hover:!text-black border-none">
                  Bed Cut
                </Button>
              </div>
            </div>
            <div className="mt-10">
              <Input
                placeholder="Enter Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Measuremente</h2>
                <span className="text-[#f2994a]">(2 Long)</span>
              </div>
              <div className="flex gap-6 mt-1">
                <Input
                  placeholder="Height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Input
                  placeholder="Weight"
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
                <Input
                  placeholder="Depth"
                  type="number"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-52 border-t-[.1rem]">
              <p className="mt-3">
                <span className="text-[#F2994A] font-semibold text-lg">
                  LNG &nbsp;
                </span>
                - Means (Long).
              </p>
              <p>
                <span className="text-[#F2994A] font-semibold text-lg">
                  F-E-T&nbsp;
                </span>
                - Means (Long).
              </p>
              <p>
                <span className="text-[#F2994A] font-semibold text-lg">
                  & &nbsp;
                </span>
                - Means (And).
              </p>
            </div>
          </div>
        </Modal>

        <Modal
          title=""
          width={900}
          style={{ top: 20 }}
          open={allUsers}
          onCancel={() => setAllUsers(false)}
          footer={[
            <div className="flex justify-center " key="footer">
              <Button
                className="bg-[#F2C94C] hover:!bg-[#F2C94C] rounded-full border-none hover:!text-black px-10"
                onClick={() => createCut()}
              >
                {" "}
                Save List
              </Button>
            </div>,
          ]}
          getContainer={false}
        >
          <Users />
        </Modal>

        <Modal
          title="All users"
          open={userModal}
          onCancel={openUserModal}
          footer={
            user == [] || !user ? null : (
              <Button
                onClick={handleUserModal}
                htmlType="submit"
                className="bg-[#F2C94C] hover:!bg-[#F2C94C] hover:!text-black border-none p-3 px-3 rounded-full h-8  text-[.7rem]"
              >
                Select A User
              </Button>
            )
          }
          width={1000}
          size="small"
          pagination={{ pageSize: 7, position: ["bottomCenter"] }}
          className="custom-table"
          scroll={{ x: "max-content" }}
        >
          <Table
            columns={columns}
            dataSource={dataSource}
            // pagination={false} // You can enable pagination if needed
          />
        </Modal>
      </div>
    </div>
  );
};

export default Cutlist;
