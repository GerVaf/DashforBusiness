import React, { useEffect, useState } from "react";
import { get } from "../../Global/api";
import { useNavigate } from "react-router-dom";

const DashToDoList = () => {
  const [data, setData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(`/blogs?pending=true`);
        console.log(response);
        setData(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // If There's no Data show this
  const EmptyState = () => {
    return (
      <div className="flex flex-col justify-center items-center gap-5 h-full">
        <h1 className="font-bold text-xl">There's no blogs!</h1>
      </div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden dark:bg-secondary">
      {/* Header */}
      <h1 className="font-semibold text-[#344767] text-lg p-5 border-b sticky top-0 bg-white dark:bg-secondary dark:text-white dark:border-primary">
        Todo List
      </h1>

      {/* Lists */}
      <div className="h-[380px]  overflow-y-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-400/40">
        {data?.length === 0 ? (
          <EmptyState />
        ) : (
          data?.map((el) => {
            return (
              <div
                key={el?.id}
                onClick={() => nav("/list/pending")}
                className="px-5 py-3 m-2 cursor-pointer rounded-md flex justify-between items-center border overflow-hidden transition-shadow hover:shadow-md dark:text-white dark:border-primary"
              >
                <div className="w-1/2 flex flex-col gap-2">
                  {/* Author */}
                  <p className="font-bold">{el?.author}</p>
                  {/* Title */}
                  <p>{el?.title}</p>
                </div>

                {/* note  */}
                <span className="w-1/3 font-semibold">
                  {el?.todo.length === 0
                    ? "There's no note."
                    : el?.todo?.map((toDo) => {
                        return toDo === " " ? (
                          "There's no note."
                        ) : (
                          <span key={toDo}> {toDo} ,</span>
                        );
                      })}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default DashToDoList;
