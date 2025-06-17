import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import loginImage from "../../assets/login.png";
import toast from "react-hot-toast";
import { request } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

const LoginPage = () => {
  const { saveAuthUser, connectSocket } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitFormLogin = async () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      const res = await request.post("/auth/login", formData);
      saveAuthUser(res?.data);
      toast.success("Login account successfully");
      connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup login">
      <div className="signup-contain">
        <div className="signup-form">
          <div>
            <h2 className="signup-title">Welcome back</h2>
            <p className="signup-desc">Sign in to your account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col input-item">
              <label className="label-input">Email</label>
              <input
                className="input"
                type="email"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col input-item">
              <label className="label-input">Password</label>
              <div className="contain-input-password">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input"
                  placeholder="Enter your password"
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                />
                <button
                  className="btn-show-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button onClick={handleSubmitFormLogin} className="btn">
              Log in
            </button>
          </form>
          <div className="flex items-center">
            <p className="signup-desc">Don't have an account?</p>
            &nbsp;
            <Link to={ROUTES.SIGN_UP} className="btn-signin">
              Sign up
            </Link>
          </div>
        </div>
        <div className="signup-image">
          <img alt="sign up image" src={loginImage} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
