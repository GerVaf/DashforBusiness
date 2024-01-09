import React from "react";
import { RxDash } from "react-icons/rx";
import { useSelector } from "react-redux";

const HashBlogs = () => {
  const regex = /(<([^>]+)>)/gi;
  const data = useSelector((state) => state?.blog?.hash_blogs);
  // console.log(data);

  return (
    <>
      {/* program including blogs  */}
      <div className="mt-20">
        {data === null ? (
          <p className="w-full h-full mt-20 text-xl flex justify-center items-center dark:text-white">
            Select one of program!
          </p>
        ) : data?.length === 0 ? (
          <p className="w-full h-full mt-20 text-xl flex justify-center items-center">
            There's no blogs!
          </p>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3">
              <h1 className="col-span-1">Category</h1>
              <h1 className="col-span-2">Author</h1>
              <h1 className="col-span-4">Blog Title</h1>
              <h1 className="col-span-3">Description</h1>
              <h1 className="col-span-1">Program</h1>
              <h1 className="col-span-1">Date</h1>
            </div>

            {/* Table Row */}
            <div>
              {data?.map((el) => {
                return (
                  <div
                    key={el.id}
                    className="grid grid-cols-12 items-center text-center py-5 border-b transition-colors hover:bg-gray-200"
                  >
                    <p className="col-span-1">{el?.category}</p>
                    <p className="col-span-2">{el?.author}</p>
                    <p className="col-span-4">{el?.title}</p>

                    <p className="col-span-3">
                      {el?.description
                        ?.replace(regex, "")
                        ?.replace(
                          /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
                          " "
                        )
                        .substring(0, 10)}
                      ...
                    </p>
                    {/* program  */}
                    <p className="col-span-1 flex justify-center">
                      {el?.programs.length === 0 ? (
                        <RxDash />
                      ) : (
                        el?.programs?.map((el) => el)
                      )}
                    </p>

                    <p className="col-span-1">{el?.date}</p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HashBlogs;
