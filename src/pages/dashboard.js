import Navbar from "../components/Navbar";
import Income from "../components/Income";
import ExpenseLogo from "../../public/icons/ExpenseLogo";
import IncomeLogo from "../../public/icons/IncomeLogo";
import { CardLogo } from "../../public/icons/CardLogo";
import { Geld } from "../../public/icons/Geld";
import { ThemeContext } from "@/components/ThemeContext";
import { useContext } from "react";
import BarChart from "@/components/BarChart";
import RingChart from "@/components/PieChart";
import OneRecord from "@/components/OneRecord";
import moment from "moment";

const Dashboard = () => {
  const { records } = useContext(ThemeContext);
  return (
    <div className="bg-[#F3F4F6] flex flex-col gap-8  mx-auto w-[100vw] h-[100%]">
      <div className="w-[1280px mx-auto] gap-8 flex flex-col">
        <Navbar />
        <div className="flex flex-col gap-6 w-[1200px] mx-auto">
          <div className="flex gap-6">
            <div className="w-full h-[220px] rounded-[18px] bg-[#0166FF] text-[#FFFFFF]  flex flex-col p-12">
              <div className="flex gap-1 ">
                <CardLogo />
                <Geld />
              </div>
              <div className="flex">
                <div className="flex flex-col justify-end mt-24">
                  cash
                  <p>10,000,00</p>
                </div>
                <div className="flex justify-end">{/* <Shape /> */}</div>
              </div>
            </div>
            <Income
              color={"#84CC16"}
              title={"Your Income"}
              money={"1,200,000₮"}
              text={"Your Income Amount"}
              description={"32% from last month"}
              icon={<IncomeLogo />}
            />

            <Income
              color={"#0166FF"}
              title={"Your Expense"}
              text={"Your Expense Amount"}
              description={"32% from last month"}
              icon={<ExpenseLogo />}
            />
          </div>
        </div>
        <div className="px-6 mx-auto w-[1280px] flex rounded-md gap-4">
          <div className="flex flex-col flex-1">
            <div className="  bg-white rounded-md">
              <p className="font-semibold text-base p-4">Income - Expense </p>
            </div>
            <div className="py-8 px-6 bg-white mt-2 rounded-md h-[280px]">
              {" "}
              <BarChart />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="  bg-white rounded-md">
              <p className="font-semibold text-base p-4">Income - Expense </p>
            </div>
            <div className="py-8 px-6 bg-white mt-2 rounded-md h-[280px] ">
              <RingChart />
            </div>
          </div>
        </div>
        {/* <div className="flex gap-6 px-[120px]">
        <div className="w-full bg-white">
          <div className="py-4 pl-6">
            <p className="font-semibold text-base"> Income - Expense</p>
          </div>
          <div className="pt-8 py-6">
            <img src="/images/Income.png" />
          </div>
        </div>
        <div className="w-full bg-white">
          <div className="px-6 py-4 justify-between flex">
            <p className="font-semibold text-base">Income - Expense</p>
            <p className="font-normal text-base">Jun 1 - Nov 30</p>
          </div>
          <div className="pt-8 py-6">
            <img src="/images/Expense.png" />
          </div>
        </div>
      </div> */}
        <div className="flex w-[1280px] mx-auto p-4 text-base front-normal bg-white rounded-md">
          <h1>Last Records</h1>
        </div>
        <div>
          {records.map((record) => {
            // if (record.createdat === moment().format("L"))
            return (
              <OneRecord
                text={record.category_name}
                time={record.createdat}
                money={record.amount}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
