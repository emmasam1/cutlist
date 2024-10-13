import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Input, message, Upload, Image, List } from "antd";
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
  const [files, setFiles] = useState([]);
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

        const feedbackArray = response.data.feedback || [];
        const sourcedData = feedbackArray.find(
          (feedback) => feedback._id === record.key
        );

        if (sourcedData) {
          setReplies(sourcedData.replies || []);
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
    const formData = new FormData();
    formData.append("feedbackId", record.key);
    formData.append("message", reply);

    files.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    setLoading(true);

    try {
      const response = await axios.post(replyUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const newReplyData = response.data;
      const len = newReplyData.feedback.replies.length;
      const newReply = newReplyData.feedback.replies[len - 1];

      const replyRecord = {
        _id: newReply._id,
        message: newReply.message,
        createdAt: newReply.createdAt,
        sender: {
          _id: loggedInUser._id,
          fullName: loggedInUser.fullName,
          avatar: loggedInUser.avatar,
        },
        files: newReply.files || [],
      };

      setReplies((prevReplies) => [...prevReplies, replyRecord]);
      setReply("");
      setFiles([]);
      message.success("Reply sent successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Error sending reply. Please try again.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = ({ fileList }) => {
    setFiles(fileList);
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif|bmp|svg)$/.test(url.toLowerCase());
  };

  return (
    <div className="relative top-14 px-2 lg:px-0">
      <div className="bg-white rounded p-4">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <img
              src={record.avatar}
              alt={record.fullName}
              className="w-8 h-8 lg:w-12 lg:h-12 rounded-full object-cover"
            />
            <h3 className="font-bold text-sm lg:text-base">
              {record.fullName}
            </h3>
          </div>
          <Link to="/feedback">
            <Button>
              <img src={close} alt="Close" className="w-4" />
            </Button>
          </Link>
        </div>

        {/* Main Feedback and Replies */}
        <div className="overflow-y-auto max-h-72 lg:max-h-96 p-4">
          {/* Main Feedback Card */}
          <div className="p-2">
            <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-full max-w-full lg:max-w-lg">
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

          {/* Replies Section */}
          {replies.length > 0 ? (
            replies.map((reply, index) => (
              <div
                key={reply._id || index} // Preferably use a unique identifier
                className={`p-2 ${
                  reply.sender && reply.sender._id === loggedInUser._id
                    ? "flex justify-end"
                    : "flex justify-start"
                }`}
              >
                <div
                  className={`flex items-center gap-4 ${
                    reply.sender && reply.sender._id === loggedInUser._id
                      ? "flex-row-reverse justify-end"
                      : "justify-start"
                  }`}
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden">
                    <img
                      src={reply.sender.avatar}
                      alt={reply.sender.fullName}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Card
                      className={`shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-full max-w-full lg:max-w-lg ${
                        reply.sender && reply.sender._id === loggedInUser._id
                          ? "bg-[#f2c84c6a]" // Light blue for logged-in user
                          : "bg-gray-100" // Light gray for other users
                      }`}
                    >
                      <p>{reply.message}</p>
                      {/* Render Files */}
                      {reply.files && reply.files.length > 0 && (
                        <List
                          grid={{ gutter: 16, column: 4 }}
                          dataSource={reply.files}
                          renderItem={(file, fileIndex) => (
                            <List.Item key={fileIndex}>
                              {isImage(file) ? (
                                <Image
                                  width={100}
                                  src={file}
                                  alt={`file-${fileIndex}`}
                                  style={{ cursor: "pointer" }}
                                  // onClick={() => window.open(file, "_blank")}
                                />
                              ) : (
                                <a
                                  href={file}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Button icon={<UploadOutlined />}>
                                    Download File {fileIndex + 1}
                                  </Button>
                                </a>
                              )}
                            </List.Item>
                          )}
                        />
                      )}
                    </Card>
                    <div className="flex justify-end mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(reply.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 flex justify-end">
              <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-full lg:w-96 max-w-full">
                {loading ? <p>Loading replies ....</p> : <p>No replies yet</p>}
              </Card>
            </div>
          )}
        </div>

        {/* Reply Input Section */}
        <div className="mt-10">
          <Input
            placeholder="Write a reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onPressEnter={feedbackReply}
            addonAfter={
              <Button
                type="primary"
                className="bg-[#F1B31C] hover:!bg-[#F1B31C] hover:!text-black border-none text-black"
                onClick={feedbackReply}
                style={{ borderRadius: "0" }}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </Button>
            }
            addonBefore={
              <Upload
                multiple
                beforeUpload={() => false}
                onChange={handleFileChange} 
                fileList={files}
                showUploadList={false} // This line hides the file names
              >
                <Button
                  icon={<UploadOutlined className="hover:!text-black" />}
                  className="bg-[#F1B31C] hover:!bg-[#F1B31C] rounded-none border-none"
                ></Button>
              </Upload>
            }
            style={{ borderRadius: "5px" }}
            
          />
        </div>
      </div>
    </div>
  );
};

export default UserFeedback;
