import FoodExpense from "../../public/icons/FoodExpenseIcon";
import RentIcon from "../../public/icons/RentIcon";
import Shopping from "../../public/icons/Shopping";
import { GiExpense } from "react-icons/gi";
import { FcAutomotive } from "react-icons/fc";
import { FcCurrencyExchange } from "react-icons/fc";
import { FcNeutralDecision } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcExport } from "react-icons/fc";
import { FcDepartment } from "react-icons/fc";
import { FcClapperboard } from "react-icons/fc";
import { FcCustomerSupport } from "react-icons/fc";
import { FcPositiveDynamic } from "react-icons/fc";

const icons = [
  {
    color: "#23E01F",
    image: <FcDepartment />,
    name: "Home",
    iconColor: "#0166FF",
  },
  {
    color: "#F54949",
    image: <FoodExpense />,
    name: "Food&Drinks",
    iconColor: "#FF4545",
  },
  {
    color: "#F54949",
    image: <Shopping />,
    name: "Shopping",
    iconColor: "#FF4545",
  },
  {
    image: <FcAutomotive />,
    name: "Vehicle",
  },
  {
    color: "#F54949",
    image: <FcCurrencyExchange />,
    name: "Investmentes",
    iconColor: "#FF4545",
  },
  {
    image: <FcExport />,
    name: "Financial Expenses",
  },
  {
    image: <FcMediumPriority />,
    name: "Others",
  },
  {
    image: <FcClapperboard />,
    name: "Life & Entertaimetnt",
  },
  {
    image: <FcCustomerSupport />,
    name: "Communication, PC",
  },
  {
    image: <FcPositiveDynamic />,
    name: "Income",
  },
];

const categoryIconByCategoryName = (props) => {
  const icon = icons.find((icon) => icon.name === props.text);
  return icon;
};
export default categoryIconByCategoryName;
