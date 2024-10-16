import { useState } from "react";
import Logo from "../../public/icons/Logo";
import AddRecord from "./AddRecord";
import Link from "next/link";

const Navbar = () => {
  const [showAdd, setShowAdd] = useState(false);

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };
  return (
    <div className="bg-white w-[100%] px-[120px] py-4 flex justify-between  ">
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord onCloseModal={handleAdd} />
        </div>
      )}
      <div className="flex gap-6 items-center">
        <Logo />
        <Link href={"/dashboard"}>
          <p> Dashboard </p>
        </Link>
        <Link href={"/"}>
          <p className="text-[#0F172A]"> Records</p>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <button
          onClick={() => handleAdd()}
          className="bg-[#0166FF] py-1.5 px-3 text-white rounded-3xl text-base"
        >
          + Record
        </button>
        <div className="rounded-full w-10 h-10 bg-[url('/images/Profile.jpeg')]">
          <img
            src="Placeholder.png
        "
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
