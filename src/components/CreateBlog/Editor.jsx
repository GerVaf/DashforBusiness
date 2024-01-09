import React, { useEffect, useState } from "react";
import "suneditor/dist/css/suneditor.min.css";
import { useNavigate } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { put } from "../../../Global/api";
import NoteModal from "../NoteModal";
import SunEditor from "suneditor-react";
import { MultiSelect, Select } from "@mantine/core";
import { useSelector } from "react-redux";

const Editor = () => {
  const nav = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const userInfo = useSelector((state) => state?.user?.user_info);
  const adsData = useSelector((state) => state?.blog?.detailBlog);
  console.log(adsData);

  // console.log(userInfo);

  // for hash tag data
  // const [hashTags, setHashTags] = useState([]);

  // const getHashTags = async () => {
  //   try {
  //     const response = await get("/hashTags");
  //     //   console.log(response);
  //     const hashName = response?.data?.data;
  //     setHashTags(hashName?.map((has) => has?.name));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getHashTags();
  // }, []);

  // console.log(hashTags)
  // const HashTag = [{name:"Blah"},{name:"gguugaa"},{name:"Nag"}];
  // console.log(JSON.stringify(HashTag))

  const [formData, setFormData] = useState({
    _id: adsData?._id,
    title: adsData?.title,
    category: adsData?.category,
    images: {},
    description: adsData?.description,
    date: adsData?.date,
    author: adsData?.author,
//     unlayer: "",
//     unjson: "",
    use_unlayer: false,
    hashTag: [],
//     status: 0,
//     user: userInfo?._id,
  });

  // console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function formatDateForInput(date) {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    const hours = String(formattedDate.getHours()).padStart(2, "0");
    const minutes = String(formattedDate.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  // const handleHashTag = (values) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     hashTag: values,
  //   }));
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Create a FileReader
      const reader = new FileReader();

      reader.onload = () => {
        // Set the selected image to the data URL
        setSelectedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }

    setFormData({
      ...formData,
      images: file,
    });
  };

  // const updateTodo = (selectedNotes) => {
  //   const todoString = selectedNotes.join(", ");
  //   setFormData({
  //     ...formData,
  //     todo: todoString,
  //   });
  // };

  const handleEditorChange = (content) => {
    // console.log(content);
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: content,
    }));
  };

  console.log(formData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "hashTag") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    console.log("Submitted data:", data);

    put("/ads", data)
      .then((response) => {
        console.log(response);
        if (response?.status === 200) {
          nav("/list");
        }
      })
      .catch((error) => console.log(error));
  };

  // for note modal
  // const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <div className="font-bold text-3xl text-[#344767]">Edit Blog</div>
      {/* form */}
      <div className="py-5">
        <form className="grid grid-cols-12 gap-5" onSubmit={handleSubmit}>
          {/* image upload  */}
          <div className="col-span-12">
            <label className="flex flex-col relative border border-gray-300 rounded-md shadow-lg group transition-all hover:bg-gray-100 hover:shadow hover:border-cyan-400">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="object-cover w-full"
                />
              ) : (
                <div className="flex flex-col h-full items-center justify-center py-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Upload Main Image
                  </p>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                id="images"
                name="images"
                onChange={handleFileChange}
                // required
                className="opacity-0 absolute"
              />
            </label>
          </div>

          <div className="col-span-12 grid grid-cols-12 gap-3">
            {/* title  */}
            <div className="col-span-6 flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="blgtit">
                Blog Title
              </label>
              <input
                className="outline-none rounded-lg p-3 border transition focus:border-cyan-400"
                placeholder="Enter Blog Title"
                type="text"
                id="blgtit"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* author  */}
            <div className="col-span-6 flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="author">
                Author
              </label>
              <input
                className="outline-none rounded-lg p-3 border transition focus:border-cyan-400"
                placeholder="Enter Author Name"
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* category  */}
            <div className="col-span-6 flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="category">
                Category
              </label>
              <select
                className="outline-none rounded-lg p-3 border transition focus:border-cyan-400"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a Category</option>
                <option value="sport">Sport</option>
                <option value="music">Music</option>
              </select>
            </div>
            {/* date  */}
            <div className="col-span-6 flex flex-col gap-2">
              <label className="text-sm font-semibold" htmlFor="date">
                Date & Time
              </label>
              <input
                className="outline-none rounded-lg p-3 border transition focus:border-cyan-400"
                placeholder="Enter Author Name"
                type="datetime-local"
                id="date"
                name="date"
                value={formatDateForInput(formData.date)}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* content  */}
            <div className="col-span-12">
              <SunEditor
                height="500px"
                setOptions={{
                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["fontColor", "hiliteColor", "textStyle"],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "table"],
                    ["link", "image"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview"],
                  ],
                  font: [
                    "Roboto",
                    "Open Sans",
                    "Noto Sans Myanmar",
                    "Inconsolata",
                  ],
                }}
                setDefaultStyle="font-family: 'Roboto'; font-size: 16px;"
                onChange={handleEditorChange}
                defaultValue={formData?.description}
              />
              {/* <TextEditor
                value={formData?.description}
                handleEditorChange={handleEditorChange}
              /> */}
            </div>
            {/* adding hashTag  */}
            {/* <div className="col-span-6">
              <MultiSelect
                styles={{
                  input: {
                    marginTop: "5px",
                    padding: "8px",
                    borderRadius: "8px",
                  },
                }}
                data={hashTags}
                label="# Tag"
                placeholder="Pick all that you like"
                onChange={handleHashTag}
                searchable
              />
            </div> */}
          </div>

          {/* bottom btn  */}
          <div className="col-span-12 flex w-full justify-end">
            {/* submit btn */}
            <div>
              <button type="submit" className="cursor-pointer">
                <div className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-bold shadow-lg transition-all hover:shadow hover:to-cyan-400">
                  Create Blog
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editor;
