import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import link from "../assets/images/icons/link.png";
import logo from "../assets/images/icons/logo_small.png";
import serach from "../assets/images/icons/search.png";
import bell from "../assets/images/icons/bell.png";
import dashboard from "../assets/images/icons/dashboard.png";
import user_outline_2 from "../assets/images/icons/user_outline_2.png";
import policy_2 from "../assets/images/icons/policy_2.png";
import coin_dark from "../assets/images/icons/coin_dark.png";
import bell_dark from "../assets/images/icons/bell_dark.png";
import wallet from "../assets/images/icons/wallet.png";
import feedback from "../assets/images/icons/feedback.png";

import { Layout, Menu, theme } from "antd";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

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
const formattedDate = formatDate(today);

const items = [
  getItem(
    "Dashboard",
    "/dashboard",
    <img src={dashboard} alt="" className="w-1" />
  ),
  getItem(
    "Users",
    "/users",
    <img src={user_outline_2} alt="" className="w-1" />
  ),
  getItem("Cutlist", "/cutlist", <img src={policy_2} alt="" className="w-1" />),
  getItem(
    "Credit Packages",
    "/credit-packages",
    <img src={coin_dark} alt="" className="w-4" />
  ),
  getItem(
    "Notification",
    "/notification",
    <img src={bell_dark} alt="" className="w-1" />
  ),
  getItem("Payments", "/payment", <img src={wallet} alt="" className="w-5" />),
  getItem(
    "Feedback",
    "/feedback",
    <img src={feedback} alt="" className="w-4" />
  ),
];

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();

  let title = "Default Title";

  if (location.pathname === "/dashboard") {
    title = "Dashboard";
  } else if (location.pathname === "/users") {
    title = "Users";
  } else if (location.pathname.startsWith("/user/")) {
    title = "User Profile";
  } else if (location.pathname === "/cutlist") {
    title = "Cutlist";
  } else if (location.pathname === "/credit-packages") {
    title = "Credit Packages";
  } else if (location.pathname === "/notification") {
    title = "Notification";
  } else if (location.pathname === "/payment") {
    title = "Payments";
  } else if (location.pathname === "/feedback") {
    title = "Feedbacks";
  } else {
    title = "";
  }

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          backgroundColor: "#ffffff",
          borderTopRightRadius: "1rem",
          borderBottomRightRadius: "1rem",
          position: "fixed",
          height: "100vh",
        }}
      >
        <div className="p-4 text-xl font-bold flex items-center">
          <img src={logo} alt="" className="w-6 mx-2" />
          {!collapsed && <h2 className="text-[1rem]">Cutlist</h2>}
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          className="custom-menu"
          onClick={handleMenuClick}
        />

        <div className="flex justify-center items-center flex-col relative top-10">
          <div className="rounded-full w-11 h-11 bg-slate-800"></div>
          <p className="mt-3 font-semibold text-sm">Paul Yonder</p>
          <span className="text-[.8rem] -mt-1">Admin</span>

          <button
            onClick={handleLogout}
            className="flex items-center mt-10 text-sm font-semibold"
          >
            <img src={link} alt="" className="w-4 mr-2" /> Log Out
          </button>
        </div>
      </Sider>
      <Layout
        className="p-5"
        style={{ marginLeft: collapsed ? "80px" : "200px" }}
      >
        <div className="fixed w-[82.5%] bg-[#F5F5F5] top-0 z-10 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-bold text-xl">{title}</h2>
              {title === "Users" ? (
                <p className="text-[.8rem]">Manage your users</p>
              ) : title === "Credit Packages" ? (
                <p className="text-[.8rem]">Manage credit packages</p>
              ) : title === "User Profile" ? (
                <p className="text-[.8rem]">Manage credit packages</p>
              ) : title === "Payments" ? (
                <p className="text-[.8rem]">Manage and monitor payments</p>
              ) : title === "Feedbacks" ? (
                <p className="text-[.8rem]">Manage and reply to feedbacks</p>
              ) : title === "Cutlist" ? (
                <p className="text-[.8rem]">Manage users cutlist</p>
              ) : (
                <p className="text-[.8rem]">{formattedDate}</p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center mr-6">
                <img src={serach} alt="" className="w-5 mr-2" />
                <img src={bell} alt="" className="w-5" />
              </div>
              <div className="flex justify-center items-center">
                <div className="rounded-full w-10 h-10 bg-slate-800 mr-1"></div>
                <div>
                  <p className="font-semibold text-[.9rem] relative top-1">
                    Paul Yonder
                  </p>
                  <span className="text-[.8rem] relative -top-1">Admin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
