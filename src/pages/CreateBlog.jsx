import Atropos from "atropos/react";
import React from "react";
import { Link } from "react-router-dom";

const CreateBlog = () => {
  const route = [
    { id: 1, path: "/create/editor", title: "Write With Editor" },
    { id: 2, path: "/create/drop", title: "Drag And Drop Content" },
  ];
  return (
    <div className="w-full h-[85vh] flex items-center justify-center gap-10">
      {route?.map((el) => {
        return (
          <Atropos
            activeOffset={40}
            shadow={true}
            shadowScale={1.05}
            rotate={true}
            key={el?.id}
          >
            <Link
              data-atropos-offset="-3"
              key={el?.id}
              className=" w-60 h-60 hover:from-slate-300 hover:to-slate-500 hover:text-white  bg-gradient-to-br from-slate-100 to-slate-300 shadow-lg transition duration-150 flex items-center justify-center rounded-2xl font-bold "
              to={el?.path}
            >
              <p data-atropos-offset="3">{el?.title}</p>
            </Link>
          </Atropos>
        );
      })}
    </div>
  );
};

export default CreateBlog;
