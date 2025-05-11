import { Camera } from "lucide-react";
import loginImage from "../../assets/login.jpg";
import { useAuthStore } from "../../store/useAuthStore";
import avatarDefault from "../../assets/user.png";
import { request } from "../../lib/axios";
import { cache, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, saveAuthUser } = useAuthStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleUploadProfile = async (e: any) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    try {
      reader.onload = async () => {
        const base64Image = reader.result;

        setPreviewImage(base64Image as string);

        const res = await request.put("/update-profile", {
          profilePic: base64Image,
        });

        if (res) {
          saveAuthUser(res?.data);
          toast.success("Update avatar profile sucessfully");
        }
      };
    } catch (error: any) {
      toast.error(error?.response.data.message);
    }
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
              src={previewImage || authUser?.profilePic || avatarDefault}
              alt="profile-image"
              className="profile-page-image"
            />

            <span className="profile-page-icon">
              <input
                type="file"
                id="file"
                className="profile-page-input"
                onChange={(e) => handleUploadProfile(e)}
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
