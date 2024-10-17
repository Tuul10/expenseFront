import { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ThemeContext } from "./ThemeContext";
import moment from "moment";
import { getMonth } from "date-fns";
import { format } from "date-fns";

const BarChart = () => {
  const { records } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const expanseDate = records.map((record) => {
      if (record.transaction_type === "Expense")
        return format(new Date(record.transferat), "yyyy-MM-dd");
    });

    const incomeDate = records.map((record) => {
      if (record.transaction_type === "Income")
        return format(new Date(record.transferat), "yyyy-MM-dd");
    });

    const month = getMonth(new Date(expanseDate[2]));

    const realMonth = month + 1;

    // [
    //   {
    //     "January":[
    //     totalExpense:200
    //   ]
    //   }
    // ]
    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const data = records.map((record) => {
      if (record.transaction_type === "Expense");
      return record.amount;
    });

    console.log(data);

    const incomeData = records.map((record) => {
      if (record.transaction_type === "Income");
      return record.amount;
    });

    console.log(incomeData);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "income",
            data: data,
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 1,
          },
          {
            label: "expense",
            data: incomeData,
            backgroundColor: "red",
            borderColor: "red",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [records]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
