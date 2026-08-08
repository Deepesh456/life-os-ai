const FinanceStats = ({ stats = {} }) => {
  const formatCurrency = (amount) => {
    return `₹${Number(amount || 0).toLocaleString("en-IN")}`;
  };

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(stats.balance),
      color:
        "bg-gradient-to-r from-purple-600 to-indigo-600",
      icon: "💰",
    },
    {
      title: "Income",
      value: formatCurrency(stats.totalIncome),
      color:
        "bg-gradient-to-r from-green-500 to-green-700",
      icon: "📈",
    },
    {
      title: "Expenses",
      value: formatCurrency(stats.totalExpense),
      color:
        "bg-gradient-to-r from-red-500 to-red-700",
      icon: "📉",
    },
    {
      title: "Transactions",
      value: stats.totalTransactions || 0,
      color:
        "bg-gradient-to-r from-blue-500 to-blue-700",
      icon: "📋",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} rounded-2xl p-6 text-white shadow-lg transition-transform duration-200 hover:-translate-y-1`}
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-white/80 font-medium">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {card.value}
              </h2>

            </div>

            <div className="text-5xl opacity-70">
              {card.icon}
            </div>

          </div>

        </div>
      ))}

    </div>
  );
};

export default FinanceStats;