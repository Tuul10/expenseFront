import React, { useContext, useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ThemeContext } from "./ThemeContext";
import "chart.js/auto";

Chart.register(ArcElement, Tooltip, Legend);

// const records = [
//   { category_name: "Food", amount: 200 },
//   { category_name: "Transport", amount: 100 },
//   { category_name: "Entertainment", amount: 150 },
// ];

const RingChart = () => {
  const { records } = useContext(ThemeContext);
  const chartInstance = useRef(null);

  function getColorForCategory(category) {
    const colorMap = {
      Investmentes: "#36A2EB",
      Others: "#FFCE56",
      Home: "#0166FF",
      Income: "#16A34A",
      Shopping: "#cf1133",
      CommunicationPC: "#ff7f50",
      FinancialExpenses: "#ff7f50",
    };
    return colorMap[category] || "#CCCCCC";
  }
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const data = records.reduce(
      (acc, record) => {
        acc.labels.push(record.category_name);
        acc.data.push(record.amount);
        acc.colors.push(getColorForCategory(record.category_name));
        return acc;
      },
      { labels: [], data: [], colors: [] }
    );

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
            backgroundColor: data.colors,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || "";
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              },
            },
          },
        },
      },
    });
  }, [records]);

  return <canvas ref={chartRef} />;
};

export default RingChart;
