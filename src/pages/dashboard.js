import Navbar from "../components/Navbar";
import Income from "../components/Income";
import ExpenseLogo from "../../public/icons/ExpenseLogo";
import IncomeLogo from "../../public/icons/IncomeLogo";
import { CardLogo } from "../../public/icons/CardLogo";
import { Geld } from "../../public/icons/Geld";
import { useContext, useEffect, useState } from "react";
import BarChart from "@/components/BarChart";
import RingChart from "@/components/PieChart";
import OneRecord from "@/components/OneRecord";
import { ThemeContext } from "@/components/ThemeContext";
import { useAuthContext } from "@/providers/Authprovider";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { records } = useContext(ThemeContext);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);
  const { currentUser, isLoading } = useAuthContext();
  const [amount, setAmount] = useState;
  const router = useRouter();

  useEffect(() => {
    if (!currentUser && !isLoading) {
      router.push("/signIn");
    }
  }, [currentUser, isLoading]);

  useEffect(() => {
    let expenseSum = 0;
    let incomeSum = 0;
    let allAmount = 0;

    records.forEach((record) => {
      if (record.transaction_type === "Expense") {
        expenseSum += record.amount;
      } else if (record.transaction_type === "Income") {
        incomeSum += record.amount;
      }
    });

    records.forEach((record) => {
      allAmount += record.amount;
    });

    setExpenseAmount(expenseSum);
    setIncomeAmount(incomeSum);
    setAmount(allAmount);
  }, [records]);

  return (
    <div className="bg-[#F3F4F6] flex flex-col gap-8  mx-auto w-[100vw] h-[100%]">
      <div className="w-[1280px] mx-auto gap-8 flex flex-col">
        <Navbar />
        <div className="flex flex-col gap-6 w-[1200px] mx-auto">
          <div className="flex gap-6">
            <div className="w-full h-[220px] rounded-[18px] bg-[#0166FF] text-[#FFFFFF] flex flex-col p-12">
              <div className="flex gap-1 ">
                <CardLogo />
                <Geld />
              </div>
              <div className="flex">
                <div className="flex flex-col justify-end mt-24">
                  <p>Cash</p>
                  <p>{amount}</p>{" "}
                </div>
                <div className="flex justify-end">{/* <Shape /> */}</div>
              </div>
            </div>

            <Income
              color={"#84CC16"}
              title={"Your Income"}
              money={incomeAmount}
              text={"Your Income Amount"}
              description={"32% from last month"}
              icon={<IncomeLogo />}
            />

            <Income
              color={"#0166FF"}
              title={"Your Expense"}
              money={-expenseAmount}
              text={"Your Expense Amount"}
              description={"32% from last month"}
              icon={<ExpenseLogo />}
            />
          </div>
        </div>

        <div className="px-6 mx-auto w-[1280px] flex rounded-md gap-4">
          <div className="flex flex-col flex-1">
            <div className="bg-white rounded-md">
              <p className="font-semibold text-base p-4">Income - Expense</p>
            </div>
            <div className="py-8 px-6 bg-white mt-2 rounded-md h-[280px]">
              <BarChart />
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <div className="bg-white rounded-md">
              <p className="font-semibold text-base p-4">Income - Expense</p>
            </div>
            <div className="py-8 px-6 bg-white mt-2 rounded-md h-[280px]">
              <RingChart />
            </div>
          </div>
        </div>

        <div className="w-[1280px] mx-auto px-6 py-3 border bg-white border-[#E5E7EB] items-center justify-between flex rounded-xl">
          <h1 className="px-8">Records</h1>
        </div>

        <div className="w-[1280px] mx-auto flex flex-col gap-4">
          {records.map((record) => (
            <OneRecord
              key={record.recordid}
              text={record.category_name}
              time={record.transferat}
              money={record.amount}
              transactionType={record.transaction_type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
