import { useAuthContext } from "@/providers/Authprovider";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "../../public/icons/Logo";
import Link from "next/link";
import AddRecord from "./AddRecord";
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [showAdd, setShowAdd] = useState(false);
  const { currentUser, setCurrentUser, setIsLoading } = useAuthContext();
  const router = useRouter();

  const signOut = () => {
    const user = localStorage.getItem("userid");

    if (user) {
      setCurrentUser(null);
      setIsLoading(true);

      localStorage.clear();
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };

  return (
    <div className="bg-white w-[100%] px-[120px] py-4 flex justify-between">
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord onCloseModal={handleAdd} />
        </div>
      )}

      <div className="flex gap-6 items-center">
        <Logo />
        <Link href="/dashboard">
          <p
            className={router.pathname === "/dashboard" ? "text-blue-600" : ""}
          >
            Dashboard
          </p>
        </Link>
        <Link href="/">
          <p className={router.pathname === "/" ? "text-blue-600" : ""}>
            Records
          </p>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <button
          onClick={handleAdd}
          className="bg-[#0166FF] py-1.5 px-3 text-white rounded-3xl text-base"
        >
          + Record
        </button>
        <div
          className="rounded-full w-10 h-10 bg-cover"
          style={{
            backgroundImage: `url(${
              currentUser?.profileImage || "/images/Profile.jpeg"
            })`,
          }}
        ></div>

        <FiLogOut onClick={signOut} />
      </div>
    </div>
  );
};

export default Navbar;
