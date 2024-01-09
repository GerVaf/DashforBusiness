import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
const ModalTable = () => {
  const historyData = useSelector((state) => state?.blog?.history);
  console.log(historyData);
  return (
    <>
      {historyData?.map((data) => {
        return (
          <div
            key={data._id}
            className="p-5 border rounded-md flex flex-col gap-3"
          >
            <h1>Created At {moment(data.created_at).format("LLL")}</h1>
            <h1>Action - {data.action}</h1>
            <span>at {moment(data.updated_at).format("LLL")}</span>
          </div>
        );
      })}
    </>
  );
};

export default ModalTable;
