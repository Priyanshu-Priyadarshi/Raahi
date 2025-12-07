import React, {useContext, useMemo} from "react";
import {CaptainDataContext} from '../context/CaptainContext';

const CaptainDetails = () =>
{

  const { captain } = useContext(CaptainDataContext);

  const vehicleImage = useMemo(() => {
    const type = captain?.vehicle?.vehicleType;
    if (type === 'motorcycle') {
      return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEBUQEBAVFREXFhAVGRgWFRUaGBcVFRcXGBUVFhcYHSogGRslHRUXITEhJSkuLi4uGB8zOjMsNygtLisBCgoKDg0OGhAQGy0lICUyLS0rLzU1Ly83LS01LS8vLS01KystNS03MC0vLTEtLS01LS4uLy0tLS0rLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/...';
    }
    if (type === 'auto') {
      return 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8xZGRiOGM1Ni0wMjA0LTRjZTQtODFjZS01NmExMWEwN2ZlOTgucG5n';
    }
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTDv21E5y6ihw1-vHUqdxl6N-JJbcwJF2F6oHuEprlIcevTcy4e12__YH-rN-GkLECDbA&usqp=CAU';
  }, [captain]);


    return (
            <div>
                  <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              className="h-14 w-14 rounded-full object-cover border border-gray-200"
              src={captain?.avatar || 'https://i.pravatar.cc/80?img=12'}
              alt="Captain"
            />
            <h4 className="text-lg font-medium capitalize">{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
          </div>
          <div className="flex flex-col items-start gap-1">
            <img
              src={vehicleImage}
              alt="Vehicle"
              className="h-16 w-24 object-contain "
            />
            <h5 className="text-base font-semibold tracking-wide">
              {captain?.vehicle?.plate || '—'}
            </h5>
           
          </div>
        </div>
        

        <div className="grid grid-cols-3 gap-3 p-3 mt-6 bg-gray-100 rounded-xl">
          <div className="text-center">
            <i className="text-2xl mb-1 ri-currency-line"></i>
            <h5 className="text-lg font-semibold">₹513.64</h5>
            <p className="text-xs text-gray-600">Earned</p>
          </div>
          <div className="text-center">
            <i className="text-2xl mb-1 ri-roadster-line"></i>
            <h5 className="text-lg font-semibold">12.4 km</h5>
            <p className="text-xs text-gray-600">Distance Travelled</p>
          </div>
          <div className="text-center">
            <i className="text-2xl mb-1 ri-timer-2-line"></i>
            <h5 className="text-lg font-semibold">10.2 h</h5>
            <p className="text-xs text-gray-600">Hours Online</p>
          </div>
        </div>
            </div>
    )
}

export default CaptainDetails