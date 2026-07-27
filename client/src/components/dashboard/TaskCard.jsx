const TaskCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        Today's Tasks
      </h2>

      <ul className="space-y-3">
        <li>✅ Complete internship task</li>
        <li>📅 Team meeting at 2 PM</li>
        <li>💧 Drink 8 glasses of water</li>
        <li>🏃 Evening walk</li>
      </ul>
    </div>
  );
};

export default TaskCard;