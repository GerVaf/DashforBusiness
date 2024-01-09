import { Image, Modal } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { useDisclosure } from "@mantine/hooks";
import WelcomeCard from "../components/Welcome/WelcomeCard";

const SignUp = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const nav = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState(null);
  // State to store the form data
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    phone: "",
    email: "",
    type: "",
    profile: null,
  });

  // Handle imgae change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        profile: file,
      });
    }
    // console.log(file)
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response?.status === 201) {
        nav("/login");
      }
    } catch (error) {
      setError(error?.response?.data?.errors);
    }
  };

  // console.log(error);
  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-5 h-screen">
        <WelcomeCard open={open}/>
        <WelcomeCard  open={open}/>
        <WelcomeCard  open={open}/>
      </div>
      <Modal size={"xl"} opened={opened} onClose={close} title="Sign Up">
        <div className="w-full h-full z-50 relative flex flex-col py-20 justify-center items-center bg-white">
          <h1 className="text-3xl font-bold">SignUp to your account</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10"
          >
            {/* profile  */}
            <label
              htmlFor="profile-image"
              className="cursor-pointer self-center mt-5"
            >
              {profileImage ? (
                <Image
                  radius={"50%"}
                  src={profileImage}
                  alt="Profile"
                  width={120}
                  height={120}
                />
              ) : (
                <div className="text-3xl bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center text-gray-500">
                  <BiImageAdd />
                </div>
              )}
              <input
                type="file"
                id="profile-image"
                name="profile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
            <p className="flex flex-col items-center justify-center text-red-500">
              {Object.entries(error || {}).map(([key, value], index) => (
                <span key={index}>
                  {`${key}: ${value}`}
                  <br />
                </span>
              ))}
            </p>
            <div className="flex flex-col gap-2">
              <label className="text-2xl" htmlFor="name">
                Name
              </label>
              <input
                placeholder="Enter your name"
                className="input-form"
                type="text"
                name="name"
                id="name"
                value={formData.name}
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
            <div className="flex flex-col gap-2">
              <label className="text-2xl" htmlFor="phone">
                Phone
              </label>
              <input
                placeholder="Enter your phone"
                className="input-form"
                type="phone"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-2xl" htmlFor="email">
                Email
              </label>
              <input
                placeholder="Enter your email"
                className="input-form"
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-2xl" htmlFor="type">
                Enter your role
              </label>
              <input
                placeholder="Enter your type"
                className="input-form"
                type="type"
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
            {/* sigin up href and remind text and SignUp */}
            <div className="flex justify-around items-center">
              <button className="btn" type="submit">
                SignUp
              </button>
              <div className="flex justify-between items-center gap-3">
                <p>If you already have an account!</p>
                <Link
                  className=" underline text-red-500 cursor-pointer"
                  to={"/login"}
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default SignUp;
