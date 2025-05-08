import { Camera } from "lucide-react";
import loginImage from "../../assets/login.jpg";
import { useAuthStore } from "../../store/useAuthStore";

const ProfilePage = () => {
  const { authUser } = useAuthStore();

  const handleChangeInputFile = (e: any) => {
    console.log("value", e);
  };

  const handleUploadProfile = async () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="profile-page">
      <div className="profile-page-container">
        <div className="profile-section">
          <h1 className="profile-page-title">Profile</h1>
          <p className="profile-page-desc">Your profile information</p>
        </div>
        <div className="profile-section">
          <div className="profile-section-avatar">
            <img
              src={loginImage}
              alt="profile-image"
              className="profile-page-image"
            />

            <span className="profile-page-icon">
              <input
                type="file"
                id="file"
                className="profile-page-input"
                onChange={(e) => handleChangeInputFile(e)}
              />
            </span>
          </div>
          <div className="flex flex-col input-item w-full">
            <label className="label-input">Full Name</label>
            <input
              value={authUser?.fullName}
              className="input"
              readOnly={true}
            />
          </div>
          <div className="flex flex-col input-item w-full">
            <label className="label-input">Email</label>
            <input className="input" readOnly={true} value={authUser?.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
