import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Input, message } from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import close from "../../assets/images/icons/close.png";
import { Context } from "../../context/Context";

const UserFeedback = () => {
  const location = useLocation();
  const record = location.state?.record || null;
  const { baseUrl, accessToken, loggedInUser } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [replies, setReplies] = useState(record?.replies || []);

  useEffect(() => {
    const getFeedBack = async () => {
      if (!record) return;

      setLoading(true);
      const feedBackUrl = `${baseUrl}/feedback/all-feedback`;

      try {
        const response = await axios.get(feedBackUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log("for testing", response.data.feedback.replies);

        const feedbackArray = response.data.feedback || [];
        const sourcedData = feedbackArray.find(
          (feedback) => feedback._id === record.key
        );

        if (sourcedData) {
          const replies = sourcedData.replies || [];
          setReplies(replies);

          // Extract all sender._id values
          const senderIds = replies.map((reply) => reply.sender._id);
          console.log("Sender IDs:", senderIds);
        } else {
          message.error("Feedback record not found.");
        }
      } catch (error) {
        const errorMessage = error.response?.data?.msg || "An error occurred";
        message.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    getFeedBack();
  }, [record, baseUrl, accessToken]);

  const feedbackReply = async () => {
    if (!record || !record.key) {
      message.error("Invalid feedback record. Please refresh and try again.");
      return;
    }

    const replyUrl = `${baseUrl}/feedback/admin-reply`;
    const payload = {
      feedbackId: record.key,
      message: reply,
      files: [],
    };

    setLoading(true);

    try {
      const response = await axios.post(replyUrl, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const newReply = response.data;
      // console.log(newReply);

      const len = newReply.feedback.replies.length;
      const record = {
        message: newReply.feedback.replies[len - 1].message,
        createdAt: newReply.feedback.replies[len - 1].createdAt,
        userId: newReply.feedback.replies[len - 1].userId,
      };

      setReplies((prevReplies) => [...prevReplies, record]);
      setReply("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error sending reply. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  console.log("current user", record.senderId);
  console.log("admin id", loggedInUser._id);

  return (
    <div className="relative top-14">
      <div className="bg-white rounded p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <img
              src={record.avatar}
              alt={record.fullName}
              className="w-12 rounded-full h-12 object-cover"
            />
            <h3 className="font-bold">{record.fullName}</h3>
          </div>
          <Link to="/feedback">
            <Button>
              <img src={close} alt="" className="w-3" />
            </Button>
          </Link>
        </div>

        <div className="overflow-y-auto max-h-96 p-4">
          <div className="p-2">
            <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-96 max-w-full">
              <p>{record.message}</p>
              <div className="flex justify-end">
                <span className="text-xs">
                  {new Date(record.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
            </Card>
          </div>
          {replies.length > 0 ? (
            replies.map((reply, index) => (
              <div
                key={index}
                className={`p-2 flex ${
                  reply.sender._id === loggedInUser._id
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-full max-w-xs sm:max-w-md md:max-w-lg">
                  <p className="break-words">{reply.message}</p>
                  <div className="flex justify-end">
                    <span className="text-xs">
                      {new Date(reply.createdAt).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </Card>
              </div>
            ))
          ) : (
            <div className="p-2 flex justify-end">
              <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-full max-w-xs sm:max-w-md md:max-w-lg flex items-center justify-center">
                {loading ? (
                  <div className="loader">Loading replies...</div> // Add your loader component here
                ) : (
                  ""
                )}
              </Card>
            </div>
          )}
        </div>

        <div className="mt-10">
          <Input
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onPressEnter={feedbackReply}
            addonAfter={
              <Button
                type="primary"
                onClick={feedbackReply}
                style={{ borderRadius: "0" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            }
            addonBefore={
              <Button icon={<UploadOutlined />} style={{ borderRadius: "0" }} />
            }
            style={{ borderRadius: "5px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
