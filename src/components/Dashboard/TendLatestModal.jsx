import { Center, Modal, Pagination } from "@mantine/core";
import { useEffect, useState } from "react";
import { RxCross2, RxDash } from "react-icons/rx";
import axios from "axios";
import publish from "../../../public/publish.svg";
import publishActive from "../../../public/publishActive.svg";
import Cookies from "js-cookie";
import { get } from "../../Global/api";
import { useDispatch } from "react-redux";
import { addDetail } from "../../Global/Slice/BlogSlice";
import { useNavigate } from "react-router-dom";
// import Loading from "../Loading/Loading";

const TrendLatestModal = ({ opened, close, refresh, setRefresh, parent }) => {
  // console.log(parent)
  const [loading, setLoading] = useState(false);
  // showing blog to add Trend or Latest and pagination
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const regex = /(<([^>]+)>)/gi;
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await get(
          `/blogs?limit=10&page=${page}&published=true`
        );
        // console.log(response);
        setBlogs(response?.data?.data);
        setTotalPages(response?.data?.pagination?.totalPages);
        setRefresh(!refresh);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  // for detail
  const nav = useNavigate();
  const dispatch = useDispatch();

  // collect blog
  const [blogsId, setBlogsId] = useState([]);

  const handleCheck = (e, element) => {
    e.stopPropagation();
    const { id } = element;

    setBlogsId((prevBlogs) => {
      if (e.target.checked) {
        return [...prevBlogs, id];
      } else {
        return prevBlogs.filter((blogId) => blogId !== id);
      }
    });
  };

  // console.log(blogsId);

  //post to Trend and Latest
  const postHandler = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/blogs/tag/${parent}`,
      {
        blogs: blogsId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setRefresh(!refresh);
    console.log(refresh);
    handleModalClose();
    console.log(response);
  };

  // clean history
  const handleModalClose = () => {
    setBlogsId([]);
    close();
  };
  return (
    <>
      <Modal
        size={`auto`}
        opened={opened}
        onClose={handleModalClose}
        withCloseButton={false}
      >
        {loading ? (
          <p className="text-black">Loading Please Wait . . .</p>
        ) : (
          <div className="flex flex-col">
            {/* close btn  */}
            <button
              onClick={handleModalClose}
              className="text-2xl text-red-600 self-end p-1 rounded-md transition-colors hover:bg-slate-100"
            >
              <RxCross2 />
            </button>
            {/* title  */}
            <label
              htmlFor="mission"
              className="font-bold text-3xl text-[#344767]"
            >
              All Blogs
            </label>

            {/* complete blogs   */}
            <div className="mt-5">
              {/* Table Header */}
              <div className="grid grid-cols-12 items-center text-[#344767] text-center text-base font-semibold border-b py-3">
                <h1 className="col-span-1"></h1>
                <h1 className="col-span-1">Publish</h1>
                <h1 className="col-span-1">Category</h1>
                <h1 className="col-span-1">Author</h1>
                <h1 className="col-span-3">Blog Title</h1>
                <h1 className="col-span-2">Description</h1>
                <h1 className="col-span-2">Program</h1>
                <h1 className="col-span-1">Date</h1>
              </div>

              {/* Table row */}
              {blogs?.map((element) => (
                <div key={element?.id}>
                  <div
                    onClick={() => {
                      dispatch(addDetail(element));
                      nav("/view");
                    }}
                    className="grid grid-cols-12 items-center bg-white text-center py-5 border-b transition-colors hover:bg-gray-200"
                  >
                    <p
                      className="col-span-1 flex justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        checked={blogsId[element.id]}
                        onChange={(e) => handleCheck(e, element)}
                      />
                    </p>
                    <p className="col-span-1 flex justify-center cursor-pointer">
                      <img
                        src={element?.is_published ? publishActive : publish}
                        alt=""
                        className="h-8"
                      />
                    </p>
                    <p className="col-span-1">{element?.category}</p>
                    <p className="col-span-1">{element?.author}</p>
                    <p className="col-span-3">{element?.title}</p>
                    <p className="col-span-2">
                      {element?.description
                        ?.replace(regex, "")
                        ?.replace(
                          /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi,
                          " "
                        )
                        .substring(0, 10)}
                      ...
                    </p>
                    <p className="col-span-2 flex justify-center">
                      {element?.programs.length === 0 ? (
                        <RxDash />
                      ) : (
                        element?.programs?.map((el) => el)
                      )}
                    </p>
                    <p className="col-span-1">{element?.date}</p>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              <Center my={"lg"}>
                <Pagination
                  total={totalPages}
                  onChange={setPage}
                  value={page}
                  // not([data-disabled]):active
                  styles={{
                    control: {
                      color: "#344767",
                      borderRadius: "100%",

                      "&[data-active]": {
                        borderColor: "white",
                        //   backgroundColor:'#218FFE',
                        backgroundImage: "linear-gradient(#1BCCE8,#0CBCDA)",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                      },
                      "&[data-active]&:not([data-disabled]):hover": {
                        backgroundColor: "#3D3F3D70",
                      },
                      "&:not([data-disabled]):hover": {
                        backgroundColor: "#ddd",
                      },
                    },
                    dots: {
                      color: "black",
                    },
                  }}
                />
              </Center>
            </div>

            {/* add handle  */}
            <div className="sticky bottom-0 bg-white/50 backdrop-blur py-3 flex justify-end">
              <button
                onClick={() => {
                  postHandler(), close();
                }}
                className="text-base px-5 py-2 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-bold shadow-lg hover:shadow hover:to-cyan-400"
              >
                Add To {parent === "trending" ? "Trending" : "Latest"} News
              </button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default TrendLatestModal;
