import axios from "axios";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaHouse } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { IoFastFood } from "react-icons/io5";
import { FaTaxi } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "sonner";

export const AddCategory = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { onCloseModal, getCategory } = props;

  const handleAddCategory = async () => {
    if (!name) {
      alert("hooson medeelel baina");
    }
    try {
      await axios.post("http://localhost:8000/category", {
        category_name: name,
        description: "",
        category_image: "",
      });

      toast.success("success");
      getCategory();
    } catch (error) {
      toast.error("error");
      console.log(error);
    }
  };
  return (
    <div className="w-[792px] flex flex-col rounded-xl  border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Add Category</p>
        <IoClose size={24} onClick={onCloseModal} />
      </div>
      <div className="flex w-full">
        <div className="px-6 pt-5 pb-6 flex flex-col gap-"></div>
        <div className="flex  mb-3 mr-8 items-center justify-center">
          <div className="flex mr-8">
            <FaHouse />
            <SlArrowDown />
          </div>
          <div className="flex flex-col px-1 py-1 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              name="name"
              type="text"
              placeholder="   name"
              className="font-normal text-xl bg-[#F3F4F6]"
            />
          </div>
        </div>
      </div>
      <div
        onClick={onCloseModal}
        className="w-fit h-10 ml-auto px-5 bg-white rounded-md mr-4 mb-2 flex items-center justify-center"
      >
        <button onClick={() => handleAddCategory()}>Add Category</button>
      </div>
    </div>
  );
};
