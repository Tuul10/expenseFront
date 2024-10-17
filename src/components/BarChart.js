import { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { ThemeContext } from "./ThemeContext";
import { format, getMonth } from "date-fns";

const BarChart = () => {
  const { records } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [monthlyExpenses, setMonthlyExpenses] = useState(new Array(12).fill(0));
  const [monthlyIncomes, setMonthlyIncomes] = useState(new Array(12).fill(0));

  useEffect(() => {
    const expenses = new Array(12).fill(0);
    const incomes = new Array(12).fill(0);

    records.forEach((record) => {
      const month = getMonth(new Date(record.transferat));

      if (record.transaction_type === "Expense") {
        expenses[month] += record.amount;
      } else if (record.transaction_type === "Income") {
        incomes[month] += record.amount;
      }
    });

    setMonthlyExpenses(expenses);
    setMonthlyIncomes(incomes);
  }, [records]);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
    }

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Income",
            data: monthlyIncomes,
            backgroundColor: "green",
            borderColor: "green",
            borderWidth: 1,
          },
          {
            label: "Expense",
            data: monthlyExpenses,
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
  }, [monthlyExpenses, monthlyIncomes]);

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
