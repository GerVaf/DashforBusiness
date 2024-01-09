import React from "react";

const DashInbox = () => {
  // Temporary Data
  const data = [
    {
      id: 1,
      date: "24hour",
      name: "Thant Zin",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sunt natus, sit corporis non, quaerat officiis, magni necessitatibus omnis molestiae nam ex. Ut veritatis consequatur, dolor enim commodi mollitia natus.",
    },
    {
      id: 2,
      date: "24hour",
      name: "Thant Zin",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sunt natus, sit corporis non, quaerat officiis, magni necessitatibus omnis molestiae nam ex. Ut veritatis consequatur, dolor enim commodi mollitia natus.",
    },
    {
      id: 3,
      date: "24hour",
      name: "Thant Zin",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sunt natus, sit corporis non, quaerat officiis, magni necessitatibus omnis molestiae nam ex. Ut veritatis consequatur, dolor enim commodi mollitia natus.",
    },
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl py-5 flex flex-col gap-3">
      {/* Header */}
      <h1 className="font-semibold text-lg text-[#344767] px-5">Mail Lists</h1>

      {/* Mail List */}
      <div className="">
        {data?.map((el) => {
          return (
            <div
              key={el?.id}
              className="flex flex-col gap-1 px-5 py-2 border-b"
            >
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-xl">{el.name}</h1>
                <p className="text-gray-500 text-sm">{el.date}</p>
              </div>
              <p>{el.text.slice(0, 60)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashInbox;
