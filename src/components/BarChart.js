import { useContext, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { ThemeContext } from "./ThemeContext";

const BarChart = () => {
  const { records } = useContext(ThemeContext);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Prepare the data for the chart
    const labels = records.map((record) => record.category_name);
    const data = records.map((record) => record.amount);
    const backgroundColors = records.map((record) =>
      record.transaction_type === "Expense" ? "green" : "red"
    );
    const label = records.filter((record) =>
      record.transaction_type === "Income" ? "green" : "red"
    );

    // Create new chart instance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels, // Category names
        datasets: [
          {
            label: label,
            data: data, // Amounts for each category
            backgroundColor: backgroundColors, // Green for positive, Red for negative
            borderColor: backgroundColors, // Optional: same as background
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true, // Start the Y-axis at zero
          },
        },
      },
    });

    // Cleanup function to destroy the chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [records]); // Re-run the effect if `records` changes

  return <canvas ref={chartRef}></canvas>;
};

export default BarChart;
