import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import LineChart3 from "../../components/chart/LineChart3";
import { Context } from "../../context/Context";
import { ThreeDots } from "react-loader-spinner";

import edit from "../../assets/images/icons/edit.png";
import user from "../../assets/images/icons/user.png";
import book from "../../assets/images/icons/book.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";
import user_2 from "../../assets/images/user_2.png";
import user_3 from "../../assets/images/user_3.png";
import user_1 from "../../assets/images/user_1.png";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl, accessToken } = useContext(Context);
  const [sourcedData, setSourcedData] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [totalCutList, setTotalCutList] = useState(0);

  useEffect(() => {
    const getPayments = async () => {
      const paymentUrl = `${baseUrl}/payments/admin`;
      // setLoading(true);
      try {
        const response = await axios.get(paymentUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        // Sort payments by paymentDate in descending order (newest first)
        const sortedData = response.data.payments
          .map((payment) => ({
            key: payment._id,
            customer_name: payment.user.fullName, // Full name from user object
            status: payment.status,
            date: new Date(payment.paymentDate).toLocaleDateString(), // Format paymentDate
            credits: payment.credits,
            amount: payment.amount,
            invoice: payment.paymentId,
            currency: payment.currency,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sorting by paymentDate
  
        setSourcedData(sortedData);
        // message.success("Payments data fetched successfully");
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Handle token expiration
          message.error("Session expired, please log in again.");
          Cookies.remove("loggedInUser");
          Cookies.remove("accessToken");
          setTimeout(() => {
            navigate("/admin-login");
          }, 3000);
        } else {
          console.error("Error fetching credits:", error);
        }
      }
    };
  
    getPayments();
  }, [baseUrl, accessToken]);
  

  const getUsers = async () => {
    const allUsers = `${baseUrl}/admin/all-users`;
    try {
      const response = await axios.get(allUsers, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const users = response.data.data;
      setTotalUser(users.length);
      // console.log("Number of users:", users.length);
    } catch (error) {
      console.error("Error while getting records:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const getUsers = async () => {
      const allUsersUrl = `${baseUrl}/admin/all-users`;

      try {
        const response = await axios.get(allUsersUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // console.log(response);
        const users = response.data.data;

        if (Array.isArray(users)) {
          // console.log("Users Array:", users);

          const todayStart = new Date();
          todayStart.setHours(0, 0, 0, 0);
          const todayEnd = new Date();
          todayEnd.setHours(23, 59, 59, 999);

          const registeredTodayCount = users.reduce((count, user) => {
            const createdAtDate = new Date(user.createdAt);
            return createdAtDate >= todayStart && createdAtDate <= todayEnd
              ? count + 1
              : count;
          }, 0);

          // console.log("Registered Today Count:", registeredTodayCount);

          const today = new Date();
          const expiryDate = new Date(today);
          expiryDate.setDate(today.getDate() + 7);
          localStorage.setItem(
            "newUsers",
            JSON.stringify({
              count: registeredTodayCount,
              expiry: expiryDate.toISOString(),
            })
          );

          setNewUsers(registeredTodayCount);
        } else {
          console.error("Data is not in expected format:", response.data);
        }
      } catch (error) {
        console.error("Error while getting records:", error);
      }
    };

    // Check local storage first
    const storedData = localStorage.getItem("newUsers");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const expiry = new Date(parsedData.expiry);
      const now = new Date();

      if (now < expiry) {
        setNewUsers(parsedData.count);
      } else {
        getUsers();
      }
    } else {
      getUsers();
    }
  }, [accessToken]);

  // Monitor totalUser changes in a separate useEffect
  useEffect(() => {}, [totalUser]);

  useEffect(() => {
    const getCategory = async () => {
      const cutList = `${baseUrl}/admin/tasks`;
      try {
        const response = await axios.get(cutList, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const cut = response.data.length;
        setTotalCutList(cut);
      } catch (error) {
        console.log("error", error);
      }
    };
    getCategory();
  }, [accessToken]);

  useEffect(() => {}, [totalUser]);

  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  const today = new Date();
  // const formattedDate = formatDate(today);

  const items = [
    {
      id: 1,
      title: "total user",
      amount: totalUser,
      dec: "Total amount of users",
      bg_color: "#C9EBED",
      img: edit,
    },
    {
      id: 2,
      title: "recent registration",
      amount: newUsers,
      dec: "Number of recent registration",
      bg_color: "#FBECC4",
      img: user,
    },
    {
      id: 3,
      title: "total cutlist",
      amount: totalCutList,
      dec: "Total amount of cutlist created",
      bg_color: "#F5DEDE",
      img: book,
    },
  ];

  const tableData = [
    {
      key: "1",
      customer_name: "John Brown",
      status: "pending",
      date: "17/08/24",
      credit_package: "10 Credits",
      amount: "15,000",
      invoice: "",
    },
    {
      key: "2",
      customer_name: "Jim Green",
      status: "paid",
      date: "17/08/24",
      credit_package: "5 Credits",
      amount: "7,000",
      invoice: "",
    },
    {
      key: "3",
      customer_name: "Joe Black",
      status: "canceled",
      date: "17/08/24",
      credit_package: "3 Credits",
      amount: "4,000",
      invoice: "",
    },
  ];

  const recent = [
    {
      id: 1,
      name: "Rory Mcllroy",
      dec: "Made Payments for 10 credits",
      img: user_1,
    },
    {
      id: 2,
      name: "Manuel Ugate",
      dec: "Created a new cutlist",
      img: user_2,
    },
    {
      id: 3,
      name: "Alxis Sanchez",
      dec: "Complited a cutlist",
      img: user_3,
    },
  ];

  const columns = [
    { title: "SN", render: (_, __, index) => index + 1, width: 70 },
    {
      title: "Customer Name",
      dataIndex: "customer_name",
      key: "customer_name",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        let color = "",
          bgColor = "";
        switch (text) {
          case "pending":
            color = "#127CDD";
            bgColor = "#D0E8FF";
            break;
          case "successful":
            color = "#1F7700";
            bgColor = "#5EDA79";
            break;
          case "canceled":
            color = "#FF3D00";
            bgColor = "#FFCCCC";
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
              borderRadius: "10px",
            }}
          >
            {text.charAt(0).toUpperCase() + text.slice(1)}
          </span>
        );
      },
    },
    { title: "Date", dataIndex: "date", key: "date" },
    {
      title: "Credit Package",
      dataIndex: "credits",
      key: "credits",
      render: (text) => `${text} Credits`,
    },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    {
      title: "Invoice",
      dataIndex: "invoice",
      key: "invoice",
      render: (text, record) => (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            color: "#1890ff",
          }}
          onClick={() => openModal(record)}
        >
          <PrinterOutlined style={{ fontSize: "18px", marginRight: "5px" }} />
          Print
        </span>
      ),
    },
  ];

  // const handlePrint = (record) => {
  //   const printContent = `
  //     Customer Name: ${record.customer_name}\n
  //     Status: ${record.status}\n
  //     Date: ${record.date}\n
  //     Credit Package: ${record.credit_package}\n
  //     Amount: ${record.amount}
  //   `;
  //   const printWindow = window.open("", "", "height=400,width=600");
  //   printWindow.document.write("<pre>" + printContent + "</pre>");
  //   printWindow.document.close();
  //   printWindow.print();
  // };

  // const columns = [
  //   {
  //     title: "SN",
  //     key: "sn",
  //     render: (text, record, index) => index + 1,
  //     width: 50,
  //   },
  //   {
  //     title: "Customer Name",
  //     dataIndex: "customer_name",
  //     key: "customer_name",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (text) => {
  //       let color = "";
  //       let bgColor = "";

  //       switch (text) {
  //         case "pending":
  //           color = "#127CDD";
  //           bgColor = "#D0E8FF";
  //           break;
  //         case "paid":
  //           color = "#1F7700";
  //           bgColor = "#5EDA79";
  //           break;
  //         case "canceled":
  //           color = "#FF3D00";
  //           bgColor = "#FFCCCC";
  //           break;
  //         default:
  //           break;
  //       }

  //       return (
  //         <span
  //           style={{
  //             color,
  //             backgroundColor: bgColor,
  //             padding: "2px 8px",
  //             borderRadius: "10px",
  //           }}
  //         >
  //           {text.charAt(0).toUpperCase() + text.slice(1)}
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     title: "Date",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "Credit Package",
  //     dataIndex: "credit_package",
  //     key: "credit_package",
  //   },
  //   {
  //     title: "Amount",
  //     dataIndex: "amount",
  //     key: "amount",
  //   },
  //   {
  //     title: "Invoice",
  //     dataIndex: "invoice",
  //     key: "invoice",
  //     render: (text, record) => (
  //       <span
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           cursor: "pointer",
  //           color: "#1890ff",
  //         }}
  //         onClick={() => handlePrint(record)}
  //       >
  //         <PrinterOutlined style={{ fontSize: "18px", marginRight: "5px" }} />{" "}
  //         Print
  //       </span>
  //     ),
  //   },
  // ];

  return (
    <div className="relative top-14">
      <div className="mt-5">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((e) => (
                <div
                  className="p-4 rounded-lg"
                  key={e.id}
                  style={{ backgroundColor: e.bg_color }}
                >
                  <div className="flex items-center">
                    <img src={e.img} alt="" className="mr-2" />
                    <h1 className="capitalize font-semibold">{e.title}</h1>
                  </div>
                  <h2 className="text-center font-bold text-2xl">{e.amount}</h2>
                  <p className="text-center font-semibold normal-case text-sm">
                    {e.dec}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded p-3 mt-8">
              <div className="flex justify-between items-center">
                <p className="font-semibold">Recent Payments</p>
                <Button className="bg-[#F2C94C] hover:!bg-[#F2C94C] p-2 rounded-full h-6 flex justify-center items-center text-[.7rem] border-none hover:!text-black">
                  View more
                </Button>
              </div>

              <div className="overflow-x-auto mt-7">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <ThreeDots
                      visible={true}
                      height="80"
                      width="80"
                      color="#F1B31C"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperClass="three-dots-loading"
                    />
                  </div>
                ) : (
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
                  />
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="grid grid-rows-3 gap-4">
              <div className="bg-white rounded p-4 text-center">Item 1</div>
              <div className="bg-white rounded p-3">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-lg">Recent Activity</h1>
                  <img src={arrow} alt="" />
                </div>
                <LineChart3 />
              </div>
              <div className="bg-white rounded p-4">
                <h1 className="font-bold text-lg">Recent Activity</h1>
                <div>
                  {recent.map((e) => (
                    <div
                      className="grid grid-cols-1 mt-2 bg-[#F5F5F5] p-2 rounded-md"
                      key={e.id}
                    >
                      <div className="flex gap-2">
                        <div className="rounded-full h-9 w-9 overflow-hidden">
                          <img
                            src={e.img}
                            alt=""
                            className="w-full object-cover"
                          />
                        </div>
                        <div>
                          <h1 className="font-semibold">{e.name}</h1>
                          <p className="text-[.8rem]">{e.dec}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
