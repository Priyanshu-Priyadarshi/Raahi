import React from "react";

const ConfirmRide = (props) => 
{
    return (
        <div className="h-[60vh] overflow-y-auto">
            <h5 className="p-1 text-center absolute w-[93%] top-0" onClick={() => {
                props.setConfirmRidePanel(false);
                 props.setVehiclePanel(true);
             
            }}>
            <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm your Ride</h3>

            <div className="flex gap-2 justify-between flex-col items-center">
      
            <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDv21E5y6ihw1-vHUqdxl6N-JJbcwJF2F6oHuEprlIcevTcy4e12__YH-rN-GkLECDbA&usqp=CAU" alt=""></img>
            
            <div className="w-full mt-5"> 
                    <div className="flex items-center gap-5 p-3 border-b-2">
                        <i className='text-lg ri-map-pin-user-fill'></i>
                        <div>
                            <h3 className="text-lg font-medium">Pickup</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3 border-b-2">
                    <i className='text-lg ri-map-pin-2-fill'></i>
                        <div>
                            <h3 className="text-lg font-medium">Destination</h3>
                            <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 p-3">
                    <i className='ri-currency-line'></i>
                        <div>
                            <h3 className="text-lg font-medium">Estimated Fare</h3>
                            <p className="text-sm -mt-1 text-gray-600">₹{props.fare[props.vehicleType]}</p>
                        </div>
                    </div>
            </div>
            
            <button onClick = {() =>{
            props.setvehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
            }} className="mt-5 w-full text-white font-semibold p-2 rounded-lg bg-green-600">Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRide