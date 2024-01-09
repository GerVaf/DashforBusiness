import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collectInfo } from "../../Global/Slice/AuthSlice";

const Info = () => {
  const accessInfo = useSelector((state) => state?.user?.access?.accessToken);
  // console.log(accessInfo);
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state?.user?.user_info);
  // console.log(userInfo);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      console.log(response);
      if (response?.status === 200) {
        dispatch(collectInfo(response?.data?.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-between pb-[10%] h-[80vh]">
      <div className="text-3xl font-semibold">Profile Information</div>
      {/* information  */}
      <div className="w-full h-[400px] justify-around flex">
        {/* info  */}
        <div className="h-full flex flex-col justify-around py-10">
          <p>
            {" "}
            <span className="font-semibold text-lg">Name - </span>{" "}
            {userInfo?.name}
          </p>
          <p>
            {" "}
            <span className="font-semibold text-lg">Email - </span>{" "}
            {userInfo?.email}
          </p>
          <p>
            {" "}
            <span className="font-semibold text-lg">Phone - </span>{" "}
            {userInfo?.phone}
          </p>
          <p>
            {" "}
            <span className="font-semibold text-lg">Role - </span>{" "}
            {userInfo?.type}
          </p>
          <p>
            {" "}
            <span className="font-semibold text-lg">Join - </span>{" "}
            {userInfo?.createdAt}
          </p>
          <p>
            {" "}
            <span className="font-semibold text-lg">Last update - </span>{" "}
            {userInfo?.updatedAt}
          </p>
        </div>
        {/* profile  */}
        <div className="h-[400px] w-[400px] rounded overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://i.pinimg.com/564x/83/61/9b/83619bca69d71191deb7e0e53d802454.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
