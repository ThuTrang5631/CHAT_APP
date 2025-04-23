import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ROUTES } from "./utils/constants";
import HomePage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";

const App = () =>{
  return <div>
    <Navbar/>

    <Routes>
      <Route path={ROUTES.HOME_PAGE} element={<HomePage/>}/>
      <Route path={ROUTES.SIGN_UP} element={<SignupPage/>}/>
      <Route path={ROUTES.LOGIN} element={<LoginPage/>}/>
      <Route path={ROUTES.SETTING} element={<SettingPage/>}/>
      <Route path={ROUTES.PROFILE} element={<ProfilePage/>}/>
    </Routes>
  </div>
}

export default App;