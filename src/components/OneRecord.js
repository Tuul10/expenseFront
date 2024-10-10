import moment from "moment";
import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { FaHouse } from "react-icons/fa6";
import { format } from "date-fns";
import categoryIconByCategoryName from "@/util/findCategories";
import { FiMoreVertical } from "react-icons/fi";
import { useState } from "react";
import { FaEye } from "react-icons/fa";

const OneRecord = (props) => {
  const [show, setShow] = useState(false);
  const { text, image, time, color, money, transactionType, onclick } = props;

  const Expensebackground =
    transactionType === "Expense" ? "#0166FF" : "#16A34A";

  const MoneyColor = transactionType === "Expense" ? "#F54949" : "#16A34A";

  const MoneyType = transactionType === "Expense" ? "-" : "+";

  const ImageType =
    transactionType === "Expense" ? <FoodExpense /> : <FaHouse />;
  const icon = categoryIconByCategoryName(props);

  const showDelete = () => [setShow(!show)];

  return (
    <div className="w-full px-6 py-3 border bg-white border-[#E5E7EB] items-center justify-between flex rounded-xl">
      <div className="flex gap-4">
        <div
          className={`flex justify-center items-center w-10 h-10 rounded-full bg-[${transactionType}]`}
          style={{
            backgroundColor: Expensebackground,
          }}
        >
          {icon?.image}
        </div>
        <div className="flex flex-col">
          <p className="font-normal text-base">{text}</p>
          <p className="font-normal text-xs text-[#6B7280]">
            {moment(time).format("l")}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <p
          className={`font-semibold text-base text-[${MoneyColor}]`}
          style={{ color: MoneyColor }}
        >
          {MoneyType}
          {money}
        </p>
        <button onclick={showDelete} type="button">
          <FiMoreVertical />
        </button>
        <button onclick={onclick}>x</button>
      </div>
    </div>
  );
};

export default OneRecord;
