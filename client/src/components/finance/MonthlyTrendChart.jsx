import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MonthlyTrendChart = ({
  transactions = [],
}) => {
  const months = {};

  transactions.forEach((item) => {
    const date = new Date(item.date);

    if (Number.isNaN(date.getTime())) {
      return;
    }

    const month = date.toLocaleString(
      "default",
      {
        month: "short",
      }
    );

    if (!months[month]) {
      months[month] = {
        month,
        Income: 0,
        Expense: 0,
      };
    }

    const amount = Number(
      item.amount || 0
    );

    if (item.type === "Income") {
      months[month].Income += amount;
    } else if (item.type === "Expense") {
      months[month].Expense += amount;
    }
  });

  const data = Object.values(months);

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-6 app-title">
        📈 Monthly Trend
      </h2>

      {data.length === 0 ? (
        <div className="text-center py-20 app-muted">
          No transaction data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "var(--text-primary)",
              }}
              axisLine={{
                stroke: "var(--border)",
              }}
              tickLine={{
                stroke: "var(--border)",
              }}
            />

            <YAxis
              tick={{
                fill: "var(--text-primary)",
              }}
              axisLine={{
                stroke: "var(--border)",
              }}
              tickLine={{
                stroke: "var(--border)",
              }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor:
                  "var(--card-bg)",
                border:
                  "1px solid var(--border)",
                borderRadius: "10px",
                color:
                  "var(--text-primary)",
              }}
              itemStyle={{
                color:
                  "var(--text-primary)",
              }}
              labelStyle={{
                color:
                  "var(--text-primary)",
              }}
            />

            <Line
              type="monotone"
              dataKey="Income"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="Expense"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default MonthlyTrendChart;