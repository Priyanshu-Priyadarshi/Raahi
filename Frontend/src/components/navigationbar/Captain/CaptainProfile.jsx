import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../../../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProfile = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/captain-login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCaptain(response.data.captain);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load profile");
        setLoading(false);
      });
  }, [navigate, setCaptain]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="min-h-screen max-h-screen flex flex-col items-center justify-center bg-white relative ">
      <button
        className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-700 focus:outline-none z-10 bg-gray rounded-full p-2 shadow"
        onClick={() => navigate("/captain-home")}
        aria-label="Back to Captain Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="rounded-3xl p-4 sm:p-8 w-full max-w-lg flex flex-col items-center bg-white max-h-[90vh] overflow-auto">
        <button
          className="absolute top-6 left-6 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none z-10 bg-gray-200 rounded-full p-2 shadow"
          onClick={() => navigate("/captain-home")}
          aria-label="Back to Captain Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="w-full flex flex-col items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6 text-blue-800 tracking-tight drop-shadow">Captain Profile</h1>
          <div className="transition-transform duration-200 hover:scale-105 hover:shadow-xl rounded-full border-4 border-blue-200 bg-gradient-to-tr from-blue-100 to-purple-100 p-1">
            <img
              src={captain?.avatar || "https://i.pravatar.cc/120?img=13"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 sm:gap-6 items-center mb-4 sm:mb-6">
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg">First Name</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.fullname?.firstname || "-"}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg">Last Name</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.fullname?.lastname || ""}</div>
            </div>
          </div>
                    <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg">Email</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.email}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg capitalize">Vehicle Type</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.vehicle?.vehicleType || "-"}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg capitalize">Vehicle Color</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.vehicle?.color || "-"}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg">Plate</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.vehicle?.plate || "-"}</div>
            </div>
          </div>
          <div className="flex items-center w-full max-w-sm">
            <span className="w-32 font-semibold text-gray-700 text-base sm:text-lg">Capacity</span>
            <div className="flex-1">
              <div className="bg-gray-50 border border-blue-100 rounded-lg px-4 py-2 text-base w-full shadow-sm font-medium text-blue-900">{captain?.vehicle?.capacity || "-"}</div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default CaptainProfile;

