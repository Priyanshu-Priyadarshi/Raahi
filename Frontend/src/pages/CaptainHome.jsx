import React from "react";
import { Link } from "react-router-dom";
import RaahiLogo from "../logos/Raahi.png";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useState } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useEffect , useContext} from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainHome = () => {

  const [ridePopupPanel , setridePopupPanel ] = useState(true);
  const [ConfirmridePopupPanel , setConfirmridePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const ConfirmridePopupPanelRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

   useEffect(() => {
      socket.emit('join',{ 
        userId:captain._id, 
        userType:'captain'
      });
    })

  useGSAP(
    function () {
      if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ridePopupPanel]
  );


  useGSAP(
    function () {
      if (ConfirmridePopupPanel) {
        gsap.to(ConfirmridePopupPanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(ConfirmridePopupPanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [ConfirmridePopupPanel]
  );

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img className="w-16" src={RaahiLogo}></img>
        <Link
          to="/home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
       <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 -translate-y-full bg-white px-3 py-10 pt-12">
        <RidePopUp setridePopupPanel={setridePopupPanel} setConfirmridePopupPanel={setConfirmridePopupPanel} />
      </div>
      <div ref={ConfirmridePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 -translate-y-full bg-white px-3 py-10 pt-12">
        <ConfirmRidePopUp setConfirmridePopupPanel={setConfirmridePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
