import React from "react";
import { Table, Button } from "antd";
import { Line } from '@ant-design/plots';
import { PrinterOutlined } from "@ant-design/icons";

import edit from "../../assets/images/icons/edit.png";
import user from "../../assets/images/icons/user.png";
import book from "../../assets/images/icons/book.png";
import arrow from "../../assets/images/icons/arrow_long_right.png";

const Dashboard = () => {
  function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    // Function to add the appropriate ordinal suffix
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
  const formattedDate = formatDate(today);

  const items = [
    {
      id: 1,
      title: "total user",
      amount: 49,
      dec: "Total amount of users",
      bg_color: "#C9EBED",
      img: edit,
    },
    {
      id: 2,
      title: "recent registration",
      amount: 16,
      dec: "Amount od recent registration",
      bg_color: "#FBECC4",
      img: user,
    },
    {
      id: 3,
      title: "total cutlist",
      amount: "12.5k",
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
    },
    {
        id: 2,
        name: "Manuel Ugate",
        dec: "Created a new cutlist",
    },
    {
        id: 3,
        name: "Alxis Sanchez",
        dec: "Complited a cutlist",
    }
  ]

  const handlePrint = (record) => {
    const printContent = `
      Customer Name: ${record.customer_name}\n
      Status: ${record.status}\n
      Date: ${record.date}\n
      Credit Package: ${record.credit_package}\n
      Amount: ${record.amount}
    `;
    const printWindow = window.open("", "", "height=400,width=600");
    printWindow.document.write("<pre>" + printContent + "</pre>");
    printWindow.document.close();
    printWindow.print();
  };

  const columns = [
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
        let color = "";
        let bgColor = "";

        switch (text) {
          case "pending":
            color = "#127CDD";
            bgColor = "#D0E8FF";
            break;
          case "paid":
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
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Credit Package",
      dataIndex: "credit_package",
      key: "credit_package",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
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
          onClick={() => handlePrint(record)}
        >
          <PrinterOutlined style={{ fontSize: "18px", marginRight: "5px" }} />{" "}
          Printer
        </span>
      ),
    },
  ];

  const data = [
    { day: 'Sun' },
    { day: 'Mon', sales: 200 },
    { day: 'Tue', sales: 150 },
    { day: 'Wed', sales: 80 },
    { day: 'Thu', sales: 170 },
    { day: 'Fri', sales: 220 },
    { day: 'Sat', sales: 130 },
  ];

  const config = {
    data,
    xField: 'day',   // Days of the week on the x-axis
    yField: 'sales', // Sales data on the y-axis
    smooth: true,    // Optional: for a smooth curve
    tooltip: {
      showMarkers: true,
      formatter: (datum) => ({
        name: 'Sales',
        value: datum.sales ? `$${datum.sales}` : 'No Data',
      }),
    },
    point: {
      size: 5,
      shape: 'circle',
    },
    xAxis: {
      title: {
        text: 'Day of the Week',
        style: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    },
    yAxis: {
      title: {
        text: 'Sales',
        style: {
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    },
    lineStyle: {
      stroke: '#5B8FF9',
      lineWidth: 2,
    },
    meta: {
      day: {
        alias: 'Day of the Week',
      },
      sales: {
        alias: 'Sales',
        formatter: (value) => (value ? `$${value}` : 'No Data'),
      },
    },
  };


  return (
    <div className="relative top-14">
      <div className="mt-5">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-4">
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

              <Table
                columns={columns}
                dataSource={tableData}
                className="mt-8"
                style={{ fontSize: "11px" }}
              />
            </div>
          </div>

          <div className="col-span-1">
            <div class="grid grid-rols-3 gap-4">
              <div class="bg-white rounded p-4 text-center">Item 1</div>
              <div class="bg-white rounded p-4">
                <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Recent Activity</h1>
                <img src={arrow} alt="" />
                </div>
                {/* <Line {...config} /> */}
              </div>
              <div class="bg-white rounded p-4">
                <h1 className="font-bold text-lg">Recent Activity</h1>
                <div>
                    {recent.map((e) => (
                        <div class="grid grid-rols gap-4 mt-2 bg-[#F5F5F5] p-2 rounded-md" key={e.id}>
                        <div className="flex gap-2">
                            <div className="rounded-full bg-red-500 h-9 w-9"></div>
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
