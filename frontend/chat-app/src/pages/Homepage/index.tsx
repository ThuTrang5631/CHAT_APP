import { MessageSquare } from "lucide-react";
import SideBar from "../../components/SideBarCard";
import { useState } from "react";
import ChatContainer from "../../components/ChatContainer";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState("");

  const handleSelectedUser = (user: any) => {
    setSelectedUser(user);
  };

  return (
    <div className="home-page">
      <div className="home-page-title"></div>
      <div className="home-page-content flex">
        <div className="home-page-contain-sidebar">
          <SideBar onSelect={handleSelectedUser} />
        </div>
        <div className="home-page-contain-content">
          {selectedUser ? (
            <>
              <ChatContainer
                selectedUser={selectedUser}
                onCloseChat={() => setSelectedUser("")}
              />
            </>
          ) : (
            <div className="home-page-mess-empty">
              <MessageSquare className="w-5 h-5" />
              <h3>Welcome to Chatty</h3>
              <p>Select a conversation from the sidebar to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
