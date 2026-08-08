const HealthStats = ({
  latestRecord,
  records,
}) => {
  const latestWeight = Number(
    latestRecord?.weight || 0
  );

  const averageSleep =
    records.length > 0
      ? (
          records.reduce(
            (sum, item) =>
              sum +
              Number(
                item.sleepHours || 0
              ),
            0
          ) / records.length
        ).toFixed(1)
      : 0;

  const averageWater =
    records.length > 0
      ? (
          records.reduce(
            (sum, item) =>
              sum +
              Number(
                item.waterIntake || 0
              ),
            0
          ) / records.length
        ).toFixed(1)
      : 0;

  const totalExercise =
    records.reduce(
      (sum, item) =>
        sum +
        Number(
          item.exerciseMinutes || 0
        ),
      0
    );

  const cards = [
    {
      title: "Current Weight",
      value: latestWeight
        ? `${latestWeight} kg`
        : "--",
      icon: "⚖️",
    },
    {
      title: "Avg. Sleep",
      value: `${averageSleep} hrs`,
      icon: "😴",
    },
    {
      title: "Avg. Water",
      value: `${averageWater} L`,
      icon: "💧",
    },
    {
      title: "Total Exercise",
      value: `${totalExercise} min`,
      icon: "🏃",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

      {cards.map((card) => (
        <div
          key={card.title}
          className="
            app-card
            rounded-2xl
            shadow-md
            p-6
            hover:shadow-lg
            transition-all
            duration-200
          "
        >
          <div className="flex justify-between items-start">

            <div>
              <p className="app-muted font-medium">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 app-title">
                {card.value}
              </h2>
            </div>

            <div className="text-3xl">
              {card.icon}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default HealthStats;