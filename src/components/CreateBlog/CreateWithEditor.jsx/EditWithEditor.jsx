import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "suneditor/dist/css/suneditor.min.css";
import { useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import EmailEditor from "react-email-editor";
import { MultiSelect } from "@mantine/core";
import { put } from "../../../Global/api";

const EditWithEditor = () => {
  const data = useSelector((state) => state.blog.detailBlog);
  const [selectedImage, setSelectedImage] = useState(data?.img_url);
  const nav = useNavigate();

  console.log(data);

  const [formData, setFormData] = useState({
    _id: data?._id,
    title: data?.title,
    category: data?.category,
    img_url: data?.img_url,
    description: data?.description,
    date: data?.date,
    author: data?.author,
    id: data?.id,
    use_unlayer: data?.use_unlayer,
    unlayer: data?.unlayerFile,
    unjson: data?.unlayerJson,
    hashTag: data?.hashTags,
  });

  console.log(formData);

  // hashTag
  //   const handleHashTag = (values) => {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       hashTag: values,
  //     }));
  //   };

  // for hash tag data
  //   const [hashTags, setHashTags] = useState([]);
  //   const getHashTags = async () => {
  //     try {
  //       const response = await get("/hashTags");
  //       //   console.log(response);
  //       const hashName = response?.data?.data;
  //       setHashTags(hashName?.map((has) => has?.name));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   useEffect(() => {
  //     getHashTags();
  //   }, []);

  // for editor with unlayer
  const emailEditorRef = useRef(null);
  // console.log(formData?.unlayerJson);

  const handleEmailEditorReady = () => {
    const unlayer = emailEditorRef.current.editor;
    unlayer.exportHtml((data) => {
      const { design, html } = data;
      console.log(design, html);
      const cleanHTML = html.replace(
        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        ""
      );

      // console.log(cleanHTML);
      setFormData((prevFormData) => ({
        ...prevFormData,
        unlayer: cleanHTML,
        unjson: JSON.stringify(design),
      }));
      console.log(formData.unlayer);
    });
    setConfirm(!confirm);
  };

  // OnLoad for Unlayer
  const onLoad = (data) => {
    try {
      if (data) {
        const templateJson = JSON.parse(data);
        emailEditorRef?.current?.editor?.loadDesign(templateJson);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Editor Ready call onLoad func
  const onReady = () => {
    // editor is ready
    console.log("onReady");
    onLoad(formData?.unjson);
  };
  const [confirm, setConfirm] = useState(false);

  // normal inoput
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleEditorChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: content,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("author", formData.author);
    data.append("category", formData.category);

    // Check if the selected image has changed
    if (formData.images instanceof File) {
      // If it's a File object, it means the user has selected a new image.
      data.append("images", formData.images);
    }
    data.append("_id", formData._id);
    data.append("description", formData.description);
    data.append("date", formData.date);
    data.append("id", formData.id);
    data.append("use_unlayer", formData.use_unlayer);
    data.append("unlayer", formData.unlayer);
    data.append("unjson", formData.unjson);
    data.append("hashTag", JSON.stringify(formData.hashTag));
    // console.log("Submitted data:", data);

    put("/ads", data).then((response) => {
      console.log(response);
      if (response?.status === 200) nav(-1);
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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
                value={formatDateForInput(formData?.date)}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* content with text editor or unlayer  */}
            {data?.use_unlayer ? (
              <>
                <div className="col-span-12 h-screen">
                  <EmailEditor
                    ref={emailEditorRef}
                    onReady={onReady}
                    style={{ height: "100vh" }}
                  />
                </div>
                {/* confirm for adding unlayer  */}
                <div className="col-span-12 bg-gray-200 p-2 flex items-center">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      onChange={handleEmailEditorReady}
                      checked={confirm}
                      id="emailEditorConfirmation"
                      className="w-4 h-4 border border-red-600"
                      required
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
              </>
            ) : (
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
                  defaultValue={formData.description}
                  onChange={handleEditorChange}
                />
                {/* <TextEditor value={formData?.description} handleEditorChange={handleEditorChange}/> */}
              </div>
            )}
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
              value={formData?.hashTag}
              placeholder="Pick all that you like"
              onChange={handleHashTag}
              searchable
            />
          </div> */}

          {/* bottom btn  */}
          <div className="col-span-12 flex justify-end">
            {/* submit btn */}
            <button
              type="submit"
              className="cursor-pointer px-8 py-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-xl text-white font-bold shadow-lg transition-all hover:shadow hover:to-cyan-400"
            >
              Confirm Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWithEditor;
