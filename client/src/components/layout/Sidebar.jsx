const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        Life OS AI
      </h1>

      <ul className="space-y-5">
        <li>🏠 Dashboard</li>
        <li>📅 Calendar</li>
        <li>✅ Tasks</li>
        <li>🎯 Goals</li>
        <li>💰 Finance</li>
        <li>❤️ Health</li>
        <li>📝 Notes</li>
        <li>👥 Meetings</li>
        <li>⚙ Settings</li>
      </ul>
    </div>
  );
};

export default Sidebar;