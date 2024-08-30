import React from "react";
import { Table } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

const Payment = () => {
  const data = [
    {
      id: 1,
      title: "Credit Purchased",
      count: 10,
      bg_color: "#FBECC4",
    },
    {
      id: 2,
      title: "Credit Pending",
      count: 1,
      bg_color: "#C9EBED",
    },
    {
      id: 3,
      title: "Credit Completed",
      count: 8,
      bg_color: "#F5DEDE",
    },
    {
      id: 4,
      title: "Total Credit Package",
      count: 5,
      bg_color: "#D0D1FF",
    },
  ];

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
  
  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
        <div className="grid grid-cols-4 gap-10">
          {data.map((e) => (
            <div
              className="p-4 rounded-lg flex flex-col items-center py-7"
              key={e.id}
              style={{ backgroundColor: e.bg_color }}
            >
              <div className="flex items-center">
                <img src={e.img} alt="" className="mr-2" />
                <h1 className="capitalize font-semibold">{e.title}</h1>
              </div>
              <h2 className="text-center font-bold text-2xl">{e.count}</h2>
              <p className="text-center font-semibold normal-case text-sm">
                {e.dec}
              </p>
            </div>
          ))}
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={tableData}
            className="mt-8"
            style={{ fontSize: "11px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
