import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { FaHouse } from "react-icons/fa6";
import categoryIconByCategoryName from "@/util/findCategories";
import moment from "moment";

const OneRecord = (props) => {
  const {
    text,
    image,
    time,
    color,
    money,
    transactionType,
    deleteRecord,
    handleAdd,
  } = props;
  console.log(handleAdd);

  const Expensebackground =
    transactionType === "Expense" ? "#0166FF" : "#16A34A";

  const MoneyColor = transactionType === "Expense" ? "#F54949" : "#16A34A";

  const MoneyType = transactionType === "Expense" ? "-" : "+";

  const ImageType =
    transactionType === "Expense" ? <FoodExpense /> : <FaHouse />;
  const icon = categoryIconByCategoryName(props);

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
            {/* {moment(time).format("l")} */}
            {time}
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
        <button onClick={deleteRecord}>x</button>
        <button onClick={handleAdd}>edit</button>
      </div>
    </div>
  );
};

export default OneRecord;
