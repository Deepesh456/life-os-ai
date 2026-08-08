import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = [
  "#8B5CF6",
  "#22C55E",
  "#EF4444",
  "#3B82F6",
  "#F59E0B",
  "#EC4899",
  "#14B8A6",
  "#6366F1",
];

const ExpensePieChart = ({
  transactions = [],
}) => {
  const expenseData = transactions
    .filter(
      (item) => item.type === "Expense"
    )
    .reduce((acc, item) => {
      const amount = Number(
        item.amount || 0
      );

      const existing = acc.find(
        (x) => x.name === item.category
      );

      if (existing) {
        existing.value += amount;
      } else {
        acc.push({
          name: item.category,
          value: amount,
        });
      }

      return acc;
    }, []);

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-6 app-title">
        Expense by Category
      </h2>

      {expenseData.length === 0 ? (
        <div className="text-center py-20 app-muted">
          No expense data available.
        </div>
      ) : (
        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>

            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {expenseData.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[
                        index % COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

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

            <Legend
              wrapperStyle={{
                color:
                  "var(--text-primary)",
              }}
            />

          </PieChart>
        </ResponsiveContainer>
      )}

    </div>
  );
};

export default ExpensePieChart;