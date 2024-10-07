import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import PlusSign from "../../public/icons/PlusSign";
import { FaChevronLeft, FaSearchengin } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Categories } from "@/components/Categories";
import AddRecord from "@/components/AddRecord";
import { Transaction } from "@/components/Transaction";
import { AddCategory } from "@/components/AddCategory";
import axios from "axios";

const Home = (props) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState("All");
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    const getRecords = async () => {
      try {
        const response = await axios.get("http://localhost:8000/records");
        setRecords(response.data.records);
        setFilteredRecords(response.data.records);
      } catch (error) {
        console.error(error);
      }
    };
    getRecords();
  }, []);

  const handleExpense = () => {
    const array = records.filter(
      (record) => record.transaction_type === "Expense"
    );
    setFilteredRecords(array);
  };
  const handleIncome = () => {
    const findIndex = records.filter(
      (record) => record.transaction_type === "Income"
    );

    setFilteredRecords(findIndex);
  };

  const handleChange = (option) => {
    setSelected(option);
  };

  const handleAll = () => {
    setFilteredRecords(records);
  };

  const handleAddCategory = () => {
    setShowCategory(!showCategory);
  };

  const handleAdd = () => {
    setShowAdd(!showAdd);
  };
  // const opacity = showAdd === false ? "opacity-100" : "opacity-100";
  return (
    // <div className="flex justify-center items-center flex-col">
    <div>
      {showAdd && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-gray-400 flex justify-center items-center">
          <AddRecord onCloseModal={handleAdd} />
        </div>
      )}
      {showCategory && (
        <div className="z-30 fixed top-0 left-0 right-0 bottom-0 bg-[white] flex justify-center items-center">
          <AddCategory onCloseModal={handleAddCategory} />
        </div>
      )}
      <div className={`bg-[#F3F4F6] flex flex-col gap-8 items-center relative`}>
        <Navbar />

        <div className="flex gap-6">
          <div className="bg-white flex flex-col px-6 py-4 w-[282px] gap-6 rounded-xl h-fit border border-[#E5E7EB]">
            <div className="flex flex-col gap-6">
              <p> Records </p>
              <button
                onClick={() => handleAdd()}
                className="flex gap-1 w-[225px] bg-[#0166FF] rounded-3xl text-white items-center justify-center"
              >
                <PlusSign color="white" /> Add
              </button>
            </div>
            <input
              placeholder="Search"
              className="border border-[#D1D5DB] rounded-lg px-4 py-1"
            />
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-base text-[#1F2937] mb-3">
                Types
              </p>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"All" === selected}
                  className="checkbox"
                  onChange={() => handleChange("All")}
                  onClick={() => handleAll()}
                />
                All
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"Income" === selected}
                  className="checkbox"
                  onChange={() => handleChange("Income")}
                  onClick={() => handleIncome()}
                />
                Income
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5">
                <input
                  type="checkbox"
                  checked={"Expense" === selected}
                  className="checkbox"
                  onChange={() => handleChange("Expense")}
                  onClick={handleExpense}
                />
                Expense
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <Categories />

                <p className="font-normal text-base opacity-20"> Clear </p>
              </div>
              <div className="flex flex-col gap-2"></div>
              <div className="flex gap-2 py-1.5 pl-3 items-center">
                <PlusSign color={"#0166FF"} />
                <button onClick={() => handleAddCategory()}>
                  Add category
                </button>
              </div>
            </div>
          </div>
          <div className="w-[894px] flex flex-col gap-4">
            <div className="flex justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
                  <FaChevronLeft />
                </div>
                <p className="font-normal text-base"> Last 30 Days</p>
                <div className="w-8 h-8 rounded-lg p-1.5 bg-[#E5E7EB]">
                  <FaAngleRight />
                </div>
              </div>
              <select className="w-[180px] py-3 px-4 rounded-lg font-semibold text-base text-[#1F2937] border border-[#D1D5DB]">
                <option selected>Newest First</option>
                <option> Latest First </option>
              </select>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-base"> Today </p>
              <div className="flex flex-col gap-3 mb-3">
                {/* <Transaction records={filteredRecords} /> */}
              </div>
              <p className="font-semibold text-base"> Yesterday </p>
              <div className="flex flex-col gap-3">
                {/* {myRecords[1].map((recordToday, index) => {
                  return (
                    <OneRecord
                      key={index}
                      text={recordToday.text}
                      image={recordToday.image}
                      time={recordToday.time}
                      color={recordToday.color}
                      money={recordToday.money}
                      iconColor={recordToday.iconColor}
                    />
                  );
                })} */}
                <Transaction
                  records={filteredRecords}
                  setRecords={setFilteredRecords}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
