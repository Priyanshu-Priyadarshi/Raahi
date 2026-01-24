import React from "react";
import UserLogo from '../logos/user_logo.jpg';

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center absolute w-[93%] top-0"
        onClick={() => {
          props.setridePopupPanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-10 rounded-full object-cover"
            src={UserLogo}
            alt=""
          ></img>
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname + " " + props.ride?.user.fullname.lastname}</h2>
        </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-gray-700">Distance: {props.ride?.distanceText || '–'}</div>
            <div className="text-sm font-semibold text-gray-700">Duration: {props.ride?.durationText || '–'}</div>
          </div>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
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
        <div className="mt-5 w-full">
          <div className="flex gap-3">
            <button
              onClick={() => {
                props.setConfirmridePopupPanel(true);
                props.confirmRide();
              }}
              className="flex-1 text-lg flex justify-center text-white font-semibold p-3 rounded-lg bg-green-600"
            >
              Accept
            </button>
            <button
              onClick={() => {
                props.setridePopupPanel(false);
              }}
              className="flex-1 text-lg flex justify-center text-white font-semibold p-3 rounded-lg bg-red-600"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
