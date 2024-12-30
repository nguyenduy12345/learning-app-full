import { useState, useContext, useEffect } from "react";

import instance from "../utils/axiosRequest";
import { UserInfo } from "../stores/user.store";
import MainLayout from "../layouts/MainLayout.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import ChangeProfile from "../components/ChangeProfile.jsx";
const Profile = () => {
  const { profile, setProfile } = useContext(UserInfo);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [avatar, setAvatar] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [message, setMessage] = useState(false);
  const [countRequest, setCountRequest] = useState(0);
  const handleAvatarChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      let result = URL.createObjectURL(file);
      setChangeAvatar(file);
      setAvatar(result);
    }
  };
  const handleSaveAvatar = async (e) => {
    if (countRequest === 1) return;
    setCountRequest(1);
    if (!avatar) {
      setCountRequest(0);
      return;
    }
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", changeAvatar);
    setMessage("Đang lưu ảnh...");
    await instance
      .patch("users/avatar", formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        }
      })
      .then((res) => {
        setProfile((prev) => {
          return { ...prev, avatar: res.data.avatar };
        });
        setAvatar(false);
        setMessage(res.data.message);
        setTimeout(() => setMessage(""), 1000);
        setCountRequest(0);
        setIsEditing(false);
      })
      .catch((err) => {
        setCountRequest(0);
        setMessage(err.response.data[0].message);
      });
  };
  const handleCancelUpdateAvatar = () => {
    setAvatar(false);
    setIsEditing(false);
  };
  return (
    <MainLayout>
      {!!profile && (
        <div className="absolute mt-[5rem] w-full rounded-lg bg-white pb-[5rem] shadow-lg md:left-[5.5rem] md:w-[75vw] lg:left-[17rem] lg:w-[69vw]">
          <div className="relative flex w-full justify-center">
            <img
              src={
                avatar
                  ? avatar
                  : profile.avatar
                    ? profile.avatar
                    : "/images/logo/person-default.png"
              }
              alt="User Avatar"
              className="lazyload h-96 w-full rounded-lg object-cover sm:w-3/4 md:h-[60vh] lg:w-[60%] xl:w-[45%]"
            />
            {isEditing ? (
              <ul className="absolute bottom-1 right-4 flex">
                <button
                  onClick={handleCancelUpdateAvatar}
                  className="flex transform rounded-full bg-gradient-to-r from-pink-400 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
                >
                  <span className="font-noto text-sm">Dừng thay đổi</span>
                </button>
                <button
                  onClick={handleSaveAvatar}
                  className="transform rounded-full bg-gradient-to-r from-pink-400 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${isEditing ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <span className="font-noto text-sm">
                      Lưu ảnh
                    </span>
                  </span>
                </button>
              </ul>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-1 right-4 transform rounded-full bg-gradient-to-r from-pink-400 to-blue-600 px-4 py-2 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${isEditing ? "rotate-180" : "rotate-0"} transition-transform duration-300`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span className="font-noto text-sm">Chỉnh sửa ảnh</span>
                </span>
              </button>
            )}
          </div>

          {/* Avatar edit form */}
          {isEditing && (
            <div className="flex justify-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="mt-2 rounded-lg border p-2"
              />
            </div>
          )}
          <p className="mt-1 w-full text-wrap px-2 text-center text-2xl text-red-600">
            {message}
          </p>
          <div className="ml-3 mt-3 md:ml-0 md:text-center">
            <h2 className="font-noto text-xl lg:text-2xl">
              Tên: {profile.fullName}
            </h2>
            <p className="mt-2 font-noto text-xl lg:text-2xl">
              Email: {profile.email}
            </p>
            <p className="mt-2 font-noto text-xl lg:text-2xl">
              Giới tính: {profile.sex === 0 ? "Nữ" : "Nam"}
            </p>
          </div>
          <div className="mx-2 mt-6 flex flex-col justify-center md:flex-row">
            <div
              onClick={() => setIsEditProfile(!isEditProfile)}
              className="transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-400 to-blue-600 px-6 py-3 font-noto text-lg text-white shadow-lg transition-transform duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95"
            >
              Chỉnh sửa thông tin
            </div>
            <div
              onClick={() => setIsEditPassword(!isEditPassword)}
              className="mt-2 transform cursor-pointer rounded-lg bg-gradient-to-r from-pink-400 to-blue-600 px-6 py-3 font-noto text-lg text-white shadow-lg transition-transform duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:scale-95 md:ml-2 md:mt-0"
            >
              Thay đổi mật khẩu
            </div>
          </div>
        </div>
      )}
      {isEditPassword && (
        <ChangePassword setIsEditPassword={setIsEditPassword} />
      )}
      {isEditProfile && <ChangeProfile setIsEditProfile={setIsEditProfile} />}
    </MainLayout>
  );
};

export default Profile;
