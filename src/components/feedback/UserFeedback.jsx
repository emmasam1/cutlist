import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import close from "../../assets/images/icons/close.png";
import { Button, Card, Input } from "antd";

import { Context } from "../../context/Context";

const UserFeedback = () => {
  const location = useLocation();
  const record = location.state ? location.state.record : null;

  const createdTime = new Date(record.createdAt);
  const formattedTime = createdTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  const replyMessage = record.replies && record.replies.length > 0 ? record.replies[0].message : "No replies yet";

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <img src={record.avatar} alt={record.fullName} className="w-14" />
            <h3 className="font-bold">{record.fullName}</h3>
          </div>
          <Link to="/feedback">
            <Button>
              <img src={close} alt="" className="w-3" />
            </Button>
          </Link>
        </div>

        <div className="p-4">
          <div className="p-2">
            <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-96 max-w-full">
              <p>{record.message}</p>
              <div className="flex justify-end">
                <span className="text-xs">{formattedTime}</span>
              </div>
            </Card>
          </div>

          {/* Responsive Reply Section */}
          <div className="p-2 flex justify-end">
            <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-96 max-w-full">
              <p>{replyMessage}</p>
              <div className="flex justify-end">
                <span className="text-xs">{formattedTime}</span>
              </div>
            </Card>
          </div>

          <div className="mt-10">
            <Input placeholder="Write a reply..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
