import React, { useEffect, useState } from "react";
import { get } from "../../Global/api";
import HashBlogs from "./HashBlogs";
import { useDispatch, useSelector } from "react-redux";
import { blogOfHash } from "../../Global/Slice/BlogSlice";
import { BsPencilSquare } from "react-icons/bs";
import { Button, Modal } from "@mantine/core";
import axios from "axios";
import Cookies from "js-cookie";
import { RxCross2 } from "react-icons/rx";

const HashTagData = ({ hashData, setRefresh, refresh }) => {
  console.log(hashData);
  const dispatch = useDispatch();

  // for creating hash modal
  const [hashTitle, setHashTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHashTitle("");
  };
  const token = Cookies.get("token");

  const addHashTitle = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/hashTags`,
        {
          name: hashTitle,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        closeModal();
        setRefresh(!refresh);
      }
    } catch (error) {
      setError(error?.response?.data?.errors?.name);
      console.log(error);
    }
  };
  // for hashtag detail blogs
  const [hashBlogs, setHashBlogs] = useState("");

  const getHashTagData = async () => {
    try {
      const response = await get(
        `/blogs?pending=true&hashTags=["${hashBlogs}"]`
      );
      console.log(response);
      //   setHashTags(response?.data?.data);
      // if (response?.data?.data?.length > 0) {
      dispatch(blogOfHash(response?.data?.data));
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHashTagData();
  }, [hashBlogs]);

  // for deleting hashtag
  const deleteHashTag = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/hashTags/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.data?.message === "Delete Successfully") {
        setRefresh(!refresh);
        dispatch(blogOfHash([]));
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // for what is active
  const [hashActive, setHashActive] = useState("");
  // console.log(data)
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between items-center">
        {/* Hashtags */}
        <div className="flex gap-5 flex-wrap">
          {hashData?.map((has) => {
            return (
              <div
                key={has?._id}
                onClick={() => setHashActive(has?.name)}
                className={`${
                  hashActive === has?.name ? "bg-cyan-400" : "bg-black/10"
                }   p-2 rounded-md cursor-pointer flex items-center gap-2`}
              >
                <div onClick={() => setHashBlogs(has?.name)}># {has?.name}</div>
                <div onClick={() => deleteHashTag(has?._id)}>
                  <RxCross2 className="hover:text-red-600 duration-100 transition" />
                </div>
              </div>
            );
          })}
        </div>
        {/* Create HashTag */}
        <button
          onClick={() => openModal()}
          className="cursor-pointer group flex justify-center items-center gap-3 px-5 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white text-base font-bold shadow-lg transition-all hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
        >
          <BsPencilSquare className="text-xl group-hover:animate-bounce" />
          Create HashTag
        </button>
      </div>

      <div>
        <HashBlogs />
      </div>

      {/* hash create modal */}
      <Modal
        opened={isModalOpen}
        onClose={closeModal}
        title="Create Hashtag"
        size="md"
      >
        <div className="flex flex-col justify-center gap-10 w-full h-full">
          {/* program select  */}
          <div className="flex flex-col w-full gap-5">
            <p className="text-red-500 text-sm">{error}</p>
            <input
              type="text"
              className=" outline-none px-3 py-2 border"
              placeholder="Enter New Hashtag Name"
              value={hashTitle}
              onChange={(e) => setHashTitle(e.target.value)}
              required
            />
          </div>

          {/* button  */}
          <div className="flex justify-around">
            {/* Submit button */}
            <Button variant="primary" onClick={addHashTitle}>
              Submit
            </Button>

            {/* Example Close button */}
            <Button variant="light" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HashTagData;
