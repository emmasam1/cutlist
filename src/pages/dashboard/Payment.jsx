import React, { useState, useEffect, useContext } from "react";
import { message, Table } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { Context } from "../../context/Context";
import { ThreeDots } from "react-loader-spinner";

import LineChart from "../../components/chart/LineChart";
import LineChart2 from "../../components/chart/LinChart2";
import axios from "axios";

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [sourcedData, setSourcedData] = useState([])

  const { baseUrl, accessToken } = useContext(Context);

  const getPayments = async () => {
    const paymentUrl = `${baseUrl}/payments/admin`;
    setLoading(true);
    try {
      const response = await axios.get(paymentUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      message.success(response.data.message);

      const sourcedData = response.data.payments.map((payment) => ({
        key: payment._id,
        customer_name: payment.user.fullName,
        status: payment.status,
        date: new Date(payment.paymentDate).toLocaleDateString(),
        credits: payment.credits,
        amount: payment.amount,
        invoice: payment.paymentId,
      }));

      setSourcedData(sourcedData);
      console.log(sourcedData);
      
    } catch (error) {
      console.log(error);
      message.error("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };
  
  // The rest of your table columns remain unchanged
  

  useEffect(()=> {
    getPayments()
  },[])

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
      title: "SN",
      render: (_, __, index) => index + 1,
      width: 70,
    },
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
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Credit Package",
      dataIndex: "credits",
      key: "credits",
      render: (text) => `${text} Credits`,
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
          <PrinterOutlined style={{ fontSize: "18px", marginRight: "5px" }} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 mt-6 sm:mt-0">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <div className="w-full">
            <LineChart />
          </div>
          <div className="w-full">
            <LineChart2 />
          </div>
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
  );
};

export default Payment;
