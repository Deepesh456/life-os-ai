import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SleepWaterChart = ({ records }) => {
  const chartData = [...records]
    .reverse()
    .map((item) => ({
      date: new Date(item.date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
        }
      ),
      sleep: Number(item.sleepHours || 0),
      water: Number(item.waterIntake || 0),
    }));

  return (
    <div className="app-card rounded-2xl shadow-md p-6">

      <div className="mb-6">
        <h2 className="text-xl font-bold app-title">
          😴 Sleep & 💧 Water Trends
        </h2>

        <p className="app-muted text-sm mt-1">
          Monitor your sleep and hydration patterns.
        </p>
      </div>

      {chartData.length < 2 ? (
        <div className="h-[300px] flex items-center justify-center text-gray-400 text-center">
          Add at least two health records to see
          your sleep and water trends.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#94A3B8" }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
            />

            <YAxis
              tick={{ fill: "#94A3B8" }}
              axisLine={{ stroke: "#475569" }}
              tickLine={{ stroke: "#475569" }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #475569",
                borderRadius: "10px",
                color: "#FFFFFF",
              }}
              labelStyle={{
                color: "#FFFFFF",
              }}
            />

            <Legend
              wrapperStyle={{
                color: "#CBD5E1",
              }}
            />

            <Line
              type="monotone"
              dataKey="sleep"
              name="Sleep (hours)"
              stroke="#60A5FA"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="water"
              name="Water (L)"
              stroke="#22D3EE"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default SleepWaterChart;