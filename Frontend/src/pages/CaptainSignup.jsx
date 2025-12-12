import React, { useState } from "react";
import { Link } from "react-router-dom";
import CaptainRaahiLogo from '../logos/t2.png'
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainSignup = () => 
{

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userData, setUserData] = useState({});

    const [ vehicleColor , setVehicleColor ] = useState('');
    const [ vehiclePlate , setVehiclePlate ] = useState('');
    const [ vehicleCapacity , setVehicleCapacity ] = useState('');
    const [ vehicleType , setVehicleType ] = useState('');

    const { captain , setCaptain } = React.useContext(CaptainDataContext);
  
    const submitHandler = async(e) => {
        e.preventDefault();

        const captainData = {
          fullname: {
            firstname: firstName,
            lastname: lastName,
          },
          email: email,
          password: password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: vehicleCapacity,
            vehicleType: vehicleType,
          },
        };

        // Try to get browser geolocation and include GeoJSON Point if available
        const getCoords = () => new Promise((resolve) => {
          if (!navigator || !navigator.geolocation) return resolve(null);
          navigator.geolocation.getCurrentPosition((pos) => {
            resolve([pos.coords.longitude, pos.coords.latitude]);
          }, (err) => {
            console.warn('Geolocation not available during signup:', err && err.message);
            resolve(null);
          }, { timeout: 5000 });
        });

        try {
          const coords = await getCoords();
          if (coords) {
            captainData.location = { type: 'Point', coordinates: coords };
          }

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

          if(response.status === 201)
          {
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token' , data.token);
            navigate('/captain-home');
          }
        } catch (err) {
          console.error('Captain signup failed:', err);
          alert('Registration failed. Check server logs and try again.');
        }

    setEmail("");
    setFirstName("");
    setLastName("");  
    setPassword("");
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleCapacity('');
    setVehicleType('');

    }

    return (
     
      <div className="py-5 px-5 flex flex-col justify-between h-screen">
        <div>
          <img className="w-15 h-8 mb-5 " src={CaptainRaahiLogo} alt="" />

          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <h3 className="text-lg font-medium mb-2">What's our Captain's name</h3>
            <div className="flex gap-4 mb-3">
              <input
                required
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border rounded text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <input
                required
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border rounded text-lg placeholder:text-base"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </div>

            <h3 className="text-lg font-medium mb-2">What's our Captain's Email</h3>
            <input
              required
              className="bg-[#eeeeee] mb-3 py-2 px-4 border rounded w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>

            <input
              required
              className="bg-[#eeeeee] mb-3 py-2 px-4 border rounded w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
            <div className="flex gap-4 mb-2">
              <input
                required
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border rounded text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border rounded text-lg placeholder:text-base"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mb-3">
              <input
                required
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border rounded text-lg placeholder:text-base"
                type="number"
                min="1"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              <select
                required
                className="bg-[#eeeeee] w-1/2 py-2 px-4 border rounded text-lg"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            <button className="bg-[#111] text-white font-semibold mb-1 py-2 px-4 rounded w-full text-lg placeholder:text-base">
              Create Captain Account
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/captain-login" className="text-blue-600">
                Login here
              </Link>
            </p>
          </form>
        </div>
        <div>
          <p className="text-[10px] leading-tight">    
            This site is protected by reCAPTCHA and the <span className="underline">Google Privacy 
                        Policy</span> and <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    
  )
}

export default CaptainSignup