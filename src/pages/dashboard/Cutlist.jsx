import React, { useState } from "react";
import { Button, Input, Table, Modal, Form, Dropdown, Menu } from "antd";
import plus from "../../assets/images/icons/plus.png";
import dots from "../../assets/images/icons/dots.png";
import bin from "../../assets/images/icons/bin.png";
import send from "../../assets/images/icons/send-light.png";
import view from "../../assets/images/icons/view.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import full_list from "../../assets/images/icons/full_list.png";
import checkbox from "../../assets/images/icons/checkbox_full.png";

import CreateCutlist from "../../components/createCutlist/Cutlist";
import ViewCutlist from "../../components/viewCutlist/Cutlist";
import Users from "../../components/allUsers/AllUsers";

const Cutlist = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSummary, setIsModalSummary] = useState(false);
  const [sideModal, setSideModal] = useState(false);
  const [previewCutlist, setPreviewCutlist] = useState(false);
  const [allUsers, setAllUsers] = useState(false);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const handleModal = () => {
    setIsModalOpen(false);
    setSideModal(true);
  };

  const closeSideBar = () => {
    setSideModal(false);
    setPreviewCutlist(false); // Reset to CreateCutlist
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
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
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
                      style={{ width: "17px", height: "17px", marginRight: "8px" }}
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

  const Tabledata = [
    {
      key: 0,
      name: "Rory Mcllroy",
      cut_type: "Door Cut",
      height: 225,
      width: 75,
      depth: 80,
    },
    {
      key: 1,
      name: "Manuel Ugate",
      cut_type: "Shelf Cut",
      height: 352,
      width: 75,
      depth: 60,
    },
    {
      key: 2,
      name: "Emile Smith",
      cut_type: "Console Cut",
      height: 305,
      width: 95,
      depth: 50,
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

  return (
    <div className="relative top-14">
      <div className="flex justify-end"></div>
      <div className="bg-white rounded p-4">
        <div className="flex justify-end mb-3">
          <Button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-[#F2C94C] hover:!bg-[#F2C94C] border-none hover:!text-black rounded p-2 px-3"
          >
            <img src={plus} alt="Plus Icon" className="w-3 mr-1" />
            Create Cutlist
          </Button>
        </div>
        <div className="">
          <Table
            columns={Tablecolumns}
            dataSource={Tabledata}
            size="small"
          pagination={{ pageSize: 7, position: ['bottomCenter'] }}
          className="custom-table"
          scroll={{ x: 'max-content' }}
            // scroll={{ x: 600 }} // Enable horizontal scrolling
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

        <Modal
          title="Create Cut list"
          open={isModalOpen}
          footer={null}
          onCancel={handleCancel}
          width={350}
        >
          <Form
            name="notificationForm"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            className="mt-6"
          >
            <div className="flex flex-col items-center">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter category!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter name of category"
                  style={{ fontSize: "14px", width: "300px" }}
                />
              </Form.Item>
            </div>

            <div className="flex justify-end">
              <Form.Item>
                <Button
                  onClick={handleModal}
                  htmlType="submit"
                  className="bg-[#F2C94C] hover:!bg-[#F2C94C] hover:!text-black border-none p-3 px-3 rounded-full h-8 flex justify-center items-center text-[.7rem]"
                >
                  Create Project
                  <img src={arrow} alt="" className="h-4 w-4 ml-3" />
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>

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
                  onClick={() => setPreviewCutlist(true)}
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
          {previewCutlist ? <ViewCutlist /> : <CreateCutlist />}
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
                onClick={() => setPreviewCutlist(true)}
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
      </div>
    </div>
  );
};

export default Cutlist;
