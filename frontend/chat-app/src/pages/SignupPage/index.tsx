import { useState } from "react";
import signUpImage from "../../assets/signup.png";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import toast from "react-hot-toast";
import { request } from "../../lib/axios";
import { useAuthStore } from "../../store/useAuthStore";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { saveAuthUser, connectSocket }: any = useAuthStore();

  const handleSubmitFormSignup = async () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");

    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      return toast.error("Invalid email format");

    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    try {
      const res = await request.post("/auth/signup", formData);
      saveAuthUser(res?.data);
      toast.success("Account created successfully");
      connectSocket();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup">
      <div className="signup-contain">
        <div className="signup-form">
          <div>
            <h2 className="signup-title">Create Account</h2>
            <p className="signup-desc">Get started with your free account</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col input-item">
              <label className="label-input">Full Name</label>
              <input
                type="text"
                className="input"
                onChange={(e) => {
                  setFormData({ ...formData, fullName: e.target.value });
                }}
                placeholder="Enter your full name"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              />
            </div>
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
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  className="btn-show-pass"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button onClick={handleSubmitFormSignup} className="btn">
              Create Account
            </button>
          </form>
          <div className="flex items-center">
            <p className="signup-desc">Already have an account? </p>
            &nbsp;
            <Link to={ROUTES.LOGIN} className="btn-signin">
              Log in
            </Link>
          </div>
        </div>
        <div className="signup-image">
          <img alt="sign up image" src={signUpImage} />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
