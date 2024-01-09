import React, { useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { HiMiniHome } from "react-icons/hi2";
import { BsPencilSquare } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const userInfo = useSelector((state) => state?.user?.user_info);
  // console.log(userInfo);

  return (
    <>
      <div
        className={`z-50 px-5 py-3 flex rounded-lg justify-between items-center`}
      >
        {/* left side */}
        <div className="flex gap-3 items-center text-lg text-gray-400">
          <HiMiniHome />
          <p>{location?.pathname?.split("/").join(" / ")}</p>
        </div>
        {/* right side */}
        <div className="flex items-center text-gray-600 text-xl gap-5">
          <div className="flex gap-3 items-center">
            <BsPersonCircle />
            <p className="text-base">{userInfo?.name}</p>
          </div>
          {/* Notification */}
          <div onClick={open}>
            <div className="relative">
              <span className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0 animate-pulse"></span>
              <IoNotifications />
            </div>
          </div>

          <button
            onClick={() => nav("create")}
            className="cursor-pointer group flex justify-center items-center gap-3 px-5 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white text-base font-bold shadow-lg transition-all hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
          >
            <BsPencilSquare className="text-xl group-hover:animate-bounce" />
            Create
          </button>
        </div>
      </div>
      <Modal opened={opened} onClose={close} title='Noti'>
        <h1>NOthing</h1>
      </Modal>
    </>
  );
};

export default Header;
