import { useState } from "react";

const BMICard = ({ latestWeight }) => {
  const [height, setHeight] = useState("");

  const weight = Number(latestWeight || 0);
  const heightInMeters = Number(height) / 100;

  const bmi =
    weight > 0 && heightInMeters > 0
      ? weight / (heightInMeters * heightInMeters)
      : 0;

  const getStatus = () => {
    if (!bmi) return "Enter your height";

    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Healthy";
    if (bmi < 30) return "Overweight";

    return "Obese";
  };

  const status = getStatus();

  return (
    <div className="app-card rounded-2xl shadow-md p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">

        <div>
          <h2 className="text-xl font-bold app-title">
            ⚖️ BMI Calculator
          </h2>

          <p className="app-muted text-sm mt-1">
            Based on your latest weight
          </p>
        </div>

        <span className="text-3xl">
          🧮
        </span>

      </div>

      {/* Height */}
      <div className="mb-5">

        <label className="block font-semibold mb-2 app-title">
          Height (cm)
        </label>

        <input
          type="number"
          value={height}
          onChange={(e) =>
            setHeight(e.target.value)
          }
          placeholder="Example: 170"
          min="1"
          className="
            app-input
            w-full
            rounded-lg
            p-3
            outline-none
          "
        />

      </div>

      {/* BMI Result */}
      <div className="app-muted-bg rounded-xl p-5 text-center">

        <p className="app-muted">
          Your BMI
        </p>

        <h3 className="text-4xl font-bold mt-2 app-title">
          {bmi ? bmi.toFixed(1) : "--"}
        </h3>

        <p className="font-semibold mt-2 app-title">
          {status}
        </p>

      </div>

      {/* No weight warning */}
      {!latestWeight && (
        <p className="text-sm text-orange-500 mt-4">
          Add a weight record to calculate BMI.
        </p>
      )}

    </div>
  );
};

export default BMICard;