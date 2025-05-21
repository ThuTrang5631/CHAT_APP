import { request } from "../../lib/axios";
import avatarDefault from "../../assets/user.png";

interface ISideBarCard {
  onSelect?: () => void;
}

const SideBarCard = ({ onSelect }: ISideBarCard) => {
  const getUser = async () => {
    try {
      const res = await request.get("/messages/users");
      console.log("res", res);
    } catch (error) {}
  };

  return (
    <div className="side-bar setting-page">
      <button className="side-bar-user flex gap-[10px]" onClick={onSelect}>
        <img className="side-bar-user-avatar" src={avatarDefault} />
        <div className="setting-page-card-desc">
          <p className="card-desc-title">Jane Doe</p>
          <p className="card-desc-status">Offline</p>
        </div>
      </button>
    </div>
  );
};

export default SideBarCard;
