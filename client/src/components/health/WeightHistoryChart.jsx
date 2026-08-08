import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeightHistoryChart = ({ records }) => {
  const chartData = [...records]
    .filter((item) => item.weight)
    .reverse()
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      ),
      weight: Number(item.weight),
    }));

  return (
    <div className="app-card rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="mb-6">
        <h2 className="text-xl font-bold app-title">
          📈 Weight History
        </h2>

        <p className="app-muted text-sm mt-1">
          Track your weight changes over time.
        </p>
      </div>

      {/* Empty State */}

      {chartData.length < 2 ? (
        <div className="h-[300px] flex items-center justify-center text-center app-muted">
          Add at least two weight records to see
          <br />
          your weight trend.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              opacity={0.15}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "currentColor" }}
            />

            <YAxis
              domain={[
                "dataMin - 2",
                "dataMax + 2",
              ]}
              tick={{ fill: "currentColor" }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="#7C3AED"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default WeightHistoryChart;