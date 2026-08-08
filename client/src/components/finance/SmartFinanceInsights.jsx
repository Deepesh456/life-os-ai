const SmartFinanceInsights = ({
  transactions = [],
  stats = {},
}) => {
  const expenses = transactions.filter(
    (t) => t.type === "Expense"
  );

  const income = Number(
    stats?.totalIncome || 0
  );

  const expense = Number(
    stats?.totalExpense || 0
  );

  const balance = Number(
    stats?.balance || 0
  );

  // Highest expense category
  const categoryTotals = {};

  expenses.forEach((item) => {
    const category =
      item.category || "Other";

    const amount = Number(
      item.amount || 0
    );

    categoryTotals[category] =
      (categoryTotals[category] || 0) +
      amount;
  });

  let highestCategory = "None";
  let highestAmount = 0;

  Object.entries(categoryTotals).forEach(
    ([category, amount]) => {
      if (amount > highestAmount) {
        highestCategory = category;
        highestAmount = amount;
      }
    }
  );

  const savingsRate =
    income > 0
      ? (
          ((income - expense) / income) *
          100
        ).toFixed(1)
      : 0;

  const tips = [];

  if (income === 0) {
    tips.push(
      "Start adding your income to get personalized insights."
    );
  }

  if (expense > income && income > 0) {
    tips.push(
      "⚠️ Your expenses are higher than your income."
    );
  }

  if (
    expense > income * 0.8 &&
    income > 0
  ) {
    tips.push(
      "You are spending more than 80% of your income."
    );
  }

  if (highestCategory !== "None") {
    tips.push(
      `${highestCategory} is your highest spending category.`
    );
  }

  if (Number(savingsRate) >= 30) {
    tips.push(
      "Excellent savings rate! Keep it up."
    );
  }

  if (balance < 0) {
    tips.push(
      "Your balance is negative. Consider reducing expenses."
    );
  }

  return (
    <div className="app-card rounded-2xl shadow-md p-6 mt-8 transition-colors duration-300">

      <h2 className="text-2xl font-bold mb-6 app-title">
        🤖 Smart Finance Insights
      </h2>


      <div className="grid md:grid-cols-2 gap-6">

        {/* Finance Summary */}

        <div className="space-y-4">

          {/* Balance */}

          <div className="bg-purple-50 dark:bg-purple-950/40 p-4 rounded-xl">

            <p className="text-gray-500 dark:text-gray-400">
              Current Balance
            </p>

            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              ₹
              {balance.toLocaleString(
                "en-IN"
              )}
            </h3>

          </div>


          {/* Savings Rate */}

          <div className="bg-green-50 dark:bg-green-950/40 p-4 rounded-xl">

            <p className="text-gray-500 dark:text-gray-400">
              Savings Rate
            </p>

            <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">
              {savingsRate}%
            </h3>

          </div>


          {/* Highest Expense */}

          <div className="bg-red-50 dark:bg-red-950/40 p-4 rounded-xl">

            <p className="text-gray-500 dark:text-gray-400">
              Highest Expense Category
            </p>

            <h3 className="text-xl font-bold text-red-600 dark:text-red-400">
              {highestCategory}
            </h3>

            <p className="text-gray-600 dark:text-gray-300">
              ₹
              {highestAmount.toLocaleString(
                "en-IN"
              )}
            </p>

          </div>

        </div>


        {/* Recommendations */}

        <div>

          <h3 className="font-bold text-lg mb-4 app-title">
            💡 Recommendations
          </h3>

          <ul className="space-y-3">

            {tips.length === 0 ? (

              <li className="bg-green-100 dark:bg-green-950/40 text-green-800 dark:text-green-300 p-3 rounded-lg">
                🎉 Your finances look healthy.
              </li>

            ) : (

              tips.map((tip, index) => (

                <li
                  key={index}
                  className="bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 p-3 rounded-lg"
                >
                  {tip}
                </li>

              ))

            )}

          </ul>

        </div>

      </div>

    </div>
  );
};

export default SmartFinanceInsights;