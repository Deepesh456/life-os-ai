const WellnessScore = ({ records }) => {
  if (!records || records.length === 0) {
    return (
      <div className="app-card rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold app-title">
          ❤️ Wellness Score
        </h2>

        <p className="app-muted mt-4">
          Add health records to calculate your wellness score.
        </p>
      </div>
    );
  }

  const latest = records[0];

  const sleep = Number(latest.sleepHours || 0);
  const water = Number(latest.waterIntake || 0);
  const exercise = Number(latest.exerciseMinutes || 0);

  /*
    Sleep:
    8 hours = full score
  */
  const sleepScore = Math.min(
    (sleep / 8) * 30,
    30
  );

  /*
    Water:
    2.5 L = full score
  */
  const waterScore = Math.min(
    (water / 2.5) * 30,
    30
  );

  /*
    Exercise:
    30 minutes = full score
  */
  const exerciseScore = Math.min(
    (exercise / 30) * 40,
    40
  );

  const score = Math.round(
    sleepScore +
      waterScore +
      exerciseScore
  );

  const getStatus = () => {
    if (score >= 80) return "Excellent";

    if (score >= 60) return "Good";

    if (score >= 40) return "Needs Improvement";

    return "Low";
  };

  const getMessage = () => {
    if (score >= 80) {
      return "Great job! You're maintaining healthy daily habits.";
    }

    if (score >= 60) {
      return "You're doing well. A little more consistency can improve your score.";
    }

    if (score >= 40) {
      return "Try improving your sleep, hydration, and daily activity.";
    }

    return "Focus on building healthier daily habits.";
  };

  return (
    <div className="app-card rounded-2xl shadow-md p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-xl font-bold app-title">
            ❤️ Wellness Score
          </h2>

          <p className="app-muted text-sm mt-1">
            Based on your latest health record
          </p>
        </div>

        <span className="text-3xl">
          🌿
        </span>

      </div>

      {/* Score */}

      <div className="text-center mb-6">

        <div className="text-5xl font-bold text-purple-600">
          {score}

          <span className="text-2xl app-muted">
            /100
          </span>
        </div>

        <p className="font-semibold mt-2 app-title">
          {getStatus()}
        </p>

      </div>

      {/* Overall Progress */}

      <div className="w-full h-4 app-muted-bg rounded-full overflow-hidden mb-6">

        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

      {/* Breakdown */}

      <div className="space-y-4">

        {/* Sleep */}

        <div>

          <div className="flex justify-between mb-1">

            <span className="text-sm font-medium app-title">
              😴 Sleep
            </span>

            <span className="text-sm app-muted">
              {sleep} hrs
            </span>

          </div>

          <div className="w-full h-2 app-muted-bg rounded-full">

            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${Math.min(
                  (sleep / 8) * 100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

        {/* Water */}

        <div>

          <div className="flex justify-between mb-1">

            <span className="text-sm font-medium app-title">
              💧 Water
            </span>

            <span className="text-sm app-muted">
              {water} L
            </span>

          </div>

          <div className="w-full h-2 app-muted-bg rounded-full">

            <div
              className="h-full bg-cyan-500 rounded-full"
              style={{
                width: `${Math.min(
                  (water / 2.5) * 100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

        {/* Exercise */}

        <div>

          <div className="flex justify-between mb-1">

            <span className="text-sm font-medium app-title">
              🏃 Exercise
            </span>

            <span className="text-sm app-muted">
              {exercise} min
            </span>

          </div>

          <div className="w-full h-2 app-muted-bg rounded-full">

            <div
              className="h-full bg-green-500 rounded-full"
              style={{
                width: `${Math.min(
                  (exercise / 30) * 100,
                  100
                )}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Message */}

      <div className="app-muted-bg rounded-xl p-4 mt-6">

        <p className="text-sm app-muted">
          💡 {getMessage()}
        </p>

      </div>

    </div>
  );
};

export default WellnessScore;