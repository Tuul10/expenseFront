import { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { ThemeContext } from "./ThemeContext";

export const UpdateRecord = (props) => {
  const [incomeExpense, setIncomeExpense] = useState("Expense");
  const { onCloseModal, Income, Expense, categories, Category, Description } =
    props;

  const handleIncomeOrExpense = (props) => {
    const { name } = props;
    setIncomeExpense(name);
    if (incomeExpense === "Expense") {
      setIncomeExpense("Income");
    } else {
      setIncomeExpense("Expense");
    }
  };

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

  return (
    <div className="w-[792px] flex flex-col rounded-xl  border-b border-[#E2E8F0] bg-slate-200">
      <div className="py-5 px-6 flex justify-between">
        <p className="font-semibold text-xl">Update Record</p>
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
                <p> {Category}</p>
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
              {/* {
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 w-full">
                    <p>Date</p>
                    <input
                      type={moment().format("L")}
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
              } */}
            </div>
            <button
              // onClick={UpdateRecord}
              className={`bg-[${buttonColor}] flex items-center justify-center py-2 rounded-3xl text-white`}
              style={{ backgroundColor: buttonColor }}
            >
              Update Record
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
