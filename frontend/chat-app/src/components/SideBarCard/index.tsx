import { request } from "../../lib/axios";
import avatarDefault from "../../assets/user.png";
import { useEffect, useMemo, useState } from "react";
import { AuthUser, useAuthStore } from "../../store/useAuthStore";

interface ISideBarCard {
  onSelect?: (data: any) => void;
}

const SideBarCard = ({ onSelect }: ISideBarCard) => {
  const [user, setUser] = useState<AuthUser[]>([]);
  const [checkUserOnline, setCheckUserOnline] = useState<boolean>(false);
  const { onlineUsers } = useAuthStore();

  const handleChangeCheckUserOnline = (e: any) => {
    setCheckUserOnline(e.target.checked);
  };

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

  const filterUser = useMemo(() => {
    const data = checkUserOnline
      ? user?.filter((item) => onlineUsers?.includes(item?._id))
      : user;

    return data;
  }, [checkUserOnline, user]);

  return (
    <div className="setting-page side-bar">
      <div className="side-bar-top flex gap-[8px]">
        <input
          type="checkbox"
          onChange={handleChangeCheckUserOnline}
          checked={checkUserOnline}
        />
        <div className="side-bar-checked">
          <label>Show online only</label>
          <span>{`(${onlineUsers?.length - 1} online)`}</span>
        </div>
      </div>

      <div
        className="side-bar-contain-user"
        style={{ display: filterUser?.length ? "block" : "none" }}
      >
        {filterUser?.map((item, index) => {
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

      {filterUser.length === 0 && (
        <div className="text-center text-zinc-500 py-4">No online users</div>
      )}
    </div>
  );
};

export default SideBarCard;
