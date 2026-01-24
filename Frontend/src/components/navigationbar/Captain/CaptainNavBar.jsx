import React, { useState } from "react";
import RaahiLogo from "../../../logos/t2.png";
import { useNavigate, useLocation } from "react-router-dom";

const CaptainNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed p-6 top-0 flex items-center justify-between w-screen z-50">
      <img className="w-16" src={RaahiLogo} alt="Raahi Logo" />
      <div className="relative" style={{ position: 'absolute', right: 24, top: 24 }}>
        <button
          className="h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-lg border border-gray-200 hover:bg-gray-100 transition z-50"
          onClick={() => setMenuOpen((open) => !open)}
          tabIndex={0}
          aria-label="Open menu"
        >
          <i className="ri-menu-line text-3xl"></i>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-0 animate-fadeIn">
            <div className="flex flex-col divide-y divide-gray-200">
              <div onClick={() => setMenuOpen(false)}>
                <button
                  className="flex items-center gap-2 w-full text-left py-3 px-4 text-base font-medium text-blue-900 hover:bg-gray-300 transition rounded-t-xl"
                  onClick={() => navigate('/captain/profile')}
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <i className="ri-user-3-line text-xl"></i>
                  </span>
                  Profile
                </button>
                <button
                  className="flex items-center gap-2 w-full text-left py-3 px-4 text-base font-medium text-blue-900 hover:bg-gray-300 transition"
                  onClick={() => navigate('/captain-contact-us')}
                >
                  <span className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                    <i className="ri-customer-service-2-line text-xl"></i>
                  </span>
                  Contact Us
                </button>
              </div>
              <button
                className="flex items-center gap-2 w-full text-left py-3 px-4 text-base font-medium text-red-600 hover:bg-gray-300 transition rounded-b-xl"
                onClick={() => {
                  setMenuOpen(false);
                  navigate('/captain/logout');
                }}
              >
                <span className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full"><i className="ri-logout-box-r-line text-xl"></i></span>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaptainNavbar;
