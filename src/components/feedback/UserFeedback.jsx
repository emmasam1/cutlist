import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Input, message, Upload } from "antd";
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
  const [files, setFiles] = useState([]); // State to manage uploaded files
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

        console.log("user feedback", feedbackArray);
        console.log("user", sourcedData.sender.avatar);

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

  // const feedbackReply = async () => {
  //   if (!record || !record.key) {
  //     message.error("Invalid feedback record. Please refresh and try again.");
  //     return;
  //   }

  //   const replyUrl = `${baseUrl}/feedback/admin-reply`;
  //   const formData = new FormData();
  //   formData.append("feedbackId", record.key);
  //   formData.append("message", reply);
  //   formData.append("files", files);

  //   // Append files to form data
  //   files.forEach((file) => {
  //     formData.append("files", file);
  //   });

  //   setLoading(true);

  //   try {
  //     const response = await axios.post(replyUrl, formData, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     console.log(response)

  //     const newReply = response.data;
  //     const len = newReply.feedback.replies.length;

  //     const record = {
  //       message: newReply.feedback.replies[len - 1].message,
  //       createdAt: newReply.feedback.replies[len - 1].createdAt,
  //       sender: {
  //         _id: loggedInUser._id,
  //         fullName: loggedInUser.fullName,
  //       },
  //     };

  //     setReplies((prevReplies) => [...prevReplies, record]);
  //     setReply("");
  //     setFiles([]); // Clear files after sending
  //   } catch (error) {
  //     const errorMessage =
  //       error.response?.data?.error || "Error sending reply. Please try again.";
  //     message.error(errorMessage);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const feedbackReply = async () => {
    if (!record || !record.key) {
      message.error("Invalid feedback record. Please refresh and try again.");
      return;
    }

    const replyUrl = `${baseUrl}/feedback/admin-reply`;
    const formData = new FormData();
    formData.append("feedbackId", record.key);
    formData.append("message", reply);

    // Append each file individually to the formData
    files.forEach((file) => {
      formData.append("files", file.originFileObj); // Use originFileObj for files from Ant Design Upload
    });

    setLoading(true);

    try {
      const response = await axios.post(replyUrl, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      const newReply = response.data;
      const len = newReply.feedback.replies.length;

      const record = {
        message: newReply.feedback.replies[len - 1].message,
        createdAt: newReply.feedback.replies[len - 1].createdAt,
        sender: {
          _id: loggedInUser._id,
          fullName: loggedInUser.fullName,
        },
      };

      setReplies((prevReplies) => [...prevReplies, record]);
      setReply("");
      setFiles([]); // Clear files after sending
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
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={reply.sender.avatar}
                      alt=""
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-96 max-w-full">
                      <p>{reply.message}</p>
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
              <Card className="bg-[#F5F5F5] shadow-lg rounded-tr-lg rounded-br-lg rounded-bl-none w-96 max-w-full">
                <p>No replies yet</p>
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
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFileChange} // Handle file selection
                fileList={files} // Controlled file state
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
