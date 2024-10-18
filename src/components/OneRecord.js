import FoodExpense from "../../public/icons/FoodExpenseIcon";
import { FaHouse } from "react-icons/fa6";
import categoryIconByCategoryName from "@/util/findCategories";
import moment from "moment";
import { IoPencilOutline } from "react-icons/io5";
import { compareAsc, format } from "date-fns";
import { de } from "date-fns/locale";
import currency from "currency.js";

const OneRecord = (props) => {
  const { text, time, money, transactionType, deleteRecord, x } = props;
  const Expensebackground =
    transactionType === "Expense" ? "#0166FF" : "#16A34A";

  const MoneyColor = transactionType === "Expense" ? "#F54949" : "#16A34A";

  const MoneyType = transactionType === "Expense" ? "-" : "+";

  const ImageType =
    transactionType === "Expense" ? <FoodExpense /> : <FaHouse />;
  const icon = categoryIconByCategoryName(props);

  const formattedMoney = new Intl.NumberFormat().format(money);

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
            {format(new Date(time), "yyyy-MM-dd", { locale: de })}
          </p>
        </div>
      </div>
      <div className="flex gap-4">
        <p
          className={`font-semibold text-base text-[${MoneyColor}]`}
          style={{ color: MoneyColor }}
        >
          {MoneyType}
          {formattedMoney}
        </p>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          {x}
        </button>
        {/* <div className="lg:tooltip" data-tip="hello">
  <button className="btn">Hover me</button>
</div> */}
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Wait!</h3>
            <p className="py-4">Are you sure delete this Record?</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn mr-2" onClick={deleteRecord}>
                  Yes
                </button>
                <button className="btn">No</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default OneRecord;
