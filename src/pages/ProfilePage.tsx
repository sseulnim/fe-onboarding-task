import { useAuthStore } from "@/store/authStore";
import Button from "@/components/common/Button";
import { useNavigate } from "react-router-dom";
import ProfileUpdateForm from "@/components/auth/ProfileUpdateForm";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">프로필</h1>
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            {user?.avatar && (
              <img
                src={user.avatar}
                alt="프로필 이미지"
                className="w-24 h-24 rounded-full"
              />
            )}
          </div>
          <ProfileUpdateForm />
          <Button onClick={handleLogout} variant="secondary" className="w-full">
            로그아웃
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
