import { NavLink } from "react-router-dom";

const menu = [
  {
    name: "Dashboard",
    icon: "🏠",
    path: "/dashboard",
  },
  {
    name: "Calendar",
    icon: "📅",
    path: "/calendar",
  },
  {
    name: "Tasks",
    icon: "✅",
    path: "/tasks",
  },
  {
    name: "Goals",
    icon: "🎯",
    path: "/goals",
  },
  {
    name: "Finance",
    icon: "💰",
    path: "/finance",
  },
  {
    name: "Health",
    icon: "❤️",
    path: "/health",
  },
  {
    name: "Notes",
    icon: "📝",
    path: "/notes",
  },
  {
    name: "Meetings",
    icon: "👥",
    path: "/meetings",
  },
  {
    name: "Settings",
    icon: "⚙️",
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside className="h-screen w-full md:w-64 bg-slate-900 dark:bg-black text-white flex flex-col p-5 md:p-6 overflow-y-auto">

      {/* Logo */}

      <h1 className="text-2xl md:text-3xl font-bold mb-8 md:mb-10 whitespace-nowrap">
        Life OS AI
      </h1>

      {/* Navigation */}

      <ul className="space-y-2 md:space-y-3">

        {menu.map((item) => (
          <li key={item.path}>

            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg"
                    : "text-gray-200 hover:bg-slate-700 dark:hover:bg-slate-800"
                }`
              }
            >

              <span className="text-xl">
                {item.icon}
              </span>

              <span className="font-medium">
                {item.name}
              </span>

            </NavLink>

          </li>
        ))}

      </ul>

    </aside>
  );
};

export default Sidebar;