import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import RaahiLogo from "../logos/Raahi.png";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import FinishRide from "../components/FinishRide";
import {useLocation} from 'react-router-dom';
import LiveTracking from "../components/LiveTracking";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride;
  const { socket } = useContext(SocketContext);

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel]
  );

  useEffect(() => {
    const onUserPayment = async (payload) => {
      try {
        const rideId = payload?.rideId || rideData?._id;
        if (!rideId) return;
        await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, { rideId }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        // After successful completion, navigate handled in FinishRide or keep here? We'll keep captain here.
        window.location.href = '/captain-home';
      } catch (e) {
        // silently ignore
      }
    };

    socket?.on('user-made-payment', onUserPayment);
    return () => {
      socket?.off('user-made-payment', onUserPayment);
    };
  }, [socket, rideData?._id]);

  return (
    <div className="h-screen relative">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img className="w-16" src={RaahiLogo}></img>
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-4/5">
        <LiveTracking pickup={rideData?.pickup} destination={rideData?.destination} />
      </div>
      <div className="h-1/5 p-6 flex items-center relative justify-between bg-yellow-400 pt-10">
        <h5
          className="p-1 text-center absolute w-[90%] top-0"
          onClick={() => {}}
        >
          <i className="text-3xl text-gray-800 ri-arrow-up-wide-line"></i>
        </h5>
        <h4 className="text-xl font-semibold">
          {(() => {
            const distanceText = rideData?.distance?.text || rideData?.distanceText || "";
            const durationText = rideData?.duration?.text || rideData?.durationText || "";
            if (distanceText || durationText) {
              return (
                <span className="flex flex-col leading-tight">
                  {distanceText && <span className="text-sm text-gray-800">Distance : {distanceText}</span>}
                  {durationText && <span className="text-sm text-gray-800">Duration : {durationText}</span>}
                </span>
              );
            }
            return "";
          })()}
        </h4>
        <button onClick={() => setFinishRidePanel(true)} className=" text-white font-semibold p-3 px-10 rounded-lg bg-green-600">
          Complete Ride
        </button>
      </div>
      <div
        ref={finishRidePanelRef}
        className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12"
      >
        <FinishRide
        rideData={rideData}
        setFinishRidePanel={setFinishRidePanel}
         
        />
      </div>
    </div>
  );
};

export default CaptainRiding;
