import { Loader } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import avatarDefault from "../../assets/user.png";
import { request } from "../../lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { authUser, saveAuthUser } = useAuthStore();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUploadProfile = async (e: any) => {
    const file = e.target.files[0];
    setLoading(true);

    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      try {
        const base64Image = reader.result;

        const res = await request.put("/auth/update-profile", {
          profilePic: base64Image,
        });

        if (res) {
          setPreviewImage(base64Image as string);
          saveAuthUser(res?.data);
          toast.success("Update avatar profile sucessfully");
        }
      } catch (error: any) {
        toast.error(error?.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      toast.error("Error reading file");
      setLoading(false);
    };

    reader.readAsDataURL(file);
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
            {loading ? (
              <div className="flex justify-center items-center w-full h-full flex-col">
                <Loader className="size-10 animate-spin" />
                <p className="text-[13px]">Updating...</p>
              </div>
            ) : (
              <img
                src={previewImage || authUser?.profilePic || avatarDefault}
                alt="profile-image"
                className="profile-page-image"
              />
            )}

            <span className="profile-page-icon">
              <input
                type="file"
                id="file"
                className="profile-page-input"
                onChange={(e) => handleUploadProfile(e)}
                accept="image/*"
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
