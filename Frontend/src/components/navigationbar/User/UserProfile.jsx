import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import RaahiLogo from "../../../logos/Raahi.png";
import axios from "axios";

const UserProfile = () => {
  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [navigate, setUser]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 relative">
      {/* Back Arrow */}
      <button
        className="absolute top-6 left-6 flex items-center text-blue-700 hover:text-blue-900 focus:outline-none z-10 bg-white/80 rounded-full p-2 shadow"
        onClick={() => navigate("/home")}
        aria-label="Back to Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="  rounded-3xl p-10 w-full max-w-lg flex flex-col items-center ">
        <div className="w-full flex flex-col items-center mb-8">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-800 tracking-tight drop-shadow">Profile Info</h1>
          <div className="transition-transform duration-200 hover:scale-105 hover:shadow-xl rounded-full border-4 border-blue-200 bg-gradient-to-tr from-blue-100 to-purple-100 p-1">
            <img
              src={user?.avatar || "https://i.pravatar.cc/120?img=12"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-6 items-center mb-6">
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-lg">First Name</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{user?.fullname?.firstname || "-"}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-lg">Last Name</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{user?.fullname?.lastname || ""}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-lg">Email</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{user?.email}</div>
            </div>
          </div>
        </div>
        <div className="w-full border-t border-blue-100 mt-8 pt-5">
          <h3 className="text-xl font-bold mb-3 text-blue-700">Account Details</h3>
          <div className="flex flex-col gap-2">
            <div className="text-base text-gray-700">
              <span className="font-semibold">User ID:</span> {user?._id}
            </div>
            {/* Add more user details here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
