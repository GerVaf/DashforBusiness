import React, { useState } from "react";
import PropTypes from "prop-types";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import { addDetail, addHistory } from "../Global/Slice/BlogSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ListDropDown = ({
  values,
  open,
  close,
  ads_info,
  accessInfo,
  refresh,
  setRefresh,
}) => {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const deleteAdsHandler = async (adsId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ads/delete`,
        { a_id: adsId },
        {
          headers: {
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      if (response?.status === 200) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(ads_info);
  //   console.log(accessInfo);

  // for history

  const getHistoryHandler = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ads/history`,
        {
          a_id: ads_info?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      console.log(response);
      dispatch(addHistory(response?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleItemClick = (item) => {
    switch (item) {
      case "history":
        if (open) open();
        getHistoryHandler();
        break;
      case "delete":
        deleteAdsHandler(ads_info?._id);
        break;
      case "edit":
        dispatch(addDetail(ads_info));
        nav("/edit/editor");
        break;
      default:
        if (close) close();
    }
  };

  return (
    <div onClick={() => setShow(!show)} className="relative">
      <div className="flex items-center justify-between cursor-pointer px-3">
        <RxHamburgerMenu />
      </div>
      <div
        onMouseLeave={() => setShow(false)}
        className={`absolute top-10 w-[100px] z-50 rounded border border-slate-100 bg-white p-3 flex flex-col gap-2 transition-opacity ${
          show ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        {values.map((item) => (
          <h1
            key={item}
            onClick={() => handleItemClick(item)}
            className="cursor-pointer border-b pb-1 border-transparent hover:font-semibold hover:border-slate-100"
          >
            {item}
          </h1>
        ))}
      </div>
    </div>
  );
};

// ListDropDown.propTypes = {
//   values: PropTypes.arrayOf(PropTypes.string).isRequired,
//   open: PropTypes.func,
//   close: PropTypes.func,
//   deleteAdsHandler: PropTypes.func,
// };

export default ListDropDown;
