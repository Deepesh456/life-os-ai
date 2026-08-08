import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const IncomeExpenseBarChart = ({
  stats = {},
}) => {
  const data = [
    {
      name: "Income",
      amount: Number(
        stats?.totalIncome || 0
      ),
    },
    {
      name: "Expense",
      amount: Number(
        stats?.totalExpense || 0
      ),
    },
  ];

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-6 app-title">
        Income vs Expense
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border)"
          />

          <XAxis
            dataKey="name"
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

          <Bar
            dataKey="amount"
            fill="#7C3AED"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default IncomeExpenseBarChart;