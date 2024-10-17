import React, { useContext, useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { ThemeContext } from "./ThemeContext";
import "chart.js/auto";

Chart.register(ArcElement, Tooltip, Legend);

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

    // Aggregating data by category
    const aggregatedData = records.reduce((acc, record) => {
      const category = record.category_name;

      if (!acc[category]) {
        acc[category] = { amount: 0, color: getColorForCategory(category) };
      }
      acc[category].amount += record.amount;

      return acc;
    }, {});

    const labels = Object.keys(aggregatedData);
    const data = labels.map((label) => aggregatedData[label].amount);
    const backgroundColors = labels.map((label) => aggregatedData[label].color);

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: backgroundColors,
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
