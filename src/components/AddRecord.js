import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import moment from "moment";

const AddRecord = (props) => {
  const { onCloseModal, refetchRecords } = props;
  const [incomeExpense, setIncomeExpense] = useState("Expense");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [value, setValue] = useState(0);
  const [date, setDate] = useState("");

  const handleIncomeOrExpense = (props) => {
    const { name } = props;
    setIncomeExpense(name);
    if (incomeExpense === "Expense") {
      setIncomeExpense("Income");
    } else {
      setIncomeExpense("Expense");
    }
  };

  const resetRecordValues = () => {
    setIncomeExpense("Expense");
    setDescription("");
    setAmount(0);
    setCategories([]);
    setValue(0);
  };

  const handleAddRecord = async () => {
    if (!categories || !description || !amount) {
      toast.error("bugluugui medeelel uldsen baina");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/records`, {
        userid: 1,
        record_name: "aa",
        amount: amount,
        transaction_type: incomeExpense,
        description: description,
        categoryid: value,
        transferat: date,
      });
      resetRecordValues();
      refetchRecords();
      onCloseModal();
      toast.success("Successfully added record");
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    const getCategory = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error(error);
      }
    };
    getCategory();
  }, []);

  const OnchangeValue = (e) => {
    setValue(e.target.value);
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
      <div>
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
                </select>
              </div>
              {
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 w-full">
                    <p>Date</p>
                    <input
                      onChange={(e) => {
                        setDate(e.target.value);
                      }}
                      type="date"
                      className="py-3 px-4 bg-[#F9FAFB] border border-[#D1D5DB] rounded-lg"
                    />
                  </div>
                </div>
              }
            </div>
            <button
              onClick={handleAddRecord}
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
      </div>
    </div>
  );
};

export default AddRecord;
