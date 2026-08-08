const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
}) => {
  return (
    <div className="app-card rounded-2xl shadow-md p-6 transition-colors duration-300">

      <div className="flex items-center justify-between">

        <div>

          <p className="app-text">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 app-title">
            {value}
          </h2>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color}`}
        >
          <Icon className="text-2xl text-white" />
        </div>

      </div>

    </div>
  );
};

export default StatCard;