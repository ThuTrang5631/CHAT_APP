import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { request } from "../../lib/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { authUser, saveAuthUser } = useAuthStore();

  const handleLogOut = async () => {
    try {
      const res = await request.post("/auth/logout");
      if (res) {
        saveAuthUser(null);
        toast.success("Log out successfuly");
      }
    } catch (error: any) {
      console.log("Error of log out");
      toast.error(error.response.data.message);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to={ROUTES.HOME_PAGE} className="flex items-center gap-[5px]">
          <MessageSquare className="w-5 h-5" />
          <h1 className="header-title">Chatty</h1>
        </Link>
      </div>
      <div className="header-right flex gap-[15px]">
        <button className="flex items-center gap-[5px]">
          <Settings />
          <p className="header-desc">Settings</p>
        </button>

        {authUser ? (
          <>
            <button className="flex items-center gap-[5px]">
              <User />
              <p className="header-desc">Profile</p>
            </button>
            <button
              className="flex items-center gap-[5px]"
              onClick={handleLogOut}
            >
              <LogOut />
              <p className="header-desc">Log out</p>
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
