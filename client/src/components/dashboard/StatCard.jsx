const StatCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="text-2xl text-white" />
      </div>

      <h3 className="mt-5 text-gray-500 text-sm">
        {title}
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
};

export default StatCard;