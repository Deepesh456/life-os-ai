import {
  FaBell,
  FaUserCircle,
  FaSearch,
} from "react-icons/fa";

import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const pageNames = {
    "/dashboard": "Dashboard",
    "/calendar": "Calendar",
    "/tasks": "Tasks",
    "/goals": "Goals",
    "/finance": "Finance",
    "/health": "Health",
    "/notes": "Notes",
    "/meetings": "Meetings",
    "/settings": "Settings",
  };

  const pageTitle =
    pageNames[location.pathname] ||
    "Life OS AI";

  return (
    <div className="h-20 flex items-center justify-between px-8 border-b app-border app-navbar">

      <h2 className="text-2xl font-bold app-title">
        {pageTitle}
      </h2>

      <div className="flex items-center gap-6">

        <div className="flex items-center app-input px-4 py-2 rounded-xl">

          <FaSearch className="app-muted mr-2" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none app-title"
          />

        </div>

        <FaBell className="text-2xl cursor-pointer app-title hover:text-yellow-500 transition" />

        <FaUserCircle className="text-3xl cursor-pointer text-purple-600" />

      </div>

    </div>
  );
};

export default Navbar;