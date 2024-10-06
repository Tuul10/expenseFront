import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import Drink from "../../public/icons/Drink";
import Gift from "../../public/icons/Gift";
import Shopping from "../../public/icons/Shopping";
import Taxi from "../../public/icons/Taxi";
import RentIcon from "../../public/icons/RentIcon";
import FoodExpense from "../../public/icons/FoodExpenseIcon";

const AddRecord = (props) => {
  const { onCloseModal } = props;
  const [incomeExpense, setIncomeExpense] = useState("Expense");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [deleteRecord, setDeleteREcord] = useState();

  const handleIncomeOrExpense = (props) => {
    const { name } = props;
    setIncomeExpense(name);
    if (incomeExpense === "Expense") {
      setIncomeExpense("Income");
    } else {
      setIncomeExpense("Expense");
    }
  };

  const handleAdd = async () => {
    await axios
      .post("http://localhost:8000/records", {
        userid: 1,
        record_name: name,
        amount: amount,
        transaction_type: incomeExpense,
        description: description,
        gategoryid: value,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/category");
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

  const OnchangeValue = (e) => {
    setValue(e.target.value);
  };

  const handDeleteModal = async () => {
    await axios
      .post("http://localhost:8000/records", {
        userid: 1,
        record_name: name,
        amount: amount,
        transaction_type: incomeExpense,
        description: description,
        gategoryid: value,
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };
  const Expensebackground = incomeExpense === "Expense" ? "#0166FF" : "#F3F4F6";
  const Incomebackground = incomeExpense === "Income" ? "#16A34A" : "#F3F4F6";
  const buttonColor = incomeExpense === "Income" ? "#16A34A" : "#0166FF";

  const textColorIncome =
    incomeExpense === "Income" ? "text-white" : "text-base";
  const textColorExpense =
    incomeExpense === "Expense" ? "text-white" : "text-base";

  const today = new Date();
  const day = String(today.getDate());
  const year = String(today.getFullYear());
  const month = "0" + String(today.getMonth());
  const hour = String(today.getHours());
  const minutes = String(today.getMinutes());
  return (
    <div className="w-[792px] flex flex-col rounded-xl  border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Add Record</p>
        <IoClose size={24} onClick={onCloseModal} />
      </div>
      <form>
        <div className="flex w-full">
          <div className="px-6 pt-5 pb-6 flex flex-col gap-5">
            <div className="rounded-[100px] bg-[#F3F4F6] flex gap-1">
              <div
                onClick={() => handleIncomeOrExpense("Expense")}
                className={`py-2 px-[55.5px] ${textColorExpense} font-normal text-base rounded-3xl bg-[${Expensebackground}]`}
                style={{ backgroundColor: Expensebackground }}
              >
                Expense
              </div>
              <div
                onClick={() => handleIncomeOrExpense("Income")}
                className={`py-2 px-[55.5px] ${textColorIncome} font-normal text-base rounded-3xl bg-[${Incomebackground}]`}
                style={{ backgroundColor: Incomebackground }}
              >
                Income
              </div>
            </div>
            <div className="flex flex-col mb-3 gap-[22px]">
              <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
                <p>Name</p>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  name="name"
                  type="text"
                  placeholder="name"
                  className="font-normal text-xl bg-[#F3F4F6]"
                />
              </div>
              <div className="flex flex-col py-3 px-4 bg-[#F3F4F6] border border-[#D1D5DB] rounded-xl">
                <p className="font-normal text-base"> Amount </p>
                <input
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  name="amount"
                  type="number"
                  placeholder="₮ 000.00"
                  className="font-normal text-xl bg-[#F3F4F6]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p> Category </p>
                <select
                  onChange={OnchangeValue}
                  className="bg-[#F9FAFB] py-3 px-4 text-base font-normal border border-[#D1D5DB] rounded-lg"
                >
                  <option defaultChecked> Find or choose category</option>
                  {categories.map((category) => {
                    return (
                      <option
                        className="px-[18px] py-2 flex gap-3"
                        key={category.categoryid}
                        value={category.categoryid}
                      >
                        {category.category_name}
                      </option>
                    );
                  })}
                  <option className="px-[18px] py-2 flex gap-3">Food</option>
                  <option> Home </option>
                </select>
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2 w-full">
                  <p>Date</p>
                  <input
                    type="date"
                    defaultValue={`${year}-${month}-${day}`}
                    className="py-3 px-4 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <p>Time</p>
                  <input
                    name="time"
                    type="time"
                    defaultValue={`${hour}:${minutes}`}
                    className="py-3 px-4 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => handleAdd()}
              className={`bg-[${buttonColor}] flex items-center justify-center py-2 rounded-3xl text-white`}
              style={{ backgroundColor: buttonColor }}
            >
              Add Record
            </button>
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
        </div>
      </form>
    </div>
  );
};

export default AddRecord;
