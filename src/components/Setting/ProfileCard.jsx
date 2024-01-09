import React, { useState } from "react";
import { Button, Menu, Switch } from "@mantine/core";
import { IconSettings, IconTrash } from "@tabler/icons-react";
import { PiDotsSixBold } from "react-icons/pi";
import axios from "axios";
import Cookies from "js-cookie";
import EditMember from "./EditMember";
import { useDisclosure } from "@mantine/hooks";

const ProfileCard = ({ refresh, setRefresh, el }) => {
  // const [active, setActive] = useState(false);
  // console.log(el);

  const token = Cookies.get("token");

  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            id,
          },
        }
      );
      console.log(response);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const activeHandler = async (id, status) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/change_status`,
        {
          id,
          status: status ? "false" : "true",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div
      className={` ${
        !el?.active
          ? " bg-gradient-to-br from-purple-400 to-purple-600 text-white "
          : "bg-white text-[#344767]"
      } flex flex-col col-span-4  rounded-xl p-5 relative shadow-lg gap-5`}
    >
      {/* for access control  */}
      <div className="flex justify-between items-center">
        <Switch
          onChange={(e) => activeHandler(el?.id, e.currentTarget.checked)}
          checked={!el?.active}
          color="violet"
        />
        {/* action  */}
        <Menu
          trigger="hover"
          openDelay={100}
          closeDelay={100}
          shadow="md"
          width={200}
        >
          <Menu.Target>
            <Button style={{ backgroundColor: "transparent" }}>
              <PiDotsSixBold
                className={`text-2xl ${
                  !el?.active ? "text-white" : "text-gray-600"
                } `}
              />
            </Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Access control</Menu.Label>

            <Menu.Item onClick={open} icon={<IconSettings size={14} />}>Edit</Menu.Item>
            {/* delete acc  */}
            <Menu.Item
              onClick={() => deleteHandler(el?.id)}
              icon={<IconTrash size={14} />}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      {/* user information  */}
      <div className="flex gap-10">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-white">
          <img className=" w-full h-full object-cover  " src={el?.profile?.url} alt="" />
        </div>
        {/* user information  */}
        <div className="flex flex-col justify-center gap-2 ">
          <p className="text-lg font-semibold">{el?.username}</p>
          <p>Role : {el?.role}</p>
          <p>Bio : {el?.bio}</p>
        </div>
      </div>

      {/* for editing the user  */}
      <EditMember
        refresh={refresh}
        setRefresh={setRefresh}
        opened={opened}
        close={close}
        el={el}
      />
    </div>
  );
};

export default ProfileCard;
