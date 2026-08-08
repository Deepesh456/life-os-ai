import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const FinanceOverviewChart = ({
  income,
  expense,
}) => {
  const [themeColors, setThemeColors] = useState({
    text: "#111827",
    grid: "#e5e7eb",
  });

  useEffect(() => {
    const updateThemeColors = () => {
      const root = document.documentElement;
      const styles = getComputedStyle(root);

      const text =
        styles
          .getPropertyValue("--text-primary")
          .trim() || "#111827";

      const border =
        styles
          .getPropertyValue("--border")
          .trim() || "#e5e7eb";

      setThemeColors({
        text,
        grid: border,
      });
    };

    updateThemeColors();

    const observer = new MutationObserver(
      updateThemeColors
    );

    observer.observe(
      document.documentElement,
      {
        attributes: true,
        attributeFilter: ["class"],
      }
    );

    return () => {
      observer.disconnect();
    };
  }, []);

  const data = {
    labels: ["Income", "Expense"],

    datasets: [
      {
        label: "Amount",

        data: [
          Number(income || 0),
          Number(expense || 0),
        ],

        backgroundColor: [
          "#16a34a",
          "#dc2626",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    scales: {
      x: {
        ticks: {
          color: themeColors.text,
        },

        grid: {
          color: themeColors.grid,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: themeColors.text,
        },

        grid: {
          color: themeColors.grid,
        },
      },
    },

    plugins: {
      legend: {
        position: "top",

        labels: {
          color: themeColors.text,

          font: {
            size: 14,
          },
        },
      },

      tooltip: {
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
    },
  };

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-5 app-title">
        💰 Finance Overview
      </h2>

      <Bar
        data={data}
        options={options}
      />

    </div>
  );
};

export default FinanceOverviewChart;