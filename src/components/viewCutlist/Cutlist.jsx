import React from "react";
import full_list from "../../assets/images/icons/full_list.png";

const Cutlist = () => {
  const data = [
    {
      key: 0,
      title: "Frame Vertical",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 1,
      title: "Frame Horizontal",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 2,
      title: "Adjustment Vertical",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 3,
      title: "Adjustment Horizontal",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 4,
      title: "Architrave",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 5,
      title: "Door Cap",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 6,
      title: "Door Frame Supports",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 7,
      title: "Door Leaf Rough Cut",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
    {
      key: 8,
      title: "Door Leaf Final Cut",
      length: 244.0,
      width: 22.8,
      qty: 3,
    },
  ];
  return (
    <div>
      {data.map((e) => (
        <div className="mt-3 m-auto w-5/6" id={e.key}>
          <span className="font-sm font-semibold">{e.title}</span>
          <div className="flex justify-between items-center border-b-[.1rem]">
            <div className="flex items-center mt-1 pb-2">
              <span className="text-[#F2994A] font-semibold text-[.6rem]">
                L - &nbsp;
              </span>
              <p className="font-bold">{e.length}</p>
            </div>
            <div className="flex items-center">
              <span className="text-[#F2994A] font-semibold text-[.6rem]">
                W - &nbsp;
              </span>
              <p className="font-bold">{e.width}</p>
            </div>
            <div className="flex items-center">
              <span className="text-[#F2994A] font-semibold text-[.6rem]">
                Q - &nbsp;
              </span>
              <p className="font-bold">{e.qty}</p>
              <img src={full_list} alt="" className="w-3 ml-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cutlist;
