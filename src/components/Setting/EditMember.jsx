import React, { useState } from "react";
import { Modal, TextInput, Textarea, Image } from "@mantine/core";
import { RxCross2 } from "react-icons/rx";
import { patch } from "../../Global/api";
import { BiImageAdd } from "react-icons/bi";

const EditMember = ({ opened, close, el, refresh, setRefresh }) => {
  const [formData, setFormData] = useState({
    username: el?.username,
    role: el?.role,
    bio: el?.bio,
    id: el?.id,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [showImg, setShowImg] = useState();
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    // for showing updated imgae
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setShowImg(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("username", formData.username);
    formDataObj.append("role", formData.role);
    formDataObj.append("bio", formData.bio);
    formDataObj.append("id", formData.id);

    if (file) {
      formDataObj.append("profile", file);
    }

    console.log(formDataObj);

    const response = await patch("/users", formDataObj);
    console.log(response);

    setRefresh(!refresh);

    close();
  };

  // console.log(showImg)

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      <div className="flex flex-col items-center gap-5">
        <button
          onClick={close}
          className="text-2xl text-red-600 self-end p-1 rounded-md transition-colors hover:bg-slate-100"
        >
          <RxCross2 />
        </button>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center justify-center"
        >
          <div className="w-[80%] flex flex-col gap-3">
            <label
              htmlFor="profile-image"
              className="cursor-pointer flex flex-col items-center"
            >
              {file ? (
                <Image
                  radius={"50%"}
                  src={showImg}
                  alt="Profile"
                  width={120}
                  height={120}
                />
              ) : (
                <Image
                  radius={"50%"}
                  src={el?.profile?.url}
                  alt="Profile"
                  width={120}
                  height={120}
                />
              )}
              <input
                type="file"
                id="profile-image"
                name="profile"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <TextInput
              label="Name"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <div className="my-3 flex gap-5 items-center">
              <label htmlFor="role">Role</label>
              <select
                className="px-3 py-2 rounded-md font-medium outline-none"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="admin">admin</option>
                <option value="editor">editor</option>
              </select>
            </div>
            <Textarea
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="py-2 border bg-gradient-to-r from-zinc-700 to-zinc-600 px-5 bg-secondary rounded-md text-white self-end"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditMember;
