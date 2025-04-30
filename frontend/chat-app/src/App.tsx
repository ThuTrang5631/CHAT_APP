import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ROUTES } from "./utils/constants";
import HomePage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  console.log("pathName", pathname);

  if (!authUser && [ROUTES.PROFILE, ROUTES.HOME_PAGE].includes(pathname)) {
    navigate(ROUTES.LOGIN);
  }

  if ([ROUTES.SIGN_UP, ROUTES.LOGIN].includes(pathname) && authUser) {
    console.log("have user");

    navigate(ROUTES.HOME_PAGE);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="container-app">
      <Navbar />

      <Routes>
        <Route path={ROUTES.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.SETTING} element={<SettingPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      </Routes>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
