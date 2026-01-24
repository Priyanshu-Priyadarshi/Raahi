import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const navigate = useNavigate();
  // No submitted state needed

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white relative">
      <button
        className="absolute top-6 left-6 flex items-center text-gray-700 hover:text-gray-700 focus:outline-none z-10 bg-gray-100 rounded-full p-2 "
        onClick={() => navigate('/home')}
        aria-label="Back to Home"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <div className="rounded-3xl p-10 w-full max-w-lg flex flex-col items-center bg-white">
        <h1 className="text-4xl font-extrabold mb-8 text-blue-800 tracking-tight drop-shadow">Contact Us</h1>
        <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-100 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 shadow-sm"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-blue-100 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 shadow-sm"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-blue-100 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-blue-900 shadow-sm"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition text-lg shadow-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
