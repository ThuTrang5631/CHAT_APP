import { Image, Send, X } from "lucide-react";
import avatarDefault from "../../assets/user.png";
import CardChat from "../CardChat";
import { useEffect, useRef, useState } from "react";
import { request } from "../../lib/axios";
import toast from "react-hot-toast";
import { IMessage } from "../../pages/Homepage/data.t";
import { useAuthStore } from "../../store/useAuthStore";

interface IChatContainer {
  selectedUser: any;
  onCloseChat: () => void;
}

const ChatContainer = ({ selectedUser, onCloseChat }: IChatContainer) => {
  const [messageSend, setMessageSend] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const fileInputref = useRef(null);
  const { authUser } = useAuthStore();

  const handleChangeMessage = (e: any) => {
    setMessageSend(e.target.value);
  };

  const getMessages = async () => {
    try {
      const res = await request.get(`/messages/${selectedUser?._id}`);
      console.log("res", res);
      if (res?.data) {
        setMessages(res?.data);
      }
    } catch (error) {}
  };

  const handleSendMessages = async (e: React.MouseEvent) => {
    if (!messageSend.trim() && !imagePreview) {
      toast.error("Please enter content to send message");
      return;
    }

    try {
      const res = await request.post(`/messages/send/${selectedUser?._id}`, {
        text: messageSend,
        image: imagePreview,
      });

      setMessageSend("");
      setImagePreview(null);
      if (fileInputref.current) fileInputref.current.value = "";
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClosePreview = () => {
    setImagePreview(null);
    if (fileInputref.current) {
      fileInputref.current.value = "";
    }
  };

  useEffect(() => {
    getMessages();
  }, [selectedUser]);

  return (
    <div className="chat-container">
      <div className="chat-container-top flex justify-between">
        <div className="chat-container-top-info flex items-center gap-[10px]">
          <img
            className="side-bar-user-avatar"
            src={selectedUser.profilePic || avatarDefault}
          />
          <div className="chat-container-user-info">
            <p className="user-name">{selectedUser?.fullName}</p>
            <p className="user-status">Offline</p>
          </div>
        </div>
        <button onClick={onCloseChat}>
          <X />
        </button>
      </div>
      <div className="chat-container-content">
        {messages?.map((item: IMessage) => {
          const date = new Date(item?.createdAt);

          return (
            <div
              className={`chat-container-desc ${
                authUser?._id === item?.senderId ? "chat-end" : "chat-start"
              }`}
            >
              {authUser?._id === item?.senderId ? null : (
                <img src={selectedUser?.profilePic || avatarDefault} />
              )}

              <CardChat
                isSender={authUser?._id === item?.senderId}
                content={item?.text}
                hour={`${date.getHours()}:${date.getMinutes()}`}
              />
            </div>
          );
        })}
      </div>

      <div className="chat-container-bottom">
        {imagePreview ? (
          <div className="chat-container-preview">
            <img src={imagePreview} alt="preview-image-send" />
            <button
              className="chat-container-close-preview"
              onClick={handleClosePreview}
            >
              <X />
            </button>
          </div>
        ) : null}

        <div className="flex w-full gap-[15px] justify-center items-center">
          <input
            className="chat-container-input"
            onChange={handleChangeMessage}
            value={messageSend}
          />
          <div className="chat-container-upload">
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={(e) => handleImageChange(e)}
              accept="image/*"
              ref={fileInputref}
            />
            <button onClick={() => fileInputref?.current?.click()}>
              <Image />
            </button>
          </div>
          <button
            className="chat-container-btn-send"
            onClick={handleSendMessages}
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
