import React, { useState } from "react";
import { Link } from "react-router-dom";
import RaahiLogo from "../logos/Raahi.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserLogo from '../logos/user_logo.jpg';

const FinishRide = (props) => {

  const navigate = useNavigate();
async function requestPayment() {
  // Call backend to end ride, which will emit socket event to user
  if (props.rideData && props.rideData._id) {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, { rideId: props.rideData._id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (e) {
      // Optionally show error
    }
  }
  navigate('/captain-receipt', { state: { ride: props.rideData } });
  if (props.setFinishRidePanel) props.setFinishRidePanel(false);
}

  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0"
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride!</h3>
      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src={UserLogo}
            alt="User Logo"
          />
          <h2 className="text-lg font-medium capitalize">{props.rideData?.user.fullname.firstname + " " + props.rideData?.user.fullname.lastname} </h2>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">Distance: {props.rideData?.distanceText || '–'}</div>
          <div className="text-sm font-semibold text-gray-700">Duration: {props.rideData?.durationText || '–'}</div>
        </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="p-3 border-b-2">
            <div className="flex items-baseline gap-2">
              <i className="text-lg ri-map-pin-2-fill mt-1"></i>
              <h3 className="text-lg font-medium">Pickup</h3>
            </div>
            <p className="text-sm -mt-1 text-gray-600 ml-7">
              {props.rideData?.pickup}
            </p>
          </div>
          <div className="p-3 border-b-2">
            <div className="flex items-center gap-2">
              <i className="text-lg ri-map-pin-user-fill"></i>
              <h3 className="text-lg font-medium">Destination</h3>
            </div>
            <p className="text-sm -mt-1 text-gray-600 ml-7">
              {props.rideData?.destination}
            </p>
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2">
              <i className="ri-currency-line"></i>
              <h3 className="text-lg font-medium">Estimated Fare</h3>
            </div>
            <p className="text-sm -mt-1 text-gray-600 ml-7">₹{props.rideData?.fare}</p>
          </div>
        </div>
        <div className="mt-6 w-full">
          <button
            onClick={requestPayment}
            className="mt-10 w-full flex text-lg justify-center text-white font-semibold p-3 rounded-lg bg-green-600"
          >
            Complete Ride
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
