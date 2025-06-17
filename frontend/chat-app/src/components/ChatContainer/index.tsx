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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const fileInputref = useRef<HTMLInputElement>(null);
  const { authUser, onlineUsers, socket } = useAuthStore();
  const messageEndRef = useRef<HTMLDivElement>(null);

  const handleChangeMessage = (e: any) => {
    setMessageSend(e.target.value);
  };

  const getMessages = async () => {
    try {
      const res = await request.get(`/messages/${selectedUser?._id}`);
      if (res?.data) {
        setMessages(res?.data);
      }
    } catch (error) {}
  };

  const subscribeToMessages = () => {
    if (!selectedUser?._id) {
      return;
    }

    socket.on("newMessage", (newMessage: any) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  };

  const unsubscribeToMessages = () => {
    socket.off("newMessage");
  };

  const handleSendMessages = async () => {
    if (!messageSend.trim() && !imagePreview) {
      toast.error("Please enter content to send message");
      return;
    }

    try {
      const response = await request.post(
        `/messages/send/${selectedUser?._id}`,
        {
          text: messageSend,
          image: imagePreview,
        }
      );

      if (response.data) {
        setMessages((prev) => [...prev, response.data]);
      }

      setMessageSend("");
      setImagePreview(null);
      if (fileInputref.current) fileInputref.current.value = "";
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
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
    subscribeToMessages();

    return () => unsubscribeToMessages();
  }, [selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
            <p className="user-status">
              {onlineUsers.includes(selectedUser?._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={onCloseChat}>
          <X />
        </button>
      </div>
      <div className="chat-container-content">
        {messages?.map((item: IMessage, index) => {
          const date = new Date(item?.createdAt);

          return (
            <div
              className={`chat-container-desc ${
                authUser?._id === item?.senderId ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
              key={index}
            >
              {authUser?._id === item?.senderId ? null : (
                <img src={selectedUser?.profilePic || avatarDefault} />
              )}
              <div
                className={`chat-contaier-info ${
                  authUser?._id === item?.senderId ? "chat-end" : "chat-start"
                }`}
              >
                {item?.image ? (
                  <img
                    className="chat-container-image"
                    src={item?.image}
                    alt="messeage image"
                  />
                ) : null}

                <CardChat
                  isSender={authUser?._id === item?.senderId}
                  content={item?.text}
                  hour={`${date.getHours()}:${date.getMinutes()}`}
                />
              </div>
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
            placeholder="Type a message..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessages();
              }
            }}
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
