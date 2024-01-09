import { Modal } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalTable from "../components/ModalTable";
import ListDropDown from "../components/ListDropDown";
import { useDisclosure } from "@mantine/hooks";

const List = () => {
  const accessInfo = useSelector((state) => state?.user?.access?.accessToken);

  const [list, setList] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setRefresh] = useState(false);

  const fetchAllList = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ads/allAds`,
        {
          headers: {
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      // console.log(response);
      setList(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllList();
  }, [refresh]);
  // console.log(list)
  const getStatusProperties = (status) => {
    switch (status) {
      case 4:
        return { className: "bg-green-500", text: "Publish" };
      case 1:
        return { className: "bg-orange-500", text: "Pending" };
      case 0:
        return { className: "bg-red-500", text: "Draft" };
      default:
        return { className: "", text: "Unknown Status" };
    }
  };

  // pendigng
  const handleSubmitPending = async (ads_id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ads/PublishRequest`,
        {
          a_id: ads_id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      console.log(response);
      if (response?.status === 200) {
        setRefresh(!refresh);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1">No.</h1>
        <h1 className="col-span-3">Name</h1>
        <h1 className="col-span-2">Date</h1>
        <h1 className="col-span-2">Status</h1>
        <h1 className={"col-span-2"}>Request</h1>
        <h1 className="col-span-2">Action</h1>
      </div>

      {/* Table Row */}
      <div className="flex flex-col-reverse">
        {list.map((el, index) => (
          <div key={index}>
            <div className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 ">
              <div className="col-span-1 flex justify-center items-center">
                {index + 1}
              </div>
              <p className="col-span-3">{el?.author}</p>
              <p className="col-span-2">{el?.date}</p>
              <div className="col-span-2 cursor-pointer flex items-center justify-center gap-3">
                <div
                  className={`flex justify-center items-center ${
                    getStatusProperties(el?.status).className
                  } rounded-md px-3 text-white`}
                >
                  {getStatusProperties(el?.status).text}
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-center">
                {/********************************************************************************* *****************************************************************************************************************************************************************/}
                <button
                  disabled={el?.status === 1 ? true : false}
                  onClick={() => handleSubmitPending(el?._id)}
                  className={`${el?.status === 1 ? "dis-btn" : "submit-btn"}`}
                >
                  submit
                </button>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <ListDropDown
                  values={
                    el?.status === 1
                      ? ["edit", "history"]
                      : ["edit", "history", "delete"]
                  }
                  open={open}
                  ads_info={el}
                  accessInfo={accessInfo}
                  refresh={refresh}
                  setRefresh={setRefresh}
                />
              </div>
            </div>

            <Modal opened={opened} onClose={close} title="History">
              <ModalTable />
            </Modal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
