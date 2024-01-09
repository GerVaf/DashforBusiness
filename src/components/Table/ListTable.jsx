import React, { useEffect, useState } from "react";
import ListDropDown from "../ListDropDown";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import ModalTable from "../ModalTable";
import axios from "axios";
import { useSelector } from "react-redux";

const ListTable = ({ parent }) => {
  const accessInfo = useSelector((state) => state?.user?.access?.accessToken);

  const [opened, { open, close }] = useDisclosure(false);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(true);

  const dataOfData = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ads/AllAds`,
        {
          status: parent,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessInfo}`,
          },
        }
      );
      console.log(response);
      if (response?.status === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dataOfData();
  }, [refresh, parent]);

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

  // console.log(data);
  // const handleSubmitPending = async (id, status) => {
  //   const token = Cookies.get("token");
  //   try {
  //     const result = await axios.post(
  //       `${import.meta.env.VITE_BASE_URL}/ads/changeStatus`,
  //       { id, status },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     // console.log(result);
  //     setRefresh(!refresh);
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  // console.log(parent);

  return (
    <div>
      {/* Table Header */}
      <div className="grid grid-cols-12 items-center text-[#344767] dark:text-white dark:border-secondary dark:bg-secondary text-center text-base font-semibold border-b py-3">
        <h1 className="col-span-1">No.</h1>
        <h1 className="col-span-3">Name</h1>
        <h1 className="col-span-2">Date</h1>
        <h1 className="col-span-2">Status</h1>
        <h1 className={"col-span-2"}>Request</h1>
        <h1 className="col-span-2">Action</h1>
      </div>

      {/* Table Row */}
      {data.map((el, index) => (
        <div key={index}>
          <div className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200 dark:border-secondary dark:bg-secondary dark:text-white dark:hover:bg-primary">
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
                onClick={() => handleSubmitPending(el?.id, 1)}
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
  );
};

export default ListTable;
