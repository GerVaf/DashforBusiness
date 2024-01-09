import React, { useState } from "react";
import { Modal, TextInput, Textarea, Image } from "@mantine/core";
import { RxCross2 } from "react-icons/rx";
import { post } from "../../Global/api";
import { useToasts } from "react-toast-notifications";
import { BiImageAdd } from "react-icons/bi";

const CreateMember = ({ opened, close, refresh, setRefresh }) => {
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    profile: null,
    username: "",
    bio: "",
    role: "",
  });
  // console.log(formData)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setFormData({
        ...formData,
        profile: file,
      });
    }
    // console.log(file)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // for information data
  const { addToast } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("profile", formData.profile);
    form.append("username", formData.username);
    form.append("bio", formData.bio);
    form.append("role", formData.role);

    try {
      const response = await post("/users", form);
      setRefresh(!refresh);
      console.log(response);
      close();

      addToast(response?.data?.message, { appearance: "success" });
      addToast(`Name : ${response?.data?.data?.username}`, {
        appearance: "success",
      });
      addToast(`Password : ${response?.data?.data?.password}`, {
        appearance: "success",
      });
    } catch (error) {
      console.error(error);
      console.log(form);
    }
  };

  return (
    <Modal opened={opened} onClose={close} withCloseButton={false}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-5">
          <button
            onClick={close}
            className="text-2xl text-red-600 self-end p-1 rounded-md transition-colors hover:bg-slate-100"
          >
            <RxCross2 />
          </button>
          <label htmlFor="profile-image" className="cursor-pointer">
            {profileImage ? (
              <Image
                radius={"50%"}
                src={profileImage}
                alt="Profile"
                width={120}
                height={120}
              />
            ) : (
              <div className="text-3xl bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center text-gray-500">
                <BiImageAdd />
              </div>
            )}
            <input
              type="file"
              id="profile-image"
              name="profile"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </label>
          <div className="w-[80%] flex flex-col gap-3">
            <TextInput
              label="Username"
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
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
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
              Create
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CreateMember;
