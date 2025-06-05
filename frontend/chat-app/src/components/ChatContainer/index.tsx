import { Send, X } from "lucide-react";
import avatarDefault from "../../assets/user.png";
import CardChat from "../CardChat";

interface IChatContainer {
  selectedUser: any;
  onCloseChat: () => void;
}

const ChatContainer = ({ selectedUser, onCloseChat }: IChatContainer) => {
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
        <div className="chat-container-desc">
          <img src={selectedUser?.profilePic || avatarDefault} />
          <CardChat
            isSender={true}
            content="Hey, How's it going?"
            hour="19:40"
          />
        </div>
      </div>
      <div className="chat-container-bottom">
        <input className="chat-container-input" />
        <button className="chat-container-btn-send">
          <Send />
        </button>
      </div>
    </div>
  );
};

export default ChatContainer;
