import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const WeeklyProductivityChart = ({
  completed,
  pending,
}) => {
  const [textColor, setTextColor] = useState(
    "#111827"
  );

  useEffect(() => {
    const updateThemeColor = () => {
      const root =
        document.documentElement;

      const color = getComputedStyle(
        root
      )
        .getPropertyValue("--text-primary")
        .trim();

      setTextColor(
        color || "#111827"
      );
    };

    updateThemeColor();

    const observer =
      new MutationObserver(
        updateThemeColor
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
    labels: [
      "Completed",
      "Pending",
    ],

    datasets: [
      {
        data: [
          completed,
          pending,
        ],

        backgroundColor: [
          "#22c55e",
          "#f97316",
        ],

        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: textColor,
          font: {
            size: 14,
          },
        },
      },

      tooltip: {
        bodyColor: textColor,
        titleColor: textColor,
      },
    },

    cutout: "70%",
  };

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-5 app-title">
        📈 Weekly Productivity
      </h2>

      <Doughnut
        data={data}
        options={options}
      />

    </div>
  );
};

export default WeeklyProductivityChart;