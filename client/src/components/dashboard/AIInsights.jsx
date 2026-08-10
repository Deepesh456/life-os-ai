const AIInsights = ({
  stats,
  pendingTasks = [],
  todayEvents = [],
  recentTransactions = [],
}) => {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // Calculate recent expenses
  const expenses = recentTransactions
    .filter((t) => t.type === "Expense")
    .reduce(
      (sum, t) => sum + Number(t.amount || 0),
      0
    );

  // Generate recommendations
  const recommendations = [];

  if (pendingTasks.length >= 5) {
    recommendations.push(
      "Complete your highest-priority task first."
    );
  }

  if (todayEvents.length >= 3) {
    recommendations.push(
      "Your schedule is busy today. Leave some buffer time between meetings."
    );
  }

  if (expenses >= 5000) {
    recommendations.push(
      "Your recent expenses are high. Consider reducing unnecessary spending today."
    );
  }

  if (stats.activeGoals > 0) {
    recommendations.push(
      "Spend some time making progress on one of your active goals."
    );
  }

  if (
    pendingTasks.length === 0 &&
    todayEvents.length === 0
  ) {
    recommendations.push(
      "Looks like a light day. Use this time to plan ahead or learn something new."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Great job! You're managing your work efficiently. Keep it up!"
    );
  }

  // Productivity score
  const productivity = Math.max(
    0,
    Math.min(
      100,
      100 -
        pendingTasks.length * 8 +
        todayEvents.length * 3
    )
  );

  return (
    <div className="app-card rounded-2xl shadow p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-3xl font-bold app-title">
            🤖 Life OS AI
          </h2>

          <p className="app-muted mt-1">
            {greeting} 👋
          </p>
        </div>

        <div className="text-5xl">
          🧠
        </div>

      </div>


      {/* Statistics */}

      <div className="grid md:grid-cols-2 gap-5">

        {/* Today's Events */}

        <div className="app-card rounded-xl p-4">
          <p className="app-muted">
            📅 Today's Events
          </p>

          <div className="text-3xl font-bold mt-2 app-title">
            {stats.todayEvents || 0}
          </div>
        </div>


        {/* Pending Tasks */}

        <div className="app-card rounded-xl p-4">
          <p className="app-muted">
            ✅ Pending Tasks
          </p>

          <div className="text-3xl font-bold mt-2 app-title">
            {stats.pendingTasks || 0}
          </div>
        </div>


        {/* Active Goals */}

        <div className="app-card rounded-xl p-4">
          <p className="app-muted">
            🎯 Active Goals
          </p>

          <div className="text-3xl font-bold mt-2 app-title">
            {stats.activeGoals || 0}
          </div>
        </div>


        {/* Balance */}

        <div className="app-card rounded-xl p-4">
          <p className="app-muted">
            💰 Balance
          </p>

          <div className="text-2xl font-bold mt-2 app-title">
            ₹
            {Number(
              stats.balance || 0
            ).toLocaleString("en-IN")}
          </div>
        </div>

      </div>


      {/* AI Recommendations */}

      <div className="mt-8 app-card rounded-xl p-5">

        <h3 className="text-xl font-bold mb-4 app-title">
          ⭐ Smart Recommendations
        </h3>

        <ul className="space-y-3">

          {recommendations.map(
            (item, index) => (
              <li
                key={index}
                className="flex gap-2 app-text"
              >
                <span>✅</span>

                <span>
                  {item}
                </span>
              </li>
            )
          )}

        </ul>

      </div>


      {/* Productivity Score */}

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="font-semibold app-title">
            🔥 Productivity Score
          </span>

          <span className="font-bold app-title">
            {productivity}%
          </span>

        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">

          <div
            className="bg-green-400 h-full rounded-full transition-all duration-700"
            style={{
              width: `${productivity}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default AIInsights;