import React, { useEffect, useState } from "react";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { MdRemoveCircle } from "react-icons/md";
import TrendLatestModal from "./TendLatestModal";
import { useDisclosure } from "@mantine/hooks";
import { get } from "../../Global/api";

const DashLatest = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [refresh, setRefresh] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`/blogs/tag/latest`);
        // console.log(response);
        setData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [refresh]);

  // If There's no Data show this
  const EmptyState = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-full">
        <h1 className="font-bold text-xl">There's no Latest blogs! 🥲</h1>
      </div>
    );
  };

  return (
    <>
      {/* list table modal  */}
      <TrendLatestModal
        opened={opened}
        close={close}
        refresh={refresh}
        setRefresh={setRefresh}
        parent={"latest"}
      />
      <div className="bg-white shadow-lg rounded-xl dark:bg-secondary">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b dark:border-primary">
          <h1 className="font-semibold text-[#344767] text-lg dark:text-white">Latest News</h1>
          <div
            onClick={open}
            className={
              "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white text-xl p-3 rounded-lg shadow-lg cursor-pointer transition hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
            }
          >
            <BsFillPlusSquareFill />
          </div>
        </div>

        {/* Lists */}
        <div className="p-2 h-[500px] overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-400/40">
          {data?.length === 0 ? (
            <EmptyState />
          ) : (
            data?.map((el) => {
              return (
                <div
                  key={el.id}
                  className="my-3 grid grid-cols-12 rounded-md border overflow-hidden relative transition-shadow hover:shadow-lg dark:border-primary"
                >
                  {/* image  */}
                  <div className="col-span-5">
                    <img
                      className="aspect-square"
                      src={el?.images.url}
                      alt=""
                    />
                  </div>
                  {/* right side  */}
                  <div className="col-span-7 flex flex-col gap-4 w-full p-3">
                    {/* category and delete  */}
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-cyan-500 text-white rounded-full py-1 px-5 dark:from-iconActive dark:to-blue-600">
                        {el?.category}
                      </p>
                      <div
                        className={
                          "bg-gradient-to-r from-cyan-400 to-cyan-500 text-white p-2 rounded-lg transition-all cursor-pointer hover:text-red-600 hover:from-white hover:shadow-lg dark:from-iconActive dark:to-blue-600"
                        }
                      >
                        <MdRemoveCircle />
                      </div>
                    </div>
                    {/* title and author  */}
                    <div className="h-full flex gap-2 flex-col dark:text-white">
                      <p className="text-lg font-semibold">{el?.title}</p>
                      <p className="text-base">{el?.author}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DashLatest;
