import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const WeeklyActivityChart = ({
  weeklyActivity = [],
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
    labels: weeklyActivity.map(
      (d) => d.day
    ),

    datasets: [
      {
        label: "Events",

        data: weeklyActivity.map(
          (d) => d.count
        ),

        borderColor: "#7C3AED",

        backgroundColor: "#A855F7",

        tension: 0.4,

        pointBackgroundColor:
          "#7C3AED",

        pointBorderColor:
          "#7C3AED",

        pointRadius: 4,

        pointHoverRadius: 6,
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
        📊 Weekly Activity
      </h2>

      <Line
        data={data}
        options={options}
      />

    </div>
  );
};

export default WeeklyActivityChart;