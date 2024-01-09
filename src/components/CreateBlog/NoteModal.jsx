import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { get } from "../../Global/api";

const NoteModal = ({ opened, close, updateTodo }) => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteTexts, setSelectedNoteTexts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get("/blog_todo");
        setNotes(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (text) => {
    setSelectedNoteTexts((prevTexts) => {
      if (prevTexts.includes(text)) {
        return prevTexts.filter((prevText) => prevText !== text);
      } else {
        return [...prevTexts, text];
      }
    });
  };

  const handleSubmit = () => {
    updateTodo(selectedNoteTexts);
  };

  // console.log("Selected Note Texts:", selectedNoteTexts);

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <div className="flex flex-col">
          <button
            onClick={close}
            className="text-2xl text-red-600 self-end p-1 rounded-md transition-colors hover:bg-slate-100"
          >
            <RxCross2 />
          </button>
          <label htmlFor="mission" className="font-semibold text-xl mb-5">
            Add your note
          </label>
          <div className="flex flex-col gap-5">
            {notes?.map((note) => (
              <div key={note._id} className="flex gap-3 text-lg items-center">
                <input
                  className="w-5 h-5"
                  type="checkbox"
                  onChange={() => handleCheckboxChange(note.title)}
                  checked={selectedNoteTexts.includes(note.title)}
                />
                <span className="text-black">{note.title}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              close(), handleSubmit();
            }}
            className="py-2 px-8 bg-secondary rounded-md text-white self-end mt-5"
          >
            Done
          </button>
        </div>
      </Modal>
    </>
  );
};

export default NoteModal;