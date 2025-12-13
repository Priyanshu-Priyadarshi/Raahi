import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RideReceipt = () => {
  const location = useLocation();

  const { ride, user } = location.state || {};
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!ride || !user) {
      navigate('/home');
    }
  }, [ride, user, navigate]);

  return (
    <div>
      <div className="full max-w-2xl p-4">
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-800">Ride Completed</h2>
        <div className="flex flex-col md:flex-row items-center justify-between mb-3 gap-6">
          <div className="flex-1 flex flex-col items-start">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Thanks for riding, {user?.fullname?.firstname || user?.name || "User"}!</h3>
            <p className="text-gray-600 text-base mb-2">We hope you enjoyed the ride.</p>
          </div>
          <div className="flex-1 flex justify-center md:justify-end">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOjlyhGoiVIP_ZCSDiO1vqZw70Nu9DpVT3Q&s"
              alt="Thank you illustration"
              className="w-24 h-24 object-contain rounded-lg shadow"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex flex-col items-start w-full md:w-1/2 mb-2 md:mb-0">
            <span className="text-gray-500 text-sm">Source</span>
            <span className="font-medium text-gray-800">{ride?.pickup}</span>
          </div>
          <div className="flex flex-col items-start border-t w-full md:w-1/2">
            <span className="text-gray-500 text-sm">Destination</span>
            <span className="font-medium text-gray-800">{ride?.destination}</span>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-b py-4 mb-6">
          <span className="text-lg font-semibold text-gray-700">Total Fare</span>
          <span className="text-2xl font-bold text-green-700">₹{ride?.fare}</span>
        </div>
        <button
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl text-lg transition"
          onClick={() => navigate("/home")}
        >
          Pay in Cash &amp; Go to Home
        </button>
      </div>
    </div>
  );
};

export default RideReceipt;
