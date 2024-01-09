import React, { useState, useRef, useEffect } from "react";
import EmailEditor from "react-email-editor";
import { get, post } from "../../../Global/api";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "@mantine/core";
import { useSelector } from "react-redux";
const CreateWithDrapAndDrop = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const nav = useNavigate();

  const userInfo = useSelector((state) => state?.user?.user_info);

  // for hash tag data
  const [hashTags, setHashTags] = useState([]);
  const getHashTags = async () => {
    try {
      const response = await get("/hashTags");
      //   console.log(response);
      const hashName = response?.data?.data;
      setHashTags(hashName?.map((has) => has?.name));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getHashTags();
  }, []);

  const [formData, setFormData] = useState({
    author: "",
    category: "",
    date: "",
    title: "",
    // unlayer: "",
    unjson: "",
    undescription:null,
    use_unlayer: true,
    images: null,
    hashTag: [],
    status: 0,
    user: userInfo?._id,
  });
  // console.log(formData)
  const emailEditorRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image Input
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
    // const data = new FormData();
    // data.append('file',file);

    setFormData({
      ...formData,
      images: file,
    });
  };

  const handleEmailEditorReady = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.exportHtml((data) => {
      const { design, html } = data;
      const cleanHTML = html.replace(
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        ""
      );

      // console.log(cleanHTML);

      setFormData((prevFormData) => ({
        ...prevFormData,
        undescription: cleanHTML,
        unjson: JSON.stringify(design),
      }));
      console.log(formData.undescription);
    });
  };

  const handleHashTag = (values) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hashTag: values,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "hashTag") {
        data.append(key, JSON.stringify(value));
      } else {
        data.append(key, value);
      }
    });

    if (formData?.undescription) {
      try {
        const response = await post("/ads", data);
        console.log("Posted to API:", response);
        if (response?.status === 201) {
          nav("/list");
        }
      } catch (error) {
        console.error("Error posting to API:", error);
      }
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=" grid grid-cols-12 gap-3">
        {/* image upload  */}
        <div className="col-span-12 bg peer-placeholder-shown: mb-5 ">
          <label className="flex bgf flex-col relative border border-gray-300 rounded-md shadow-lg group transition-all hover:bg-gray-100 hover:shadow hover:border-cyan-400">
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
        <div className="col-span-12 grid grid-cols-12 gap-3 mb-5">
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
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-span-12 h-screen">
          <EmailEditor ref={emailEditorRef} style={{ height: "100vh" }} />
        </div>

        {/* adding hashTag  */}
        <div className="col-span-6">
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
        </div>

        {/* confirm for adding unlayer  */}
        <div className="col-span-12 bg-gray-200 p-2 flex items-center">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              onChange={handleEmailEditorReady}
              checked={formData.unjson}
              id="emailEditorConfirmation"
              required
              className="w-4 h-4 border border-red-600"
            />
            <label
              htmlFor="emailEditorConfirmation"
              className={`font-semibold ${
                formData.unjson ? "" : "text-slate-400"
              }`}
            >
              Confirm
            </label>
          </div>
        </div>

        <div className="col-span-12">
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-bold shadow-lg hover:shadow hover:to-cyan-400 dark:from-iconActive dark:to-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateWithDrapAndDrop;
