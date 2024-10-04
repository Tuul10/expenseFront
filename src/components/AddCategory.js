import axios from "axios";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

export const AddCategory = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { onCloseModal } = props;

  const addCategory = async () => {
    await axios
      .post("http://localhost:8000/category", {
        category_name: name,
        description: description,
        category_image: "carBackround.png",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="w-[792px] flex flex-col rounded-xl  border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Add Category</p>
        <IoClose size={24} onClick={onCloseModal} />
      </div>
      <div className="flex w-full">
        <div className="px-6 pt-5 pb-6 flex flex-col gap-5"></div>
        <div className="flex flex-col mb-3 gap-[22px]">
          <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
            <p>Name</p>
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              name
              type="text"
              placeholder="Category name"
              className="font-normal text-xl bg-[#F3F4F6]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-6 pb-6 pt-[18px] w-full ">
        <p className="text-[#1F2937]">Description</p>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          name="description"
          placeholder="Write here"
          className="bg-[#F3F4F6] pt-4 pl-4 border border-[#D1D5DB] w-full h-full rounded-lg"
        />
      </div>
      <div className="w-fit h-10 ml-auto px-5 bg-white rounded-md mr-4 mb-2 flex items-center justify-center">
        <button onClick={addCategory}>Add Category</button>
      </div>
    </div>
  );
};
