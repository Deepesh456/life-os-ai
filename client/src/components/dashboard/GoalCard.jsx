const GoalCard = ({ goals = [] }) => {
  const activeGoals = goals.slice(0, 5);

  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <h2 className="text-xl font-bold mb-5 app-title">
        🎯 Active Goals
      </h2>

      {activeGoals.length === 0 ? (
        <p className="app-muted">
          No active goals.
        </p>
      ) : (
        <ul className="space-y-4">

          {activeGoals.map((goal) => (
            <li key={goal._id}>

              <div className="flex justify-between items-center mb-2">

                <span className="font-semibold app-title">
                  {goal.title}
                </span>

                <span className="text-sm font-semibold app-primary">
                  {goal.progress || 0}%
                </span>

              </div>

              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">

                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        0,
                        Number(goal.progress || 0)
                      )
                    )}%`,
                  }}
                />

              </div>

            </li>
          ))}

        </ul>
      )}

    </div>
  );
};

export default GoalCard;