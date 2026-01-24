import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import UserLogo from '../logos/user_logo.jpg';

const ConfirmRidePopUp = (props) => {

const [otp, setotp]=useState('')
const navigate = useNavigate()

  const SubmitHandler = async (e) =>
  {
    e.preventDefault()


    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params:
      {
        rideId:props.ride._id,
        otp:otp
  },
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
if(response.status === 200)
{
  props.setConfirmridePopupPanel(false);
  props.setridePopupPanel(false);
  navigate('/captain-riding',{state:{ride:props.ride}});
}

}
  
  // Compute labels from numeric fields populated on ride creation
    const distanceText = props.ride?.distanceText || '';
    const durationText = props.ride?.durationText || '';

  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0"
        onClick={() => {
          props.setridePopupPanel(false);
          props.setConfirmridePopupPanel(false);
         
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm to Start!</h3>
      <div className="flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src={UserLogo}
            alt=""
          ></img>
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-gray-700">Distance: {distanceText || '–'}</div>
          <div className="text-sm font-semibold text-gray-700">Duration: {durationText || '–'}</div>
        </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-2">
          <div className="flex items-start gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill mt-1"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-user-fill mt-1"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-5 p-3">
            <i className="ri-currency-line mt-1"></i>
            <div>
              <h3 className="text-lg font-medium">Estimated Fare</h3>
              <p className="text-sm -mt-1 text-gray-600">₹{props.ride?.fare}</p>
            </div>
          </div>
        </div>
        <div className="mt-3 w-full">
          <form onSubmit={SubmitHandler}>
            <input value={otp} onChange={(e)=>setotp(e.target.value)} type="text" className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-2" placeholder="Enter OTP" />
            <div className="flex gap-3 mt-4">
              <button
                type="submit"
                className="flex-1 text-lg flex justify-center text-white font-semibold p-3 rounded-lg bg-green-600"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setConfirmridePopupPanel(false);
                  props.setridePopupPanel(false);
                }}
                className="flex-1 text-lg flex justify-center text-white font-semibold p-3 rounded-lg bg-red-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
