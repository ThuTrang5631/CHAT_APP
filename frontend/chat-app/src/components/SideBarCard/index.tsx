import { request } from "../../lib/axios";
import avatarDefault from "../../assets/user.png";
import { useEffect, useState } from "react";
import { AuthUser, useAuthStore } from "../../store/useAuthStore";

interface ISideBarCard {
  onSelect?: (data: any) => void;
}

const SideBarCard = ({ onSelect }: ISideBarCard) => {
  const [user, setUser] = useState<AuthUser[]>([]);
  const { onlineUsers } = useAuthStore();

  const getUser = async () => {
    try {
      const res = await request.get("/messages/users");
      if (res?.data) {
        setUser(res?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="side-bar setting-page">
      {user?.map((item, index) => {
        return (
          <button
            className="side-bar-user flex gap-[10px] items-center"
            onClick={() => {
              onSelect?.(item);
            }}
            key={index}
          >
            <img
              className="side-bar-user-avatar"
              src={item?.profilePic || avatarDefault}
            />
            <div className="setting-page-card-desc side-bar-card-content">
              <p className="card-desc-title">{item?.fullName}</p>
              <p className="card-desc-status">
                {onlineUsers?.includes(item?._id) ? "Online" : "Offline"}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default SideBarCard;
