import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { accessInfo } from "../Global/Slice/AuthSlice";

const LogInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const nav = useNavigate();

  const dispatch = useDispatch();
  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData
      );
      console.log(response);
      if (response?.status === 200) {
        Cookies.set("token", response?.data?.accessToken);
        Cookies.set("refreshToken", response?.data?.refreshToken);
      }

      if (response?.data) {
        dispatch(accessInfo(response?.data));
      }
      nav("/");
    } catch (error) {
      setError(error?.response?.data?.errors);
    }
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm relative z-10 w-full h-screen flex flex-col justify-center items-center gap-3">
      <div className="shadow p-5 w-[600px] max-w-[500px] bg-white rounded">
        <h1 className="text-3xl font-bold text-center">
          Login to your account
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 p-5">
          {/* showing error  */}
          <p className="flex flex-col items-center justify-center text-red-500">
            {Object.entries(error || {}).map(([key, value], index) => (
              <span key={index}>
                {`${key}: ${value}`}
                <br />
              </span>
            ))}
          </p>
          <div className="flex flex-col gap-2">
            <label className="text-2xl" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Enter your name"
              className="input-form"
              type="text"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl" htmlFor="password">
              Password
            </label>
            <input
              placeholder="Enter your password"
              className="input-form"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* sigin up href and remind text and login */}
          <button className="btn self-center" type="submit">
            Login
          </button>
        </form>
      </div>
      <button
        onClick={() => nav("/signup")}
        className="py-2 px-5 rounded bg-blue-500 text-white"
      >
        Create Account
      </button>
    </div>
  );
};

export default LogInForm;
