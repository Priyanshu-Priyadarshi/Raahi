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
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {

  const [ridePopupPanel , setridePopupPanel ] = useState(false);
  const [ConfirmridePopupPanel , setConfirmridePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const ConfirmridePopupPanelRef = useRef(null);
  const [ride, setRide]= useState(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

   useEffect(() => {
        socket.emit('join', {
            userId: captain._id,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {


                  console.log({
                   
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                  

                    socket.emit('update-location-captain', {
                        userId: captain._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    },[])


    socket.on('new-ride',(data)=>
    {
      console.log(data)
     setRide(data);
      setridePopupPanel(true);
    })

    async function confirmRide()
    {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`,{

        rideId:ride._id,
        captainId:captain._id
      },{

        headers:
          {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        

      })

      setridePopupPanel(false)
      setConfirmridePopupPanel(true)
    }
    

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
      {!(ridePopupPanel || ConfirmridePopupPanel) && (
        <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-50">
          <img className="w-16" src={RaahiLogo} alt="Raahi Logo" />
          <Link
            to="/captain/logout"
            className="h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition z-50"
            style={{ right: 24, top: 24 }}
          >
            <i className="text-2xl font-medium ri-logout-box-r-line text-red-500"></i>
          </Link>
        </div>
      )}
      <div className="h-3/5">
        <LiveTracking />
      </div>
      <div className="h-2/5 p-6">
       <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <RidePopUp 
        ride={ride}
        setridePopupPanel={setridePopupPanel} setConfirmridePopupPanel={setConfirmridePopupPanel}
        confirmRide={confirmRide} />
      </div>
      <div ref={ConfirmridePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
        <ConfirmRidePopUp
        ride={ride}
        setConfirmridePopupPanel={setConfirmridePopupPanel} setridePopupPanel={setridePopupPanel} />
      </div>
    </div>
  );
};

export default CaptainHome;
