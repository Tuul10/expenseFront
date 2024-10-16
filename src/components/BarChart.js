import { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ThemeContext } from "./ThemeContext";
import moment from "moment";
import { util } from "util";

const BarChart = () => {
  const { records } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const months = records.map((record) => record.transferat);

    const labels = [months];
    const data = records.map((record) => record.amount);

    console.log(data);

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
            data: data,
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
